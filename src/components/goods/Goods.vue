<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title"> {{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods"  class="food-item border-1px" @click="detail(food)">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span  class="now">￥{{food.price}}</span>
                  <span  class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :select-foods="selectFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"></shopcart>
  </div>

</template>

<script>
  import cartcontrol from '@/components/cartcontrol/cartcontrol';
  import shopcart from '@/components/shopcart/shopcart';
  import BScroll from 'better-scroll';

  export default {
    components: {
      cartcontrol,
      shopcart
    },
    name: "Goods",
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
      };
    },
    methods:{
      detail(food){
        this.$router.push({'name':'foodDetail',query:{food:JSON.stringify(food)}})
      },
      //点击菜单栏对应滚动到菜单list
      selectMenu(index, event){
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      //初始化滚动试图
      initScroll(){
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.goods = response.data;
          this.$nextTick(() => {
            this.initScroll();
            // this._calculateHeight();
          });
        }
      });
    },
    computed:{
      //计算已经选中的食物
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/minxin"

  .goods
    position absolute
    display flex
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
  .foods-wrapper
    flex 1
    .title
      font-size 12px
      color: rgb(147,153,159)
      line-height 26px
      padding-left 14px
      height 26px
      background f3f5f7
      border-left 2px solid #d9dde1
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
      .icon
        flex 0 0 57px
        margin-right 18px
      .content
        flex 1
        .name
          font-size 14px
          color: rgb(7,17,27)
          line-height 14px
          height 14px
          margin 2px 0 8px 0
        .desc, .extra
          font-size 10px
          line-height 10px
          color: rgb(147,153,159)
        .desc
          margin-bottom 8px
        .extra
          &.sellCount
            margin-right 12px
        .price
          font-weight 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
