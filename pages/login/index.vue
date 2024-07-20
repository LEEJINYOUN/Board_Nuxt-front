<script setup lang="ts">
import axios from "axios";
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyButtonBlueButton,
} from "#components";

definePageMeta({
  layout: "navbar",
});

// storage
const userStore = useUserStore();

// 변수
const loginEmail = ref("");
const loginPassword = ref("");

const userEmail = ref("");
const userName = ref("");
const userNickname = ref("");
const userPassword = ref("");

const isAccount = ref(false);

const accountToggle = () => {
  isAccount.value = isAccount.value == false;
};

// input 변경
const onChange = (e: any) => {
  const { name, value } = e.target;
  if (name == "email") {
    userEmail.value = value;
  } else if (name == "name") {
    userName.value = value;
  } else if (name == "nickname") {
    userNickname.value = value;
  } else if (name == "password") {
    userPassword.value = value;
  }
};

// 회원가입
const submit = async (e: any) => {
  e.preventDefault();

  const value = {
    email: userEmail.value,
    name: userName.value,
    nickname: userNickname.value,
    password: userPassword.value,
  };

  try {
    const result = await axios.post("/api/node/register", value);
    console.log(result.data.message);
    if (result.status == 201) {
      userEmail.value = "";
      userName.value = "";
      userNickname.value = "";
      userPassword.value = "";
    }
  } catch (e) {
    console.log(e);
  }
};

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
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <div class="w-5/6 md:w-3/6 m-auto bg-white px-5 py-10 rounded-lg">
      <div class="flex justify-center items-center font-semibold text-xl my-5">
        {{ isAccount == false ? "로그인" : "회원가입" }}
      </div>
      <form v-if="isAccount == false" method="post" @submit="loginSubmit">
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
      <form v-if="isAccount == true" method="post" @submit="submit">
        <div class="mb-5">
          <LazyTextInputLabel is-for="userEmail" title="이메일" />
          <LazyFormInputItem
            type="email"
            id="userEmail"
            :value="userEmail"
            placeholder="이메일"
          />
        </div>
        <div class="mb-5">
          <LazyTextInputLabel is-for="userName" title="이름" />
          <LazyFormInputItem
            type="text"
            id="userName"
            :value="userEmail"
            placeholder="이름"
          />
        </div>
        <div class="mb-5">
          <LazyTextInputLabel is-for="userNickname" title="닉네임" />
          <LazyFormInputItem
            type="text"
            id="userNickname"
            :value="userNickname"
            placeholder="닉네임"
          />
        </div>
        <div class="mb-5">
          <LazyTextInputLabel is-for="userPassword" title="비밀번호" />
          <LazyFormInputItem
            type="password"
            id="userPassword"
            :value="userPassword"
            placeholder="비밀번호"
          />
        </div>
        <div class="my-5 flex items-center text-center gap-5 text-sm">
          <span>회원인가요?</span>
          <span
            class="text-red-500 hover:text-red-700 cursor-pointer"
            @click="accountToggle"
            >로그인</span
          >
        </div>
        <LazyButtonBlueButton class="w-full" type="submit" title="회원가입" />
      </form>
    </div>
  </div>
</template>
