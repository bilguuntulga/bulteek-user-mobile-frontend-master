import request from "../utils/request";

export const login = (data) => request.post("/api/auth/check/login", data);

export const signup = (data) => request.post("/api/auth/check/signup", data);
export const passwordForget = (data) =>
  request.post("/api/auth/check/password_forget", data);
export const passwordChange = (data) =>
  request.post("/api/auth/check/password_change", data);

export const me = () => request.get("/api/auth/me");
export const get_username = () => request.get("/api/auth/check/get_username");
export const profile_change = (data) =>
  request.post("/api/auth/profile_change", data);

export const authPasswordChange = (data) =>
  request.post("/api/auth/passwordChange", data);
export const logout = (data) => request.post("/api/auth/logout", data);

export const profile_images = (data, options) =>
  request.get("/api/auth/user/profile_images", data, options);
  export const socials_login = (data) => request.post("/api/auth/check/socials_login", data);
