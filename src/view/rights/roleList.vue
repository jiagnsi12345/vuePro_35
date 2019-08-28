<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button type="primary" style="width:100%; margin-bottom:20px">成功按钮</el-button>
    <!-- 表格展示 -->
    <el-table :data="roleList" border style="width: 100%">
       <!-- 展开行结构 -->
       <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <h3>这里的内容要我们后期自己动态生成</h3>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" ></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column prop="level" label="操作" width="400">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <el-button type="primary" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="角色授权" placement="top">
          <el-button type="success" icon="el-icon-share"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-button type="warning" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoleList } from '@/api/role_index.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    getAllRoleList()
      .then((res) => {
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        this.$message.success('角色列表展示失败')
      })
  }
}
</script>
<style scoped>
</style>
