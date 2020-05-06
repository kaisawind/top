<template>
  <div class="el-container">
    <div class="el-header">
      <div class="git-site">
        <el-link class="title first" target="_blank" href="https://github.com">Github</el-link>
        <el-link class="title" target="_blank" href="https://gitee.com/">码云Gitee</el-link>
        <el-link class="title" target="_blank" href="https://code.aliyun.com">阿里云Git</el-link>
        <el-link class="title" target="_blank" href="https://gitlab.com">Gitlab</el-link>
        <el-link class="title" target="_blank" href="https://dev.azure.com">微软Azure</el-link>
        <el-link class="title" target="_blank" href="https://git.code.tencent.com/">腾讯工蜂</el-link>
        <el-link class="title" target="_blank" href="https://devcloud.huaweicloud.com">华为Git</el-link>
        <el-link class="title" target="_blank" href="https://coding.net">Coding</el-link>
        <el-link class="title" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
        <el-link class="title" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
        <el-link class="title" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
        <el-link class="title" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
        <el-link class="title" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
        <el-link class="title last" target="_blank" href="https://top.kaisawind.com">&emsp;&emsp;&emsp;</el-link>
      </div>
      <div ref="cloud-site" class="cloud-site">
        <!-- 用户自定义网站 -->
        <div>
          <ul class="list-items">
            <li v-for="item in user_sites" :key="item.id" class="site-item">
              <div>
                <el-link class="item-link" :underline="false" :href="item.href" target="_blank" :style="{backgroundImage: 'url(' + item.icon +')'}">
                  {{ item.title }}
                </el-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="height" />
        <el-divider />
        <!-- 其他网站 -->
        <div>
          <ul class="list-items">
            <li v-for="item in common_sites" :key="item.id" class="site-item">
              <div>
                <el-link class="item-link" :underline="false" :href="item.href" target="_blank" :style="{backgroundImage: 'url(' + item.icon +')'}">
                  {{ item.title }}
                </el-link>
              </div>
            </li>
          </ul>
        </div>
        <el-button v-show="!showCoolSite" type="text" class="collapse" @click="onhandleOpen()">点击展开<i class="el-icon-arrow-down" /></el-button>
      </div>
      <el-collapse-transition>
        <div v-show="showCoolSite" class="cool-site">
          <div>
            <ul v-for="item in cool_sites" :key="item.id" class="list-items">
              <li class="site-item">
                <div>
                  <el-link class="item-link" :underline="false" :href="item.href" target="_blank" :style="{color: '#0AA770', backgroundImage: 'url(' + item.icon +')'}">
                    {{ item.title }}
                  </el-link>
                </div>
              </li>
              <li v-for="site in item.sites" :key="site.id" class="site-item">
                <div>
                  <el-link class="item-link" :underline="false" :href="site.href" target="_blank" :style="{backgroundImage: 'url(' + site.icon +')'}">
                    {{ site.title }}
                  </el-link>
                </div>
              </li>
            </ul>
          </div>
          <el-button v-show="showCoolSite" type="text" class="collapse" @click="onhandleClose()">点击收起<i class="el-icon-arrow-down" /></el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import user_sites from './json/user-sites.json'
import common_sites from './json/common-sites.json'
import cool_sites from './json/cool-sites.json'

export default {
  name: 'Main',
  data() {
    return {
      showCoolSite: true,
      user_sites: [],
      common_sites: [],
      cool_sites: []
    }
  },
  mounted() {
    this.user_sites = user_sites
    this.common_sites = common_sites
    this.cool_sites = cool_sites
  },
  methods: {
    onhandleOpen() {
      this.$refs['cloud-site'].style['padding-bottom'] = '9px'
      this.showCoolSite = true
    },
    onhandleClose() {
      this.$refs['cloud-site'].style['padding-bottom'] = '35px'
      this.showCoolSite = false
    }
  }
}
</script>

<style scoped>
.el-container {
  margin-top: 10px;
  min-width: 1190px;
}
.el-header {
  padding: 0;
}
.git-site {
  min-width: 1190px;
  position: relative;
  height: 28px;
  margin: 0 auto 10px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #dee3eb;
}
.cloud-site {
  width: 1190px;
  position: relative;
  margin-bottom: 10px;
  padding: 9px 0 35px;
  transition: all .5s;
  background-color: #fff;
  border: 1px solid #DEE3EB;
}
.cool-site {
  width: 1190px;
  position: relative;
  margin-bottom: 10px;
  padding: 9px 0 35px;
  transition: all .5s;
  background-color: #fff;
  border: 1px solid #DEE3EB;
}
.collapse-site {
  min-width: 1190px;
  position: relative;
  padding: 9px 0 35px;
  transition: all .5s;
  background-color: #fff;
  border: 1px solid #DEE3EB;
}
.title {
  display: inline-block;
  margin: 4px 37px 4px 0;
  line-height: 20px;
  vertical-align: top;
}
.first {
  margin-left: 10px;
  text-align: right;
}
.last {
  margin-right: 0px;
}
.site-item {
  position: relative;
  display: inline-block;
  width: 106px;
  height: 20px;
  line-height: 20px;
  margin-left: 23px;
  padding: 6px 0 3px;
  vertical-align: top;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list-items {
  text-align: left;
  padding-right: 21px;
  list-style: none;
}
.item-link {
  display: inline-block;
  max-width: 105.5px;
  height: 18px;
  padding-left: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
  background-size: 18px 18px;
  background-repeat: no-repeat;
}
.el-divider--horizontal {
  margin: 9px 0;
}
ul, li {
  margin: 0;
  padding: 0;
}
.collapse {
  position: absolute;
  bottom: 0;
}
.item-link.el-link.el-link--default:hover {
  color: red;
}
.height {
  height: 20px;
}
</style>
