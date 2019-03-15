<template>
  <div class="login">
    <el-form
      :model="formData"
      status-icon
      ref="ruleFrom2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      :rules="rules"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFrom2')" id="btn-login">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        password: "",
        username: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "change" }
        ]
      }
    };
  },
   methods: {
     //提交数据前验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //数据正确
            this.$http.post('login',this.formData).then(res=>{
                if(res.data.meta.status === 400){
                    // this.$message.error('用户名或密码错误');//res.data.meta.msg 提示错误的部分信息
                }else{
                    // this.$message.success(res.data.meta.msg);
                    window.sessionStorage.setItem('token',res.data.data.token)
                    this.$router.push('/');
                }
            })
          } else {
            this.$message.error('请输入正确的用户名和密码');
            return false;
          }
        });
      },
    }

};
</script>
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
body > div:first-of-type {
  height: 100%;
}
.login {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  background-color: #324152;
  height: 100%;
}
.el-form {
  background-color: #fff;
  width: 623px;
  height: 500px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 10px;
}
#btn-login {
  width: 100%;
}
/* 限定弹框的大小 */
</style>