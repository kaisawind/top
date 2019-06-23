<template>
  <div class="el-container">
    <div class="logo">
      <a class="logo-a">
        <img class="logo-img" src="@/assets/logo.png">
      </a>
      <a class="sethome">
        设为首页
      </a>
    </div>
    <div class="time">
      <div @click="clipboardTimestamp(timestamp,$event)">
        时间戳: <span style="cursor: pointer;">{{ timestamp }} <i class="el-icon-document-copy" /></span>
      </div>
      <div @click="clipboardTime(time,$event)">
        时&emsp;间: <span style="cursor: pointer;">{{ time }} <i class="el-icon-document-copy" /></span>
      </div>
      <div @click="clipboardCNTime(cntime,$event)">
        时&emsp;间: <span style="cursor: pointer;">{{ cntime }} <i class="el-icon-document-copy" /></span>
      </div>
    </div>
    <div class="browser-info">
      <div @click="clipboardTimestamp(timestamp,$event)">
        系&nbsp;统&nbsp;版&nbsp;本: {{ browserInfos[0] }}
      </div>
      <div @click="clipboardTime(time,$event)">
        浏&nbsp;&nbsp;&nbsp;览&nbsp;&nbsp;&nbsp;器: {{ browserInfos[1] }}
      </div>
      <div @click="clipboardCNTime(cntime,$event)">
        浏览器版本: {{ browserInfos[2] }}
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers'
import { getBrowserInfo, parseTime } from '@/utils/index.js'
import clipboard from '@/utils/clipboard'

export default {
  name: 'Top',
  data() {
    return {
      time: this.getTime(),
      cntime: this.getCNTime(),
      timestamp: Date.now() + '',
      browserInfos: [],
      timer: null
    }
  },
  mounted() {
    this.getInfo()
    if (this.timer === null) {
      this.timer = setInterval(this.intervalCallback, 1000)
    }
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  },
  destroyed() {
    if (this.timer !== null) {
      clearInterval(this.timer)
    }
  },
  methods: {
    intervalCallback() {
      this.getTime()
      this.getCNTime()
      this.getTimestamp()
    },
    getTime() {
      const date = new Date()
      this.time = parseTime(date, '{y}{m}{d}{h}{m}{s}')
      return parseTime(date, '{y}{m}{d}{h}{m}{s}')
    },
    getCNTime() {
      const date = new Date()
      this.cntime = parseTime(date, '{y}年{m}月{d}日{h}时{m}分{s}秒')
      return parseTime(date, '{y}年{m}月{d}日{h}时{m}分{s}秒')
    },
    getTimestamp() {
      const date = new Date()
      this.timestamp = date.getTime()
      return date.getTime() + ''
    },
    clipboardTimestamp(text, event) {
      clipboard(text, event)
    },
    clipboardTime(text, event) {
      clipboard(text, event)
    },
    clipboardCNTime(text, event) {
      clipboard(text, event)
    },
    getInfo() {
      this.browserInfos = getBrowserInfo()
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 91px;
  top: 0;
  margin-top: 20px;
  margin: 0 auto;
  width: 1190px;
}
.logo {
  width: 120px;
  position: relative;
  height: 60px;
}
.logo-a {
  cursor: pointer;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 120px;
  height: 33px;
}
.logo-img {
  width: 120px;
  height: 33px;
}
.sethome {
  cursor: pointer;
  display: block;
  position: absolute;
  overflow: hidden;
  width: 60px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #999;
  background: #fff;
  border: 1px solid #efefef;
  left: 100%;
  top: 17px;
  border-radius: 20px;
  margin-left: 8px;
}
.time {
  float: left;
  min-width: 225px;
  margin-top: 10px;
  margin-left: 92px;
  text-align: left;
  line-height: 20px;
  font-size: 12px;
  font-family: Tahoma;
}
.browser-info {
  float: left;
  min-width: 150px;
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
  line-height: 20px;
  font-size: 12px;
  font-family: Tahoma;
}
</style>
