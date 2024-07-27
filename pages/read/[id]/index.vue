<script setup lang="ts">
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyFormTextareaItem,
  LazyButtonBlueButton,
  LazyButtonRedButton,
  LazyButtonDarkButton,
  LazyCommonPagination,
} from "#components";
import { ChangeDate } from "@/composables/DateFormat";
import PostApi from "~/composables/rest/post/PostApi";
import CommentApi from "~/composables/rest/comment/CommentApi";

definePageMeta({
  layout: "navbar",
});

// storage
const userStore = useUserStore();

// 변수
const router = useRouter();
const route = useRoute();
const paramsId = route.params.id;
const postsData = ref<any | undefined>();
const commentsData = ref<any[] | undefined>();
const comment = ref("");
const isCommentEdit = ref(false);
const editCommentId = ref<number | undefined>();
const page = ref(1);
const perPage = ref(5);
const pageNumber = ref<number | undefined>();

// 특정 게시물 불러오기
const getApiData = async () => {
  try {
    const result = PostApi.show(paramsId);
    if ((await result).status == 200) {
      postsData.value = (await result).data.results[0];
    }
  } catch (e) {
    console.log(e);
  }
};

// 게시물 삭제
const postDelete = async (id: number) => {
  try {
    const result = PostApi.destroy(id);
    if ((await result).status == 200) {
      window.location.replace("/");
    }
  } catch (e) {
    console.log(e);
  }
};

// 댓글 리스트 불러오기
const getCommentData = async () => {
  try {
    const result = CommentApi.index(paramsId, page.value, perPage.value);
    commentsData.value = (await result).data.results;
    pageNumber.value = Number((await result).data.totalCount);
  } catch (e) {
    console.log(e);
  }
};

// 댓글 저장
const submit = async (e: any) => {
  e.preventDefault();

  const value = {
    postId: Number(paramsId),
    writerNickname: userStore.getUserData.nickname,
    writerImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    comment: comment.value,
  };

  try {
    const result = CommentApi.store(value);
    if ((await result).status == 201) {
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
    const result = CommentApi.edit(id);
    if ((await result).status == 200) {
      editCommentId.value = (await result).data.results[0].id;
      comment.value = (await result).data.results[0].comment;
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
    const result = CommentApi.update(editCommentId.value, value);
    if ((await result).status == 200) {
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
    const result = CommentApi.destroy(id);
    if ((await result).status == 200) {
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

// 댓글 페이지 전환
const pageChange = (number: number) => {
  page.value = number;
  getCommentData();
};

onMounted(() => {
  getApiData();
  getCommentData();
});
</script>
<template>
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <div v-if="postsData !== undefined">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <LazyTextInputLabel is-for="title" title="제목" />
          <LazyFormInputItem
            type="text"
            id="title"
            :value="postsData.title"
            :isReadonly="true"
            :isDisabled="true"
          />
        </div>
        <div>
          <LazyTextInputLabel is-for="writer" title="작성자" />
          <LazyFormInputItem
            type="text"
            id="writer"
            :value="postsData.writer"
            :isReadonly="true"
            :isDisabled="true"
          />
        </div>
      </div>
      <div class="mb-6">
        <LazyTextInputLabel is-for="content" title="내용" />
        <LazyFormTextareaItem
          id="content"
          :value="postsData.content"
          :isReadonly="true"
          :isDisabled="true"
        />
      </div>
    </div>
    <div
      v-if="postsData !== undefined"
      class="flex justify-end items-center my-5"
    >
      <LazyButtonBlueButton
        v-if="
          userStore.getUserData !== undefined &&
          userStore.getUserData.nickname === postsData.writer
        "
        type="button"
        title="수정"
        @click="gotoEdit"
      />
      <LazyButtonRedButton
        v-if="
          userStore.getUserData !== undefined &&
          userStore.getUserData.nickname === postsData.writer
        "
        type="button"
        title="삭제"
        @click="() => postDelete(postsData.id)"
      />
      <LazyButtonBlueButton type="button" title="목록" @click="goToBack" />
    </div>
    <div class="w-full md:w-4/6 m-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          댓글 ({{ pageNumber }})
        </h2>
      </div>
      <form
        v-if="userStore.getUserData !== undefined && isCommentEdit == false"
        method="post"
        @submit="submit"
        class="mb-6"
      >
        <div class="py-2 mb-4">
          <LazyFormTextareaItem
            id="comment"
            :value="comment"
            placeholder="댓글을 작성하세요."
            @update:textareaValue="($event) => (comment = $event.target.value)"
          />
        </div>
        <LazyButtonDarkButton type="submit" title="댓글 작성" />
      </form>
      <form
        v-if="userStore.getUserData !== undefined && isCommentEdit == true"
        method="post"
        @submit="commentEditSubmit"
        class="mb-6"
      >
        <div class="py-2 mb-4">
          <LazyFormTextareaItem
            id="comment"
            :value="comment"
            @update:textareaValue="($event) => (comment = $event.target.value)"
          />
        </div>
        <LazyButtonDarkButton type="submit" title="댓글 수정" />
      </form>
      <div class="flex flex-col gap-7">
        <article
          v-for="(item, key) in commentsData"
          :key="key"
          class="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
        >
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p
                class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
              >
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  :src="item.writer_image"
                  :alt="item.writer_nickname"
                />{{ item.writer_nickname }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <time>{{ ChangeDate(item.created_at) }}</time>
              </p>
            </div>
          </footer>
          <p class="text-gray-500 dark:text-gray-400 p-2 text">
            {{ item.comment }}
          </p>
          <div class="flex items-center mt-4 space-x-4">
            <LazyButtonBlueButton
              v-if="
                userStore.getUserData !== undefined &&
                userStore.getUserData.nickname === item.writer_nickname
              "
              type="button"
              title="수정"
              @click="() => commentEdit(item.id)"
            />
            <LazyButtonRedButton
              v-if="
                userStore.getUserData !== undefined &&
                userStore.getUserData.nickname === item.writer_nickname
              "
              type="button"
              title="삭제"
              @click="() => commentDelete(item.id)"
            />
          </div>
        </article>
      </div>
      <div
        v-if="postsData !== undefined && pageNumber !== undefined"
        class="flex justify-center items-center gap-5 mt-5 mb-10"
      >
        <LazyCommonPagination
          v-for="(number, key) in Math.ceil(pageNumber / perPage)"
          :key="key"
          :pageNumber="pageNumber"
          :perPage="perPage"
          :page="page"
          :pageChange="pageChange"
          :number="number"
          :contentPage="key"
        />
      </div>
    </div>
  </div>
</template>
