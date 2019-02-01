<template>
  <div>
    <div class="contract-caption-bgc">
      <div class="contract-caption-bgc">
        <div class="contract-caption-basic contract-w100">
          <el-row>
            <el-col :span="12" class="contract-ml10">
              <span class="dev1-line" />
              <span class="dev1_font">详细信息</span>
            </el-col>
            <el-col :span="12" class="contract-caption-icon">
              <i class="el-icon el-icon-arrow-up" style="cursor: pointer;margin-left: 2%" @click="contractPlan = !contractPlan" />
              <i class="el-icon el-icon-arrow-down" style="cursor: pointer;margin-left: 2%" @click="contractPlan = !contractPlan" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="dev_show bgStyles">
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-row>
          <el-col :span="12">
            <el-form-item label="议题名称：">
              <span style="color:#666;">{{dynamicValidateForm.topicName}}</span>
              <!-- <el-input :disabled="true" v-model="dynamicValidateForm.topicName" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <div>
              <el-form-item label="议题说明：">
                <span style="color:#666;">{{dynamicValidateForm.topicDesc}}</span>
                <!-- <el-input :disabled="true" v-model="dynamicValidateForm.topicDesc" /> -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"> </el-col>


        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <el-form-item label="发起部门：">
              <span style="color:#666;">{{dynamicValidateForm.sponsorDept.deptName}}</span>
              <!-- <el-input :disabled="true" v-model="dynamicValidateForm.sponsorDept" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <el-form-item label="专家名称：">
              <el-tag style="margin-right:10px;" v-for="(tag,index) in dynamicValidateForm.specialistName" :key="index"
                :disable-transitions="false">
                {{tag.name}}
              </el-tag>
              <!-- <span style="color:#666;">{{dynamicValidateForm.specialistName}}</span>  -->
              <!-- <el-input :disabled="true" v-model="dynamicValidateForm.specialistName" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="6">
            <el-form-item label="上会次数：">
              <span style="color:#666;">{{dynamicValidateForm.number}}</span>
              <!-- <el-input :disabled="true" v-model="dynamicValidateForm.number" /> -->
            </el-form-item>

          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div>
              <el-form-item label="议题选项：" v-for="(item,index) in dynamicValidateForm.option" :key="index">
                <span style="color:#666;">{{item.option}}</span>：<span style="color:#666;">{{item.optionDesc}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:30px;" v-if="dynamicValidateForm.fileName">
          <el-col :span="12">
            <el-form-item label="附件：">
              <el-tag>
                  <span @click="jump(dynamicValidateForm.url)">{{dynamicValidateForm.fileName}}</span>
              </el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>


      </el-form>
    </div>
  </div>
</template>
<script>
  //   import index from "@/issueLibrary/index"
  import expert from '@/components/expert/index'
  import url from '@/api/url'
  import {
    issuesdetail
  } from '@/api/public'
  export default {
    components: {
      expert
    },
    data() {
      return {
        flagdialong: false,
        optionsForm: [{
          option: '',
          optionDesc: ''
        }],
        dynamicValidateForm: {
          option: [],
          topicName: '',
          topicDesc: '',
          sponsorDept: {},
          specialistName: [],
          number: '',
          fileName:'',
          url:'',
        }
      }
    },
    created() {
      this.issuesDetail()
    },
    methods: {
     /*
      *查看附件
     */
     jump(a){
       window.open(url.download + '?fileName=' + a,'_blank')
     },
      selectionExpert() {
        this.flagdialong = !this.flagdialong
      },
      issuesDetail() {
        issuesdetail(this.$route.query.id).then(res => {
          this.dynamicValidateForm = res.data.Issues
          this.optionsForm = res.data.option
          this.dynamicValidateForm.sponsorDept = JSON.parse(res.data.Issues.sponsorDept)
          this.dynamicValidateForm.specialistName = JSON.parse(res.data.Issues.specialistName)
          this.dynamicValidateForm.option = res.data.option
          this.dynamicValidateForm.fileName = res.data.Issues.fileName
          this.dynamicValidateForm.url = res.data.Issues.url
        }).catch(function (error) {

        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        })
      },
      // 点击保存 存表单的所有信息 加上附件    往对象里面 push 一个
      savebtn() {

      },
      save() {
      },
    }
  }

</script>
<style scoped>


</style>
