export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.getUserData) {
    return navigateTo("/login");
  }
});
