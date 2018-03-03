import ajax from '../ajax/index.js';
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

// 服务端转发请求，避免跨域
$('#proxyBtn').addEventListener('click',(e) => {
  ajax({
    url: proxyUrl + 'proxy',
    proxy: serverUrl + 'proxy',
    type: 'GET',
    dataType: 'json',
    async: true,
    data: {},
    header: {},
    success: function(res,data){
      $('#proxy').innerText = res.info;
    },
    fail: function(){}
  })
})
