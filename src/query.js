const http = require('http')
const fs = require('fs')
const fetch = require('node-fetch')

const fileList = fs.readdirSync(".idea")

const headersMy = {
  "content-type" : "image/jpeg",
  "width-or-height" : "w",
  "resize" : "300",
  "rotate" : "0"
}

const options = {
    method: 'POST',
    body: fs.createReadStream("input.jpg"),
    headers: headersMy
}

//fetch("http://localhost:4000", options)
fetch("http://localhost:4000", options)
    .then(res => {
        const dest = fs.createWriteStream('./octocat.jpg');
        res.body.pipe(dest);
    })


