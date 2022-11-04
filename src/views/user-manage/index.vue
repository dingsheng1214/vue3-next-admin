<template>
  <div class="user-manage-container">
    <el-card class="card">
      <div style="margin-top: 20px">
        <el-button type="primary">Excel导入</el-button>
        <el-button type="success">Excel导出</el-button>
      </div>
      <div style="margin-top: 20px; text-align: right">
        <el-table :data="tableData">
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column prop="mobile" label="手机号" width="180" />
          <el-table-column label="头像" width="180">
            <template v-slot="{ row }">
              <el-image
                class="avatar"
                :src="row.avatar"
                :preview-src-list="[row.avatar]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="180">
            <template v-slot="{ row }">
              <el-tag v-for="tag in row.role" :key="tag.id">{{ tag.title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="开通时间" width="180">
            <template v-slot="{ row }">
              {{ $filters.dateFilter(row.openTime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="primary">查看</el-button>
              <el-button type="info">角色</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: right">
        <el-pagination
          class="pagination"
          v-model:currentPage="page"
          v-model:page-size="size"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue'
  import { getUserList } from '@/api/user'

  const tableData = ref<any>([])
  const total = ref(0)
  const page = ref(1)
  const size = ref(10)

  const getListData = async () => {
    const res = await getUserList({ page: unref(page), size: unref(size) })
    tableData.value = res.list
    total.value = res.total
    console.log(res)
  }

  onMounted(async () => {
    await getListData()
  })
  const handleSizeChange = () => {}
  const handleCurrentChange = () => {}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
</style>
