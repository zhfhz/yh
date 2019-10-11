import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';
import Authorized from '@/utils/Authorized';
import { isLogin } from '@/utils/authority';

const errorPath = '/exception/404';
const ignorePaths = [errorPath, '/'];
const getRouteAuthority = (path, routeData, authorizedMenus) => {
  if (ignorePaths.includes(path)) return true;
  let authorities = false;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // 匹配路由，通过路径找到route
      const origins = route.path.split('/');
      const paths = path.split('/');
      const differs = _.zip(origins, paths).filter(([a, b]) =>
        (a && a.startsWith(':') ? false : a !== b),
      );
      if (differs.length === 0) {
        if (authorizedMenus) {
          const needExact = route.menuKey.split('.').length <= 2;
          authorities = _.some(authorizedMenus, it =>
            (needExact ? it === route.menuKey : route.menuKey.startsWith(it)),
          );
        } else {
          authorities = false;
        }
      }

      if (route.routes) {
        // get children authority recursively
        authorities = getRouteAuthority(path, route.routes, authorizedMenus) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser, authorizedMenus } = user;
  // const logged = isLogin(currentUser);
  const logged = true;
  const { routes = [] } = route;
  let redirect = errorPath;
  if (!logged) {
    redirect = '/login';
  }
  return (
    <Authorized
      authority={logged && getRouteAuthority(location.pathname, routes, authorizedMenus)}
      noMatch={<Redirect to={redirect} />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
