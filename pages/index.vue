<script setup lang="ts">
import axios from "axios";
import { LazyButtonBlueButton, LazyCommonPagination } from "#components";

definePageMeta({
  layout: "navbar",
});

// 변수
const router = useRouter();
const postsData = ref<any[] | undefined>();

// 게시글 리스트 불러오기
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
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <div class="flex justify-end items-center w-full">
      <LazyButtonBlueButton type="button" title="글쓰기" @click="goToWrite" />
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div class="py-2 inline-block min-w-full">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-white border-b font-semibold text-md">
                <tr>
                  <th scope="col" class="text-gray-900 w-1/6 py-4 text-center">
                    번호
                  </th>
                  <th scope="col" class="text-gray-900 w-3/6 py-4 text-center">
                    제목
                  </th>
                  <th scope="col" class="text-gray-900 w-1/6 py-4 text-center">
                    작성자
                  </th>
                  <th scope="col" class="text-gray-900 w-1/6 py-4 text-center">
                    작성일
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, key) in postsData"
                  :key="key"
                  class="border-b hover:bg-gray-300/50 cursor-pointer"
                  :class="key % 2 == 1 ? 'bg-white' : 'bg-gray-100'"
                  @click="goToRead(item.id)"
                >
                  <td
                    class="w-1/6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ key + 1 }}
                  </td>
                  <td
                    class="w-3/6 max-w-[250px] text-left text-sm text-gray-900 font-light px-6 py-4 text-ellipsis whitespace-nowrap overflow-hidden"
                  >
                    {{ item.title }}
                  </td>
                  <td
                    class="w-1/6 text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.writer }}
                  </td>
                  <td
                    class="w-1/6 text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.created_at }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <LazyCommonPagination />
    </div>
  </div>
</template>
