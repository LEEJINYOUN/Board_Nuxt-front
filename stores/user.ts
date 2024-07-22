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
        alert(result.data.message);
        window.location.replace("/");
        await fetchLogin();
      } else if (result.status == 202) {
        alert(result.data.message);
      }
    } catch (e) {
      alert("회원이 아닙니다. 회원가입을 진행하세요.");
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
