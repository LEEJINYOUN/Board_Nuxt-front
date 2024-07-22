<script setup lang="ts">
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyButtonBlueButton,
} from "#components";

defineProps<{
  accountToggle: () => void;
}>();

// storage
const userStore = useUserStore();

// 변수
const loginEmail = ref("");
const loginPassword = ref("");

// 로그인 input 변경
const loginOnChange = (e: any) => {
  const { name, value } = e.target;

  if (name == "loginEmail") {
    loginEmail.value = value;
  } else if (name == "loginPassword") {
    loginPassword.value = value;
  }
};

// 로그인
const loginSubmit = async (e: any) => {
  e.preventDefault();

  await userStore.login({
    email: loginEmail.value,
    password: loginPassword.value,
  });
};
</script>
<template>
  <form method="post" @submit="loginSubmit">
    <div class="mb-5">
      <LazyTextInputLabel is-for="loginEmail" title="이메일" />
      <LazyFormInputItem
        type="email"
        id="loginEmail"
        :value="loginEmail"
        placeholder="이메일"
      />
    </div>
    <div class="mb-5">
      <LazyTextInputLabel is-for="loginPassword" title="비밀번호" />
      <LazyFormInputItem
        type="password"
        id="loginPassword"
        :value="loginPassword"
        placeholder="비밀번호"
      />
    </div>
    <div class="my-5 flex items-center text-center gap-5 text-sm">
      <span>회원이 아닌가요?</span>
      <span
        class="text-red-500 hover:text-red-700 cursor-pointer"
        @click="accountToggle"
        >회원가입</span
      >
    </div>
    <LazyButtonBlueButton class="w-full" type="submit" title="로그인" />
  </form>
</template>
