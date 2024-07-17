<script setup lang="ts">
import axios from "axios";

// 변수
const router = useRouter();
const route = useRoute();
const paramsId = route.params.id;
const postsData = ref<any | undefined>();

// 특정 데이터 가져오기
const getApiData = async () => {
  try {
    const result = await axios.get(`/api/node/posts/${paramsId}`);
    if (result.status == 200) {
      postsData.value = result.data.results[0];
    }
  } catch (e) {
    console.log(e);
  }
};

// 글수정 페이지 이동
const gotoEdit = () => {
  router.push(`/edit/${paramsId}`);
};

// 데이터 삭제
const postDelete = async (id: number) => {
  try {
    const result = await axios.delete(`/api/node/posts/${id}`);
    if (result.status == 200) {
      router.push(`/`);
    }
  } catch (e) {
    console.log(e);
  }
};

const goToBack = () => {
  router.push("/");
};

onMounted(() => {
  getApiData();
});
</script>
<template>
  <div>
    <h1>글읽기 페이지</h1>
    <div v-if="postsData !== undefined">
      <div>번호 : {{ postsData.id }}</div>
      <div>작성자 : {{ postsData.writer }}</div>
      <div>제목 : {{ postsData.title }}</div>
      <div>내용 : {{ postsData.content }}</div>
      <div class="flex gap-4">
        <button @click="gotoEdit">수정</button>
        <button @click="() => postDelete(postsData.id)">삭제</button>
        <button @click="goToBack">돌아가기</button>
      </div>
    </div>
  </div>
</template>
