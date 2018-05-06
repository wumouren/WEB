const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs= require('fs');
const baseIp = '';
const app = express();
app.use('/', express.static('dist'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Post = (url, headers, params,res) => {
  axios({
    method: 'post',
    url: `${baseIp}${url}`,
    data: params,
    headers: headers,
    responseType:'json'
  })
    .then(data => {
      if(data.status == 200){
        res.send(data.data);
      }
    })
}
const Get = (url, headers, params,res) => {
  axios({
    method: 'get',
    url: `${baseIp}${url}`,
    params: params,
    headers: headers,
    responseType:'json'
  })
    .then(data => {
      if(data.status == 200){
        res.send(data.data);
      }
    })
}
app.post('/api/*', (req,res) => {
  const url = req.path.slice('/api'.length);
  Post(url, req.headers, req.body, res)
})
app.get('/api/*', (req,res) => {
  const url = req.path.slice('/api'.length);
  Get(url, req.headers, req.query, res)
})
app.use(function(req, res) {
  fs.readFile(__dirname + '/dist/index.html', function(err, data){
      if(err){
        res.send('后台错误');
      } else {
        res.writeHead(200, {
          'Content-type': 'text/html',
          'Connection':'keep-alive'
        });
        res.end(data);
      }
  })
});

app.listen(80,console.log('80'))