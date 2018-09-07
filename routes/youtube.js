import express from 'express';
import * as config from '../config.json';
import {YoutubeService} from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();
//
/* GET home page. */
router.get('/', async (req, res) => {
    const trends = await service.getTrendingVideos();
    res.render('youtube/index', {
        title: config.title,
        countryList: service.getCountryList(),
        region: 'US',
        videos: trends
    });
});

router.get('/region/:region', async (req, res) => {
    console.log('[region]');
    console.log(req.params.region);
    const trends = await service.getTrendingVideos(req.params.region);
    res.render('youtube/index', {
        title: config.title,
        countryList: service.getCountryList(),
        region: req.params.region,
        videos: trends
    });
});


router.get('/:videoId', async (req, res) => {
    res.render('youtube/player', {
        title: config.title,
        countryList: service.getCountryList(),
        src: 'http://www.youtube.com/embed/' + req.params.videoId + '?autoplay=1',
    });
});


module.exports = router;
