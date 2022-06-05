const { default: axios } = require('axios');
var path = require('path'); 
const fsPromises = require('fs').promises
const fs2 = require('fs')
const cheerio = require('cheerio');

playlist = {  //array inside object for easy json parsing
  playlist: []
}

const HISTORY_SIZE = 10
const PLAYLIST_FILE_PATH = './playlist.json'

const createPlaylistFile = () => {
  fsPromises.writeFile(PLAYLIST_FILE_PATH,"")
}

if (!fs2.existsSync(PLAYLIST_FILE_PATH)) {
  createPlaylistFile()
}

const addLinkToList = (listItem) => {
  playlist.playlist.push(listItem)
  savePlaylistToFile()
}

const removeItemFromList = (itemId) => {
  playlist.playlist = playlist.playlist.filter(linkAndNameI => linkAndNameI.itemId != itemId)
  savePlaylistToFile()
}

const swapItems = (sourceIndex, destinationIndex) => {
  if(!sourceIndex || !destinationIndex){
    return 
  }

  let tmp = playlist.playlist[destinationIndex];
  playlist.playlist[destinationIndex] = playlist.playlist[sourceIndex];
  playlist.playlist[sourceIndex] = tmp;

  savePlaylistToFile()
}

const initPlaylistFromFile = async () => {
  const loadedPlaylist = await fsPromises.readFile(PLAYLIST_FILE_PATH)
  
  const playlistJson = loadedPlaylist.toString()
  
  if(playlistJson){
    playlist = JSON.parse(playlistJson)
  }
}

initPlaylistFromFile()

const savePlaylistToFile = async () => {
  try{
    let playlistJson = JSON.stringify(playlist)
    await fsPromises.writeFile(PLAYLIST_FILE_PATH, playlistJson)  //if nodeamon is running - it restarts the server everu save 
  }catch(e){
    console.log(`failed to save playlist to file: ${e.toString()}`)
  }
}

const getPlaylist = () => {  
  return playlist
}

const getName = async (url, res) => {  
  let response = await axios(url).catch((err) => console.log(err));
  
  let pageHtml = response.data

  const $ = cheerio.load(pageHtml);

  var title = $("title").text();

  res.send({isSuccess: true, name: title})
}

module.exports = {
  getPlaylist,
  addLinkToList,
  removeItemFromList,
  getName,
  swapItems,
};