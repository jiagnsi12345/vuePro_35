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
      <el-input placeholder="请输入内容" v-model="userobj.query" class="input-with-select" style="width:300px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" style="margin-left:15px">添加用户</el-button>
    </div>

    <!-- 表格展示区域 -->
    <el-table :data="userlists" style="width: 100% " border>
      <el-table-column width="50" type="index"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="状态" width="100">
        <template>
          <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
  </div>
</template>
<script>
import { getAllUsers } from '@/api/user_index.js'
export default {
  data () {
    return {
      userkey: '',
      status: true,
      userlists: [

      ],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  mounted () {
    getAllUsers(this.userobj)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.userlists = res.data.data.users
        } else if (res.data.meta.status === 400) {
          this.$massage.error(res.data.meta.msg)
          this.$router.push({ name: 'login' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
</style>
