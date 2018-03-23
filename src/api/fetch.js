import axios from 'axios';
// import { Message } from 'element-ui';
// import { Toast } from 'vux'
import { ToastPlugin } from 'vux'
import Vue from 'vue'
Vue.use(ToastPlugin)
import store from '../store';
// import { getToken } from '';
// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000, // 请求超时时间
  /***如果qs没有stringify,将下面方法打开才能提交form,只在post时生效 **/
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    //console.log(ret);
    return ret;
  }]
});

// request拦截器
service.interceptors.request.use(config => {

  let token = store.getters.token;
  // let token = '';
  if (token) {
    config.headers['X-token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers['X-SysCode'] = 'rec'; //让每个请求携带SysCode,请根据实际情况自行修改
  config.headers['X-UserCode'] = store.getters.userCode; //让每个请求携带SysCode,请根据实际情况自行修改
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})
/**=======================================**/
// respone拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中,
   */
  response => {
    // return response.data;
    const res = response.data;
    if (res.code !== 200) {
      //Vue.$vux.loading.hide();
      Vue.$vux.toast.show({
        text: res.message,
        // position:'top',
        type:'cancel'

      });
    }

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 5001 || res.code === 5002) {
    }
    //   return Promise.reject(error);
    // } else {
    //     }
    return response.data;
  },
  /**接口交互错误是处理,如果特殊错误,可对message进行修改**/
  error => {
    console.log(error)
    // console.log(error.response.status);//  debug
    let message = error.message;
    if (error.response.status == 500) {
      message = "请求异常";
    }
    if (error.response.status == 504) {
      message = "服务器异常";
    }
    if (error.response.status == 404) {
      message = "找不到服务内容";
    }

    /**错误弹框,仅在element-ui适用,如果使用其他前端框架(如手机端的),要相应进行修改**/
    Vue.$vux.toast.show({
      text: message,
      // position:'top',
      type:'cancel'

    });
    return Promise.reject(error);
  }

)

export default service;
