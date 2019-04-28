<template>
  <div class="cartcontrol">
    <transition name="fade"  mode="out-in">
      <div class="cart-decrease icon-remove_circle_outline" v-if="food.count>0" @click.stop.prevent="decreaseCart">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: "cartcontrol",
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event){
        if (!this.food.count) {
          //因为vue的机制问题无法在object中识别到count属性，所以不会发生任何变化
          //要么在初始化的时候添加count字段要么像下面一样操作
          // this.food.count = 1
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++
        }

        // this.$dispatch('cart.add', event.target);
      },
      decreaseCart(event) {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .cartcontrol
    font-size: 0
    .cart-decrease,.cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

</style>
