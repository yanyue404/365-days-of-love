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
import lovepoem from "./src/lovepoem.json";

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
      console.log("allColor", this.allColor.length);
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
    allkeysWord() {
      return lovepoem.all.reduce((prev, curr) => {
        return (prev = prev.concat(curr.list));
      }, []);
    },
    keysWord() {
      console.log("allkeysWord", this.allkeysWord.length);
      return this.allkeysWord[getRandomInt(0, this.allkeysWord.length)];
    },
  },
  mounted() {
    loadCssCode(`.container {
      --red: ${this.currColor};
     }`);
    this.timer = setInterval(() => {
      window.location.reload();
    }, 15000);
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
  font-size: 3rem;
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
