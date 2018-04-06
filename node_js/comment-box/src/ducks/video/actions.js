export const LOAD_START = 'video-react/LOAD_START';
export const CAN_PLAY = 'video-react/CAN_PLAY';
export const WAITING = 'video-react/WAITING';
export const CAN_PLAY_THROUGH = 'video-react/CAN_PLAY_THROUGH';
export const PLAYING = 'video-react/PLAYING';
export const PLAY = 'video-react/PLAY';
export const PAUSE = 'video-react/PAUSE';
export const END = 'video-react/END';
export const SEEKING = 'video-react/SEEKING';
export const SEEKED = 'video-react/SEEKED';
export const SEEKING_TIME = 'video-react/SEEKING_TIME';
export const END_SEEKING = 'video-react/END_SEEKING';
export const DURATION_CHANGE = 'video-react/DURATION_CHANGE';
export const TIME_UPDATE = 'video-react/TIME_UPDATE';
export const VOLUME_CHANGE = 'video-react/VOLUME_CHANGE';
export const PROGRESS_CHANGE = 'video-react/PROGRESS_CHANGE';
export const RATE_CHANGE = 'video-react/RATE_CHANGE';
export const SUSPEND = 'video-react/SUSPEND';
export const ABORT = 'video-react/ABORT';
export const EMPTIED = 'video-react/EMPTIED';
export const STALLED = 'video-react/STALLED';
export const LOADED_META_DATA = 'video-react/LOADED_META_DATA';
export const LOADED_DATA = 'video-react/LOADED_DATA';
export const RESIZE = 'video-react/RESIZE';
export const ERROR = 'video-react/ERROR';


export const TOGGLE_PLAY = 'vieo-react/TOGGLE_PLAY';


export function togglePlay (onPlay) {
  return {
    type: TOGGLE_PLAY,
    payload: onPlay
  }
}

export function handleLoadStart(videoProps) {
  return {
    type: LOAD_START,
    payload: videoProps,
  };
}

export function handleCanPlay(videoProps) {
  return {
    type: CAN_PLAY,
    payload: videoProps
  };
}

export function handleWaiting(videoProps) {
  return {
    type: WAITING,
    payload: videoProps
  };
}

export function handleCanPlayThrough(videoProps) {
  return {
    type: CAN_PLAY_THROUGH,
    payload: videoProps
  };
}

export function handlePlaying(videoProps) {
  return {
    type: PLAYING,
    payload: videoProps
  };
}

export function handlePlay(videoProps) {
  return {
    type: PLAY,
    payload: videoProps
  };
}

export function handlePause(videoProps) {
  return {
    type: PAUSE,
    payload: videoProps
  };
}

export function handleEnd(videoProps) {
  return {
    type: END,
    payload: videoProps
  };
}

export function handleSeeking(videoProps) {
  return {
    type: SEEKING,
    payload: videoProps
  };
}

export function handleSeeked(videoProps) {
  return {
    type: SEEKED,
    payload: videoProps
  };
}

export function handleDurationChange(videoProps) {
  return {
    type: DURATION_CHANGE,
    payload: videoProps
  };
}

export function handleTimeUpdate(videoProps) {
  return {
    type: TIME_UPDATE,
    payload: videoProps
  };
}

export function handleVolumeChange(videoProps) {
  return {
    type: VOLUME_CHANGE,
    payload: videoProps
  };
}

export function handleProgressChange(videoProps) {
  return {
    type: PROGRESS_CHANGE,
    payload:videoProps,
  };
}

export function handleRateChange(videoProps) {
  return {
    type: RATE_CHANGE,
    payload: videoProps,
  };
}

export function handleSuspend(videoProps) {
  return {
    type: SUSPEND,
    payload: videoProps,
  };
}

export function handleAbort(videoProps) {
  return {
    type: ABORT,
    payload: videoProps,
  };
}

export function handleEmptied(videoProps) {
  return {
    type: EMPTIED,
    payload: videoProps,
  };
}

export function handleStalled(videoProps) {
  return {
    type: STALLED,
    payload: videoProps,
  };
}

export function handleLoadedMetaData(videoProps) {
  return {
    type: LOADED_META_DATA,
    payload:videoProps,
  };
}

export function handleLoadedData(videoProps) {
  return {
    type: LOADED_DATA,
    payload: videoProps,
  };
}

export function handleResize(videoProps) {
  return {
    type: RESIZE,
    payload: videoProps,
  };
}

export function handleError(videoProps) {
  return {
    type: ERROR,
    payload: videoProps,
  };
}

export function handleSeekingTime(time) {
  return {
    type: SEEKING_TIME,
    payload: time
  };
}

export function handleEndSeeking(time) {
  return {
    type: END_SEEKING,
    payload: time
  };
}
