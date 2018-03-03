const express = require('express');
const { exec } = require('child_process');
exec('node client');
express()
  .get('/proxy',(req,res)=>{
    res.send({ info : '服务端调用，不存在跨域问题，说明跨域是浏览器限制，不是后台服务限制' })
  })
  .listen(8082,console.log('client run port 8081 \n server run port 8082'))