// read express
const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const request = require('request');

var URL = 'http://radiko.jp/v2/station/list/JP13.xml';

// express create app
const app = express();
app.use(multer().none());
// open web folder
app.use(express.static('web'));
// JSON DATA
const todoList = [];

//function getchlist() {
//    
//    request('http://radiko.jp/v2/station/list/JP13.xml', (error, response, body) => {
//        // エラーチェック
//        if( error !== null ){
//            console.error('error:', error);
//            return(false);
//        }
//        // レスポンスコードとHTMLを表示
//        console.log('statusCode:', response && response.statusCode);
//        console.log('body:', body);
//    });  
//};




// root access to http://localhost/
app.get('/api', (req, res) => {
    // send JSON
    res.json(todoList);
});

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





app.post('/api/add', (req, res) => {
    // get data from client
    const todoData = req.body;
    const todoTitle = todoData.title;

    // unique ID
    const id = uuidv4();

    // create TODO element
    const todoItem = {
        id,
        title: todoTitle,
        done: false
    };

    // add TODO List
    todoList.push(todoItem);

    // consolelog
    console.log('Add: ' + JSON.stringify(todoItem));

    // give back to client
    res.json(todoItem);
});

app.delete('/api/item/:id', (req, res) => {
    // URLの:idと同じIDを持つ項目を検索
    const index = todoList.findIndex((item) => item.id === req.params.id);

    // 項目が見つかった場合
    if (index >= 0) {
        const deleted = todoList.splice(index, 1); // indexの位置にある項目を削除
        console.log('Delete: ' + JSON.stringify(deleted[0]));
    }

    // ステータスコード200:OKを送信
    res.sendStatus(200);
});

// port 3000
app.listen(3000, () => console.log('Listening on port 3000'));
