export default defineNuxtRouteMiddleware((to, from) => {
  // storage
  const userStore = useUserStore();

  if (!userStore.getUserData) {
    return navigateTo("/login");
  }
});
