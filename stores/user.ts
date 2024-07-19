import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  // 변수
  const getUserData = ref<any | undefined>();

  // 로그인
  const login = async (value: any) => {
    try {
      const result = await axios.post("/api/node/login", value);
      if (result.status == 200) {
        console.log(result.data.message);
        // window.open("/", "_self");
      }
      await fetchLogin();
    } catch (e) {
      console.log(e);
    }
  };

  // 로그인 성공 시 유지
  const fetchLogin = async () => {
    try {
      const result = await axios.get("/api/node/login/success");
      if (result.status == 200) {
        getUserData.value = result.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 로그아웃
  const logout = async () => {
    const result = await axios.post("/api/node/logout");
    if (result.status == 200) {
      getUserData.value = undefined;
      // window.open("/", "_self");
    }
  };

  return {
    getUserData,
    login,
    fetchLogin,
    logout,
  };
});
