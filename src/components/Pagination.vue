<template>
  <div class='page-controller'>
    <button class='btn left' @click='goPrev'><i class='fas fa-caret-left'></i></button>
    <select v-model='targetPage' @change='goto'>
      <option v-for='(item, index) in totalPages' :key='index' :value="item">{{item}}</option>
    </select>
    <button class='btn right' @click='goNext'><i class='fas fa-caret-right'></i></button>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name:'Pagination',
  props:['pageSize','totalPages'],
  data(){
    return{
      targetPage:1,
    }
  },
  methods:{
    //前往指定頁面
    goto(){
      const vm = this;
      vm.$emit('gotoPage', vm.targetPage);
    },
    //前往上一頁
    goPrev(){
      const vm = this;
      if(vm.targetPage >1){
      let newPage = vm.targetPage -1;
      vm.targetPage = newPage;
      vm.$emit('gotoPage', newPage);}
    },
    //前往下一頁
    goNext(){
      const vm = this;
      if(vm.targetPage < vm.totalPages){
      let newPage = vm.targetPage +1;
      vm.targetPage = newPage;
      vm.$emit('gotoPage', newPage);}
    }
  },
  computed:{

  },
  mounted(){

  }
}
</script>



<style lang="scss" scoped>

.page-controller{
  width:40%;
  display: flex;
  align-self: center;
  justify-content: center;

  select{
    -webkit-appearance:none;
    padding: 0 1rem;
  }

  select:focus{
    outline:none;
  }

  .btn{
    -webkit-appearance:none;
    width: 44px;
    height:44px;
    background: black;
    color:white;
    font-size: 24px;
    border:none;
    padding:0;
  }
  .btn.left{
    border-radius: 0.15rem 0 0 0.15rem;
  }
  .btn.right{
    border-radius: 0 0.15rem 0.15rem 0;
  }
  .btn:hover{
    background-color: #69F0AE;
  }

  select{
    border:2px solid black;
  }
  
}
 
</style>