<script setup lang="ts">
import axios from "axios";
import { LayoutFakeContainerLayout } from "#components";

const userEmail = ref("");
const userName = ref("");
const userNickname = ref("");
const userPassword = ref("");

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
    if (result.status == 201) {
      console.log(result.data.message);
      userEmail.value = "";
      userName.value = "";
      userNickname.value = "";
      userPassword.value = "";
    }
  } catch (e) {
    console.log(e);
  }
};
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
      <input type="submit" value="저장" class="cursor-pointer" />
    </form>
  </LayoutFakeContainerLayout>
</template>
