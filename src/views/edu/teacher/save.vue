<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="用户名称">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="用户排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="用户类别">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="普通用户"></el-option>
          <el-option :value="2" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户资历">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="用户简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"></el-input>
      </el-form-item>

      <!--头像-->
      <el-form-item label="用户头像">
        <pan-thumb :image="String(teacher.avatar)"></pan-thumb>
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <image-cropper v-show="imagecropperShow"
                       :width="300"
                       :height="300"
                       :key="imagecropperKey"
                       :url="BASE_API+`/eduOss/fileOss`"
                       field="file"
                       @close="close"
                       @crop-upload-success="cropSuccess"></image-cropper>

      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import teacherApi from '@/api/teacher/teacher'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: {
      ImageCropper,
      PanThumb
    },
    data() {
      return {
        teacher: {
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: ''
        },
        saveBtnDisabled: false,
        imagecropperShow: false,
        imagecropperKey: 0,
        BASE_API: process.env.BASE_API
      }
    },
    created() {
      this.init()
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    methods: {
      close() {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey+1
      },
      cropSuccess(data) {
        this.imagecropperShow = false
        this.teacher.avatar = data.url
        this.imagecropperKey = this.imagecropperKey+1
      },
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getInfo(id)
        } else {
          this.teacher = {}
        }
      },
      getInfo(id) {
        teacherApi.getTeacherInfo(id)
          .then(response => {
            this.teacher = response.data.teacher
          })
      },
      saveOrUpdate() {
        //判断修改还是添加
        if (!this.teacher.id) {
          this.saveTeacher()
        } else {
          this.updateTeacher()
        }
      },
      updateTeacher() {
        teacherApi.updateTeacherInfo(this.teacher)
          .then(response => {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            //回到列表
            this.$router.push({path: '/teacher/table'})
          })
      },
      //添加
      saveTeacher() {
        teacherApi.addTeacher(this.teacher)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            //回到列表
            this.$router.push({path: '/teacher/table'})
          })
      }
    }
  }
</script>

<style scoped>

</style>
