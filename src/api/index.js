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
  console.log(token)
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
  //发请求：axios发请求返回Promise对象
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
export const reqBindPhone = (phoneNumber) => {
  return requests({
    url: `/user/bind_phone/${phoneNumber}`,
    method: 'post',
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

//更新账号信息
export const reqUpdateAccount = (account) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/update_account',
    method: 'post',
    params: {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      phone: account.phone,
      address1: account.address1,
      address2: account.address2,
      city: account.city,
      state: account.state,
      zip: account.zip,
      country: account.country,
      languagePreference: account.languagePreference,
      favouriteCategoryId: account.favouriteCategoryId,
      listOption: account.listOption,
      bannerOption: account.bannerOption
    }
  })
}

//获取categoryList
export const reqCategoryList = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/catalog/all_category',
    method: 'get',
  })
}

//根据categoryId获取productList
export const reqProductListById = (categoryId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/categories/${categoryId}/products`,
    method: 'get',
  })
}

//根据productId获取itemList
export const reqItemListById = (productId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/products/${productId}`,
    method: 'get',
    params: {
      productId,
    }
  })
}

//根据itemId获取item
export const reqItem = (itemId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/items/${itemId}`,
    method: 'get',
  })
}

//以下为购物车相关的部分
//获取已登录账号的cart
export const reqCart = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart',
    method: 'get',
  })
}

//向购物车添加商品
export const reqAddItem = (itemId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart',
    method: 'post',
    params: {
      itemId,
    },
  })
}

//更改cartItem的checked
export const reqChangeChecked = (itemId, checked) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/changeChecked',
    method: 'post',
    params: {
      itemId,
      checked
    },
  })
}

//更新购物车商品数量
export const reqUpdateItemQuantity = (itemId, quantity) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/cartItems',
    method: 'post',
    params: {
      itemId,
      quantity
    },
  })
}

//删除购物车中的某件商品
export const reqRemoveItem = (itemId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/cartItems',
    method: 'delete',
    params: {
      itemId,
    },
  })
}

//结算并返回被选中的商品
export const reqCheckOut = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/checkout',
    method: 'post',
  })
}


//以下为与订单相关的部分
//获取已登录账号的orderList
export const reqOrderList = () => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/myOrders`,
    method: 'get',
  })
}

//生成订单并清空购物车中被选中的商品
export const reqNewOrder = (expiryDate, billToFirstName, creditCard, billToLastName, billAddress1, billAddress2, billCity, billState, billZip, billCountry, cardType, shippingAddressRequired, shipToFirstName, shipToLastName, shipAddress1, shipAddress2, shipCity, shipState, shipZip, shipCountry) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/newOrder`,
    method: 'post',
    params: {
      expiryDate,
      billToFirstName,
      creditCard,
      billToLastName,
      billAddress1,
      billAddress2,
      billCity,
      billState,
      billZip,
      billCountry,
      cardType,
      shippingAddressRequired,
      shipToFirstName,
      shipToLastName,
      shipAddress1,
      shipAddress2,
      shipCity,
      shipState,
      shipZip,
      shipCountry
    }
  })
}

//根据orderId获取order
export const reqOrderById = (orderId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/${orderId}`,
    method: 'get',
  })
}

//根据订单号获取该订单购买的商品
export const reqOrderItemList = (orderId) => {
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/${orderId}/items`,
    method: 'get',
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