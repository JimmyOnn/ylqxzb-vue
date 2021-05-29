import request from '@/utils/request'


export default {
  //添加商品信息
  getAllChapterVideo(courseId) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/chapter/getChapterVideo/' + courseId,
      method: 'get'
    })
  },
  addChapter(chapter) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/chapter/addChapter',
      method: 'post',
      data: chapter
    })
  },
  getChapter(chapterId) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/chapter/getChapterInfo/' + chapterId,
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/chapter/' + chapterId,
      method: 'delete'
    })
  }
}

