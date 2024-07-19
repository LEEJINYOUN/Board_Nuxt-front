<script setup lang="ts">
import axios from "axios";
import { LayoutFakeContainerLayout } from "#components";

// storage
const userStore = useUserStore();

// 변수
const userEmail = ref("");
const userName = ref("");
const userNickname = ref("");
const userPassword = ref("");

const loginEmail = ref("");
const loginPassword = ref("");

const getTest = userStore.getUserData;

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

// 로그아웃
const logout = async () => {
  await userStore.logout();
};

console.log(getTest);
</script>
<template>
  <LayoutFakeContainerLayout>
    <form method="post" @submit="submit">
      <input
        type="email"
        id="userEmail"
        name="userEmail"
        v-model="userEmail"
        @input="(e) => onChange(e)"
        placeholder="이메일"
        class="border border-gray-600"
      />
      <input
        type="text"
        id="userName"
        name="userName"
        v-model="userName"
        @input="(e) => onChange(e)"
        placeholder="이름"
        class="border border-gray-600"
      />
      <input
        type="text"
        id="userNickname"
        name="userNickname"
        v-model="userNickname"
        @input="(e) => onChange(e)"
        placeholder="닉네임"
        class="border border-gray-600"
      />
      <input
        type="password"
        id="userPassword"
        name="userPassword"
        v-model="userPassword"
        @input="(e) => onChange(e)"
        placeholder="비밀번호"
        class="border border-gray-600"
      />
      <input type="submit" value="회원가입" class="cursor-pointer" />
    </form>
    <form method="post" @submit="loginSubmit">
      <input
        type="email"
        id="loginEmail"
        name="loginEmail"
        v-model="loginEmail"
        @input="(e) => loginOnChange(e)"
        placeholder="이메일"
        class="border border-gray-600"
      />

      <input
        type="password"
        id="loginPassword"
        name="loginPassword"
        v-model="loginPassword"
        @input="(e) => loginOnChange(e)"
        placeholder="비밀번호"
        class="border border-gray-600"
      />
      <input type="submit" value="로그인" class="cursor-pointer" />
    </form>
    <h1 v-if="getTest !== undefined">{{ getTest.email }}</h1>
    <div>
      <button @click="logout">로그아웃</button>
    </div>
  </LayoutFakeContainerLayout>
</template>
