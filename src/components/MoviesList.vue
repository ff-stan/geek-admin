<template>
  <p>
    <router-link :to="{ path: '/movieDetail', query: { id: id } }">
      {{ movieName }}{{ movieTimeShow }}
    </router-link>
  </p>
</template>
<script setup>
import { defineProps, ref } from "vue";

let props = defineProps({
  id: String,
  movieName: String,
  movieTime: String,
});
let movieTimeShow = ref(
  new Date(parseInt(props.movieTime))
    .toLocaleString()
    .replace(/: \d{1,2}$/, " ")
);
</script>