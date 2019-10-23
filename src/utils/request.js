/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import { extend } from 'umi-request';
import { isDev, jsonParse } from './utils';

/**
 * @typedef {import('./request').RequestMethod} RequestMethod
 */

const prodBaseUrl = BASE_URL;
// const devBaseUrl = 'http://127.0.0.1:3000';
const devBaseUrl = 'http://yapi.emake.cn/mock/53';
const baseUrl = isDev ? devBaseUrl : prodBaseUrl;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: isDev && YAPI === 'on' ? '/yapi' : baseUrl, // 访问前缀
  headers: {},
  getResponse: true,
  responseType: 'text',
});

/**
 *
 * @param {RequestMethod} rm
 * @returns {RequestMethod}
 */
function handleResult(rm) {
  const filter = method =>
    async function exec(...args) {
      // eslint-disable-next-line prefer-const
      let data;
      let response;
      try {
        ({ data, response } = await method(...args));
        data = jsonParse(data);
      } catch (e) {
        response = e.response || {};
        data = {
          msg: codeMessage[response.status] || '网络错误',
          code: response.status,
        };
      }
      if (
        response.status === 401 ||
        response.status === 403 ||
        data.code === 1008 || // 1008, "Token无效"
        data.code === 9005 || // 9005, "token被作废"
        data.code === 9555 || // "角色或权限不匹配"
        data.code === 9900 // "账户被冻结"
      ) {
        // token 过期，重新登录
        // eslint-disable-next-line no-underscore-dangle
        // window.g_app._store.dispatch({ type: 'login/logout' });
      } else if (response.headers instanceof Headers) {
        const refresh = response.headers.get('refresh') || '0';
        const token = response.headers.get('token') || '';
        if (refresh === '1' && token) {
          // eslint-disable-next-line no-underscore-dangle
          const { user } = window.g_app._store.getState();
          const oldToken = user.currentUser ? user.currentUser.token : '';
          if (oldToken !== token) {
            // eslint-disable-next-line no-underscore-dangle
            window.g_app._store.dispatch({
              type: 'user/saveToken',
              payload: token,
            });
          }
        }
      }
      if (data instanceof Object) {
        data.ok = +data.code === 200;
        if (isDev && response) {
          console.group(`请求接口 ${response.url}`);
          console.log(data);
          console.groupEnd();
        }
      }
      return data;
    };
  function input(...args) {
    return filter(rm)(...args);
  }
  input.get = filter(rm.get);
  input.put = filter(rm.put);
  input.post = filter(rm.post);
  input.delete = filter(rm.delete);
  input.rpc = rm.rpc;
  input.interceptors = rm.interceptors;
  input.patch = rm.patch;
  return input;
}

const filteredRequest = handleResult(request);
filteredRequest.interceptors.request.use((url, options) => {
  // eslint-disable-next-line no-underscore-dangle
  const { user } = window.g_app._store.getState();
  const token = user.currentUser ? user.currentUser.token : '';
  const params = options || {};
  const headers = options.headers || {};
  return {
    url,
    options: {
      ...params,
      headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
    },
  };
});

export default filteredRequest;
