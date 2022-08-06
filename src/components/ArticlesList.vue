<template>
  <p>
    <router-link :to="{ path: '/articleDetail', query: { id: id } }">
      {{ articleTitle }}{{ articleTimeShow }}
    </router-link>
  </p>
</template>
<script setup>
import { defineProps, ref } from "vue";

let props = defineProps({
  id: String,
  articleTitle: String,
  articleTime: String,
});
let articleTimeShow = ref(
  new Date(parseInt(props.articleTime))
    .toLocaleString()
    .replace(/: \d{1,2}$/, " ")
);
</script>