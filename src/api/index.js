//当前这个模块，API进行统一管理
import requests from "./request";
import externalAPI from "./external";

//以下为与账号相关的部分
//使用账号密码进行登录
export const reqLoginByAccount = (userName, password) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/login_by_account',
    method: 'post',
    data: {
      userName,
      password,
    }
  })
}

//获取已登录的账号
export const reqLoginAccount = (token) => {
  return requests({
    url: '/user/get_login_user',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

//获取图片验证码
export const reqCaptcha = () => {
  return requests({
    url: '/user/captcha',
    method: 'get',
  })
}

//判断用户名是否被占用
export const reqUserName = (userName) => {
  return requests({
    url: `/user/username/${userName}`,
    method: 'get'
  })
}

//注册
export const reqRegister = (userName, password) => {
  return requests({
    url: '/user/register',
    method: 'post',
    data: {
      userName,
      password,
    }
  })
}

//下线
export const reqSignOut = (token) => {
  return requests({
    url: '/user/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

//获取手机验证码
export const reqPhoneCode = (phoneNumber) => {
  return requests({
    url: '/user/phone_code',
    method: 'post',
    params: {
      phoneNumber
    }
  })
}

//检查手机号是否存在
export const reqCheckPhone = (phoneNumber) => {
  return requests({
    url: `/user/check_phone/${phoneNumber}`,
    method: 'get',
  })
}

//为当前帐号绑定手机号
export const reqBindPhone = (phoneNumber, token) => {
  return requests({
    url: `/user/bind_phone/${phoneNumber}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}

//使用手机号进行登录
export const reqLoginByPhone = (phoneNumber) => {
  return requests({
    url: '/user/login_by_phone',
    method: 'post',
    params: {
      phoneNumber,
    }
  })
}

//修改密码
export const reqModifyPassword = (oldPwd, newPwd, token) => {
  return requests({
    url: '/user/password',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    params: {
      oldPwd,
      newPwd
    }
  })
}

//更新账号信息
export const reqUpdateAccount = (user, token) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/user_info',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: user
  })
}



//以下为报修相关
//提交报修单
export const reqSubmitRepair = (repair, token) => {
  return requests({
    url: '/repair/submit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: repair
  })
}
//查看个人的所有报修记录
export const reqGetMyLogs = (token) => {
  return requests({
    url: '/repair/my_logs',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}
//修改某个报修的信息
export const reqUpdateRepair = (repair, token) => {
  return requests({
    url: '/repair/my_logs',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: repair
  })
}

//以下为与论坛相关的部分
//创建话题
export const reqCreateTopic = (topic, token) => {
  return requests({
    url: '/forum/topic',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: topic
  })
}
//获取所有话题
export const reqGetAllTopic = (token) => {
  return requests({
    url: '/forum/topic',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
}


// 以下是跟聊天室有关的
//根据关键词搜索用户
export const reqFindUsers = (keyword) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/find_users`,
    method: 'get',
    params: {
      keyword,
    }
  })
}

//根据关键词搜索群组
export const reqFindGroups = (keyword) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/find_groups`,
    method: 'get',
    params: {
      keyword,
    }
  })
}

//添加一位好友
export const reqAddFriend = (friendName) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/add_friend`,
    method: 'post',
    params: {
      friendName,
    }
  })
}

//进入一个群组
export const reqEnterGroup = (groupId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/enter_group`,
    method: 'post',
    params: {
      groupId,
    }
  })
}

//创建一个群
export const reqCreateGroup = (groupId, groupName) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/create_group`,
    method: 'post',
    params: {
      groupId,
      groupName
    }
  })
}

//获取自己的好友和群列表
export const reqFriendsAndGroups = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/get_friends_and_groups`,
    method: 'get',
  })
}


//获取用户的历史信息：
export const getHistoryMessages = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/chat/historyMessages`,
    method: 'get'
  })

}

//添加历史消息
export const addHistoryMessage =
  (messageId, status, type, sendTime, content, toContactId, userId, displayName, avatar) => {
    //发请求：axios发请求返回Promise对象
    return requests({
      url: `/chat/add_history_message`,
      method: 'post',
      params: {
        messageId,
        status,
        type,
        sendTime,
        content,
        toContactId,
        userId,
        displayName,
        avatar
      }
    })

  }

//以下为健康打卡部分
//健康打卡的消息传递
export const healthCheckSubmit = (uid, temp,
  location, time,
  other_info, area_level, token) => {
  return requests({
    url: '/health/submit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: {
      uid,
      temp,
      location,
      time,
      other_info,
      area_level
    }
  })
}

//下面是志愿者管理模块
//获取志愿者信息
export const volunteerGetter = (token) =>{
  return requests({
    url: '/volunteer/get_volunteer',
    method: 'get',
    headers:{
      'Content-Type': 'application/json',
      token
    }
  })
}

//上传志愿者信息
export const volunteerApply = (uid, name, free_time, token) =>{
  return requests({
    url: '/volunteer/apply',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    },
    data:{
      uid,
      name,
      free_time
    }
  })
}

//接收志愿服务任务
export const volunteerMissionGet = (token, volunteer, name, id, free_time, total_time, uid) => {
  return requests({
    url: '/volunteer/get_volunteer_tasks',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: volunteer
  })
}

//接受志愿服务（按照id将所接任务传给后端）
export const volunteerTaskTake = (token, volunteerLog) => {
  return requests({
    url: 'volunteer/take_volunteer',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    },
    data:volunteerLog
  })
}

//以下是车辆管理模块
//获取车辆
export const getCar = (token) =>{
  return requests({
    url: '/parking/own',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    }
  })
}

//获取停车记录
export const getParkRecord = (token, car) => {
  return requests({
    url: '/parking/park_info',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    },
    data: car
  })
}

//停车
export const park = (token, id) => {
  return requests({
    url: '/parking/park',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    },
    params:{
      id
    }
  })
}

//离开
export const leave = (token, id) => {
  return requests({
    url: '/parking/leave',
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
      token
    },
    params:{
      id
    }
  })
}

