import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { delay } from 'dva/saga';
import { message } from 'antd';
import l from 'lodash';
import { queryCurrent, queryMenus, logoutToken } from '@/services/user';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    submitting: false,
    account: '',
    password: '',
    remember: false,
  },
  effects: {
    *logout(_, { put, call }) {
      // eslint-disable-next-line no-underscore-dangle
      const { user } = window.g_app._store.getState();
      if (user.currentUser.token) {
        const { ok, msg } = yield call(logoutToken);
        if (!ok) {
          message.error(msg);
        }
      }
      yield put({ type: 'user/saveCurrentUser' });
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },

    *login(_, { put, call, all, select }) {
      const { account, password } = yield select(state => state.login);

      if (!account) {
        message.warning('请输入账号');
        return;
      }

      if (!password) {
        message.warning('请输入密码');
        return;
      }

      yield put({ type: 'updateSubmitting', payload: true });
      yield delay(1000);
      const { msg, data, ok } = yield call(queryCurrent, account, password);
      if (!ok || !data) {
        yield put({ type: 'updateSubmitting', payload: false });
        message.error(msg);
        return;
      }
      const { msg: msg2, data: menus, ok: ok2 } = yield call(queryMenus, data.token);
      if (!ok2 || !menus) {
        yield put({ type: 'updateSubmitting', payload: false });
        message.error(msg2);
        return;
      }
      const result = l.flatMap(menus, it => [it.menuUrl, ...it.acSubMenuDTOList.map(sub => sub.menuUrlSub)]);
      // eslint-disable-next-line no-underscore-dangle
      data._menus = result;

      yield put({ type: 'updateSubmitting', payload: false });

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          redirect = null;
        }
      }

      const { remember } = yield select(state => state.login);
      yield all([
        put({ type: 'user/saveMenus', payload: result }),
        put({ type: 'user/saveCurrentUser', payload: data, remember }),
        put(routerRedux.replace(redirect || '/')),
      ]);
    },
  },
  reducers: {
    updateSubmitting(state, { payload: submitting }) {
      return { ...state, submitting };
    },

    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
