<template>
  <el-Row>
    <el-Col :span="12" :offset="6">
      <h2>登录</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.number="ruleForm.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-Col>
  </el-Row>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue"
import api from "../api/api"
import { ElMessage, FormInstance } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter();
const ruleFormRef = ref<FormInstance>()

// 检查用户名是否填写
const checkUserNmae = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the UserName"))
  }else{
    callback()
  }
  setTimeout(() => {
    if (!String(value)) {
      callback(new Error("Please input String"))
    }
  }, 1000);
};
// 检查密码是否填写
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"))
  }else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
};
// 初始化数据
const ruleForm = reactive({
  userName: "",
  checkPass: "",
  pass: "",
})
// 返回数据
const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  userName: [{ validator: checkUserNmae, trigger: "blur" }],
})
console.log(rules.pass)
// 登录
function userLogin() {
  api
    .postFormAPI("/users/login", {
      userName: ruleForm.userName,
      password: ruleForm.pass,
    })
    .then((loginData) => {
      let respData = loginData.data.data;
      if (loginData.data.status == 1) {
        ElMessage.error(loginData.data.message);
      } else {
        localStorage.setItem("token", respData.token_after)
        localStorage.setItem("username", respData.user[0].username)
        localStorage.setItem("_id", respData.user[0]._id)
        ElMessage.success("登录成功！")
        router.push("/");
      }
    })
    .catch((err) => console.log(err))
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
};
// 跳转注册
const register = () => {
  router.push("/register")
};
</script>
<style scoped>
h2{
    text-align: center;
}
</style>