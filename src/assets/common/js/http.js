/**
 * Created by 18271 on 2017/11/21.
 */
import axios from 'axios';
async function http(type,url,data,obj){
  if(!obj){
    Indicator.open();
  }else{
    obj.$store.commit('changeGifAlert',true)
  }
  try{
    var res = await axios({
      method:type,
      url:window.config.testHost+url,
      data:data,
      timeout:20000
    });
    if(res){
      if(!obj){
        Indicator.close();
      }else{
        obj.$store.commit('changeGifAlert',false)
      }
      return Promise.resolve(res)
    }else{
      if(!obj){
        Indicator.close();
      }else{
        obj.$store.commit('changeGifAlert',false)
      }
      Toast('服务器繁忙');
      return Promise.reject('服务器繁忙')
    }
  }
  catch(e){
    if(!obj){
      Indicator.close();
    }else{
      obj.$store.commit('changeGifAlert',false)
    }
    Toast('网络繁忙');
    return Promise.reject('网络繁忙')
  }
}
export default http
