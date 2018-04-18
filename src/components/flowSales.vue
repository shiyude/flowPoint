<template>
  <div class="sales_section">
    <div class="time_limited_flow">
      <div class="header">
        限时流量包<span class="icon_do_list" :class="[{time_hide:limitedList.length>3},{time_show:limitShowOrHide}]" @click="changeLimitList"></span>
      </div>
      <div class="content clearfix">
        <div class="item left" v-for="(v,k) in hideLimitedList" @click="toDeal(v.id)">
          <span class="price">
              <s class="money_icon">¥</s>{{v.original_price-v.return_price | tofix | parseint}}{{v.unit}}
               <s class="p_origin" v-if="Number(v.return_price)">
                 ¥<s class="price_origin" v-cloak>{{v.original_price | parseint}}{{v.unit}}</s>
               </s>
             <s class="flow_desc" v-if="v.label" v-cloak>({{v.label}})</s>
          </span>
          <span class="date" v-cloak>{{v.effective_time}}有效期</span>
          <span class="tip" v-cloak>{{v.start_time | changeval}}-{{v.end_time | changeval}}可办理</span>
          <span class="type" v-cloak>{{v.size}}{{v.unit}}</span>
          <span :class="{icon_hot:v.hot ==1}"></span>
        </div>
      </div>
    </div>
    <div class="year_flow">
      <div class="header">
        流量年包<span class="icon_do_list" :class="[{year_hide:yearList.length>4},{year_show:yearShowOrHide}]" @click="changeYearList"></span>
      </div>
      <div class="content clearfix">
        <div class="item left" v-for="(v,k) in hideYearList" @click="toDeal(v.id)">
          <span class="price">
              <s class="money_icon">¥</s>{{v.original_price-v.return_price | tofix | parseint}}{{v.unit}}
            <s class="p_origin" v-if="Number(v.return_price)">
              ¥<s class="price_origin" v-cloak>{{v.original_price | parseint}}{{v.unit}}</s>
            </s>
              <s class="flow_desc" v-if="v.label" v-cloak>({{v.label}})</s>
          </span>
          <span class="date" v-cloak>{{v.effective_time}}有效期</span>
          <span class="tip" v-cloak>{{v.start_time | changeval}}-{{v.end_time | changeval}}可办理</span>
          <span class="type" v-cloak>{{v.size}}{{v.unit}}</span>
          <span :class="{icon_hot:v.hot==1}"></span>
        </div>
      </div>
    </div>
    <div class="tv_flow">
      <div class="header">
        <a href="http://dx.10086.cn/rwkllb">
          视频流量包
          <span class="icon_do_list spll-right"></span>
        </a>
      </div>
    </div>
    <div class="month_flow">
      <div class="header">
        流量月包
      </div>
      <div class="content clearfix">
        <div class="item left" v-for="(v,k) in monthList" @click="toDeal(v.id)">
          <span class="price">
              <s class="money_icon">¥</s>{{v.original_price-v.return_price | tofix | parseint}}{{v.unit}}
            <s class="p_origin" v-if="Number(v.return_price)">
              ¥<s class="price_origin" v-cloak>{{v.original_price | parseint}}{{v.unit}}</s>
            </s>
             <s class="flow_desc" v-if="v.label" v-cloak>({{v.label}})</s>
          </span>
          <span class="date" v-if="v.effective_time" v-cloak>{{v.effective_time}}有效期</span>
          <span class="tip" v-cloak>{{v.start_time | changeval}}-{{v.end_time | changeval}}可办理</span>
          <span class="type" v-cloak>{{v.size}}{{v.unit}}</span>
          <span :class="{icon_hot:v.hot==1}"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import alert from '@/components/alert';
  import http from '@/assets/common/js/http.js';
  export default {
    data(){
      return {
//        hideLimitedList:[
//          {
//            effective_time: "7天",
//            end_time: "03-31",
//            id:null,
//            label: "流量特惠包",
//            original_price: "19.99",
//            return_price: "0",
//            size: "2G",
//            start_time: "01-01",
//            size:'20G',
//            hot:'1',
//            unit:''
//          }
//        ],
        hideLimitedList:[],
        limitedList:[],
        hideYearList:[],
        yearList:[],
        monthList:[],
        yearShowOrHide:false,
        limitShowOrHide:false
      }
    },
   async activated(){
    var res = await http('get','/h5/llbld/getGoodsList',''),
        resData = res.data;
     if(resData.code == 0){
       for(var i = 0;i<resData.data.length;i++){
         if(resData.data[i].type==1){
           this.limitedList.push(resData.data[i]);
         }
         else if(resData.data[i].type==2){
           this.yearList.push(resData.data[i]);
         }
         else if(resData.data[i].type==3){
           this.monthList.push(resData.data[i])
         }
       }
       this.hideYearList = this.yearList.length>4?this.yearList.slice(0,4):this.yearList;
       this.hideLimitedList = this.limitedList.length>4?this.limitedList.slice(0,4):this.limitedList;
//       this.hideLimitedList = this.limitedList.length>3?this.hideLimitedList.concat(this.limitedList.slice(0,3)):this.hideLimitedList.concat(this.limitedList);
     }else{
       Toast('加载失败')
     }
  },
  methods:{
    toDeal(id){
      if(id === null){
        window.location.href='http://icmcc.mail.10086.cn/MailOffice/wap/Channelsales/mgyd?channel=GDMIGUZZB20&pcode=GDMGYDZZ&page=0';
      }else{
        this.$router.push({
          path:'/flowDetail',
          query:{
            id:id
          }
        })
      }
    },
    changeYearList(){
      if(this.yearList.length<4 || this.yearList.length==4){
        return
      }
      this.yearShowOrHide = !this.yearShowOrHide
    },
    changeLimitList(){
//      if(this.limitedList.length<3 || this.limitedList.length==3){
//        return
//      }
      if(this.limitedList.length<4 || this.limitedList.length==4){
        return
      }
      this.limitShowOrHide = !this.limitShowOrHide
    }
  },
  filters:{
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

    },
    changeval(v){
      return v.replace('-','.')
    },
    tofix(v){
      var arr = String(v).split('.');
      if(arr.length == 2){
        return v.toFixed(2)
      }else if(arr.length == 1){
        return v
      }else{
        return
      }
    }
  },
  watch:{
    yearShowOrHide(now){
      if(now){
        this.hideYearList = this.yearList;
      }else{
        this.hideYearList = this.yearList.slice(0,4)
      }
    },
    limitShowOrHide(now){
//        this.hideLimitedList = [
//          {
//            effective_time: "7天",
//            end_time: "03-31",
//            id:null,
//            label: "流量特惠包",
//            original_price: "19.99",
//            return_price: "0",
//            size: "2G",
//            start_time: "01-01",
//            size:'20G',
//            hot:'1',
//            unit:''
//          }
//        ];
      if(now){
//        this.hideLimitedList = this.hideLimitedList.concat(this.limitedList);
        this.hideLimitedList = this.limitedList;
      }else{
//        this.hideLimitedList = this.hideLimitedList.concat(this.limitedList.slice(0,3))
        this.hideLimitedList = this.limitedList.slice(0,4)
      }
    }
  },
  deactivated(){
      this.limitedList = [];
      this.yearList = [];
      this.monthList = [];
//      this.hideLimitedList = [
//        {
//          effective_time: "7天",
//          end_time: "03-31",
//          id:null,
//          label: "流量特惠包",
//          original_price: "19.99",
//          return_price: "0",
//          size: "2G",
//          start_time: "01-01",
//          size:'20G',
//          hot:'1',
//          unit:''
//        }
//      ];
      this.hideLimitedList = [];
      this.hideYearList = [];
      this.yearShowOrHide = false;
      this.limitShowOrHide = false
  },
  beforeRouteLeave(to,from,next){
    if(to.path=='/flowDetail'){
      document.title = '办理页面';
    }else{
      document.title = '流量便利店';
    }
    next()
  }
  }
</script>
<style lang="scss" scoped type="text/css">
  @import '../assets/css/flowSales.scss';
</style>
