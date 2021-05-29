<template>
  <div class="app-container">
    商品列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="商品名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="商品状态">
          <el-option :value="Normal" label="已发布"></el-option>
          <el-option :value="Draft" label="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table v-loading="listLoading" :data="list"
              style="width: 100%" element-loading-text="数据加载中"
              border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{(page-1)*limit + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="120">
      </el-table-column>
      <el-table-column label="商品状态" width="80">
        <template slot-scope="scope">
          {{scope.row.status==='Normal'?'已发布':'未发布'}}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"></el-table-column>
      <el-table-column prop="viewCount" label="浏览数量" width="60"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="`/teacher/edit/`+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑商品基本信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="limit" :total="total"
                   style="padding: 30px;text-align: center;"
                   layout="total,prev,pager,next,jumper"
                   @current-change="getList">
    </el-pagination>
  </div>
</template>

<script>
  import course from '@/api/goods/goods'

  export default {
    data() {
      return {
        courseQuery: {},
        list: null,
        page: 1,
        limit: 10,
        total: 0,
        listLoading: false,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(page = 1) {
        this.page = page
        course.getListCoursePage(this.page, this.limit, this.courseQuery)
          .then(response => {
            this.list = response.data.rows
            this.total = response.data.total
          })
          .catch(error => {
            console.log(error)
          })
      },
      resetData() {
        this.courseQuery = {}
        this.getList()
      },
      removeDataById(courseId) {
        this.$confirm('此操作将永久删除商品记录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          course.removeCourseById(courseId)
            .then(response => {
              this.getList()
            }).catch(error => {
            console.log(error)
          })
          this.$message({
            type: 'success',
            message: '删除商品成功!'
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
