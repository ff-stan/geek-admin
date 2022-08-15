<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <IndexHeader></IndexHeader>
      </el-header>
        <el-container>
          <el-main>
            <div class="demo-image">
              <el-image style="width: 250px; height: 300px" :src="movieData.movieImg" :fit="cover" />
              <h2>{{ movieData.movieName }}</h2>
            </div>
            <el-divider> 电影介绍 </el-divider>
            <p>
              {{ movieData.movieContext }}
            </p>
            <el-divider> 电影信息 </el-divider>
            <p>电影类型:{{ movieData.movieCategory }}</p>
            <p>演职人员:{{ movieData.movieCastMembers }}</p>
            <p>电影时长:{{ movieData.movieDuration }}分钟</p>
            <p>上映地区:{{ movieData.movieArea }}</p>
            <el-divider> 电影评论 </el-divider>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import IndexHeader from "../components/IndexHeader.vue";

const router = useRoute();
const movieData = ref("");
let movieId = router.query.id;

api
  .postFormAPI("/movie/detail", { id: movieId })
  .then((detailData) => {
    if (detailData.data.status == 1) {
      ElMessage.error(detailData.data.message);
    } else {
      movieData.value = detailData.data.data[0];
    }
  })
  .catch((e) => {
    ElMessage.error(e);
  });
</script>

<style scoped>
.common-layout {
  margin: 0 auto;
  width: 1280px;
}
</style>