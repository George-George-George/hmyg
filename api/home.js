import fly from '../utils/request.js'



export const getBanners = () => fly.get('home/swiperdata')

export const getNavList = () => fly.get('home/catitems')

export const getFloorsList = () => fly.get('home/floordata')
