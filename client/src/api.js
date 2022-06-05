const axios = require('axios');

export const getPlaylist = async (searchText) => {
  let playlist = await axios.get('/api/getPlaylist')

  return playlist.data.playlist
}

export const addLinkToList = async (link, name) => {
  let s = 4
  let res = await axios.post('/api/addLinkToList', {
    params: {
      link,
      name
    }
  })

  return res.data
}


async function fetchData(url){
  console.log("FETCHING WEBSITE HTML...")
  // make http call to url
  let response = await axios(url).catch((err) => {
    console.log(err)
  });

  if(response && response.status && response.status !== 200){
      console.log("Error occurred while fetching data");
      return;
  }
  return response;
}

export const getName = async (url) => {
  let res = await axios.get('/api/getName', {
    params: {
      url
    }
  })

  return res.data
}


export const removeItemFromList = async (itemId) => {
  let res = await axios.post('/api/removeItemFromList', {
    params: {
      itemId
    }
  })

  return res.data
}

export const swapItems = async (sourceIndex, destinationIndex) => {
  let res = await axios.post('/api/swapItems', {
    params: {
      sourceIndex,
      destinationIndex
    }
  })

  return res.data
}
