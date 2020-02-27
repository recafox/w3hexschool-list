<template>
  <div class='search-bar'>
    <button @click='refresh' class='btn left'><i class="fas fa-redo-alt"></i></button>
    <input type="text" v-model='filterText' placeholder="請輸入關鍵字">
    <button class='btn right' @click.prevent='sendText'><i class='fas fa-search'></i></button>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name:'Searchbar',
  data(){
    return{
      filterText:''
    }
  },
  methods:{
    sendText(){
      const vm = this;
      vm.$emit('search', vm.filterText);

    },
    refresh(){
      const vm = this;
      vm.filterText = '';
      vm.$emit('search', vm.filterText)
    }
    
  }
}
</script>



<style lang="scss" scoped>
  .search-bar{ 
    width:50%;
    height:45px;
    display: flex;
    justify-content: center;
    input{
      border:2px solid black;
      width:90%;
      height:100%;
      padding-left:1rem;
      font-size: 20px;
    }
    input:focus{
      outline:none;
      border:#69F0AE 2px solid;
    }

    .btn{
      width:15%;
      height:100%;
      background-color: black;
      color:white;
      border:none;
      outline:none;
      font-size: 24px;
      padding:0;
      
    }
    .btn:hover{
      background-color: #69F0AE;
    }
    .btn:focus{
      -webkit-box-shadow:none;
      box-shadow: none;
    }
    .btn.left{
      border-radius: 0.25rem 0 0 0.25rem;
    }
    .btn.right{
      border-radius: 0 0.25rem 0.25rem 0;
    }
    
  }

  @media (max-width: 416px){
    .search-bar{
      width:90%;

      button{
        width:15%;
      }
      .btn:focus{
        -webkit-box-shadow:none;
        box-shadow: none;
      }
    
    }
  }
</style>