const express = require('express')
const fs = require('fs')
const pako = require('pako')

let app = express();

app.use(express.urlencoded({'extended': false}));
app.use(express.json());
app.set('view engine', 'ejs')

const img_filename = "raw.bmp"

app.get('/', function(req, res) {
    res.render('view.ejs');
});

app.post('/compressed_img', function(req, res) {
    res.contentType("application/octet-stream")
    res.sendFile(__dirname + `/imgs/${img_filename}.pako`)
});

app.post('/raw_img', function(req, res) {
    res.contentType("application/octet-stream")
    res.sendFile(__dirname + `/imgs/${img_filename}`)
});

app.get('/scripts/pako.min.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/scripts/pako.min.js');
});

app.get('/styles/style.css', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(__dirname + '/scripts/pako.min.js');
});

function compress_img() {
    let raw_img = new Uint8Array(fs.readFileSync(`imgs/${img_filename}`, null))
    let output = pako.deflate(raw_img)
    // console.log(raw_img.length)
    fs.writeFile(`imgs/${img_filename}.pako`, Buffer.from(output), function (err) {});
}
compress_img()

app.listen(8080)