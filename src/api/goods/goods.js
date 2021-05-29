import request from '@/utils/request'


export default {
  //添加商品信息
  addCourseInfo(courseInfo) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  getListTeacher(){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/teachers/findAll',
      method: 'get'
    })
  },
  //根据id查
  getCourseInfoId(id){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/course/getCourseInfo/'+id,
      method: 'get'
    })
  },
  //修改信息
  updateCourseInfo(courseInfo){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  //确认发布信息
  getPublishCourseInfo(id){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/course/getPublishCourseInfo/'+id,
      method: 'get'
    })
  },
  //发布
  publishCourse(id){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/course/publishCourse/'+id,
      method: 'post'
    })
  },
  getListCoursePage(current, limit, courseQuery){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  removeCourseById(courseId){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: `/eduService/course/deleteCourseById/${courseId}`,
      method: 'delete'
    })
  }
}

