import axios from 'axios';

const instance = axios.create({
  timeout: 5000, // 默认超时时间
});

/**
 * 获取数据 get请求
 * @param {*} url
 * @param {*} config
 */
export const get = (url, config) => instance.get(url, config);

// export function get(url, config) {
//   return instance.get(url, config)
// }

/**
 * post请求
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
export const post = (url, data, config) => instance.post(url, data, config);

// export function post(url, data, config) {
//   return instance.post(url, data, config)
// }

/**
 * put
 * @param {*} url
 * @param {*} data
 * @param {*} config
 */
export const put = (url, data, config) => instance.put(url, data, config);

/**
 * delete
 * @param {*} url
 * @param {*} config
 */
export const remove = (url, config) => instance.delete(url, config);
