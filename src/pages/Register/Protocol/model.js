
export default {
  namespace: 'registerSuccess',
  state: {
    provinces: [],
    cities: [],
    list: [],
  },

  effects: {
    // *getOcc(_, { call, put }) {
    //   const { ok, msg, list } = yield call(getOcc);
    //   const occList = [...list, ...[{ id: -1, value: '其它' }]];
    //   if (!ok) {
    //     message.error(msg);
    //     return;
    //   }
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       list: occList,
    //     },
    //   });
    // },
  },

  reducers: {
  //   save(state, { payload }) {
  //     return {
  //       ...state,
  //       ...payload,
  //   };
  // },
  // saveProvince(state, { payload }) {
  //   return {
  //     ...state,
  //     ...payload,
  //   };
  // },
  // saveCity(state, { payload }) {
  //   return {
  //     ...state,
  //     ...payload,
  //   };
  // },
},
};
