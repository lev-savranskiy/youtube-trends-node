import Axios from 'axios';
import * as config from '../config.json';
import moment from "moment";

const axios = Axios.create({
    baseURL: config.youtubeApi.endpoint
});

export class YoutubeService {
    getCountryList(){
        return config.countryList
    }
    getTrendingVideos(regionCode) {
        regionCode = regionCode || 'US';
        const params = {
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: regionCode,
            maxResults: '24',
            key: config.youtubeApi.key
        };


        return axios.get('/', {params})
            .then(function (res) {
                const result = res.data.items;
                const promises = [];
                for (let i = 0; i < result.length; i++) {
                    result[i] = {
                        id: result[i].id,
                        title: result[i].snippet.title,
                        thumbnail: result[i].snippet.thumbnails.high.url,
                        publishedAt: moment(result[i].snippet.publishedAt).fromNow()
                    };
                    promises.push(YoutubeService.getVideoDetails(result[i]))
                }

                return Axios.all(promises).then(function (results) {
                    results.forEach(function (item, i) {
                        result[i] = item;
                    });
                    return result;
                });
            })
    }

    static getVideoDetails(video) {
        const params = {
            part: 'statistics',
            id: video.id,
            key: config.youtubeApi.key
        };

        return axios.get('/', {params}).then(function (res) {
            const result = res.data;
            video.viewCount = result['items'][0].statistics.viewCount;
            video.likeCount = result['items'][0].statistics.likeCount;
            return video;
        });
    }
}
