import { ajax, jsonp } from '../ajax/index.js';
const proxyUrl = 'http://127.0.0.1:8081/';
const serverUrl = 'http://127.0.0.1:8082/';
// 选择器简易封装
function $(str){
  const ele = str.slice(1);
  if(str[0] === '.'){
    return document.getElementsByClassName(ele);
  }else if(str[0] === '#'){
    return document.getElementById(ele);
  }else{
    return document.getElementsByTagName(ele);
  }
}

// 服务端转发请求，避免产生跨域问题安全问题
$('#proxyBtn').addEventListener('click',(e) => {
  ajax({
    url: proxyUrl + 'proxy',
    proxy: serverUrl + 'proxy',
    type: 'GET',
    async: true,
    success: function(res,data){
      $('#proxy').innerText = res.info;
    }
  })
})


// 通过 jsonp 来解决跨域问题安全问题
$('#jsonpBtn').addEventListener('click',(e) => {
  jsonp({
    url: serverUrl + 'jsonp',
    name: 'jsonpCallback',
    callback: jsonpCallback
  })
  function jsonpCallback(res){
    $('#jsonp').innerText = res.info;
  }
})


// 通过设置 Access-Control-Allow-Origin 来解决跨域问题
$('#headAll').addEventListener('click',(e) => {
  ajax({
    url: serverUrl + 'all',
    type: 'GET',
    async: true,
    success: function(res){
      $('#all').innerText = res.info;
    },
  })
})

// 非简单请求
$('#addHeaderBtn').addEventListener('click',(e) => {
  ajax({
    url: serverUrl + 'addHeader',
    type: 'GET',
    async: true,
    header:{
      token: 'option'
    },
    success: function(res){
      $('#addHeader').innerText = res.info;
    },
  })
})
