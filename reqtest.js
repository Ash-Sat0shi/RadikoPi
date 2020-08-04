const request = require('sync-request');

var response = request('get', 'http://radiko.jp/v2/station/list/JP13.xml');

const parser = new DOMParser();
const doc = parser.parseFromString(response, "text/xml");
console.log(doc);

/*
//とってきたXMLがTEXTとして表示される
//console.log(response.getBody().toString());   
var text = response.getBody().toString();

//1行ずつ配列になったXMLが表示される
var xmlArray = text.split(/\r\n|\r|\n/);
//console.log(xmlArray);




//"<id>なんちゃら</id>"と同<name>を配列としてとる。?:をつけておくと配列に格納されないらしい？
    var chidtag = text.match(/\<id\>(.*)\<\/id\>/g);
    var chnametag = text.match(/\<name\>(.*)\<\/name\>/g);


var chlist = []; //まず配列をつくる
//var chlistelem = {chname:"", chid:""};
var chlistelem = {};
var chnamelist = [];
var chidlist = [];



//console.log("ADD: ")
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
    }

    console.log(chlistelem[i]);
    chlist.push(chlistelem[i]);

}

//chlistはJSONデータとしてobjectの中に保存されるからconsole.log(chlist)では表示できない。わからん。
//そのため下記で内容確認できる

//console.log(JSON.stringify(chlist, null, '\t'));
*/