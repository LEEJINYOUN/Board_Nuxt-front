import axios from "axios";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";

export default defineNuxtRouteMiddleware((to, from) => {
  const toId = to.params.id;
  const userStore = useUserStore();

  axios
    .get(`${API_FRONT_URL}/posts/${toId}`)
    .then((res) => isLoggedIn(res.data.results[0].writer));

  const isLoggedIn = (writer: string) => {
    if (userStore.getUserData && userStore.getUserData.nickname !== writer) {
      navigateTo("/");
    }
  };
});
