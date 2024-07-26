<script setup lang="ts">
import axios from "axios";
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyButtonBlueButton,
  LazyTextAuthMessage,
  LazyTextAuthAccountChange,
} from "#components";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";
import { RegexCheck } from "@/composables/InputRole";

const props = defineProps<{
  accountToggle: () => void;
}>();

// 변수
const email = ref("");
const name = ref("");
const nickname = ref("");
const password = ref("");
const messages = ref({
  emailMessage: "",
  nameMessage: "",
  nicknameMessage: "",
  passwordMessage: "",
});

// 정규식 판단
const valueCheck = () => {
  let emailCheck = RegexCheck("email", email.value);
  let nameCheck = RegexCheck("name", name.value);
  let nicknameCheck = RegexCheck("nickname", nickname.value);
  let passwordCheck = password.value.length < 8 || password.value.length > 20;

  if (!emailCheck) {
    messages.value.emailMessage = "이메일 형식이 아닙니다. 다시 입력하세요.";
  } else {
    messages.value.emailMessage = "";
  }

  if (!nameCheck) {
    messages.value.nameMessage = "한글 or 영어만 입력하세요.";
  } else {
    messages.value.nameMessage = "";
  }

  if (!nicknameCheck) {
    messages.value.nicknameMessage = "한글 or 영어or 숫자만 입력하세요.";
  } else {
    messages.value.nicknameMessage = "";
  }

  if (passwordCheck) {
    messages.value.passwordMessage = "8자 이상 20자 이하로 입력하세요.";
  } else {
    messages.value.passwordMessage = "";
  }

  if (emailCheck && nameCheck && nicknameCheck && !passwordCheck) {
    return true;
  }
};

// 회원가입
const submit = async (e: any) => {
  e.preventDefault();

  if (valueCheck()) {
    const value = {
      email: email.value,
      name: name.value,
      nickname: nickname.value,
      password: password.value,
    };

    try {
      const result = await axios.post(`${API_FRONT_URL}/register`, value);
      if (result.status == 201) {
        alert(result.data.message);
        email.value = "";
        name.value = "";
        nickname.value = "";
        password.value = "";
        props.accountToggle();
      } else if (result.status == 202) {
        alert(result.data.message);
        email.value = "";
      }
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<template>
  <form method="post" @submit="submit">
    <div class="mb-5 flex flex-col">
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
      <LazyTextInputLabel is-for="name" title="이름" />
      <LazyFormInputItem
        type="text"
        id="name"
        :value="name"
        placeholder="이름 (한글, 영어 가능)"
        @update:inputValue="($event) => (name = $event.target.value)"
      />
      <LazyTextAuthMessage
        v-if="messages.nameMessage !== ''"
        :message="messages.nameMessage"
      />
    </div>
    <div class="mb-5">
      <LazyTextInputLabel is-for="nickname" title="닉네임" />
      <LazyFormInputItem
        type="text"
        id="nickname"
        :value="nickname"
        placeholder="닉네임 (한글, 영어, 숫자 가능)"
        @update:inputValue="($event) => (nickname = $event.target.value)"
      />
      <LazyTextAuthMessage
        v-if="messages.nicknameMessage !== ''"
        :message="messages.nicknameMessage"
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
      title="회원인가요?"
      button="로그인"
    />
    <LazyButtonBlueButton class="w-full" type="submit" title="회원가입" />
  </form>
</template>
