import request from '@/utils/request'


export default {
  //添加商品信息
  addVideo(video) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/video/addVideo',
      method: 'post',
      data: video
    })
  },
  deleteVideo(id) {
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/video/' + id,
      method: 'delete'
    })
  },
  updateVideo(video){
    return request({
      //url: '/eduService/teachers/pageTeacherCondition',
      url: '/eduService/video/updateVideo',
      method: 'post',
      data: video
    })
  }
}

