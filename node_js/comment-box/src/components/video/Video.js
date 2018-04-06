import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../ducks/video/actions'


class Video extends Component {

  componentWillReceiveProps(newProps) {
    const {togglePlay} = this.props
    if(togglePlay !== newProps.togglePlay) this.togglePlay()
  }


  // get playback rate
  getPlaybackRate  = () => {
    return this.video.playbackRate;
  }

  // set playback rate
  // speed of video
  setPlaybackRate = (rate) => {
    this.video.playbackRate = rate;
  }

  getMuted = () => {

    return this.video.muted;
  }

  setMuted = (val) => {
    this.video.muted = val;
  }

  getVolume = () => {
    return this.video.volume;
  }

  setVolume = (val) => {
    if (val > 1) {
      val = 1;
    }
    if (val < 0) {
      val = 0;
    }
    this.video.volume = val;
  }

  // video width
  getVideoWidth = () => {
    return this.video.videoWidth;
  }

  // video height
  getVideoHeight = () => {
    return this.video.videoHeight;
  }

  // play the video
  play = () => {
    const promise = this.video.play();
    if (promise !== undefined) {
      promise
        .catch(error => {})
        .then(() => {});
    }
  }

  // pause the video
  pause = () => {
    const promise = this.video.pause();
    if (promise !== undefined) {
      promise
        .catch(error => {})
        .then(() => {});
    }
  }

  // Change the video source and re-load the video:
  load = () => {
    this.video.load();
  }

  // Add a new text track to the video
  addTextTrack = (...args) => {
    this.video.addTextTrack(...args);
  }

  // Check if your browser can play different types of video:
  canPlayType = (...args) => {
    this.video.canPlayType(...args);
  }

  // toggle play
  togglePlay = () => {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  // seek video by time
  seek = (time) => {
    try {
      this.video.currentTime = time;
    } catch (e) {
      // console.log(e, 'Video is not ready.')
    }
  }

  // jump forward x seconds
  forward = (seconds) => {
    this.seek(this.video.currentTime + seconds);
  }

  // jump back x seconds
  replay = (seconds) => {
    this.forward(-seconds);
  }

  // enter or exist full screen
  toggleFullscreen = () => {
    console.log('Toggle full screen!')
  }

  // Fired when the user agent
  // begins looking for media data
  handleLoadStart  = (...args) => {

  }

  // A handler for events that
  // signal that waiting has ended
  handleCanPlay = (...args) => {
    console.log('Can play')
  }

  // A handler for events that
  // signal that waiting has ended
  handleCanPlayThrough  = (...args) =>{
    console.log('Can play through!')
  }

  // A handler for events that
  // signal that waiting has ended
  handlePlaying = (...args) => {
    console.log('handle Playing')
  }

  // Fired whenever the media has been started
  handlePlay = (...args) => {
    console.log('Started playing!')
    actions.handlePlay(...args)
  }

  // Fired whenever the media has been paused
  handlePause =  (...args) => {
    console.log('Paused')
    actions.handlePause(...args)
  }

  // Fired when the duration of
  // the media resource is first known or changed
  handleDurationChange = (...args) => {

  }

  // Fired while the user agent
  // is downloading media data
  handleProgress = (...args) => {
    console.log('Progress')
  }

  // Fired when the end of the media resource
  // is reached (currentTime == duration)
  handleEnded = (...args) => {
    const {loop} = this.props;
    if (loop) {
      this.seek(0);
      this.play();
    } else {
      this.pause();
    }

  }

  // Fired whenever the media begins waiting
  handleWaiting = ()  =>{

  }

  // Fired whenever the player
  // is jumping to a new time
  handleSeeking = () => {

  }

  // Fired when the player has
  // finished jumping to a new time
  handleSeeked = () => {

  }

  // Handle Fullscreen Change
  handleFullscreenChange =() => {
  }


  // Fires when the browser is
  // intentionally not getting media data
  handleSuspend = () => {

  }

  // Fires when the loading of an audio/video is aborted
  handleAbort = () => {
    console.log('Abort')
  }

  // Fires when the current playlist is empty
  handleEmptied = ()  => {
    console.log('Emptied!')
  }

  // Fires when the browser is trying to
  // get media data, but data is not available
  handleStalled = () => {
    console.log('Emptied!')
  }

  // Fires when the browser has loaded
  // meta data for the audio/video
  handleLoadedMetaData = () => {

  }

  // Fires when the browser has loaded
  // the current frame of the audio/video
  handleLoadedData = () => {
    console.log('Data loaded!')
  }

  // Fires when the current
  // playback position has changed
  handleTimeUpdate = () => {
    console.log('Time is updated!')
    console.log(this.video.currentTime)
  }

  /**
   * Fires when the playing speed of the audio/video is changed
   */
  handleRateChange = () => {
    console.log('Rate change!')
  }

  // Fires when the volume has been changed
  handleVolumeChange = ()  => {
    console.log('Vomume change!')
  }

  // Fires when an error occurred
  // during the loading of an audio/video
  handleError = () => {
    console.log('Error!')
  }

  handleResize = () => {
    console.log('Reize!')
  }

  handleKeypress = () => {
    console.log('Key press')
  }


  render() {
    const {
      loop, poster, preload, src, autoPlay,
      playsInline, muted, crossOrigin, videoId
    } = this.props;

    return (
      <video
        id={videoId}
        crossOrigin={crossOrigin}
        ref={(c) => { this.video = c }}
        muted={muted}
        preload={preload}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay}
        poster={poster}
        src={src}
        onLoadStart={this.handleLoadStart}
        onWaiting={this.handleWaiting}
        onCanPlay={this.handleCanPlay}
        onCanPlayThrough={this.handleCanPlayThrough}
        onPlaying={this.handlePlaying}
        onEnded={this.handleEnded}
        onSeeking={this.handleSeeking}
        onSeeked={this.handleSeeked}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onProgress={this.handleProgress}
        onDurationChange={this.handleDurationChange}
        onError={this.handleError}
        onSuspend={this.handleSuspend}
        onAbort={this.handleAbort}
        onEmptied={this.handleEmptied}
        onStalled={this.handleStalled}
        onLoadedMetadata={this.handleLoadedMetaData}
        onLoadedData={this.handleLoadedData}
        onTimeUpdate={this.handleTimeUpdate}
        onRateChange={this.handleRateChange}
        onVolumeChange={this.handleVolumeChange}
      ><div>Hello world!</div>
      </video>
    )
  }
}

// Proseed here!!
export default connect ((state)=>({togglePlay: state.playerReducer.playing})) (Video)
