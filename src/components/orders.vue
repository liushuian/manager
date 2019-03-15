<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="订单管理" third="订单列表"></mybreadxie>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="280"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="120"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="120">
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.order_pay == 0">未付款</el-button>
          <el-button type="success" v-else>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="120"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="200">
        <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editFormVisible = true"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizechange"
      @current-change="currentchange"
    ></el-pagination>
    <!-- 对话框 修改地址 -->
    <el-dialog title="修改订单地址" :visible.sync="editFormVisible">
      <!-- model--绑定数组 class--对话框部分样式  rules--数据验证  ref--给表单取别名 -->
      <el-form :model="editForm" class="my-form" status-icon ref="editForm">
        <el-form-item label="省市县/区" label-width="100px">
          <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import VDistpicker from "v-distpicker";
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
      tableData: [],
      //弹框初始关闭
      editFormVisible: false,
      editForm: {
        is_send:'',
        order_pay:'',
        order_price:'',
        order_number:'',
        pay_status:''
      }
    };
  },
  // 注册局部组件
  components: { VDistpicker },
  methods: {
    async getOrdersData() {
      let res = await this.$http.get("orders", {
        params: this.sendData
      });
      this.tableData = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizechange(size) {
      this.sendData.pagesize = size;
      this.getOrdersData();
      // console.log(size);
    },
    currentchange(current) {
      this.sendData.pagenum = current;
      this.getOrdersData();
      // console.log(current);
    },
    //提交前表单数据验证
  
  },
  //过滤器,过滤时间格式
  filters: {
    formatTime: function(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  //表格数据获取
  created() {
    this.getOrdersData();
  }
};
</script>
<style>
</style>
