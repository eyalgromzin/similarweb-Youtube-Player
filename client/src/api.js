const axios = require('axios');

export const getPlaylist = async (searchText) => {
  let playlist = await axios.get('/api/getPlaylist')

  return playlist.data.playlist
}

export const addLinkToList = async (link, name) => {
  let res = await axios.post('/api/addLinkToList', {
    params: {
      link,
      name
    }
  })

  return res.data
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
