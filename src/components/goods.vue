<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="商品管理" third="商品列表"></mybreadxie>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            @keyup.native.enter="search"
            v-model="sendData.query"
            class="input-with-select"
          >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 按钮 -->
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="280"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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
      @size-change="sizeChange"
      @current-change="currentChange"
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
        pagesize: 20
      },
      //总页数初始值
      total: 0,
      //表格初始值
      tableData: [],
    };
  },
  methods: { 
    //删除数据
    handleDelete(row) {
      this.$confirm("是否要删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //确认删除
          let res = await this.$http.delete(`goods/${row.goods_id}`);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查询数据
    //async await es7语法修饰代码 使得异步执行类似同步顺序执行
    async search() {
      let res = await this.$http.get("goods", {
        params: this.sendData
      });
      this.tableData = res.data.data.goods;
      this.total = res.data.data.total;
    },
    //页容量改变
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.search();
    },
    //页数改变
    currentChange(current) {
      this.sendData.pagenum = current;
      this.search();
    }
  },

  //表格数据获取
  async created() {
    this.search();
  }
};
</script>
<style>
</style>
