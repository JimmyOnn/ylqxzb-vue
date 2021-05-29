import request from '@/utils/request'


export default {
  //商品分类列表
  getSubjectList() {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/subject/getAllSubject',
      method: 'get'
    })
  }
}

