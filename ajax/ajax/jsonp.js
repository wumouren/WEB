/**
 * 简易封装 jsonp 方法
 */
export function jsonp(option){
  const queryData = {
    url: '',
    data: {},
    name: '',
    callback: function callback(){},
  }
  let nameId = '';
  for(let i = 0; i < 64; i++){
    nameId += parseInt(Math.random() * 10);
  }
  const options = Object.assign(queryData,option);
  options.name += nameId;
  const head = document.getElementsByTagName('head')[0];
  const s = document.createElement('script');
  let jsonpCallback = `?callback=${options.name}`;
  let arr = [];
  for (let key in options.data){
    arr.push(encodeURIComponent(key) + '=' +encodeURIComponent(options.data[key]));
  }
  window[options.name] = function(res){
    options.callback(res);
    delete window[options.name];
  };
  s.src = options.url + jsonpCallback + arr.join('&');
  head.appendChild(s);
  head.removeChild(s);
}