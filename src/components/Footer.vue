<template>
  <div class='footer mt-4 d-flex p-3'>
    <a href='#'><i class='fab fa-github mr-1'></i>Rita Ho</a>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name:'Footer',
  methods:{
    
  }
}
</script>



<style lang="scss" scoped>

.footer{
  height:75px;
  background-color: black;
  width:100vw;

  a{
    text-decoration: none;
    color:white;
    align-self: flex-end;
    font-size: 20px;
  }

  a:hover{
    color:#69F0AE
  }
}

</style>