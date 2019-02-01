<!--suppress ALL -->
<template>
  <div>
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">会议结果</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dev1_border" />
    <div style="background:#fff;padding:10px">
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-table :data="data" border style="width: 100%">
              <el-table-column prop="result[0].topic_name" label="议题名称" width="180"/>
              <el-table-column prop="" label="投票结果" width="100">
                <template slot-scope="scope">
                  <!-- <el-tag v-for="(tag,index) in scope.row.result" :key="index" :disable-transitions="false">
                    {{ tag.optioninfo }}  :  {{ tag.optionNum }}
                  </el-tag> -->
                 
                  <span v-for="(tag,index) in scope.row.result" :key="index">
                      <span v-if="tag.optioninfo&&tag.optionNum">{{ tag.optioninfo }} : {{ tag.optionNum }}</span>
                  </span>
                
                  
                </template>
              </el-table-column>
              <el-table-column prop="" label="最终结果">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.endOption" :multiple="scope.row.optionType !== 0" placeholder="请选择">
                    <el-option
                      v-for="item in scope.row.option"
                      :key="item"
                      :label="item"
                      :value="item"/>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div style="margin-top:10px;">
          <el-row>
            <el-col :span="12">
              <div style="width:40%;height:300px;">
                <el-upload
                  ref="upload"
                  :limit="1"
                  :on-success="fnHandleSuccess"
                  :on-preview="fnHandlePreview"
                  :action="uploadAction"
                  class="upload"
                  multiple
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,word/plain">
                  <el-button size="small" type="primary" plain>上传</el-button>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="position:absolute;bottom:10%;right:30%;">
                <el-form-item>
                  <el-button size="small" @click="fnClickSubmitForm">提交</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  uploadSubmit,
  uploadsummarybutton,
  fnNetSubmitSumary
} from '@/api/public'
import url from '@/api/url'
export default {
  data() {
    return {
      uploadAction: url.uploadInterface,
      data: [{
        result: [{
          Issues_id: '',
          topic_name: '',
          optioninfo: '',
          optionNum: ''
        }],
        optionType: '',
        option: [],
        //endOption: '',
        endOption: []
      }],
      resfileUrl: '',
      fileName:''
    }
  },
  created() {
    this.fnInitPageData()
  },
  methods: {
    /**
       * 页面数据初始化
       */
    fnInitPageData() {
      this.fnNetGetSummary()
    },
    /**
     *  获取 投票情况数据
     */
    fnNetGetSummary() {
      uploadsummarybutton(this.$route.params.id).then(res=>{
        if (res.code === 0) {
          res.data.forEach(item => {
              if(item.optionType===1){
                  item.endOption = []
              }else {
                  item.endOption = ''
              }
          })
          this.data = res.data
        }
      })
    },
    /**
     * 上传成功回调
     */
    fnHandleSuccess(res,file,fileList) {
      // 上传成功 将返回的url拿回来
          this.resfileUrl = res.data.url
          this.fileName = res.data.fileName
    },
    /**
     * 新增线下会议
     */
    fnClickSubmitForm() {
      //设置要提交的值
      const result = []
      this.data.forEach(x=>{
        const oSub = {}
        oSub.Issues_id = x.result[0].Issues_id,
        oSub.endOption = x.endOption
        result.push(oSub)
      })
      fnNetSubmitSumary({"url":this.resfileUrl,"id":this.$route.params.id,result,"fileName":this.fileName}).then(res=>{
        // TODO 跳转页面?
        this.$router.push({
          path: '/onlineList'
        })
      })
    },
    fnHandlePreview(file) {

    }

  }
}
</script>
