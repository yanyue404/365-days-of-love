<template>
  <div class="container" :style="{ background: currColor.color }">
    <div class="content-box">
      <h1>{{ keysWord }}</h1>
    </div>
    <span class="color_name">{{ colorName }}</span>
  </div>
</template>

<script>
import lipstick from "./src/lipstick.json";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function loadCssCode(code) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.rel = "stylesheet";
  style.appendChild(document.createTextNode(code));
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    allColor() {
      return lipstick.brands.reduce((prev, curr) => {
        let temp = [];
        curr.series.forEach((group) => {
          group.lipsticks.forEach((item) => {
            item["brand_name"] = curr.name;
            item["group_name"] = group.name;
            temp.push(item);
          });
        });
        return (prev = prev.concat(temp));
      }, []);
    },
    currColor() {
      return this.allColor[getRandomInt(0, this.allColor.length)];
    },
    colorName() {
      return [
        "@",
        this.currColor.brand_name,
        this.currColor.group_name,
        this.currColor.name,
      ].join("");
    },
    keysWord() {
      let arr = [
        "浪漫的情人节快到了，还记得我们的承诺吗？愿与你共度今生，永存浪漫，爱到永远！",
        "往后余生，是你。",
        "如果这份爱要用我的生命来交换的话，我愿意，如果这份爱让我只能再活一天，我愿意！",
        "所爱隔山海，山海皆可平",
        "愿得一人心，白首不相离。那些与你心心相携的时光，在我心中开出最美的繁花。一季花开，遇到爱，便是圆满。一次回眸，遇到你，便是幸福。",
        "一个亲吻；一个拥抱；一个电话；一个肩膀；一句爱我；一次约会；一碗鱼蛋；一盒便当；一趟海边；一场大雨；一个寒冬；一个炎夏；一段道路；一条马路；一次小吵；一程公车；一直挽手；一直信任；一直包容；一直了解，一个你，一心一意。爱就是这么简单。",
        "习惯在这样的微雨天气里想你，淡淡的，心底的一抹思念。昨夜狂风四起，清晨醒来发现满院的落叶，散落一地的时光，破碎着，美丽着。孤独在暗夜里静静的绽放着，书写着外表无处表现的忧伤，轻揉入深夜的睡梦，滑落心田最后的温柔。",
        "当我想你的时候，无论万水千山都能看见你潇洒的身影，和你一起走过每一个夜晚和白天，走过爱的风风雨雨！在这场爱情里，我读出了幸福，也读出了寂寞，你离开的日子，就似撒下的一张网，网住的也许只剩下寂寞，留下的也只有思念",
      ];
      return arr[getRandomInt(0, arr.length)];
    },
  },
  mounted() {
    loadCssCode(`.container {
      --red: ${this.currColor};
     }`);
    this.timer = setInterval(() => {
      window.location.reload();
    }, 30000);
  },
  beforeDestroy() {
    this.timer = null;
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  line-height: 1.5;
  font-size: 6px;
}

body {
  font-family: inherit;
  line-height: inherit;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
  .content-box h1 {
    font-size: 3rem;
  }
}
</style>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  //   background: #d03370;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-box h1 {
  position: relative;
  top: -20px;
  line-height: 2;
  padding: 2.5rem;
  max-width: 64rem;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  font-weight: normal;
  font-family: inherit;
  margin-left: 10px;
  margin-right: 10px;
  color: #fff;
  border-radius: 1.5rem;
}
.color_name {
  position: absolute;
  left: 20px;
  bottom: 20px;
  color: #fff;
}
</style>
