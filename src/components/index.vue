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
      <el-aside class="index-aside" width="200px">
        <el-menu default-active="2" router class="el-menu-vertical-demo">
          <el-submenu :index="index+''" v-for="(item,index) in menuList" :key="item.children.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item index="users" v-for="it in item.children" :index="'/'+it.path">
              <span class="el-icon-menu"></span>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: []
    };
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
  },
  async created() {
    let res = await this.$http.get("menus");
    // console.log(res);
    this.menuList = res.data.data;
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

.el-main.index-main {
  background-color: #e9eef3;
  padding-top: 0;
}
</style>