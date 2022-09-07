import fly from '../utils/request.js'



export const getGoodList = (data) => fly.get('goods/search', data)
