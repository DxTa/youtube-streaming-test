import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

class VideoFrame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playList: [
        "39_OmBO9jVg",
        "cSLAO7zxS2M",
        "DHdkRvEzW84",
        "fuBG_osuqy8",
        "ICcE72RwEyc"
      ],
      currentVideo: 0,
      autoplay: 0,
      videoId: "",
      title: ""
    }

    this._onReady = this._onReady.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onError = this._onError.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this._onPlaybackRateChange = this._onPlaybackRateChange.bind(this);
    this._onPlaybackQualityChange = this._onPlaybackQualityChange.bind(this);
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: this.state.autoplay
      }
    };

    const videoId = this.state.playList[this.state.currentVideo];

    return (
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onPlay={this._onPlay}
          onPause={this._onPause}
          onEnd={this._onEnd}
          onError={this._onError}
          onStateChange={this._onStateChange}
          onPlaybackRateChange={this._onPlaybackRateChange}
          onPlaybackQualityChange={this._onPlaybackQualityChange}
        />
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    this.setState({videoId: event.target.getVideoData().video_id});
    this.setState({title: event.target.getVideoData().title});
    console.log("READY", event);
    window.a = event;
    // event.target.pauseVideo();
  }

  _onPlay(event) {
    console.log("PLAY", event);
    window.a = event;
  }

  _onPause(event) {
    console.log("PAUSE", event);
    window.a = event;
  }

  _onEnd(event) {
    console.log("END", event);
    this.setState({
      currentVideo: this.state.currentVideo + 1,
      autoplay: 1
    })
    window.a = event;
  }

  _onError(event) {
    console.log("ERROR", event);
    window.a = event;
  }

  _onStateChange(event) {
    console.log("STATE_CHANGE", event);
    window.a = event;
  }

  _onPlaybackRateChange(event) {
    console.log("PLAYBACK_RATE_CHANGE", event);
    window.a = event;
  }

  _onPlaybackQualityChange(event) {
    console.log("PLAYBACK_QUALITY_CHANGE", event);
    window.a = event;
  }
}

export default VideoFrame;
