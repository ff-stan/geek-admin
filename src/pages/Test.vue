<template>
  <el-upload ref="uploadRef" class="upload-demo" action='http://localhost:3000/admin/upload' :auto-upload="false" :headers="headers" :on-success="onSuccess">
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>

    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const headers = computed(() => {
  return {
    token: `${localStorage.getItem('token')}`,
    id: `${localStorage.getItem('_id')}`,
    username: `${localStorage.getItem('username')}`
  }
})

const onSuccess = (resp,uploadFile,uploadFiles) => {
  if(resp.status === 1){
    ElMessage.error(resp.message)
  }else{
    ElMessage.success(resp.message)
  }
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>