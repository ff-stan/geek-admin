<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <router-link to="/">
            <el-menu-item index="1">主页</el-menu-item>
          </router-link>
          <router-link to="/movieList">
            <el-menu-item index="2"> 电影 </el-menu-item>
          </router-link>
          <router-link to="/newsList">
            <el-menu-item index="3"> 新闻 </el-menu-item>
          </router-link>
        </el-menu>
      </el-header>
      <el-main>
        <el-row>
          <el-col :offset="4" :span="16">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="8">
            <movies-list
              v-for="item in movieItems"
              :key="item._id"
              :id="item._id"
              :movieName="item.movieName"
              :movieTime="item.movieTime"
            ></movies-list>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MoviesList from "./MoviesList.vue"
import api from "../api/api";
import { ElMessage } from "element-plus"
let movieItems = "";
const activeIndex = ref("1")

api
  .getListAPI("/showRanking")
  .then((showRankingData) => {
    movieItems = showRankingData.data.data;
    console.log(movieItems)
  })
  .catch(() => {
    ElMessage.error(showRankingData.data.message)
  })
console.log(movieItems)
</script>
<style scoped>
a {
  text-decoration: none;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>