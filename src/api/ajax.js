import axios from 'axios'
export default function ajax(url,data={},type='GET') {

  return new Promise(function (resolve,reject) {
    //执行异步请求
    let promise;
    if(type === 'GET'){
      let dataStr = '';
      Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
      });

      if(dataStr !== ''){
        dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
        url = url+'?'+dataStr;
      }
      promise = axios.get(url);
    }else{
      promise = axios.post(url,data);
    }

    promise.then(function (response) {
      //成功调用resolve
      resolve(response.data)
    }).catch(function (error) {
      //失败调用reject
      reject(error)
    });

  });


}
