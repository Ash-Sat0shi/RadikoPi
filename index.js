// read express
const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
// for get ch.list from radiko API
const request = require('sync-request');
const { exec } = require('child_process');


// express -> app
const app = express();
app.use(multer().none());
// open web folder
app.use(express.static('web'));
// JSON DATA
const todoList = [];
const list = [];

var chlistelem = {};
var chnamelist = [];
var chidlist = [];

// root access to http://localhost/
app.get('/api', (req, res) => {
    // send JSON
    res.json(todoList);
});
/*
app.get('/api/ch', (req, res) => {
    const chList = [
    { chname: 'TBSラジオ', chid: 'TBS'},
    { chname: '文化放送', chid: 'QRR'}, 
    { chname: 'ニッポン放送', chid: 'LFR'},
    { chname: 'ラジオNIKKEI第1', chid: 'RN1'},
    { chname: 'ラジオNIKKEI第2', chid: 'RN2'},
    { chname: 'InterFM897', chid: 'INT'},
    { chname: 'TOKYO FM', chid: 'FMT'},
    { chname: 'J-WAVE', chid: 'FMJ'},
    { chname: 'ラジオ日本', chid: 'JORF'},
    { chname: 'BAYFM78', chid: 'BAYFM78'},
    { chname: 'NACK', chid: 'NACK5'},
    { chname: 'ＦＭヨコハマ', chid: 'YFM'},
    { chname: '放送大学', chid: 'HOUSOU-DAIGAKU'},
    { chname: 'NHKラジオ第1（東京）', chid: 'JOAK'},
    { chname: 'NHK-FM（東京）', chid: 'JOAK-FM'}
    ];
    res.json(chList);
});
*/

//reqtest.js　で試した千葉県のラジオ局リストとってくるスクリプト

app.get('/api/ch', (req, res) => {
    var chlist = [];
var URL = request('get', 'http://radiko.jp/v2/station/list/JP13.xml');
var text = URL.getBody().toString();
var chidtag = text.match(/\<id\>(.*)\<\/id\>/g);
var chnametag = text.match(/\<name\>(.*)\<\/name\>/g);

for (var i = 0; i < chidtag.length; i++) {
    //console.log( result[i].slice( 4, -5 ));
    chidlist.push(chidtag[i].slice(4, -5));
    chnamelist.push(chnametag[i].slice(6, -7));
    //console.log(chidlist[i]);
    //console.log(chnamelist[i]);

    //これだと追加できない…
    //chlistelem[i].chname = chnamelist[i];
    //chlistelem[i].chid = chidlist[i];
    chlistelem[i] = {
        chname: `${chnamelist[i]}`,
        chid: `${chidlist[i]}`
    };
    console.log(chlistelem[i]);
    chlist.push(chlistelem[i]);
}
    res.json(chlist);
});

//-------------------------------------------------------------------------//

app.post('/api/ch/play/:id', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    console.log(`/home/pi/tools/radiko -p ${req.params.id}`);
    
    exec(`killall mplayer`)
    res.sendStatus(200);
    exec(`/home/pi/tools/radiko -p ${req.params.id}`);
    
});

app.post('/api/ch/kill', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    console.log("killall mplayer");
    res.sendStatus(200);
    exec(`killall mplayer &`);
    
});


// port 3000
app.listen(3000, () => console.log("listening PORT3000 ..."));
