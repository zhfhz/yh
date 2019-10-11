import slash from 'slash2';
import px2rem from 'postcss-plugin-px2rem';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import themeVars from './theme';
import webpackPlugin from './plugin.config';

const { pwa, primaryColor } = defaultSettings; // 用于表示是否开启 yapi 调试的环境变量，on 表示开启

const { YAPI = 'none', BASE_URL = '' } = process.env;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];
export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/umijs/umi-blocks',
  },
  hash: false,
  targets: {
    ie: 11,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/center',
      component: '../layouts/CommonLayout',
      routes: [
        {
          name: 'designercenter',
          path: '/center/designercenter',
          routes: [
            {
              name: 'designercenter',
              path: '/center/designercenter/home',
              component: './DesignerCenter',
              routes: [
                {
                  component: './DesignerCenter/CenterPages/Works',
                },
                {
                  component: './DesignerCenter/CenterPages/Fans',
                },
                {
                  component: './DesignerCenter/CenterPages/Follow',
                },
                {
                  component: './DesignerCenter/CenterPages/Favorite',
                },
                {
                  component: './DesignerCenter/CenterPages/Msg',
                },
              ],
            },
            {
              name: 'personalcenter',
              path: 'personal',
              component: './DesignerCenter/PersonalCenter',
              routes: [
                {
                  component: './DesignerCenter/PersonalCenterPages/BasicInfo',
                },
                {
                  component: './DesignerCenter/PersonalCenterPages/Security',
                },
                {
                  component: './DesignerCenter/PersonalCenterPages/Authentication',
                },
              ],
            },
            {
              name: 'uploadwork',
              path: 'uploadwork',
              component: './DesignerCenter/UploadWork',
            },
            {
              component: './404',
            },
          ],
        },
        {
          name: 'brandcenter',
          path: '/center/brandcenter',
          component: './BrandCenter',
          routes: [
            {
              name: 'home',
              path: '/center/brandcenter/home',
              component: './BrandCenter/Home',
            },
            {
              name: 'commodity',
              path: '/center/brandcenter/commodity',
              component: './BrandCenter/Commodity',
              routes: [
                {
                  name: 'add',
                  path: '/center/brandcenter/commodity/add',
                  component: './BrandCenter/Commodity/Mutation',
                },
                {
                  name: 'edit',
                  path: '/center/brandcenter/commodity/edit/:id',
                  component: './BrandCenter/Commodity/Mutation',
                },
                {
                  name: 'detail',
                  path: '/center/brandcenter/commodity/detail/:id',
                  component: './BrandCenter/Commodity/Detail',
                },
              ],
            },
            {
              name: 'order',
              path: '/center/brandcenter/order',
              component: './BrandCenter/Order',
            },
            {
              name: 'finance',
              path: '/center/brandcenter/finance',
              component: './BrandCenter/Finance',
              routes: [
                {
                  name: 'draw',
                  path: '/center/brandcenter/finance/draw',
                  component: './BrandCenter/Finance/Draw',
                },
                {
                  name: 'tax',
                  path: '/center/brandcenter/finance/tax',
                  component: './BrandCenter/Finance/Tax',
                },
                {
                  name: 'withdraw',
                  path: '/center/brandcenter/finance/withdraw',
                  component: './BrandCenter/Finance/Withdraw',
                },
              ],
            },
            {
              name: 'freight',
              path: '/center/brandcenter/freight',
              component: './BrandCenter/Freight',
              routes: [
                {
                  name: 'add',
                  path: '/center/brandcenter/freight/add',
                  component: './BrandCenter/Freight/Mutation',
                },
                {
                  name: 'edit',
                  path: '/center/brandcenter/freight/edit/:id',
                  component: './BrandCenter/Freight/Mutation',
                },
              ],
            },
            {
              name: 'material',
              path: '/center/brandcenter/material',
              component: './BrandCenter/Material',
            },
            {
              name: 'registermaterial',
              path: '/center/brandcenter/registermaterial',
              component: './BrandCenter/RegisterMaterial',
            },
            {
              name: 'config',
              path: '/center/brandcenter/config',
              component: './BrandCenter/Config',
            },
            {
              component: './404',
            },
          ],
        },
        {
          name: 'message',
          path: '/center/message',
          component: './Message',
        },
        {
          component: './404',
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: '../layouts/CommonLayout',
      routes: [
        {
          name: 'login',
          path: '/login',
          component: './Login',
        },
        {
          name: 'login',
          path: '/login/forget',
          component: './Login/Forget',
        },
      ],
    },

    {
      name: 'register',
      path: '/register',
      component: '../layouts/CommonLayout',
      routes: [
        {
          name: 'register',
          path: '/register',
          component: './Register',
        },
        {
          name: 'complete',
          path: '/register/complete',
          component: './Register/Complete',
        },
        {
          name: 'success',
          path: '/register/success',
          component: './Register/Success',
        },
        {
          name: 'protocol',
          path: '/register/protocol',
          component: './Register/Protocol',
        },
        {
          name: 'auditing',
          path: '/register/auditing',
          component: './Register/Auditing',
        },
        {
          name: 'reject',
          path: '/register/reject',
          component: './Register/Reject',
        },
      ],
    },
    {
      path: '/',
      menuKey: 'main',
      component: '../layouts/MenuLayout',
      routes: [
        {
          menuKey: 'home',
          name: 'home',
          path: '/',
          icon: 'home',
          component: './home',
        },
        {
          name: 'production',
          menuKey: 'production',
          path: '/production',
          routes: [
            {
              name: 'index',
              path: '/production',
              component: './Production',
            },
            {
              name: 'detail',
              path: 'detail/:id',
              component: './Production/Detail',
            },
            {
              component: './404',
            },
          ],
        },
        {
          name: 'designer',
          menuKey: 'designer',
          path: '/designer',
          routes: [
            {
              name: 'designer',
              path: '/designer',
              component: './Designer',
            },
            {
              name: 'designerhome',
              // 此路由组件指向中心组件，属于复用组件
              path: '/designer/designerhome',
              component: './DesignerCenter',
            },
            {
              component: './404',
            },
          ],
        },
        {
          name: 'brand',
          menuKey: 'brand',
          path: '/brand',
          component: './Brand',
        },
        {
          name: 'search',
          path: '/search',
          component: './Search',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    YAPI,
    BASE_URL,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
    globalVars: themeVars,
  },
  extraPostCSSPlugins: [
    // https://www.npmjs.com/package/postcss-plugin-px2rem
    // px2rem({
    //   rootValue: 10,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
    //   // propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size'],//这些属性不需要转换
    //   // selectorBlackList:['t_npx']//以包含t_npx的class不需要转换
    // })
  ],
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: './',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/yapi': {
      target: 'http://yapi.emake.cn/mock/53',
      changeOrigin: true,
      pathRewrite: {
        '^/yapi': '',
      },
    },
  },
};
