import * as config from "../config";
const countryList = config.countryList;
const countryListLen = countryList.length;
const chai = require('chai');
const parse5 = require('parse5');
const server = require('../app');
chai.should();

function getOptions(text){
    const document = parse5.parse(text);
    let selector = null;
    try {
        selector = document.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
    } catch (e) {
    }
    return selector && selector.childNodes;
}



describe('Dom', function () {

    it('should have region selector', (done) => {
        chai.request(server)
            .get('/youtube')
            .end(function (err, res) {
                const options = getOptions(res.text);
                options.should.be.an('array');
                done();
            });
    });

    it('should have ' + countryListLen + ' regions', (done) => {
        chai.request(server)
            .get('/youtube')
            .end(function (err, res) {
                const options = getOptions(res.text);
                options.length.should.be.equal(countryListLen);
                done();
            });
    });

    it('should have region US selected (default)', (done) => {
        chai.request(server)
            .get('/youtube')
            .end(function (err, res) {

                const options = getOptions(res.text);
                let selectedOK = false;
                options.forEach(function (el) {
                    const val = el.attrs[0].value;
                    if (!selectedOK && (val === 'US') && (el.attrs[1].name === 'selected')) {
                        selectedOK = true;
                    }
                });
                selectedOK.should.be.true;
                done();
            });
    });


    it('should have region CA selected (manual)', (done) => {
        chai.request(server)
            .get('/youtube/region/CA')
            .end(function (err, res) {

                const options = getOptions(res.text);
                let selectedOK = false;
                options.forEach(function (el) {
                    const val = el.attrs[0].value;
                    if (!selectedOK && (val === 'CA') && (el.attrs[1].name === 'selected')) {
                        selectedOK = true;
                    }
                });
                selectedOK.should.be.true;
                done();
            });
    });



});
