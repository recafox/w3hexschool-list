<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App',
  created(){
    // const url ='https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json?fbclid=IwAR11uWoLrSLDYPYXv2PH5f1StWmFo4EmyjCKbOfUx5GCa3YTldwF_rJxL5Q';
    // fetch(url).then((res)=>{
    //   return res.json();
    // }).then((data)=>{
    //   console.log(data);
    // })
  }
}
</script>
<style lang = 'scss'>
/* 路徑 */
/* @import '~bootstrap/scss/bootstrap' */
@import "./assets/all";
</style>