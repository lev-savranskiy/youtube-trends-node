import * as config from "../config";
const countryList = config.countryList;
const countryListLen = countryList.length;
import {YoutubeService} from '../services/youtube';
import 'regenerator-runtime/runtime';

const chai = require('chai');
const chaiHttp = require('chai-http');
const inst = new YoutubeService();
const dataLen = 24;
chai.should();
chai.use(chaiHttp);

const items = {
    id: 0,
    title: 0,
    thumbnail: 0,
    publishedAt: 0,
    viewCount: 0,
    likeCount: 0
};

describe('YoutubeService', () => {
    it('should have ' + countryListLen + ' items in Country List', async () => {
        const list = await inst.getCountryList();
        list.length.should.be.equal(countryListLen);
    });

    it('should have ' + dataLen + ' Trending Videos', async () => {
        const list = await inst.getTrendingVideos();
        list.length.should.be.equal(dataLen);
    });

    it('should have all Videos details', async () => {
        const list = await inst.getTrendingVideos();
        list.forEach(function (el) {
            for(const k in el){
                items[k]++;
            }
        });

        items.id.should.be.equal(dataLen);
        items.title.should.be.equal(dataLen);
        items.thumbnail.should.be.equal(dataLen);
        items.publishedAt.should.be.equal(dataLen);
        items.viewCount.should.be.equal(dataLen);
        items.likeCount.should.be.equal(dataLen);
    });


});