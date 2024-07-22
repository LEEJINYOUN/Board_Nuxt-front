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
const route = useRoute();
const paramsId = route.params.id;
const title = ref("");
const content = ref("");

// 특정 게시물 불러오기
const getApiData = async () => {
  try {
    const result = await axios.get(`/api/node/posts/${paramsId}/edit`);

    if (result.status == 200) {
      title.value = result.data.results[0].title;
      content.value = result.data.results[0].content;
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 게시물 업데이트
const shoesUpdate = async (e: any) => {
  e.preventDefault();

  const value = {
    title: title.value,
    content: content.value,
  };

  try {
    const result = await axios.patch(`/api/node/posts/${paramsId}`, value);
    if (result.status == 200) {
      router.push(`/read/${paramsId}`);
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getApiData();
});
</script>
<template>
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <form class="w-2/3 m-auto" method="post" @submit="shoesUpdate">
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
      <LazyButtonBlueButton type="submit" title="수정하기" />
    </form>
  </div>
</template>
