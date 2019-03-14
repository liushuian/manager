<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="订单管理" third="订单列表"></mybreadxie>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="280"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="120"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="120"></el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="120"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="120"></el-table-column>
      <el-table-column label="操作">
        <template>
         <el-button
            type="primary"
            icon="el-icon-edit"
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
        pagesize: 10
      },
      //总页数初始值
      total: 0,
      //表格初始值
      tableData: []
    };
  },
  //表格数据获取
  async created() {
    let res = await this.$http.get("orders", {
      params: this.sendData
    });
    this.tableData = res.data.data.goods;
    this.total = res.data.data.total;
  }
};
</script>
<style>
</style>
