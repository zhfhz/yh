import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { isLogin } from '@/utils/authority';

const UnauthorizedComponent = ({
  children,
  user,
}) => {
  const { currentUser } = user;
  return (
    <Authorized
      authority={!isLogin(currentUser)}
      noMatch={<Redirect to="/" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }) => ({
  user,
}))(UnauthorizedComponent);
