import { message } from 'antd';
import { queryCurrent, query as queryUsers, followUser } from '@/services/user';
import { jsonParse, jsonStringify } from '@/utils/utils';

const userKey = 'app-user';

function loadUser() {
  try {
    return jsonParse(localStorage.getItem(userKey) || sessionStorage.getItem(userKey) || '{}') || {};
  } catch (e) {
    return {};
  }
}

function storeUser(user, remember) {
  let storage;
  if (typeof remember !== 'boolean') {
    storage = localStorage.getItem(userKey) ? localStorage : sessionStorage;
  } else {
    storage = remember ? localStorage : sessionStorage;
  }
  if (user) {
    const exist = loadUser();
    storage.setItem(userKey, jsonStringify({ ...exist, ...user }));
  } else {
    localStorage.removeItem(userKey);
    sessionStorage.removeItem(userKey);
  }
}

function storeRegisterUser(user) {
  localStorage.setItem(userKey, jsonStringify({ ...user }));
}

function initState() {
  const user = loadUser();
  // eslint-disable-next-line no-underscore-dangle
  let menus = user._menus;
  if (!menus) {
    menus = ['home'];
  }
  return {
    currentUser: user,
    authorizedMenus: menus,
  };
}

const UserModel = {
  namespace: 'user',
  state: initState(),
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *saveToken({ payload }, { put, select }) {
      const { currentUser } = yield select(state => state.user);
      yield put({
        type: 'saveCurrentUser',
        payload: { ...currentUser, token: payload },
      });
    },

    *follow({ userId, isFollow }, { call }) {
      const { ok } = yield call(followUser, userId, isFollow);
      if (!ok) {
        if (isFollow) {
          message.error('关注操作失败');
        } else {
          message.error('取消关注操作失败');
        }
        return {
          isFollow,
          ok,
        };
      }
      if (isFollow) {
        message.success('关注成功');
      } else {
        message.success('取消关注成功');
      }
      return {
        isFollow,
        ok,
      };
    },
  },
  reducers: {
    saveUser(state, { payload }) {
      storeRegisterUser(payload);
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    saveCurrentUser(state, { payload, remember }) {
      storeUser(payload, remember);
      return {
        ...state,
        currentUser: payload || {},
      };
    },

    saveMenus(state, { payload }) {
      return {
        ...state,
        authorizedMenus: payload,
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
