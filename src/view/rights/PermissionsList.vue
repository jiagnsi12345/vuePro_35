<template>
  <div class="permissionsList">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button type="primary" style="margin-bottom:20px">主要按钮</el-button>
    <!-- 表格展示 -->
    <el-table :data="rightlist" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
              {{scope.row.level|levelFormat}}
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRightlist } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightlist: []
    }
  },
  mounted () {
    getAllRightlist('list')
      .then((res) => {
        if (res.data.meta.status === 200) {
          this.rightlist.push(...res.data.data)
        } else {
          this.$message.success('获取数据失败')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style scoped>
</style>
