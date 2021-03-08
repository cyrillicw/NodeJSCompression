const express = require('express')
const fs = require('fs')
const pako = require('pako')

let app = express();

app.use(express.urlencoded({'extended': false}));
app.use(express.json());
app.set('view engine', 'ejs')

const imgFilename = "raw_img.bmp"
const textFilename = "raw_text.txt"

app.get('/', function(req, res) {
    res.render('view.ejs');
});

app.post('/raw_img', function(req, res) {
    res.contentType("application/octet-stream")
    res.sendFile(__dirname + `/assets/${imgFilename}`)
});

app.post('/compressed_img', function(req, res) {
    res.contentType("application/octet-stream")
    res.sendFile(__dirname + `/assets/${imgFilename}.pako`)
});

app.post('/raw_text', function(req, res) {
    res.contentType("application/octet-stream")
    res.sendFile(__dirname + `/assets/${textFilename}`)
});

app.post('/compressed_text', function(req, res) {
    res.contentType("text")
    res.sendFile(__dirname + `/assets/${textFilename}.pako`)
});

app.get('/scripts/pako.min.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/scripts/pako.min.js');
});

app.get('/styles/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/styles/style.css');
});

function compressFile(filename) {
    let raw_img = new Uint8Array(fs.readFileSync(`assets/${filename}`, null))
    let output = pako.deflate(raw_img)
    fs.writeFile(`assets/${filename}.pako`, Buffer.from(output), function (err) {});
}

function compress() {
    compressFile(imgFilename)
    compressFile(textFilename)
}

compress()

app.listen(8080)