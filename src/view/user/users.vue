<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px; margin-bottom:15px">
      <el-input
        placeholder="请输入内容"
        @keypress.enter.native="init"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" style="margin-left:15px" @click="addDialogFormVisible=true">添加用户</el-button>
    </div>

    <!-- 表格展示区域 -->
    <el-table :data="userlists" style="width: 100% " border>
      <el-table-column width="50" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeState(scope.row.id,scope.row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="deluser(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1,2,3,4,5]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="'80px'" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 建立编辑弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :label-width="'80px'" :rules="rules" ref="editForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" autocomplete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色弹框 -->
    <el-dialog title="角色分配" :visible.sync="grantDialogFormVisible">
      <el-form :model="grantForm" :label-width="'80px'">
        <el-form-item label="用户名">
          <el-input v-model="grantForm.username" autocomplete="off" disabled style="width:100px">
            <span>{{grantForm.username}}</span>
          </el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="grantForm.rid" placeholder="请选择"  @change="getrid">
            <el-option
              v-for="item in rolelist"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUser">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {
  getAllUsers,
  addUser,
  editUser,
  grantUserRloe,
  delUserById,
  updateUserState
} from '@/api/user_index.js'
import { getAllRoleList } from '@/api/role_index.js'

export default {
  data () {
    return {
      total: 0,
      userkey: '',
      status: true,
      userlists: [],
      rolelist: [],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      grantDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      editForm: {
        id: '',
        username: '',
        mobile: '',
        email: ''
      },
      grantForm: {
        username: '',
        id: '',
        rid: ''
      }
    }
  },
  methods: {
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.userlists = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      // console.log(val)
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(val)
      this.userobj.pagenum = val
      this.init()
    },
    add () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success('添加用户成功')
                this.init()
                this.addDialogFormVisible = false
                // 清空表单元素的数据--重置表单元素
                this.$refs.addForm.resetFields()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.success('用户新增失败')
            })
        } else {
          this.$message.warning('请输入所有必填数据')
        }
      })
    },
    showEditDialog (row) {
      this.editDialogFormVisible = true
      this.editForm.id = row.id
      this.editForm.username = row.role_name
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    edituser () {
      editUser(this.editForm)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success('用户编辑数据成功')
            this.init()
            this.editDialogFormVisible = false
            this.$refs.editForm.resetFields()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.success('用户新增失败')
        })
    },
    grantUser () {
      console.log(this.grantForm)
      if (this.grantForm.rid) {
        grantUserRloe(this.grantForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.grantDialogFormVisible = false
              this.init()
            }
          })

          .catch((err) => {
            console.log(err)
            this.$message.success('用户编辑失败')
          })
      } else {
        this.$message.error('请选择角色')
      }
    },
    getrid (obj) {
      console.log(obj)
      this.grantForm.rid = obj
    },
    showGrantDialog (row) {
      this.grantDialogFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.id = row.id
      this.grantForm.rid = row.rid
    },
    deluser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(id)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.userobj.pagenum = Math.ceil((this.total - 1) / this.userobj.pagesize) < this.userobj.pagenum ? --this.userobj.pagenum : this.userobj.pagenum
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeState (id, type) {
      console.log(id, type)
      updateUserState(id, type)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '修改状态失败'
          })
        })
    }
  },
  mounted () {
    this.init()
    getAllRoleList()
      .then((res) => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
</style>
