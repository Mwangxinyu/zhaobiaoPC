<template>
  <div>
    <el-tooltip :content="'Switch value: ' + value5" placement="top">
      <el-switch v-model="value5" active-color="#13ce66" inactive-color="#ff4949" active-value="100" inactive-value="0">
      </el-switch>
    </el-tooltip>
  </div>

</template>
<style>
  .el-switch__core:after {
    position: absolute;
    top: 2px;
    left: 0;
    border-radius: 100%;
    -webkit-transition: all .3s;
    transition: all .3s;
    width: 14px;
    height: 14px;
    background-color: #fff;
  }

</style>

<script>
  import {
    initdata,
    discussionSearch,
    issuesdetail,
    exportbyid,
    handledelete,
    getallIssues,
    countdetail,
    updateIssuesonLine
  } from '@/api/public'
  export default {
    data() {
      return {
        value5: '100'
      }

    },
    created() {
      this.ccc()
      this.fninituploadData()
    },
    methods: {
      ccc() {

      },

      fninituploadData(url) {

      }

    }
  }

</script>
