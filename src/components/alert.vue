<template>
  <div class="alert_section" v-if="$store.state.alertMsg.type">
    <!--每月秒杀领取指引-->
    <div class="month_kill alert_kill" v-if="$store.state.alertMsg.type==1">
      <div class="content">
        <div class="kill_text">
          <p>领取内容：<span class="red">1000M流量卡券（省内）免费抢！</span></p>
          <p>领取时间：每周一0点开抢，24点结束；</p>
          <p>领取对象：仅限部分网龄3个月及以上的客户参与。以下客户不能参与活动获得优惠：a.未实名登记的客户；b.未使用4G USIM卡；c.低活跃客户；d.使用流量无限量套餐、5元100M、10元300M的流量套餐；e.4G随心王客户；f.万能副卡客户。<span class="red">（点击“立即抢”按钮查询参与资格）</span></p>
          <p>领取要求：</p>
          <p>1.活动每周一开展，每月用户最多只能抢一次，先到先得，抢完即止！</p>
          <p>2.用户领取成功后的流量卡券会发放至<span class="red">“深圳移动微信公众号-发现&优惠-我的卡券”</span>，用户需先关注“深圳移动”微信公众号并完成绑定，在“深圳移动微信公众号-发现&优惠-我的卡券”中使用；</p>
          <p>3.流量卡券使用有效期为领取后当月内最后一天24点，逾期不用，自动清零。</p>
        </div>
      </div>
      <span class="close"  @click="closeMask"></span>
    </div>
    <!--每月秒杀领取指引-->
    <!--每周秒杀领取指引-->
    <div class="week_kill alert_kill" v-if="$store.state.alertMsg.type==2">
      <div class="content">
        <div class="kill_text">
          <p>领取内容：<span class="red">1G流量卡券（省内）免费抢！</span></p>
          <p>领取时间：每周一0点开抢，24点结束；</p>
          <p>领取对象：仅限部分网龄3个月及以上的客户参与。以下客户不能参与活动获得优惠：a.未实名登记的客户；b.未使用4G USIM卡；c.低活跃客户；d.使用流量无限量套餐、5元100M、10元300M的流量套餐；e.4G随心王客户；f.万能副卡客户；g.已办理流量无忧包的客户。<span class="red">（点击“立即抢”按钮查询参与资格）</span></p>
          <p>领取要求：</p>
          <p>1.活动每周一开展，每周用户最多只能抢一次，先到先得，抢完即止！</p>
          <p>2.用户领取成功后的流量卡券会发放至<span class="red">“深圳移动微信公众号-发现&优惠-我的卡券”</span>，用户需先关注“深圳移动”微信公众号并完成绑定，在“深圳移动微信公众号-发现&优惠-我的卡券”中使用；</p>
          <p>3.流量卡券使用有效期为领取后当月内最后一天24点，逾期不用，自动清零。</p>
        </div>
      </div>
      <span class="close" @click="closeMask"></span>
    </div>
    <!--每周秒杀领取指引-->
    <div class="prompt_alert" v-if="$store.state.alertMsg.type==3">
        <div class="prompt_text prompt_extend" v-html="$store.state.alertMsg.text"></div>
        <div class="btn_group clearfix">
          <template v-if="$store.state.alertMsg.showCancel">
            <div class="left" @click="closeMask">取消</div>
            <div class="right" @click="$store.state.alertMsg.callback">确定</div>
          </template>
          <template v-else>
              <div class="sure" @click="$store.state.alertMsg.callback">确定</div>
          </template>
        </div>
    </div>
    <div class="prompt_alert" v-if="$store.state.alertMsg.type==4">
      <div class="prompt_text" v-html="$store.state.alertMsg.text"></div>
      <div class="btn_one" :class="$store.state.alertMsg.btnClass" @click="closeMask">确定</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods:{
      closeMask(){
    this.$store.commit('changeAlert',{})
  },
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  @import '../assets/css/alert.scss';
</style>
