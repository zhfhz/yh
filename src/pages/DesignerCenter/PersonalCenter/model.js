export default {
  namespace: 'designerPersonalCenter',
  state: {
    tabSelectIndex: 0,
  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
