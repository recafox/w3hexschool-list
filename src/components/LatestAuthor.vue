<template>
  <div class="container-fluid d-flex flex-column">
    <h2 class="mt-2 ml-auto mr-5" v-if="fullWidth<376 || fullWidth<415">
      <i class="fas fa-caret-right"></i>最近更新
    </h2>
    <div class="row author-container col-10 align-self-center">
      <div class="col-2 update-title">
        <h2>最近更新</h2>
      </div>
      <div class="name-container d-flex">
        <ul>
          <li class="author-box" v-for="item in latest.slice(0, 12)" :key="item.timeStamp">
            <!-- 限定渲染數量 -->
            <div>{{item.name}}</div>
            <button class="name-btn" @click.prevent="openModal(item)">
              <i class="fas fa-caret-right"></i>
            </button>
          </li>
        </ul>
      </div>
      <div v-if="fullWidth<415" class="name-container d-flex">
        <ul>
          <li class="author-box" v-for="item in latest.slice(13, 25)" :key="item.timeStamp">
            <!-- 限定渲染數量 -->
            <div>{{item.name}}</div>
            <button class="name-btn" @click.prevent="openModal(item)">
              <i class="fas fa-caret-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="authorModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{tempModal.name}} - 文章列表</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>最近更新：{{tempModal.updateTime}}</span>
            <table class="table mt-2 table-striped" ref="table">
              <thead>
                <th>文章名稱</th>
                <th class="80">收藏</th>
              </thead>
              <tbody>
                <tr v-for="(item,key) in tempModal.blogList" :key="item+key">
                  <td>
                    <a :href="item.url" target='_blank' style="color:black">{{item.title}}</a>
                  </td>
                  <td>
                    <button class='like-button' v-if='item.marked' @click.prevent="addToLike(item.title, item.url, tempModal.name)">
                      <i class='fas fa-heart'></i> 
                      </button>
                    <button v-else class='like-button' @click.prevent="addToLike(item.title, item.url, tempModal.name)"><i class='far fa-heart'></i></button>
                    
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal ends -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "LatestAuthor",
  props: ["latest", "likePost"],

  data() {
    return {
      data: [],
      tempModal: {
        author: {
          isLiked: null,
          name: ""
        },
        blogList: [{ marked: null, title: "", url: "" }],
        blogUrl: "",
        name: "",
        timeStamp: "",
        updateTime: ""
      },
      fullWidth: "",

    };
  },
  methods: {
    openModal(item) {
      const vm = this;
      vm.tempModal = Object.assign({}, item);
      $("#authorModal").modal("show");
    },
    //將目前點擊愛心的文章包裝成物件emit到根實例
    addToLike(title, url, name) {
      const vm = this;
      let obj = {
        title: title,
        url: url,
        name: name,
      };
      vm.$emit("addLike", obj);
      $('#authorModal').modal('hide');
      
    }
  },
  computed: {
   
  },

  mounted() {
    const vm = this;
    //響應式:監控目前螢幕寬度
    vm.fullWidth = window.innerWidth;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
    };
  }
};
</script>

<style lang='scss' scoped>
.author-container {
  margin-top: 1.5rem;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 0;

  .update-title {
    border-right: 2px solid black;
    font-size: 2rem;
    letter-spacing: 0.5rem;
    display: inline-block;
    padding: 1.5rem;
    text-align: center;
    align-items: center;
    display: flex;

    h2 {
      width: 6rem;
    }
  }

  .name-container {
    width: 70%;
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .author-box {
    display: flex;
    margin: 0.5rem;

    div {
      background-color: lightgray;
      padding: 0.5rem;
    }

    .name-btn {
      width: 44px;
      background-color: black;
      color: white;
      font-size: 24px;
      outline: none;
      border: none;
      border-radius: 0 0.25rem 0.25rem 0;
    }
    .name-btn:hover {
      background-color: #69f0ae;
    }
  }
}
.like-button{
  background-color: transparent;
  border:none;
  font-size: 20px;
}

@media (max-width: 415px) {
  .author-container {
    margin-top: 0px;

    .update-title {
      display: none;
      h2 {
        display: none;
      }
    }
    .name-container {
      width: 350px;
      overflow-x: auto;
    }
    ul {
      display: block;
      margin: 0;
      overflow-x: auto;
      white-space: nowrap;
      .author-box {
        display: inline-flex;
      }
    }
    ul::-webkit-scrollbar {
      height: 0 !important;
    }
  }
}
</style>