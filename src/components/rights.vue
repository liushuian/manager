<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="权限管理" third="权限列表"></mybreadxie>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.level == 0">一级</div>
          <div v-else-if="scope.row.level == 1">二级</div>
          <div v-else>三级</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  async created() {
      let res = await this.$http.get('rights/list');
      this.tableData = res.data.data;
      console.log(res);
  },
};
</script>
<style>
</style>