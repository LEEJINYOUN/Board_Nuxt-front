<script setup lang="ts">
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyButtonBlueButton,
  LazyTextAuthMessage,
  LazyTextAuthAccountChange,
} from "#components";
import { RegexCheck } from "@/composables/InputRole";

defineProps<{
  accountToggle: () => void;
}>();

// storage
const userStore = useUserStore();

// 변수
const email = ref("");
const password = ref("");
const messages = ref({
  emailMessage: "",
  passwordMessage: "",
});

// 정규식 판단
const valueCheck = () => {
  let emailCheck = RegexCheck("email", email.value);
  let passwordCheck = password.value.length < 8 || password.value.length > 20;

  if (!emailCheck) {
    messages.value.emailMessage = "이메일 형식이 아닙니다. 다시 입력하세요.";
  } else {
    messages.value.emailMessage = "";
  }

  if (passwordCheck) {
    messages.value.passwordMessage = "8자 이상 20자 이하로 입력하세요.";
  } else {
    messages.value.passwordMessage = "";
  }

  if (emailCheck && !passwordCheck) {
    return true;
  }
};

// 로그인
const login = async (e: any) => {
  e.preventDefault();

  if (valueCheck()) {
    await userStore.login({
      email: email.value,
      password: password.value,
    });
  }
};
</script>
<template>
  <form method="post" @submit="login">
    <div class="mb-5">
      <LazyTextInputLabel is-for="email" title="이메일" />
      <LazyFormInputItem
        type="email"
        id="email"
        :value="email"
        placeholder="이메일"
        @update:inputValue="($event) => (email = $event.target.value)"
      />
      <LazyTextAuthMessage
        v-if="messages.emailMessage !== ''"
        :message="messages.emailMessage"
      />
    </div>
    <div class="mb-5">
      <LazyTextInputLabel is-for="password" title="비밀번호" />
      <LazyFormInputItem
        type="password"
        id="password"
        :value="password"
        placeholder="비밀번호 (8자 이상 12자 이하)"
        @update:inputValue="($event) => (password = $event.target.value)"
      />
      <LazyTextAuthMessage
        v-if="messages.passwordMessage !== ''"
        :message="messages.passwordMessage"
      />
    </div>
    <LazyTextAuthAccountChange
      :accountToggle="accountToggle"
      title="회원이 아닌가요?"
      button="회원가입"
    />
    <LazyButtonBlueButton class="w-full" type="submit" title="로그인" />
  </form>
</template>
