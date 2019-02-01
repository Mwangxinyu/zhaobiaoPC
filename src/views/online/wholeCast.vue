<template>
  <div>
    <el-tag :key="tag" v-for="tag in votedName" :disable-transitions="false">
        <span @click="fnClickDetailSubmit(tag)" style="cursor: pointer;">
            {{tag.name}}
        </span>
      
    </el-tag>

  </div>
</template>


<style>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>

<script>
  import {
    seeDetailButtonOnline,
    getVoteDetailById
  } from '@/api/public'
  export default {
    data() {
      return {
        votedName: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        votedDetailByUser:{
            account:"",
            conferenceId:""
        }
      };
    },
    created() {
     this.fnInitData()
    },
    methods: {
     /*
       *根据id 查 这个会议的已投人员
     */
     fnInitData(){
         seeDetailButtonOnline(this.$route.query.id).then(res=>{
             if(res.code == 0){
             this.votedName = res.data.votedName
             this.votedDetailByUser.conferenceId = res.data.conference.id
             }
         })
     },
     /*
     *查看已投人员详情
     */
      fnClickDetailSubmit(val){
        
        this.votedDetailByUser.account = val.account
                 this.$router.push({
                   path: '/voteDetail',
                   query:{
                       votedDetailByUser:this.votedDetailByUser
                   }
                 })
       
      },
      handleClose(tag) {
        this.votedName.splice(this.votedName.indexOf(tag), 1);
      },

      //   showInput() {
      //     this.inputVisible = true;
      //     this.$nextTick(_ => {
      //       this.$refs.saveTagInput.$refs.input.focus();
      //     });
      //   },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.votedName.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }

</script>
