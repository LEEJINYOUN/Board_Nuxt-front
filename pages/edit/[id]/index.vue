<script setup lang="ts">
import axios from "axios";

// 변수
const router = useRouter();
const route = useRoute();
const paramsId = route.params.id;
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
  <div>
    <h1>수정 페이지</h1>
    <form method="post" @submit="shoesUpdate">
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
      <input type="submit" value="수정하기" class="cursor-pointer" />
    </form>
  </div>
</template>
