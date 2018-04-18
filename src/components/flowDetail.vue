<template>
  <div class="flow_detail">
    <div class="header">
      <div class="title" v-cloak>
        {{changeTitle}}办理：
      </div>
      <template v-if="type==1 || type==2">
        <div class="card card1">
          <p>
            <em>流量：</em>
            <span v-cloak v-if="size">{{size}}{{unit}}</span>
          </p>
          <p>
            <em>价格：</em>
            <span v-cloak v-if="originalPrice">{{originalPrice | parseint}}元{{unit}}</span>
          </p>
          <p>
            <em>有效期：</em>
            <span v-cloak v-if="effectiveTime">{{effectiveTime}}</span>
          </p>
        </div>
      </template>
      <!--<template v-else-if="type==2">-->
        <!--<div class="card card1">-->
          <!--<p>-->
            <!--<em>流量：</em>-->
            <!--<span v-cloak v-if="size">{{size}}{{unit}}</span>-->
          <!--</p>-->
          <!--<p>-->
            <!--<em>价格：</em>-->
            <!--<span v-cloak v-if="originalPrice">{{originalPrice | parseint}}元{{unit}}</span>-->
          <!--</p>-->
          <!--<p>-->
            <!--<em>有效期：</em>-->
            <!--<span v-cloak v-if="effectiveTime">{{effectiveTime}}</span>-->
          <!--</p>-->
        <!--</div>-->
      <!--</template>-->
      <template v-else>
        <div class="card card2">
          <p>
            <em>流量：</em>
            <span v-cloak v-if="size">{{size}}{{unit}}</span>
          </p>
          <p>
            <em>价格：</em>
            <span v-cloak v-if="originalPrice">{{originalPrice | parseint}}元{{unit}}</span>
          </p>
        </div>
      </template>
        <div class="desc clearfix">
          <em class="left">{{label}}：</em>
          <span class="left" style="font-size:.3rem">{{tips}}</span>
        </div>
      <div class="agreement">
        <span :class="{yes_check:check}" @click="changeCheck">我已阅知<a @click.stop="toDetails">《业务{{ruleOrProtocal | text}}》</a>并同意办理</span>
      </div>
      <button type="button" class="btn btn_handle" :class="{btn_active:check}" @click="dealNow">立即办理</button>
    </div>
    <div class="content">
      <div class="menu">
        <ul class="clearfix">
          <li class="left" :class="{active:initIndex==1}" @click="changeInit(1)">资费详情</li>
          <li class="left" :class="{active:initIndex==2}" @click="changeInit(2)">温馨提示</li>
        </ul>
      </div>
      <div class="detail">
        <div class="desc" v-if="initIndex==1">
          <div v-html="details">
          </div>
        </div>
        <div class="tips" v-if="initIndex==2" v-html="prompt">
        </div>
      </div>
    </div>
    <alert></alert>
    <!--lodding-->
    <div class="masking" v-if="$store.state.gifAlert">
      <img alt="" src="http://szcdn.szydweixin.com/szwx/flowpoint/images/order.gif"/>
    </div>
    <!--lodding-->
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '@/assets/common/js/http.js';
  import axios from 'axios';
  import alert from '@/components/alert.vue';
  export default {
    data(){
    return{
      initIndex:1,
      size:'',
      originalPrice:'',
      effectiveTime:'',
      ruleOrProtocal:'1',
      protocal:'',
      details:'',
      prompt:'',
      tips:'',
      check:false,
      secondBomo:'',
      isToAjax:false,
      type:'2',
      unit:'',
      label:'',
      isFirstEnter:false// 是否第一次进入，默认false
    }
  },
    created(){
      this.isFirstEnter = true;
  },
  beforeRouteEnter(to,from,next){
    if(from.path==='/details'){
      to.meta.isBack = true;
    }
    next();
  },
  activated(){
    if(!this.$route.meta.isBack||this.isFirstEnter){
        this.size = '';
        this.originalPrice = '';
        this.effectiveTime = '';
        this.ruleOrProtocal = '1';
        this.details = '';
        this.prompt = '';
        this.tips = '';
        this.unit = '';
        this.label = '';
        this.getData()
    }
    this.$route.meta.isBack = false;
    this.isFirstEnter=false;
  },
  methods:{
    async getData(){
      var id = this.$route.query.id,
        me = this,
        res = await http('get','/h5/llbld/getGoodsDetails?id='+id,''),
        resData = res.data;
        if(resData.code == 1){
          this.$store.commit('changeAlert',{
            type:3,
            text:resData.msg,
            callback:function(){
              me.$router.back();
            }
          })
        }else if(resData.code == 0){
          this.isToAjax = true;
        }
      if(Array.isArray(resData.data)){
          return
      }else {
        this.size = resData.data.size;
        this.originalPrice = resData.data.original_price;
        this.effectiveTime = resData.data.effective_time;
        this.type = resData.data.type;
        this.ruleOrProtocal = resData.data.rule_or_protocal;
        this.protocal = Base64.decode(decodeURIComponent(resData.data.protocal));
        this.details = (Base64.decode(decodeURIComponent(resData.data.details))).replace(/<br>/g,'');
        this.prompt = Base64.decode(decodeURIComponent(resData.data.prompt));
        this.tips = resData.data.tips;
        this.label = resData.data.label;
        this.unit = resData.data.unit;
        this.secondBomo = resData.data.second_bomo;
        this.$store.commit('changeRuleText',{
          title: this.ruleOrProtocal==1?'规则':'协议',
          content:this.protocal
        });
        axios.get(window.config.testHost+'/h5/llbld/justSendGet')
          .then(function(response){
            console.log(response);
          })
          .catch(function(err){
            console.log(err);
          });
      }
    },
    changeInit(type){
      this.initIndex = type
    },
    toDetails(){
      this.check = true;
      this.$router.push({
        path:'/details'
      })
    },
    changeCheck(){
      this.check = !this.check;
    },
    dealNow(){
      var me = this;
      if(this.check&&this.isToAjax){
        this.$store.commit('changeAlert',{
          type:3,
          text:me.secondBomo,
          showCancel:true,
          callback:async function(){
            me.$store.commit('changeAlert',{});
            var res = await http('get','/h5/llbld/hand?id='+me.$route.query.id,'',me);
            me.$store.commit('changeAlert',{
              type:3,
              text:res.data.msg,
              callback:function(){
                me.$store.commit('changeAlert',{});
              }
            })
          }
        })

      }else{
        return
      }
    }
  },
  filters:{
    text(v){
      return v==='1'?'规则':'协议';
    },
    parseint(v){
      var arr = String(v).split('.');
      if(arr.length){
        if(arr[1]==='00'){
          return parseInt(v)
        }else{
          return v
        }
      }else {
        return
      }
    }
  },
  computed:{
    changeTitle(){
      if(this.type == 1){
        return '流量限时包'
      }else if(this.type == 2){
        return '流量年包'
      }else if(this.type == 3){
        return '流量月包'
      }else {
        return
      }
    }
  },
  deactivated(){
    this.initIndex = 1;
    this.$store.commit('changeAlert',{});
    this.$store.commit('changeGifAlert',false);
  },
  components:{alert},
  beforeRouteLeave(to,from,next){
    if(to.path=='/flowSales'){
      this.check = false;
      this.isToAjax = false;
      document.title = '流量便利店'
    }else if(to.path=='/details'){
      document.title = '业务'+(this.ruleOrProtocal==1?'规则':'协议');
    }
    next();
  }
  }
</script>
<style lang="scss" scoped type="text/css">
  @import "../assets/css/flowDetail.scss";
</style>
