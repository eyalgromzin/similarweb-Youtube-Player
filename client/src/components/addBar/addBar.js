import React, { useEffect, useState } from "react";
import styles from './addBar.module.css';
import {addLinkToList, getName} from '../../api'
import axios from 'axios'

function AddBar({onLinkAdded}) {
  const [linkText, setLinkText] = useState('https://www.youtube.com/watch?v=P0qQGvJoK68&ab_channel=JamesScholz') 

  const addLinkToListHandler = async () => {
    let isValidUrl = true
    try {
      new URL(linkText);
    } catch (e) {
      isValidUrl = false
    }

    if(!isValidUrl){
      alert('in addBar bad url')
      return 
    }

    var url = new URL(linkText);
    var videoId = url.searchParams.get("v");

    let videoName = await getName(linkText)

    if(videoName.isSuccess){
      videoName = videoName.name
    }else{
      alert(videoName.e)
      return 
    }

    const res = await addLinkToList(linkText, videoName)

    if(res.isSuccess){
      onLinkAdded(linkText, videoName, res.itemId)
    }else{
      alert(`failed to add link: ${res.error}`)
    }
  }

  return <div className={styles.addBar}>
    <input type='text' value={linkText}  onChange={(e) => setLinkText(e.target.value)} />
    <div className={styles.addButton} onClick={addLinkToListHandler}>add</div>
  </div>
}

export default AddBar;
