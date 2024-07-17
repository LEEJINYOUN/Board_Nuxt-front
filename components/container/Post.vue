<script setup lang="ts">
import axios from "axios";
import { LayoutFakeContainerLayout } from "#components";

// 변수
const postsData = ref<any[] | undefined>();
const title = ref("");
const content = ref("");
const isEdit = ref(false);
const editId = ref();

// 데이터 가져오기
const getApiData = async () => {
  try {
    const result = await axios.get(`/api/node/posts`);
    postsData.value = result.data.results;
  } catch (e) {
    console.log(e);
  }
};

// input 변경
const onChange = (e: any) => {
  const { name, value } = e.target;

  if (name == "title") {
    title.value = value;
  } else if (name == "content") {
    content.value = value;
  }
};

// 데이터 저장
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
      getApiData();
      title.value = "";
      content.value = "";
    }
  } catch (e) {
    console.log(e);
  }
};

// 데이터 수정모드
const postEdit = async (id: number) => {
  try {
    isEdit.value = true;
    const result = await axios.get(`/api/node/posts/${id}/edit`);

    if (result.status == 200) {
      title.value = result.data.results[0].title;
      content.value = result.data.results[0].content;
      editId.value = result.data.results[0].id;
    }
  } catch (e) {
    console.log(e);
  }
};

// 데이터 업데이트
const shoesUpdate = async (e: any) => {
  e.preventDefault();

  const value = {
    title: title.value,
    content: content.value,
  };

  try {
    const result = await axios.patch(`/api/node/posts/${editId.value}`, value);
    if (result.status == 200) {
      getApiData();
      isEdit.value = false;
      title.value = "";
      content.value = "";
    }
  } catch (e) {
    console.log(e);
  }
};

// 데이터 삭제
const postDelete = async (id: number) => {
  try {
    const result = await axios.delete(`/api/node/posts/${id}`);
    if (result.status == 200) {
      getApiData();
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
  <LayoutFakeContainerLayout>
    <h1 class="text-xl font-bold">게시물 컨테이너</h1>
    <form v-if="isEdit == false" method="post" @submit="submit">
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
    <form v-if="isEdit == true" method="post" @submit="shoesUpdate">
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
    <div
      v-for="(item, key) in postsData"
      :key="key"
      class="divide-y-2 divide-orange-500 flex gap-4"
    >
      <div>번호 : {{ item.id }}</div>
      <div>작성자 : {{ item.writer }}</div>
      <div>제목 : {{ item.title }}</div>
      <div>내용 : {{ item.content }}</div>
      <div class="flex gap-4">
        <button @click="() => postEdit(item.id)">수정</button>
        <button @click="() => postDelete(item.id)">삭제</button>
      </div>
    </div>
  </LayoutFakeContainerLayout>
</template>
