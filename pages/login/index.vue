<script setup lang="ts">
import {
  LazyContainerLoginContainer,
  LazyContainerRegisterContainer,
} from "#components";

definePageMeta({
  layout: "navbar",
});

// 변수
const isAccount = ref(false);

// auth 토글
const accountToggle = () => {
  isAccount.value = isAccount.value == false;
};
</script>
<template>
  <div class="w-11/12 lg:w-2/3 m-auto mt-5">
    <div class="w-5/6 md:w-3/6 m-auto bg-white px-5 py-10 rounded-lg">
      <div class="flex justify-center items-center font-semibold text-xl my-5">
        {{ isAccount == false ? "로그인" : "회원가입" }}
      </div>
      <LazyContainerLoginContainer
        v-if="isAccount == false"
        :accountToggle="accountToggle"
      />
      <LazyContainerRegisterContainer
        v-if="isAccount == true"
        :accountToggle="accountToggle"
      />
    </div>
  </div>
</template>
