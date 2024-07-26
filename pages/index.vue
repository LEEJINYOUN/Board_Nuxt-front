<script setup lang="ts">
import axios from "axios";
import { LazyButtonBlueButton } from "#components";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";
import { ChangeDate } from "@/composables/DateFormat";

definePageMeta({
  layout: "navbar",
});

// storage
const userStore = useUserStore();

// 변수
const router = useRouter();
const postsData = ref<any[] | undefined>();
const page = ref(1);
const perPage = ref(5);
const pageNumber = ref<number | undefined>();

// 게시글 리스트 불러오기
const getApiData = async () => {
  try {
    const result = await axios.get(
      `${API_FRONT_URL}/posts?page=${page.value}&perPage=${perPage.value}`
    );
    postsData.value = result.data.results;
    pageNumber.value = Number(result.data.totalCount);
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

// 게시글 페이지 전환
const pageChange = (number: number) => {
  page.value = number;
  getApiData();
};

onMounted(() => {
  getApiData();
});
</script>
<template>
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <div
      v-if="userStore.getUserData !== undefined"
      class="flex justify-end items-center w-full"
    >
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
                    {{ item.id }}
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
                    {{ ChangeDate(item.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="postsData !== undefined && pageNumber !== undefined"
      class="flex justify-center items-center gap-5"
    >
      <button
        v-for="(number, key) in Math.ceil(pageNumber / perPage)"
        :key="key"
        class="rounded-full flex items-center justify-center px-3 h-8 text-blue-400 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        :class="page == number ? 'font-semibold text-blue-600' : ''"
        @click="pageChange(number)"
      >
        {{ key + 1 }}
      </button>
    </div>
  </div>
</template>
