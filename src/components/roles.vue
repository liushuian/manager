<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="权限管理" third="角色列表"></mybreadxie>
    <!-- 按钮 -->
    <el-button type="success" @click="addRolesVisible=true" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- 栅格 -->
            <el-row  v-for="lever1 in props.row.children" :key="lever1.id" class="my-row">
              <el-col :span="4">
                <!-- 标签页 -->
                <el-tag closable>{{lever1.authName}}</el-tag>
                <!-- 图标 -->
                <span class="el-icon-arrow-right"></span>
              </el-col>
              <el-col :span="20">
                <el-row v-for="lever2 in lever1.children" :key="lever2.id">
                  <el-col :span="6" class="my-col">
                     <el-tag type="success" closable>{{lever2.authName}}</el-tag>
                     <span class="el-icon-arrow-right"></span>
                  </el-col>
                  <el-col :span="18">
                    <el-tag v-for="lever3 in lever2.children" :key="lever3.id" type="warning" closable class="my-tag">{{lever3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 添加角色-->
    <el-dialog title="添加角色" :visible.sync="addRolesVisible">
      <el-form :model="addForm" class="my-form" status-icon ref="addForm">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      addRolesVisible: false,
      addForm: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    async getRoles() {
      let res = await this.$http.get("roles");
      console.log(res);
      this.tableData = res.data.data;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$http.post("roles", this.addForm);
          //刷新
          this.getRoles();
          //隐藏对话框
          this.addRolesVisible = false;
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.getRoles();
  }
};
</script>
<style>
  .my-row{
    margin-bottom: 10px;
  }
  .my-col{
    margin-bottom: 10px;
  }
  .my-tag{
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
