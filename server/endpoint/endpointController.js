const Endpoint = require('./endpointModel.js');

const endpointController = {
  
  // Retrieves an endpoint definition for a given endpoint name
  // If none found, returns null
  getEndpoint: async endpoint => {
    try { return await Endpoint.findOne({endpoint}); }
    catch (err) { return null; }
  },
  
  // Express middleware
  // If successfully creates (upserts) endpoint in endpoints collection, responds with 200
  // Else responds with 400
  setEndpoint: async (req, res) => {
    try {
      console.log('Incoming endpoint defintion: ', req.body);
      // Insert if the endpoint doesn't exist, update if it does
      const doc = await Endpoint.update(
        { endpoint: req.body.endpoint },
        {
          endpoint: req.body.endpoint,
          url: req.body.url,
          text: req.body.text,
          images: req.body.images,
          backgroundImages: req.body.backgroundImages,
          pagination: req.body.pagination,
        },
        { upsert : true });
      res.status(200);
      res.send(`Endpoint successfully created: ${doc._id}`)
    }
    catch (err) {
      console.log('Error saving endpoint: ', err);
      res.status(400)
      res.send(err);
    }
  }
  
}

module.exports = endpointController;