<template>
  <div class="el-container">
    <div class="el-header">
      <div class="search">
        <div class="search-logo" @click="onhandleLogo()">
          <img class="logo-img" src="@/assets/github-394322_960_720.png">
        </div>
        <div class="input">
          <el-input v-model="query" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="onhandleSearch(query)" />
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    onhandleSearch(query) {
      window.open('https://github.com/search?q=' + query, '_blank')
    },
    onhandleLogo() {
      window.open('https://github.com', '_blank')
    }
  }
}
</script>

<style scoped>
.el-container {
  top: -10px;
  width: 100%;
  height: 99px;
  border-bottom: 1px solid #D1D8E5;
}
.el-header {
  position: relative;
  top: 10px;
  width: 1190px;
  height: 46px;
  margin: 0 auto;
}
.search {
  position: absolute;
  min-width: 546px;
}
.search-logo {
  display: inline-block;
  cursor: pointer;
}
.logo-img {
  width: 100px;
  height: 40px;
  margin-right: 18px;
  margin-left: 10px;
  vertical-align: bottom;
}
.input {
  position: absolute;
  display: inline-block;
  width: 453px;
}
</style>
