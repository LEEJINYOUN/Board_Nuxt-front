<script setup lang="ts">
import axios from "axios";
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyFormTextareaItem,
  LazyButtonBlueButton,
} from "#components";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";

definePageMeta({
  layout: "navbar",
  middleware: ["auth-user"],
});

// storage
const userStore = useUserStore();

// 변수
const title = ref("");
const content = ref("");

// 게시물 저장
const submit = async (e: any) => {
  e.preventDefault();

  const value = {
    writer: userStore.getUserData.nickname,
    title: title.value,
    content: content.value,
  };

  try {
    const result = await axios.post(`${API_FRONT_URL}/posts`, value);
    if (result.status == 201) {
      window.location.replace("/");
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <form class="w-2/3 m-auto" method="post" @submit="submit">
      <div class="mb-5">
        <LazyTextInputLabel is-for="title" title="제목" />
        <LazyFormInputItem
          type="text"
          id="title"
          :value="title"
          placeholder="제목"
          @update:inputValue="($event) => (title = $event.target.value)"
        />
      </div>
      <div class="mb-5">
        <LazyTextInputLabel is-for="content" title="내용" />
        <LazyFormTextareaItem
          id="content"
          :value="content"
          placeholder="내용"
          @update:textareaValue="($event) => (content = $event.target.value)"
        />
      </div>
      <LazyButtonBlueButton type="submit" title="작성하기" />
    </form>
  </div>
</template>
