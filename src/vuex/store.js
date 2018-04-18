/**
 * Created by 18271 on 2017/11/21.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export  default new Vuex.Store({
  state:{
    alertMsg:{},//办理弹窗,
    ruleText:{},//业务规则
    gifAlert:false
  },
  mutations:{
    changeAlert(state,obj){
      state.alertMsg = obj
    },
    changeRuleText(state,obj){
      state.ruleText = obj;
    },
    changeGifAlert(state,boolean){
      state.gifAlert = boolean
    }
  }
})
