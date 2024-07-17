<script setup lang="ts">
import { LazyContainerUser } from "#components";
import axios from "axios";

// 변수
const router = useRouter();
const postsData = ref<any[] | undefined>();

// 데이터 가져오기
const getApiData = async () => {
  try {
    const result = await axios.get(`/api/node/posts`);
    postsData.value = result.data.results;
  } catch (e) {
    console.log(e);
  }
};

// 글쓰기 페이지 이동
const goToWrite = () => {
  router.push("/write");
};

// 글읽기 페이지 이동
const goToRead = (id: number) => {
  router.push(`/read/${id}`);
};

onMounted(() => {
  getApiData();
});
</script>
<template>
  <div>
    <LazyContainerUser />
    <button @click="goToWrite">글쓰기</button>
    <div
      v-for="(item, key) in postsData"
      :key="key"
      class="divide-y-2 divide-orange-500 flex gap-4"
    >
      <div>번호 : {{ item.id }}</div>
      <div>작성자 : {{ item.writer }}</div>
      <div class="cursor-pointer" @click="goToRead(item.id)">
        제목 : {{ item.title }}
      </div>
      <div>내용 : {{ item.content }}</div>
    </div>
  </div>
</template>
