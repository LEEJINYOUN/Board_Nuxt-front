<script setup lang="ts">
import axios from "axios";

// 변수
const router = useRouter();
const route = useRoute();
const paramsId = route.params.id;
const postsData = ref<any | undefined>();
const commentsData = ref<any[] | undefined>();
const comment = ref("");
const isCommentEdit = ref(false);
const editCommentId = ref<number | undefined>();

// input 변경
const onChange = (e: any) => {
  const { name, value } = e.target;

  if (name == "comment") {
    comment.value = value;
  }
};

// 특정 게시물 불러오기
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

// 게시물 삭제
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

// 댓글 리스트 불러오기
const getCommentData = async () => {
  try {
    const result = await axios.get(`/api/node/comments/${paramsId}`);
    if (result.status == 200) {
      commentsData.value = result.data.results;
    }
  } catch (e) {
    console.log(e);
  }
};

// 댓글 저장
const submit = async (e: any) => {
  e.preventDefault();

  const value = {
    postId: paramsId,
    writerNickname: "유저3",
    writerImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    comment: comment.value,
  };

  try {
    const result = await axios.post("/api/node/comments", value);
    if (result.status == 201) {
      comment.value = "";
      getCommentData();
    }
  } catch (e) {
    console.log(e);
  }
};

// 수정할 특정 댓글 불러오기
const getEditCommentData = async (id: number) => {
  try {
    const result = await axios.get(`/api/node/comments/${id}/edit`);
    if (result.status == 200) {
      editCommentId.value = result.data.results[0].id;
      comment.value = result.data.results[0].comment;
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 댓글 수정모드
const commentEdit = (id: number) => {
  isCommentEdit.value = true;
  getEditCommentData(id);
};

// 특정 댓글 업데이트
const commentEditSubmit = async (e: any) => {
  e.preventDefault();

  const value = {
    comment: comment.value,
  };

  try {
    const result = await axios.patch(
      `/api/node/comments/${editCommentId.value}`,
      value
    );
    if (result.status == 200) {
      comment.value = "";
      isCommentEdit.value = false;
      getCommentData();
    }
  } catch (e) {
    console.log(e);
  }
};

// 특정 댓글 삭제
const commentDelete = async (id: number) => {
  try {
    const result = await axios.delete(`/api/node/comments/${id}`);
    if (result.status == 200) {
      getCommentData();
    }
  } catch (e) {
    console.log(e);
  }
};

// 글수정 페이지 이동
const gotoEdit = () => {
  router.push(`/edit/${paramsId}`);
};

// 홈페이지 이동
const goToBack = () => {
  router.push("/");
};

onMounted(() => {
  getApiData();
  getCommentData();
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
    <div>
      <h2>------댓글------</h2>
      <form v-if="isCommentEdit == false" method="post" @submit="submit">
        <input
          type="text"
          id="comment"
          name="comment"
          v-model="comment"
          @input="(e) => onChange(e)"
          placeholder="댓글 내용"
          class="border border-gray-600"
        />
        <input type="submit" value="저장" class="cursor-pointer" />
      </form>
      <form
        v-if="isCommentEdit == true"
        method="post"
        @submit="commentEditSubmit"
      >
        <input
          type="text"
          id="comment"
          name="comment"
          v-model="comment"
          @input="(e) => onChange(e)"
          placeholder="댓글 내용"
          class="border border-gray-600"
        />
        <input type="submit" value="수정하기" class="cursor-pointer" />
      </form>
      <div
        v-for="(item, key) in commentsData"
        :key="key"
        class="flex items-center gap-4"
      >
        <div>댓글 번호 : {{ item.id }}</div>
        <div>닉네임 : {{ item.writer_nickname }}</div>
        <div>
          <img
            :src="item.writer_image"
            :alt="item.writer_nickname"
            class="w-10 h-10"
          />
        </div>
        <div>내용 : {{ item.comment }}</div>
        <div class="flex gap-4">
          <button @click="() => commentEdit(item.id)">수정</button>
          <button @click="() => commentDelete(item.id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
