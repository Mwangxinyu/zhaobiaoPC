<template>
  <div class="contract-caption-bgc">
    <div class="contract-caption-basic contract-w100">
      <el-row>
        <el-col :span="12" class="contract-ml10">
          <span class="dev1-line" />
          <span class="dev1_font">详情信息</span>
        </el-col>
        <el-col :span="12" class="contract-caption-icon">
        </el-col>
      </el-row>
      <div class="dev1_border" />
      <div style="background:#fff;margin-top:10px;padding:3%">
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">议题名称：</span>
              <span></span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">议题说明：</span>
              <span></span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <div>
          <div v-for="(item,index) in issuesOptions" :key="index">
            <span>议题选项：</span>
            <span>{{index}}</span>
          </div>

        </div>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">发起部门：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">发起人：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">专家名称：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">附件名称：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">备注：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <span style="color:#666">附件：</span>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <div>
          <el-switch v-model="value3" active-text="公开" inactive-text="隐藏">
          </el-switch>
        </div>


        <div style="margin-top:100px;margin-left:100px;">
          <el-button size="small" type="primary">保存</el-button>
        </div>
      </div>
    </div>

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
  export default {
    data() {
      return {
        value3: true,
        issuesOptions: [

        ]
      }
    },
    created(){

    },
    methods: {
       detail(){
         
       }

    }
  }

</script>
