<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <h2>注册</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.trim="ruleForm.userName" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="rePassword" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userMail">
          <el-input v-model.trim="ruleForm.userMail" />
        </el-form-item>
        <el-form-item label="手机" prop="userPhone">
          <el-input v-model.Number="ruleForm.userPhone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userRegister">注册</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import api from "../api/api";
import { ElMessage, FormInstance } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

// 检查用户名
const checkUserName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the userName"));
  } else {
    callback();
  }
  setTimeout(() => {
    if (!String(value)) {
      callback(new Error("Please input String"));
    }
  }, 1000);
};
// 检查邮箱
const checkuserMail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入邮箱"));
  } else {
    callback();
  }
  setTimeout(() => {
    if (!String(value)) {
      callback(new Error("Please input String"));
    }
  }, 1000);
};
// 检查手机
const checkuserPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入手机"));
  } else {
    callback();
  }
  setTimeout(() => {
    if (!String(value)) {
      callback(new Error("Please input String"));
    }
  }, 1000);
};
// 第一次检查密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
// 第二次检查密码 并与第一次一致
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
// 初始化数据
const ruleForm = reactive({
  pass: "",
  checkPass: "",
  userName: "",
  userMail: "",
  userPhone: "",
});
// 最终数据
const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  userName: [{ validator: checkUserName, trigger: "blur" }],
  userMail: [{ validator: checkuserMail, trigger: "blur" }],
  userPhone: [{ validator: checkuserPhone, trigger: "blur" }],
});

// 注册
function userRegister() {
  if (ruleForm.checkPass !== ruleForm.pass) {
    ElMessage.error("两次密码不一致");
  } else {
    let sendDate = {
      userName: ruleForm.userName,
      password: ruleForm.checkPass,
      userMail: ruleForm.userMail,
      userPhone: ruleForm.userPhone,
    };
    api.postFormAPI("/users/register", sendDate).then((registerData) => {
      let respData = registerData.data.data;
      if (registerData.data.status == 1) {
        ElMessage.error(registerData.data.message);
      } else {
        ElMessage.success("注册成功! 3s后跳转到登录页");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    });
  }
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
h2 {
  text-align: center;
}
</style>