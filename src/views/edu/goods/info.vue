import teacher from "../../../api/teacher/teacher";
<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新商品</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写商品基本信息"></el-step>
      <el-step title="创建商品描述"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="商品标题">
        <el-input v-model="courseInfo.title" placeholder="示例：商品描述"></el-input>
      </el-form-item>


      <!--所属人-->
      <el-form-item label="商品管理人">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList"
                     :key="teacher.id"
                     :label="teacher.name"
                     :value="teacher.id"></el-option>
        </el-select>
      </el-form-item>

      <!--分类-->
      <el-form-item label="商品分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="请选择"
                   @change="subjectLevelOneChange">
          <el-option v-for="subject in subjectOneList"
                     :key="subject.id"
                     :label="subject.title"
                     :value="subject.id"></el-option>
        </el-select>

        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option v-for="subject in subjectTwoList"
                     :key="subject.id"
                     :label="subject.title"
                     :value="subject.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                         placeholder=""></el-input-number>
      </el-form-item>
      <!--商品简介-->
      <el-form-item label="商品描述">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>


      <!--商品封面-->
      <el-form-item label="商品封面">
        <el-upload :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :action="BASE_API+'/eduOss/fileOss'"
                   class="avatar-uploader"
        >
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>


      <el-form-item label="商品价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import course from '@/api/goods/goods'
  import subject from '@/api/subject/subject'
  import Tinymce from '@/components/Tinymce'

  export default {
    components: {Tinymce},
    data() {
      return {
        saveBtnDisabled: false,
        courseInfo: {
          title: '',
          subjectId: '',
          teacherId: '',
          lessonNum: '',
          description: '',
          cover: '/static/test.jpg',
          price: 0,
          subjectParentId: ''
        },
        courseId: '',
        BASE_API: process.env.BASE_API,
        teacherList: [],
        subjectOneList: [],
        subjectTwoList: []
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getInfo()
      } else {
        this.getListTeacher()
        this.getOneSubject()
      }
    },
    methods: {
      //回显
      getInfo() {
        course.getCourseInfoId(this.courseId)
          .then(response => {
            this.courseInfo = response.data.courseInfoVo
            subject.getSubjectList()
              .then(response => {
                this.subjectOneList = response.data.list
                for (let i = 0; i < this.subjectOneList.length; i++) {
                  let oneSubject = this.subjectOneList[i]
                  if (this.courseInfo.subjectParentId == oneSubject.id) {
                    this.subjectTwoList = oneSubject.children
                  }
                }
              })
            this.getListTeacher()
          })
      },
      handleAvatarSuccess(res, file) {
        this.courseInfo.cover = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jepg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能是JPG格式！')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过2MB！')
        }
        return isJPG && isLt2M
      },
      subjectLevelOneChange(value) {
        for (let i = 0; i < this.subjectOneList.length; i++) {
          let oneSubject = this.subjectOneList[i]
          if (value === oneSubject.id) {
            this.subjectTwoList = oneSubject.children
            this.courseInfo.subjectId = ''
          }
        }
      },
      getOneSubject() {
        subject.getSubjectList()
          .then(response => {
            this.subjectOneList = response.data.list
          })
      },
      getListTeacher() {
        course.getListTeacher()
          .then(response => {
            this.teacherList = response.data.items
          })
      },
      addCourse() {
        course.addCourseInfo(this.courseInfo)
          .then(response => {
            this.$message({
              type: 'success',
              message: '添加商品信息成功'
            });
            this.$router.push({path: '/goods/chapter/' + response.data.courseId})
          })
      },
      updateCourse() {
        course.updateCourseInfo(this.courseInfo)
          .then(response => {
            this.$message({
              type: 'success',
              message: '修改商品信息成功'
            });
            this.$router.push({path: '/goods/chapter/' + this.courseId})
          })
      },
      saveOrUpdate() {
        //this.courseInfo = {}
        if (!this.courseInfo.id) {
          this.addCourse()
        } else {
          this.updateCourse()
        }
      }
    }
  }
</script>

<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
</style>
