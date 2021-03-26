import Taro from '@tarojs/taro'
const baseUrl = 'http://www.baidu.com'  
const axios = ({ url, method = 'GET', data = {}, tipName = '加载中' }) => {
  const header = {
    'Content-Type':'application/json;charset=UTF-8'
  }
  if (Taro.getStorageSync('token')) {
    header.token = Taro.getStorageSync('token')  //登录后拿到token值
  }
  return new Promise((resolve, reject) => {
    Taro.showLoading({
      title: tipName,
    })
    Taro.request({
      url:url.substring(0,1)==='/'?`${baseUrl}${url}`:`${url}`, // 兼容baseUrl不同的情况，可以通过填写完整路径
      method,
      data,
      header,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete:()=>{
        Taro.hideLoading()
      }
    })
  })
}
export default axios