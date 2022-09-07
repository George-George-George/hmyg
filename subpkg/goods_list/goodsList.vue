<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, i) in goods" :key="i">
        <view @click="toGoodsDetail(goods.goods_id)" class="goods-item">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import {
    getGoodList
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        isLoading: false,
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      toGoodsDetail(id) {
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?id=" + id
        })
      },
      async getGoodList(stop) {
        this.isLoading = true
        const res = await getGoodList(this.queryObj)
        const {
          goods,
          total
        } = res.message
        this.goods = [...this.goods, ...goods],
          this.total = total
        this.isLoading = false
        stop && stop()
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodList()
    },
    onPullDownRefresh() {
      this.queryObj = {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        this.goods = [],
        this.total = '',
        this.defaultPic = ''
      this.getGoodList(() => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      if (this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodList()
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
