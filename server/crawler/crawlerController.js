const Crawler = require('./crawlerModel.js');

const crawlerController = {
    getCache: async (req, res) => {
        try {
            const config = req.query.config;
            // Send document back as JSON object
            res.json(await Crawler.find({"config": config}));
        } catch (err) {
            console.log (err);
        }
        next();
    }
}

module.exports = crawlerController;