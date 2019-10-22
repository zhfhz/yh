import mixinDeep from 'mixin-deep';
import { BANNER_CONFIG, getBannerData } from '@/services/global';

function BaseCreate () {
    const Base = {
        state: {
          queryParams: {
              categoryId: '',
              sort: '',
              pageIndex: 1,
              pageSize: '30',
          },
          pageTotal: 0,
          pageSizeOptions: [
              '10',
              '20',
              '30',
              '40',
              '50',
          ],
          dataList: [],
          catelogData: [],
          bannerData: [],
          sortOptions: [
              {
                  text: '综合排序',
                  value: '1',
                  checked: true,
              },
              {
                  text: '最新上线',
                  value: '2',
              },
              {
                  text: '人气最高',
                  value: '3',
              },
          ],
        },

        effects: {
          *fetchDataList () {
              yield null;
              throw new Error('fetchDataList 还没有实现');
          },
          *fetchCatelogData () {
              yield null;
              throw new Error('fetchCatelogData 还没有实现');
          },
          *fetchBannerData (_, { put }) {
              const { data: { list } } = yield getBannerData(BANNER_CONFIG[Base.namespace]);
              yield put({
                type: 'save',
                payload: {
                  bannerData: list.map(item => ({ text: item.dataName, value: item.dataId })),
                },
              });
            },
          *fetchSortOptions () {
              yield null;
              throw new Error('fetchSortOptions 还没有实现');
          },
          *changeParams ({ payload, type }, { select, put }) {
              const params = yield select(state => state[type.split('/')[0]].queryParams);
              // yield put({
              //     type: 'save',
              //     payload: {
              //         queryParams: {
              //             ...params,
              //             ...payload,
              //         },
              //     },
              // });
              // yield take('save/@@end')

              yield put({
                  type: 'fetchDataList',
                  payload: {
                      queryParams: {
                          ...params,
                          ...payload,
                      },
                  },
              })
          },
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
      return Base;
}

export default function (target) {
    const Base = BaseCreate();
    Base.namespace = target.namespace;
    target.state = target.state || {};
    target.effects = target.effects || {};
    target.reducers = target.reducers || {};
    mixinDeep(target.state, Base.state);
    mixinDeep(target.state, Base.state);
    Object.keys(Base.effects).forEach(key => {
        if (!target.effects[key]) {
            target.effects[key] = Base.effects[key];
        }
    })
    Object.keys(Base.reducers).forEach(key => {
        if (!target.reducers[key]) {
            target.reducers[key] = Base.reducers[key];
        }
    });
    return target;
}
