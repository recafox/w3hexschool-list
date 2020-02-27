<template>
  <div class="container-fluid d-flex flex-column">
    <Navbar></Navbar>
    <div class='container col-sm-10 mt-4'>
     <h2>w3HexSchool 鼠年全馬鐵人挑戰</h2>
     <p>w3HexSchool 鼠年全馬鐵人挑戰是<a href='https://www.hexschool.com/?adsource=gssearch&utm_source=google&utm_medium=cpc&utm_campaign=googleKeyword&gclid=CjwKCAiA7t3yBRADEiwA4GFlI9K_Q6O4j39VEDPlUYB41_JYfQbf6k21kP0ArDlwlAIwJvwnQLzYphoCmTYQAvD_BwE'>六角學院</a>在2020年開始舉辦的寫文章活動。</p>
      <h3 class='mt-3'>活動宗旨</h3>
      <ul>
        <li>寫出技術力</li>
        <li>寫出成長紀錄</li>
        <li>寫出品牌形象</li>
      </ul>
      <h3 class='mt-3'>活動說明</h3>
      <p><span style='color:red'>本活動將長達到 2020 年底的寫文挑戰賽，參賽期間需每週撰寫 1 篇文章</span>，開賽期間可自行調整寫文頻率 (ex: 第一週有寫文，第二週沒有寫文，第三週再寫文以此類推)。</p>
      <h3 class='mt-3'>寫文範圍</h3>
      <p>本次活動可選擇以下分類</p>
      <ul>
        <li style='color:red'>技能研究</li>
        <li style='color:red'>心情抒發(文章數不可超過 20%)</li>
      </ul>
      <h3 class='mt-3'>詳情請見：<a href="https://www.hexschool.com/2019/11/14/2019-11-14-w3Hexschool-2020-challenge/">活動說明頁</a></h3>

      <h3 class='mt-3'>關於本站</h3>
      <p>本站使用六角學院提供的鐵人賽API搭建而成，收集了所有參加者的文章連結，除了希望參賽者能了解彼此的近況，也希望能幫各位參賽者增加曝光率。<span style='font-weight:bold'>本站並非六角官方網站，僅為私人學習用途。</span></p>
      

    </div>
     



      <Footer/>
    
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default {
  components:{
    Navbar,
    Footer
  }
}
</script>

<style lang="scss" scoped>

.container-fluid{
  padding:0;
}

a{
  color:#4daf80;
}
  
</style>
