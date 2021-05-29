<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="用户类别">
          <el-option :value="1" label="普通用户"></el-option>
          <el-option :value="2" label="管理员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00"></el-date-picker>
      </el-form-item>
      <el-form-item label="截至时间">
        <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截至时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00"></el-date-picker>
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
      <el-table-column prop="name" label="名称" width="90">
      </el-table-column>
      <el-table-column label="用户类别" width="80">
        <template slot-scope="scope">
          {{scope.row.level===1?'普通用户':'管理员'}}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历"></el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="`/teacher/edit/`+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="limit" :total="total"
                   style="padding: 30px;text-align: center;"
                   layout="total,prev,pager,next,jumper"
                   @current-change="getList"></el-pagination>
  </div>
</template>

<script>
  import teacher from '@/api/teacher/teacher'


  export default {
    data() {
      return {
        list: null,//查询返回集合
        page: 1,
        limit: 10,
        total: 0,
        teacherQuery: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //讲师列表
      getList(page = 1) {
        this.page = page
        teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
          .then(response => {
            //返回数据
            this.list = response.data.rows
            this.total = response.data.total
            console.log(this.list)
            console.log(this.total)
          })
          .catch(error => {
            console.log(error)
          })
      },
      resetData() {
        this.teacherQuery = {}
        this.getList()
      },
      removeDataById(id) {
        this.$confirm('此操作将永久删除该用户记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacher.deleteTeacherId(id)
            .then(response=>{
              //提示
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新
              this.getList()
            })
        })
      }
    }
  }
</script>

<style scoped>

</style>
