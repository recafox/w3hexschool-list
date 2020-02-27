<template>
  <div class="container-fluid d-flex flex-column">
    <div v-if="data.length" class="row carousel-container mt-4 col-10">
      <h2 class="mt-2">最新文章</h2>
      <div class="container d-flex mb-2">
        <div id="carouselExampleControls" class="carousel slide col-sm-6 mr-sm-1" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="carousel-content">
                <a :href="latest[0].blogList[latest[0].blogList.length-1].url" target="_blank">
                  <h3 class="mt-3">{{latest[0].blogList[latest[0].blogList.length-1].title}}</h3>
                  <h4 :class='{"mt-3":latest.length}'>{{latest[0].name}}</h4>
                  <span>{{latest[0].updateTime}}</span>
                </a>
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-content">
                <a  :href="latest[1].blogList[latest[1].blogList.length-1].url" target="_blank">
                  <h3 class="mt-3">{{latest[1].blogList[latest[1].blogList.length-1].title}}</h3>
                  <h4 :class='{"mt-3":latest.length}'>{{latest[1].name}}</h4>
                  <span>{{latest[1].updateTime}}</span>
                </a>
              </div>
            </div>
             <div class="carousel-item">
              <div class="carousel-content">
                <a  :href="latest[2].blogList[latest[2].blogList.length-1].url" target="_blank">
                  <h3 class="mt-3">{{latest[2].blogList[latest[2].blogList.length-1].title}}</h3>
                  <h4 :class='{"mt-3":latest.length}'>{{latest[2].name}}</h4>
                  <span>{{latest[2].updateTime}}</span>
                </a>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="col-sm-6 ml-sm-1 right-content d-flex flex-column justify-content-between">
          <div class='right-content-text'>
            <a  :href="latest[3].blogList[latest[3].blogList.length-1].url" target="_blank">
              <h4 class="mt-3"><strong>{{latest[3].blogList[latest[3].blogList.length-1].title}}</strong></h4>
              <h5 :class='{"mt-3":latest.length}'>{{latest[3].name}}</h5>
              <span>{{latest[3].updateTime}}</span>
            </a>
          </div>
          <div class='right-content-text'>
            <a :href="latest[4].blogList[latest[4].blogList.length-1].url" target="_blank">
              <h4 class="mt-3"><strong>{{latest[4].blogList[latest[4].blogList.length-1].title}}</strong></h4>
              <h5 :class='{"mt-3":latest.length}'>{{latest[4].name}}</h5>
              <span>{{latest[4].updateTime}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Latest",
  props: ["latest"],
  data() {
    return {
      data: []
    };
  },
  methods: {
    latestFive() {
      const vm = this;
      let five = [];
      for (let i = 0; i < 5; i++) {
        let item = {
          name: vm.latest[i].name,
          updateTime: vm.latest[i].updateTime,
          title: vm.latest[i].blogList[vm.latest[i].blogList.length - 1].title,
          url: vm.latest[i].blogList[vm.latest[i].blogList.length - 1].url
        };
        five.push(item);
      }
      vm.data = five;
    }
  },

  mounted() {
    const vm = this;
    vm.latestFive();
  },
  computed: {}
};
</script>

<style lang='scss' scoped>
.container{
  padding:1rem;
  flex-direction: row;
}
.carousel-container {
  border: 2px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  padding: 0;

  h2 {
    border-right: 2px solid black;
    width: 155px;
    height: 2rem;
    text-align: center;
    line-height: 30px;
  }
  .right-content div {
    height: 49%;
    background-color: gray;
    padding:0.5rem;
    a{
       color: white;
    }
    a:hover{
      text-decoration: none;
    }
  }
  .carousel-content {
    height: 320px;
    background-color: grey;
    color: white;
    padding: 1.5rem;

    h3 {
      font-size: 36px;
      font-weight: bold;
    }

    a {
      color: white;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .carousel-control-prev,
  .carousel-control-next {
    height: 50px;
    transform: translateY(-50%);
    top: 50%;
  }
}

@media(max-width:415px){
  .container{
    flex-direction: column;
    padding:0;
  }
  .carousel.slide{
    padding: 0 0.5rem 0 0.5rem;
  }
  .carousel-container .carousel-content{
    margin-bottom: 0.5rem;
    padding:0.5rem;
    height:350px;
  }
  .right-content{
    padding:0;
    .right-content-text{
      margin: 0.5rem 0.5rem 0 0.5rem;
    }
  }
}
</style>