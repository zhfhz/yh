export const CenterRoute = {
  get Work() { return 0; },
  get Fans() { return 1; },
  get Follow() { return 2; },
  get Favorite() { return 3; },
  get Msg() { return 4; },
}

export const PersonalRoute = {
  get Info() { return 0; },
  get Security() { return 1; },
  get Authority() { return 2; },
}

export const VerifyState = {
  get VERIFYING() { return 0; },
  get PASSED() { return 1; },
  get REFUSED() { return 2; },
}

export const UserType = {
  get NORMAL() { return 6; },
  get DESIGNER() { return 7; },
}

export const FollowState = {
  get NO() { return 1; },
  get YES() { return 0; },
}

// 是否申请版权保护
export const CopyrightProtect = {
  get NO() { return 0; },
  get YES() { return 1; },
}

export const CopyrightType = {
  get COMMERCIAL() { return 1; }, // 可直接商用
  get NO() { return 2; }, // 仅可演示，不可商用
  get BUY_COMMERCIAL() { return 3; }, // 需购买版权，可商用
}

export const FollowTabType = {
  get Fans() { return 1; },
  get Follow() { return 2; },
}

export const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 0,
  },
};
