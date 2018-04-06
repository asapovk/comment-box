import React, {Component} from 'react'
import Video from './Video'
import PlayButton from './PlayButton'

export default class MyPlayer extends Component {
  render() {
    return (
      <div>
        <Video {...videoProps}/>
        <PlayButton/>
      </div>
    )
  }
}


const videoProps = {
  loop: false,
  poster: 'http://zackperdue.com/freebies/reactjs-html5-video-player-component',
  preload: true,
  src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  autoPlay: true,
  playsInline: true,
  muted: false,
  crossOrigin: true,
  videoId: '123456'
}
