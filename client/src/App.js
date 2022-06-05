import React, { useEffect, useState } from "react";
import styles from './App.module.css';
import {getPlaylist, removeItemFromList, swapItems as swapItemsInServer} from './api'
import AddBar from "./components/addBar/addBar";
import YouTubePlayer from './components/player/player';
import Playlislt from './components/playlist/playlist';

//https://www.youtube.com/watch?v=1O0yazhqaxs&ab_channel=MatthewMcDonald - 3 sec video
function App() {
  const [playlist, setPlaylist] = useState([])

  const init = async () => {
    let initialPlaylist = await getPlaylist()
    setPlaylist(initialPlaylist)
  }

  useEffect(() => {
    init()
  }, [])

  const onLinkAdded = (link, name, itemId) => {
    let newPlaylist = [].concat(playlist)
    newPlaylist.push({link, name, itemId})
    setPlaylist(newPlaylist)
  }

  const removeItemFromListCall = (itemId) => {
    removeItemFromList(itemId).then((res) => {
      if(res.isSuccess){
        let playlistWithoutLink = playlist.filter(entryI => entryI.itemId !== itemId);
        setPlaylist(playlistWithoutLink)
      }
    })
  }

  const onPlayFinish = () => {
    if(playlist && playlist[0]){
      removeItemFromListCall(playlist[0].itemId)
    }
  } 
  
  const onSwapItems = (sourceIndex, destinationIndex) => {
    let swappedPlaylist = swapArrayItems(destinationIndex, sourceIndex);
    setPlaylist(swappedPlaylist)

    swapItemsInServer(sourceIndex, destinationIndex).then((res) => {
      if(!res.isSuccess){
        let swappedPlaylist = swapArrayItems(destinationIndex, sourceIndex);
        setPlaylist(swappedPlaylist)
      }
    })
  }

  let urlToPlay
  if(playlist && playlist[0]){
    urlToPlay = playlist[0].link
  }
  return <div className={styles.mainPage}>
    <div className={styles.leftSide}>
      <AddBar onLinkAdded={onLinkAdded}/>
      <Playlislt playlist={playlist} removeItem={removeItemFromListCall} onSwapItems={onSwapItems} />
    </div>
    <div className={styles.rightSide}>
      <YouTubePlayer link={urlToPlay} onPlayFinish={onPlayFinish}/>
    </div>
    
    
  </div>

  function swapArrayItems(destinationIndex, sourceIndex) {
    let swappedPlaylist = JSON.parse(JSON.stringify(playlist));

    let tmp = swappedPlaylist[destinationIndex];
    swappedPlaylist[destinationIndex] = swappedPlaylist[sourceIndex];
    swappedPlaylist[sourceIndex] = tmp;
    return swappedPlaylist;
  }
}

export default App;
