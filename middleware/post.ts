import axios from "axios";

export default defineNuxtRouteMiddleware((to, from) => {
  const toId = to.params.id;
  const userStore = useUserStore();

  axios
    .get(`/api/node/posts/${toId}`)
    .then((res) => isLoggedIn(res.data.results[0].writer));

  const isLoggedIn = (writer: string) => {
    if (userStore.getUserData && userStore.getUserData.nickname !== writer) {
      navigateTo("/");
    }
  };
});
