<template>
  <div class="experience_section">
    <ul class="production_ul">
      <li>
        <div class="header clearfix">
          <div class="left">
            流量产品
          </div>
          <div class="right week_help" @click="showWeek">
            领取指引
          </div>
        </div>
        <div class="content clearfix">
          <div class="left">
            <div class="seckill_bg week_kill">
              <span class="price">
                <s class="p_now">
                  ¥<span class="price_now">0</span>
                </s>
                <s class="p_origin">
                  ¥<span class="price_origin">5</span>
                </s>
              </span>
              <span class="date blue">4小时有效期</span>
              <span class="act">超G星期一</span>
              <span class="type">1G</span>
            </div>
            <div class="get_date">*每周可领取一次</div>
          </div>
          <div class="left">
            <p class="rest">
              剩余
              <span class="rest_num blue">{{weekCoupon}}</span>
              份
            </p>
            <p class="btn_p">
              <button class="btn blue_btn" @click="getCoupon(1)">
                立即抢
              </button>
            </p>
            <p class="desc">
              <span>每人仅限领取一次</span><br/>
              <span>领取后当月内使用有效</span>
            </p>
          </div>
        </div>
        <div class="line"></div>
      </li>
      <li>
        <div class="header clearfix">
          <div class="right month_help" @click="showMonth">
            领取指引
          </div>
        </div>
        <div class="content clearfix">
          <div class="left">
            <div class="seckill_bg month_kill">
              <span class="price">
                <s class="p_now">
                  ¥<span class="price_now">0</span>
                </s>
              </span>
              <span class="date violet">20天有效期</span>
              <span class="act">超G星期一</span>
              <span class="type">1000M</span>
            </div>
            <div class="get_date">*每月可领取一次</div>
          </div>
          <div class="left">
            <p class="rest">
              剩余
              <span class="rest_num violet">{{monthCoupon}}</span>
              份
            </p>
            <p class="btn_p">
              <button class="btn violet_btn" @click="getCoupon(2)">
                立即抢
              </button>
            </p>
            <p class="desc">
              <span>每人仅限领取一次</span><br/>
              <span>领取后当月内使用有效</span>
            </p>
          </div>
        </div>
        <div class="line"></div>
      </li>
    </ul>
    <alert></alert>
  </div>
</template>
<script type="text/ecmascript-6">
  import alert from '@/components/alert';
  import http from '@/assets/common/js/http.js';
  export default {
    data(){
    return {
      monthCoupon:0,
      weekCoupon:0,
      isMonday:null,
      color:'#066faf',
      btnType:'',
      alertTxt:'',
    }
  },
    async activated(){
    var res = await http('get','/h5/llbld_tyq/getPrizeNum',''),
      resData = res.data;
      if(resData.code == 0){
        this.monthCoupon = resData.data.month_coupon_remaining;
        this.weekCoupon = resData.data.week_coupon_remaining;
        this.isMonday = resData.data.isMonday;
      }else{
        console.log(resData.msg)
      }
  },
    methods:{
      showMonth(){
    this.$store.commit('changeAlert',{
      type:1
    })
  },
  showWeek(){
    this.$store.commit('changeAlert',{
      type:2
    })
  },
  async getCoupon(type){
        var me = this;
//        this.color = type == 1?'#066faf':'#8b8bc1';
        this.btnType = type == 1?'blue_btn':'violet_btn';
        this.alertTxt = type == 1?'1000M':'1G';
      if(this.isMonday==null){
        return
      }else if(this.isMonday == 1){
          var res = await http('get','/h5/llbld_tyq/join?type='+type,''),
              resData = res.data;
        if(resData.code == 0){
          if(type==1){
            switch(resData.data.msgType){
              case 1:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，您已成功领取1G流量卡券！请在使用有效期内前往<font color='+me.color+'>【深圳移动微信公众号-发现&优惠-我的卡券】</font>兑换使用',
                  btnClass:me.btnType
                });
                    break;
              case 2:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，您暂不符合此次优惠领取的资格！',
                  btnClass:me.btnType
                });
                break;
              case 3:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，1G流量卡券份数已抢完！更多优惠流量，尽在<font color='+me.color+'>【流量便利店－流量销售区】</font>',
                  btnClass:me.btnType
                });
                break;
              case 4:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，1G流量卡券每周只能领取一次！更多优惠流量，尽在<font color='+me.color+'>【流量便利店－流量销售区】</font>',
                  btnClass:me.btnType
                });
                break;
              default :
                    console.log(resData.msg);
                    break;
            }
          }else{
            switch(resData.data.msgType){
              case 1:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，您已成功领取1000M流量卡券！请在使用有效期内前往<font color='+me.color+'>【深圳移动微信公众号-发现&优惠-我的卡券】</font>兑换使用',
                  btnClass:me.btnType
                });
                break;
              case 2:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，您暂不符合此次优惠领取的资格！',
                  btnClass:me.btnType
                });
                break;
              case 3:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，1000M流量卡券份数已抢完！更多优惠流量，尽在<font color='+me.color+'>【流量便利店－流量销售区】</font>',
                  btnClass:me.btnType
                });
                break;
              case 4:
                this.$store.commit('changeAlert',{
                  type:4,
                  text:'客官，1000M流量卡券每月只能领取一次！更多优惠流量，尽在<font color='+me.color+'>【流量便利店－流量销售区】</font>',
                  btnClass:me.btnType
                });
                break;
              default :
                console.log(resData.msg);
                break;
            }
          }
        }else{
          console.log(resData.msg)
        }
              console.log(resData);
      }else{
        this.$store.commit('changeAlert',{
          type:4,
          text:'客官，超G星期一活动每周一准时开放，敬请期待！更多优惠流量，尽在<font color='+me.color+'>【流量便利店-流量销售区】</font>',
          btnClass:me.btnType
        })
      }
  },
    },
  deactivated(){
    this.isMonday = null;
    this.$store.commit('changeAlert',{});
  },
    components:{alert}
  }
</script>
<style lang="scss" scoped type="text/css">
  @import '../assets/css/flowExperience.scss';
</style>
