import request from '@/utils/request'


export default {
  //讲师条件查询分页
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: `/eduService/teachers/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherId(id) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: `/eduService/teachers/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: `/eduService/teachers/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherInfo(id){
    return request({
      url: `/eduService/teachers/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacherInfo(teacher){
    return request({
      url: `/eduService/teachers/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}

