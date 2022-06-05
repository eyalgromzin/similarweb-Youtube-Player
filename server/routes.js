const services = require('./services')

exports.addRoutes = function addRoutes(app){
  app.post('/api/addLinkToList', (req, res) => {
    // const searchText = req.query.searchText  //get param
    try{
      const link = req.body.params.link  //post param
      const name = req.body.params.name  //post param
      const itemId = link.slice(link.length - 10, link.length) + Date.now()
    
      services.addLinkToList({link, name, itemId})
      res.send({isSuccess: true, itemId})
    }catch(e){
      res.send({isSuccess: false, error: e})
    }
  });  
  
  app.post('/api/removeItemFromList', (req, res) => {
    try{
      const itemId = req.body.params.itemId  //post param

      services.removeItemFromList(itemId)
      res.send({isSuccess: true})
    }catch(e){
      res.send({isSuccess: false, error: e})
    }
  });
  
  app.post('/api/swapItems', (req, res) => {
    const sourceIndex = req.body.params.sourceIndex  //post param
    const destinationIndex = req.body.params.destinationIndex  //post param

    try{
      let d = 4
      services.swapItems(sourceIndex, destinationIndex)
      let s= 4
      res.send({isSuccess: true})
    }catch(e){
      res.send({isSuccess: false, error: e})
    }
  });
  
  app.get('/api/getPlaylist', (req, res) => {
    // const searchText = req.query.searchText  //get param
    let playlist = services.getPlaylist()
    res.send(playlist)
  });

  app.get('/api/getName', (req, res) => {
    try{
      const url = req.query.url  //get param
  
      services.getName(url, res)
    }catch(e){
      res.send({isSuccess: false, e: e.toString()})
    }
  });
}