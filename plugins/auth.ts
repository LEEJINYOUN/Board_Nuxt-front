export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  if (!userStore.getUserData) {
    await userStore.fetchLogin();
  }
});
