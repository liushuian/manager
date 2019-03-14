<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="用户管理" third="用户列表"></mybreadxie>
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
          <el-button type="success" @click="addFormVisible=true" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changestatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.row)"
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
          <el-button
            type="success"
            icon="el-icon-check"
            @click="chooseRole(scope.row)"
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
    <!-- 对话框 添加用户-->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" class="my-form" :rules="rules" status-icon ref="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" class="my-form" :rules="rules" status-icon ref="editForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <!-- model--绑定数组 class--对话框部分样式  rules--数据验证  ref--给表单取别名 -->
      <el-form :model="roleForm" class="my-form" :rules="rules" status-icon ref="roleForm">
        <el-form-item label="当前用户" label-width="100px">{{roleForm.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="roleForm.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    //邮箱验证
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }, 1000);
    };
    //电话号验证
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }, 1000);
    };
    return {
      //分页
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: 2
      },
      //总页数初始值
      total: 0,
      //表格初始值
      tableData: [],
      //角色列表
      roleList:[],
      //添加数据初始状态
      addFormVisible: false,
      //编辑数据初始化状态
      editFormVisible: false,
      //角色数据初始状态
      roleFormVisible: false,
      //添加数据初始值
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //编辑数据初始值
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      //角色数据初始值
      roleForm:{
        username: "",
        email: "",
        mobile: ""
      },
      //输入框验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    //修改状态
    async changestatus(row) {
      await this.$http.put(`users/${row.id}/state/${row.mg_state}`);
    },
    //编辑数据
    async handleEdit(item) {
      this.editFormVisible = true;
      let res = await this.$http.get(`users/${item.id}`);
      this.editForm = res.data.data;
    },
    //角色数据
    async chooseRole(item) {
      this.roleFormVisible = true;
      this.roleForm = item;
      let res = await this.$http.get('roles');
      this.roleList = res.data.data;
    },
    //删除数据
    handleDelete(row) {
      this.$confirm("是否要删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //确认删除
          let res = await this.$http.delete(`users/${row.id}`);
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
      let res = await this.$http.get("users", {
        params: this.sendData
      });
      this.tableData = res.data.data.users;
      this.total = res.data.data.total;
    },
    //提交前表单数据验证
    submitForm(formName) {
      let res;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (formName == "editForm") {
            res = await this.$http.put(
              `users/${this.editForm.id}`,
              this.editForm
            );
          } else if (formName == "addForm") {
            res = await this.$http.post("users", this.addForm, {});
          }else if(formName == "roleForm"){
            res = await this.$http.put(`users/${this.roleForm.id}/role`,{rid:this.roleForm.role_name});
          }
          //201--添加  200--编辑,角色
          if (res.data.meta.status == "201" || res.data.meta.status == "200") {
            //局部刷新
            this.search();
            //对话框隐藏
            this.addFormVisible = false;
            this.editFormVisible = false;
            this.roleFormVisible = false;
          }
        } else {
          return false;
        }
      });
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
/* 对话框样式 */
.my-form {
  height: auto;
  padding: 0;
}
</style>