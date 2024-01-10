export type tPostLogin = {
  email: string;
  password: string;
};

export type tPostSignup = {
  email: string;
  password: string;
  username: string;
};

export type tPostUpdatePassword = {
  newPassword: string;
};

export type tPostUpdateUsername = {
  username: string;
};

export type tPostVerifyPassword = {
  password: string;
};
