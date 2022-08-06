<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部导航栏 -->
      <el-header>
        <IndexHeader :index=1></IndexHeader>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <!-- 轮播图 -->
        <el-row>
          <el-col :span="24">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <!-- 电影和文章排行榜 -->
        <el-row>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>电影排行榜</span>
                </div>
              </template>
              <el-scrollbar height="400px">
                <MoviesList
                  v-for="item in movieItems"
                  :key="item._id"
                  :id="item._id"
                  :movieName="item.movieName"
                  :movieTime="item.movieTime"
                ></MoviesList>
              </el-scrollbar>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>文章排行榜</span>
                </div>
              </template>
              <el-scrollbar height="400px">
                <ArticlesList
                  v-for="item in articleItems"
                  :key="item._id"
                  :id="item._id"
                  :articleTitle="item.articleTitle"
                  :articleTime="item.articleTime"
                ></ArticlesList>
              </el-scrollbar>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import IndexHeader from "../components/IndexHeader.vue";
import MoviesList from "../components/MoviesList.vue";
import ArticlesList from "../components/ArticlesList.vue"
import api from "../api/api";
import { ElMessage } from "element-plus";
const activeIndex = ref("1");
const movieItems = ref([]);
const articleItems = ref([]);
// 获取电影排行榜
api
  .getListAPI("/showRanking")
  .then((showRankingData) => {
    movieItems.value = showRankingData.data.data;
  })
  .catch(() => {
    ElMessage.error(showRankingData.data.message);
  });
// 获取文章排行榜
api
  .getListAPI("/showArticle")
  .then((showArticleData) => {
    articleItems.value = showArticleData.data.data;
  })
  .catch(() => {
    ElMessage.error(showArticleData.data.message);
  });
</script>
<style scoped>
.common-layout {
  margin: 0 auto;
  width: 1280px;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 1em;
}

.item {
  margin-bottom: 2em;
  
}
.box-card {
  width: 100%;
}
.el-scrollbar__view > p {
  text-align: center;
}
</style>