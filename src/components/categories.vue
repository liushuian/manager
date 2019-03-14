<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="商品管理" third="商品分类"></mybreadxie>
    <!-- 输入框 -->
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <!-- 按钮 -->
        <el-button type="success" plain>添加分类</el-button>
      </div>
    </el-col>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="280"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="120"></el-table-column>
      <el-table-column prop="cat_pid" label="是否有效" width="120"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[2, 4, 6, 8]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //分页
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: 5
      },
      //总页数初始值
      total: 0,
      //表格初始值
      tableData: []
    };
  },
  //表格数据获取
  async created() {
    let res = await this.$http.get("categories", {
      params: this.sendData
    });
    this.tableData = res.data.data.goods;
    this.total = res.data.data.total;
  }
};
</script>
<style>
</style>
