import axios from "axios";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";

// 회원가입
const register = async (value: object) => {
  return await axios.post(`${API_FRONT_URL}/register`, value);
};

// 로그인
const login = async (value: object) => {
  return await axios.post(`${API_FRONT_URL}/login`, value);
};

// 로그인 성공 시 유지
const fetchLogin = async () => {
  return await axios.get(`${API_FRONT_URL}/login/success`);
};

// 로그아웃
const logout = async () => {
  return await axios.post(`${API_FRONT_URL}/logout`);
};

export default { register, login, fetchLogin, logout };
