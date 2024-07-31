import { defineStore } from "pinia";
import AuthApi from "~/composables/rest/auth/AuthApi";

export const useUserStore = defineStore("user", () => {
  // 변수
  const getUserData = ref<any | undefined>();

  // 로그인
  const login = async (value: any) => {
    try {
      const result = AuthApi.login(value);
      if ((await result).status == 200) {
        alert((await result).data.message);
        window.location.replace("/");
        await fetchLogin();
      } else if ((await result).status == 202) {
        alert((await result).data.message);
      }
    } catch (e) {
      alert("회원이 아닙니다. 회원가입을 진행하세요.");
      console.log(e);
    }
  };

  // 로그인 성공 시 유지
  const fetchLogin = async () => {
    try {
      const result = AuthApi.fetchLogin();
      if ((await result).status == 200) {
        getUserData.value = (await result).data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 로그아웃
  const logout = async () => {
    const result = AuthApi.logout();
    if ((await result).status == 200) {
      getUserData.value = undefined;
      window.location.replace("/login");
    }
  };

  return {
    getUserData,
    login,
    fetchLogin,
    logout,
  };
});
