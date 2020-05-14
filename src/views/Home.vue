<template>
  <div class="container-fluid d-flex flex-column">
    <Navbar></Navbar>
    <Latest v-if="data.length" :latest="data"></Latest>
    <LatestAuthor
      v-if="data.length"
      :latest="data"
      @addLike="addToFav"
      :likedPosts="likedPosts"
      ref="authorList"
    ></LatestAuthor>

    <Bookmark v-if='likedPosts.length !==0' :likedPosts="likedPosts" @cancelThis="cancelThat" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Latest from "../components/Latest";
import LatestAuthor from "../components/LatestAuthor";
import Bookmark from "../components/Bookmark";

/**
 * blogList:Array[3]
    0:Object
    1:Object
    2:Object

blogUrl:"https://medium.com/@its_okay/javascript-%E6%80%8E%E9%BA%BC%E5%9C%A8%E9%9B%BB%E8%85%A6%E4%B8%8A%E9%81%8B%E8%A1%8C-w3hexschool-01-dfab138084b7"

name:"Kay"

updateTime:"2020/2/18 下午 7:49:36"

 */
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Home",
  components: {
    Navbar,
    Latest,
    LatestAuthor,
    Bookmark,
    Footer
  },
  computed:{
      ...mapGetters([
        'data',
        'likedPosts',
      ])
  },
  methods: {
    ...mapActions([
      'getData',
      'editLikedLists',
      'addToLikes',
      'removeFromLikes'
    ]),
    //加入收藏
    addToFav(obj) {
      const vm = this;
      //狀態判斷: 若該文章被點擊收藏, 且該文章目前marked為false,則變為true (反之則相反)
      vm.data.forEach(author =>{
        author.blogList.forEach(post =>{
          switch(true){
            case post.title === obj.title && post.marked === false:
              post.marked = true;
              vm.addToLikes(obj);
              break;
            case post.title === obj.title && post.marked === true:
              post.marked = false;
              vm.removeFromLikes(obj);
              break;
          }
          if(post.title === obj.title && post.marked === false){

          }
        })
      })

    },
    //移除收藏
    cancelThat(item) {
      const vm = this;
      vm.data.forEach(author =>{
        author.blogList.forEach(post =>{
          if(post.url === item.url){
            post.marked = false;
            vm.removeFromLikes(item);
          }
        })
      })
    },

  },
  mounted() {
    const vm = this;    
    vm.getData();
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 0;
  margin: 0;
}
</style>
