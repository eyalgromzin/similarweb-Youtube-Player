import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'

const Player2 = ({link, onPlayFinish}) => {
  if(!link){
    return ''
  }
  
  let isValidUrl = true
  try {
    new URL(link);
  } catch (e) {
    isValidUrl = false
  }

  if(!isValidUrl){
    alert('in player: bad url')
    onPlayFinish()
  }

  return <div>
    { isValidUrl && 
      <ReactPlayer
        url={link}
        playing={true}
        width={400}
        height={300}
        muted={true}  //did the trick
        onEnded={onPlayFinish}
        />
    }
  </div>
}

export default Player2;
