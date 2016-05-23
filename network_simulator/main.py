import signal, sys, subprocess
import calendar, time
from random import randint
# configuration
interface = "eth1"
configuration = {
        "offline": {
            "rtt": 0,
            "bw": 0
            },
        "gprs": {
            "rtt": 500,
            "bw": 50
            },
        "regular_2g": {
            "rtt": 300,
            "bw": 250
            },
        "good_2g": {
            "rtt": 150,
            "bw": 450
            },
        "regular_3g": {
            "rtt": 100,
            "bw": 750
            },
        "good_3g": {
            "rtt": 40,
            "bw": 1500
            },
        "regular_4g": {
            "rtt": 20,
            "bw": 4000
            },
        "dsl": {
            "rtt": 5,
            "bw": 2000
            },
        "wifi": {
            "rtt": 2,
            "bw": 30000
            }
        }


# frequency to change
# how confugration changes???? offline sometimes, reconnect
# clear previous configuration
# finish capturing file
# start capturing new file

terminate = 0
def signal_handler(signal, frame):
    global terminate
    terminate = 1
    print('You pressed Ctrl+C!')
    #  sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

currentConfigType = "regular_3g"
configTypes = list(configuration.keys())
f = open('log.csv','a')
while(terminate == 0):
    currentConfig = configuration[currentConfigType]
    print("Simulate network: %s" % currentConfigType)
    print("Network condition: delay %d bandwidth %d" % (currentConfig['rtt'], currentConfig['bw']))
    commands = [
            "sudo tc qdisc add dev %s root handle 1:0 netem delay %dms" % (interface, currentConfig['rtt']),
            "sudo tc qdisc add dev %s parent 1:1 handle 10: tbf rate %dkbit burst %dkbit limit %dkbit" % (interface, currentConfig['bw'], currentConfig['bw'], currentConfig['bw']),
            "sleep 30",
            "sudo tc qdisc del dev %s root handle 1:0 netem delay %dms" % (interface, currentConfig['rtt']),
            "sudo tc qdisc del dev %s parent 1:1 handle 10: tbf rate %dkbit burst %dkbit limit %dkbit" % (interface, currentConfig['bw'], currentConfig['bw'], currentConfig['bw'])
            ]
    f.write("%d,%s,%dms,%dkbps,%s\n" % (calendar.timegm(time.gmtime()), currentConfigType, currentConfig['rtt'], currentConfig['bw'], 'ACTIVE'))
    f.flush()
    for command in commands:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        process.wait()
        #  print(process.returncode)
    f.write("%d,%s,%dms,%dkbps,%s\n" % (calendar.timegm(time.gmtime()), currentConfigType, currentConfig['rtt'], currentConfig['bw'], 'CLEAR'))
    # new configuration
    currentConfigType = configTypes[randint(1,8)]

f.close()
