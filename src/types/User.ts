export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type InitialUserState = {
  user: null | string;
  token: null | string;
  refreshToken: null | string;
  loading: boolean;
  success: boolean;
  error: null | string;
};
