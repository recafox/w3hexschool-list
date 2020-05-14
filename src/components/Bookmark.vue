<template>
  <div>
    <div v-if='likedPosts.length' class="container-fluid mt-4 outer-container col-10 align-self-center p-3">
      <h2 class='mb-3'>最近收藏</h2>
      <ul>
        <li class='bookmark-item' v-for='(item,index) in reverse.slice(0,10)' :key='index'>
          <a :href='item.url' target='_blank'> 
            <h4>{{item.title}}</h4>
          <p>{{item.name}}</p></a>
          <button class='btn bookmark-btn' @click.prevent='cancel(item)'>取消收藏</button>
        </li>
      </ul>
      </div>
      <div v-else class="container-fluid mt-4 outer-container col-10 align-self-center p-3">
        <h2 class='text-muted text-center'>目前沒有收藏文章</h2>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "Bookmark",
  props: ["latest", 'likedPosts'],
  data() {
    return {
      
    };
  },
  methods: {
    cancel(item){
      this.$emit('cancelThis',item);
      
    }
  },

  mounted() {

  },
  computed: {
    //讓收藏文章能以時間降冪的排序呈現
    reverse:function(){
      const vm = this;
      let reversed = vm.likedPosts.reverse();
      return reversed;
    }
  }
};
</script>

<style lang='scss' scoped>

.outer-container{
  border:2px solid black;
  padding:1.5rem;

  ul{
    list-style: none;
    padding:0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li{
      width:49%;
      background-color: gray;
      margin-bottom:10px;
      padding:1rem;
      .bookmark-btn{
        background-color: black;
        color:white;
      }
      .bookmark-btn:hover{
        background-color:#69F0AE;
      }

      a{
        color:white;
        text-decoration: none;
      }
    }
  }
}

@media(max-width:416px){
  .outer-container ul li{
    width:100%;
  }
}





</style>