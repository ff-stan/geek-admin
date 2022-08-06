<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <IndexHeader></IndexHeader>
      </el-header>
      <el-container>
        <el-header> <h2>{{ articleData.articleTitle }}</h2>
          <p class="article-information">
            作者:{{ articleData.articleAuthor }}
              <el-icon><Pointer /></el-icon>
              {{ articleData.articleNumSuppose }}
          </p>
          </el-header>
         
        <el-main>
            {{ articleData.articleContext }}
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from "vue";
import IndexHeader from "../components/IndexHeader.vue";
import api from "../api/api";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRoute();
const articleData = ref("");
let articleId = router.query.id;

api
  .postFormAPI("/articleDetail", { article_id: articleId })
  .then((detailData) => {
    if (detailData.data.status == 1) {
      ElMessage.error(detailData.data.message);
    } else {
      articleData.value = detailData.data.data[0];
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
.clear-padding{
  padding: 0;
}
.article-information{
  font-size: 0.85rem;
  color: rgb(167, 174, 180);
}
.el-main{
  margin-top: 20px;
}
</style>