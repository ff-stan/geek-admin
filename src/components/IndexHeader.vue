<template>
  <el-menu class="el-menu-demo" mode="horizontal" :default-active=index>
    <router-link to="/">
      <el-menu-item index="1">首页</el-menu-item>
    </router-link>
    <router-link to="/moviesList">
      <el-menu-item index="2">电影</el-menu-item>
    </router-link>
    <router-link to="/articlesList">
      <el-menu-item index="3">新闻</el-menu-item>
    </router-link>
    <router-link to="/">
      <el-menu-item index="4">榜单</el-menu-item>
    </router-link>
    <router-link to="/">
      <el-menu-item index="5">热点</el-menu-item>
    </router-link>
  </el-menu>
</template>
<script setup>
import { defineProps, ref } from "vue";
let props = defineProps({
  index: Number
})
let index = ref(String(props.index))
</script>
<style>
a {
  text-decoration: none;
}
</style>