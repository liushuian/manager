<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col class="header-center" :span="16">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col class="header-right" :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  beforeCreate() {
    if(window.sessionStorage.getItem('token')){
        //有token,表明已经登录过
    }else{//没有token,表明还没登录,返回登录页
        this.$message.warning('请登录')
        this.$router.push('/login');
          
      }
  },
  methods: {
    logout() {
      this.$confirm("你是要退出么?", "提示", {
        confirmButtonText: "残忍退出",
        cancelButtonText: "好心留下",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请继续你的骚操作!"
          });
        });
    }
  }
};
</script>
<style>
.index-container {
  height: 100%;
}
.index-header {
  background-color: #b3c0d1;
  height: 60px;
  line-height: 60px;
}
.header-center {
  text-align: center;
  font-size: 30px;
  color: white;
  font-weight: 700;
}
.header-right {
  text-align: right;
}
.index-aside {
}
.index-main {
  background-color: #e9eef3;
}
</style>