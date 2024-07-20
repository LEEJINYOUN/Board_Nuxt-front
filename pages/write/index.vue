<script setup lang="ts">
import axios from "axios";
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyFormTextareaItem,
  LazyButtonBlueButton,
} from "#components";

definePageMeta({
  layout: "navbar",
});

// 변수
const router = useRouter();
const title = ref("");
const content = ref("");

// input 변경
const onChange = (e: any) => {
  const { name, value } = e.target;

  if (name == "title") {
    title.value = value;
  } else if (name == "content") {
    content.value = value;
  }
};

// 게시물 저장
const submit = async (e: any) => {
  e.preventDefault();

  const value = {
    writer: "user2",
    title: title.value,
    content: content.value,
  };

  try {
    const result = await axios.post("/api/node/posts", value);
    if (result.status == 201) {
      router.push("/");
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
        />
      </div>
      <div class="mb-5">
        <LazyTextInputLabel is-for="content" title="내용" />
        <LazyFormTextareaItem
          id="content"
          :value="content"
          placeholder="내용"
        />
      </div>
      <LazyButtonBlueButton type="submit" title="작성하기" />
    </form>
  </div>

  <!-- <div>
    <h1>글쓰기 페이지</h1>
    <form method="post" @submit="submit">
      <input
        type="text"
        id="title"
        name="title"
        v-model="title"
        @input="(e) => onChange(e)"
        placeholder="제목"
        class="border border-gray-600"
      />
      <input
        type="text"
        id="content"
        name="content"
        v-model="content"
        @input="(e) => onChange(e)"
        placeholder="내용"
        class="border border-gray-600"
      />
      <input type="submit" value="저장" class="cursor-pointer" />
    </form>
  </div> -->
</template>
