<script setup lang="ts">
import {
  LazyTextInputLabel,
  LazyFormInputItem,
  LazyFormTextareaItem,
  LazyButtonBlueButton,
} from "#components";
import PostApi from "~/composables/rest/post/PostApi";

definePageMeta({
  layout: "navbar",
  middleware: ["auth-user"],
});

// storage
const userStore = useUserStore();

// 변수
const title = ref("");
const content = ref("");
const file = ref<File | null>(null);

// 이미지 파일 변환
const onChangeFile = (e: any) => {
  const [_file] = (e.target as HTMLInputElement).files as FileList;
  file.value = _file;
};

// 게시물 저장
const submit = async (e: any) => {
  e.preventDefault();

  let value;

  if (file.value) {
    const body = new FormData();
    body.append("file", file.value, file.value.name);

    const imageSave = await $fetch("/api/upload", {
      method: "post",
      body,
    });
    value = {
      writer: userStore.getUserData.nickname,
      title: title.value,
      content: content.value,
      fileName: imageSave,
    };
  } else {
    value = {
      writer: userStore.getUserData.nickname,
      title: title.value,
      content: content.value,
      fileName: "",
    };
  }

  try {
    const result = PostApi.store(value);
    if ((await result).status == 201) {
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
      <div class="mb-5">
        <div class="border border-dashed border-gray-500 relative mb-3">
          <input
            type="file"
            multiple
            class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
            @change="onChangeFile"
          />
          <div
            class="text-center p-10 absolute top-0 right-0 left-0 m-auto text-gray-500"
          >
            <span>
              <h4>
                업로드 할 파일을
                <br />드래그 하거나
              </h4>
              <p class="">선택하세요</p>
            </span>
          </div>
        </div>
        <div v-if="file" class="flex gap-4">
          <h1>선택한 파일 :</h1>
          <pre>{{ file?.name }}</pre>
        </div>
      </div>
      <LazyButtonBlueButton type="submit" title="작성하기" />
    </form>
  </div>
</template>
