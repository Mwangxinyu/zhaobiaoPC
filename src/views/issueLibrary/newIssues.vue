<template>
  <div>
    <!-- 选择专家库的弹窗 -->
    <el-dialog :visible.sync="memberLibraryDialog" border>
      <div style="margin-bottom:20px">
        <el-form :model="formzj" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="10">
              <div>
                <el-form-item label="姓名：">
                  <el-input v-model="formzj.name" size="small" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="分组：">
                  <el-input v-model="formzj.groupName" size="small" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="margin-top: 3px;text-align:center;">
                <el-button size="small" type="primary" plain @click="search">搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="memberLibraryTable" border height="150" @select-all="selectStaffAll" @select="selectStaff">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="groupName" label="分组" />
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-button size="small">取消</el-button>
        <el-button size="small" @click="expertConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 取消表单的弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认取消吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="quedingDiglog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发起部门 添加的弹窗 -->
    <el-dialog title="请选择部门" :visible.sync="chooseDepartment" width="30%">
      <el-tree ref="tree" @check-change="orgCheckChange" :data="data2" show-checkbox node-key="id" accordion
        :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseDepartment = false">取 消</el-button>
        <el-button type="primary" @click="queDingDepartment()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="12" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">详细信息</span>
          </el-col>
          <el-col :span="12" class="contract-caption-icon" />
        </el-row>
      </div>
    </div>
    <div class="dev_show bgStyles">
      <el-form ref="dynamicValidateForm" :rules="rules" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-row style="margin-bottom:20px">
          <el-col :span="18">
            <div>
              <el-form-item label="议题名称" prop="topicName">
                <el-input size="small" v-model="dynamicValidateForm.topicName" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="16"></el-col>
        </el-row>
        <el-row style="margin-bottom:20px">
          <el-col :span="18">
            <div>
              <el-form-item label="议题说明" prop="topicDesc">
                <el-input size="small" type="textarea" :rows="6" v-model="dynamicValidateForm.topicDesc" style="width:50%"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="18">
            <div></div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:20px">
          <el-col :span="18">
            <div>
              <el-form-item label="选项类型" prop="optionTypes">
                <el-radio v-model="dynamicValidateForm.optionTypes" label="0">单选</el-radio>
                <el-radio v-model="dynamicValidateForm.optionTypes" label="1">多选</el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <div>
              <el-form-item v-for="(item, index) in dynamicValidateForm.options" :label="'议题选项' + (index+1)" :key="item.key"
                :prop="'options.'+index+'.optionDesc'" :rules="{required: true, message: '选项不能为空', trigger: 'blur'}">
                <span>{{item.option}}</span>
                <el-input size="small" v-model="item.optionDesc" />
                <el-button @click.prevent="removeDomain(item)" size="small">删除</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-form-item>
          <el-button @click="addDomain" size="small">新增</el-button>
        </el-form-item>
        <el-row>
          <div v-if="this.dynamicValidateForm.optionTypes ==='1'">
            <el-col :span="6">
              <el-form-item label="最少选" prop="optionMin">
                <el-input size="small" v-model="dynamicValidateForm.optionMin" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最多选" prop="optionMax">
                <el-input size="small" v-model="dynamicValidateForm.optionMax" />
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="6" />
          <el-col :span="6" />
        </el-row>
        <el-row>
          <el-col :span="18">
            <div>
              <el-form-item label="发起部门：">
                <el-tag :key="key" v-for="(tag,key) in dynamicValidateForm.department" closable :disable-transitions="false"
                  @close="CloseDepertment(tag,key)">
                  {{tag.simplename}}
                </el-tag>
                <el-button size="small" @click="addbumen()">添加</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-form-item label="招标方式：">
                <el-radio v-model="dynamicValidateForm.biddingType" label="0">招标</el-radio>
                <el-radio v-model="dynamicValidateForm.biddingType" label="1">招标豁免</el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <div v-if="dynamicValidateForm.biddingType ==='0'">
          <el-form-item label="专家名称：">
            <div>
              <el-button size="small" @click="expert">选择专家</el-button>
            </div>
            <el-row>
              <el-col :span="10">
                <div>
                  <el-tag size="mini" :key="tag.name" v-for="tag in dynamicValidateForm.specialistName" closable
                    :disable-transitions="false" @close="Close(tag)">
                    {{tag.name}}
                  </el-tag>
                </div>
              </el-col>
              <el-col :span="14">
              </el-col>
            </el-row>
          </el-form-item>
        </div>

        <el-row style="margin-left:100px;margin-top:30px">
          <el-col :span="10">
            <!-- <el-upload ref="upload" class="upload"  :before-upload="beforeUpload" show-file-list :data="upLoadData" :action="uploadUrl()" :file-list="fileList" :on-success="handleSuccess" multiple
              method="post" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain">
              <el-button size="small" type="primary" plain>上传</el-button>
            </el-upload> -->
            <enclosure :callback="fnshangchuan" :fileType="[0,1]"></enclosure>
          </el-col>
          <el-col :span="14"></el-col>
        </el-row>
        <el-form-item style="margin-top:70px;">
          <div style="text-align:center;width:62%;">
            <el-button @click="dialogVisible = true" size="small" style="margin-right:30px">取消</el-button>
            <el-button type="primary" size="small" @click="submit('dynamicValidateForm')">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
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
  import expert from '@/components/expert/index'
  import IncreaseApprovers from '@/components/expert'
  import enclosure from '@/components/enclosure/enclosure'
  import {
    createIssues,
    issuesdetail,
    searchExpert,
    showdirector
  } from '@/api/public'
  import url from '@/api/url'
  export default {
    components: {
      expert,
      IncreaseApprovers,
      enclosure
    },
    data() {
      return {
        upLoadData:{},
        aurl:url.uploadToPdfInterface,
        fileList: [],
        fangshi:'0',
        str: [], //存放英文字母的数组  
        data2: [{
          label: 'simplename',
          children: [{
            label: 'simplename',
            children: [{
              label: 'simplename'
            }, {
              label: 'simplename'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'simplename'
        },
        expertShuzu: [],
        //选择专家库弹窗的表格
        memberLibraryTable: [{
          name: '',
          groupName: ''
        }],
        //选择部门的弹窗
        chooseDepartment: false,
        formzj: {
          name: '',
          groupName: ''
        },
        //部门的树结构
        defaultProps: {
          children: 'children',
          label: 'simplename'
        },
        flag: false,
        memberLibraryDialog: false,
        isActive: false, // 最少选 最多选
        textarea: '',
        flagdialong: false,
        radio: '1',
        radio2: '1',
        dialogVisible: false,
        selectOrg: {
          orgsid: []
        },
        dynamicValidateForm: {
          topicName: '',
          topicDesc: '',
          optionMax: '',
          optionTypes: '',
          biddingType:'',
          optionMin: '',
          url:[],
          //发起部门
          department: [],
          specialistName: [],
          fileList: [],
          descName: '', //文件名
          filename: '',
          options: [{
            option: '',
            optionDesc: '',
            key: Date.now()
          }],
        },
        //提交入参
        addIssuesParameter: {
          topicName: '',
          topicDesc: '',
          optionMax: '',
          optionTypes: '',
          optionMin: '',
          biddingType:'',
          sponsorDept: '', //只有这个单独处理
          specialistName: [], //296
          url:[],
          options: [{
            option: '',
            optionDesc: '',
            key: Date.now()
          }]
        },
        rules: {
          topicName: [{
            required: true,
            message: '请输入议题名称',
            trigger: 'blur'
          }],
          topicDesc: [{
            required: true,
            message: '请输入议题说明',
            trigger: 'blur'
          }],
          optionTypes: [{
            required: true,
            message: '请至少选择一个选项类型',
            trigger: 'change'
          }],
          optionMin: [{
              required: true,
              message: '请填写最少选几个',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 5,
              message: '不能小于1',
              trigger: 'blur'
            }
          ],
          optionMax: [{
              required: true,
              message: '请填写最多选几个',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 5,
              message: '不能大于议题选项总数',
              trigger: 'blur'
            }
          ],

        }
      }
    },
    created() {
      //生成英文字母的方法
      this.createZimu()
    },
    methods: {
      /**
       * 上传  返回上传的附件的数组
       */
      fnshangchuan(arr){
          this.dynamicValidateForm.url = arr
      },
      beforeAvatarUpload(file) {},
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
      /**
       * beforeUpload文件上传之前
       */
      beforeUpload(file){
        //   console.log(file)
      },
      // 点击保存 存表单的所有信息 加上附件    往对象里面 push 一个
      savebtn() {},
      uploadUrl() {   //传参数 [file,file]
         
         return url.uploadToPdfInterface
      },
      /*
       * 编辑详情
       */
      issuesDetail() {
        issuesdetail(this.$route.query.id).then(res => {
          if (res.code == 0) {
            this.dynamicValidateForm.department[0].sponsorDept = res.data.Issues.sponsorDept //发起部门
            this.dynamicValidateForm.optionMax = res.data.Issues.optionMax
            this.dynamicValidateForm.optionMin = res.data.Issues.optionMin
            this.dynamicValidateForm.topicName = res.data.Issues.topicName
            this.dynamicValidateForm.topicDesc = res.data.Issues.topicDesc
            this.dynamicValidateForm.optionTypes = String(res.data.Issues.optionTypes)
            this.dynamicValidateForm.options = res.data.option
            this.dynamicValidateForm.fileList.forEach((item, index, arr) => {
              item.url = res.data.Issues.url
            })
          }
        }).catch(function (error) {})
      },
      queDingDepartment() {
        this.chooseDepartment = false
        this.selectOrg.orgsid.forEach(element => {
          this.dynamicValidateForm.department.push({
            deptId: element.deptId,
            simplename: element.simplename
          })
        })
      },
      orgCheckChange(data, checked, indeterminate) {
        //先获取当前选择的id 在数组中的索引
        const indexs = this.selectOrg.orgsid.indexOf(data.deptId)
        //如果不存在数组中 并且数组中已经有一个id Checked为true的时候 代表不能再次选择
        if (indexs < 0 && this.selectOrg.orgsid.length == 1 && checked) {
          this.$message({
            message: '只能选择一个部门',
            type: 'error'
          })
          //设置已选择的节点为false 很重要
          this.$refs.tree.setChecked(data, false)
        } else if (this.selectOrg.orgsid.length === 0 && checked) {
          this.selectOrg.orgsid = []
          this.selectOrg.orgsid.push(data)
        } else if (indexs >= 0 && this.selectOrg.orgsid.length === 1 && !checked) {
          this.selectOrg.orgsid = []
        }
      },
      handleNodeClick(data) {},
      //部门 
      loadNode1(node, resolve) {
        if (node.level === 0) {
          return resolve([{
            name: 'simplename'
          }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'simplename',
            leaf: true
          }, {
            name: 'simplename'
          }];

          resolve(data);
        }, 500);
      },
      Close(tag) {
        this.dynamicValidateForm.specialistName.splice(this.dynamicValidateForm.specialistName.indexOf(tag), 1);
      },
      /*
       * CloseDepertment 删除发起部门
       */
      CloseDepertment(tag, key) {
        this.dynamicValidateForm.department.splice(key, 1)
        this.selectOrg.orgsid = []
      },
      search() {
        searchExpert(this.formzj).then(res => {
          this.memberLibraryTable = res.data
        })
      },
      //取消提示
      cancelDialog() {
        this.dialogVisible = false
      },
      //确定
      expertConfirm() {
        for (var k = 0; k < this.expertShuzu.length; k++) {
          var flag = true;
          for (var i = 0; i < this.dynamicValidateForm.specialistName.length; i++) {
            if (JSON.parse(JSON.stringify(this.expertShuzu[k])).account == JSON.parse(JSON.stringify(this.dynamicValidateForm
                .specialistName[
                  i])).account) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.dynamicValidateForm.specialistName.push(this.expertShuzu[k]);
            flag = true;
          }
        }
        this.memberLibraryDialog = false
      },
      quedingDiglog() {
        this.$router.push({
          path: '/issueLibrary'
        })
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.options.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.options.splice(index, 1)
        }
        this.createZimu()
        this.$forceUpdate()
      },
      //全选
      selectStaffAll(val) {
        this.expertShuzu = val
      },
      //单选
      selectStaff(val) {
        this.expertShuzu = val
      },
      expert() {
        this.memberLibraryDialog = true
      },
      //添加部门
      addbumen() {
        //打开弹窗
        if (this.dynamicValidateForm.department.length > 0) {
          this.$message({
            message: '只能选择一个部门',
            type: 'error'
          })
          return false
        }
        this.chooseDepartment = true
        //获取所有部门
        showdirector().then(res => {
          this.find(res.data)
          this.data2 = res.data
        })
      },
      find(arr) {
        arr.forEach((item) => {
          if (item.children.length > 0) {
            item.disabled = true
            this.find(item.children);
          }
        })
      },
      addDomain() {
        this.dynamicValidateForm.options.push({
          option: '',
          optionDesc: ''
        })
        this.createZimu()
        this.$forceUpdate()
      },
      /*
       * 生成英文字母
       */
      createZimu() {
        for (var i = 97; i < 123; i++) {
          this.str.push(String.fromCharCode(i));
        }
        for (let i = 0; i < this.str.length; i++) {
          const element1 = this.str[i]
          for (let j = 0; j < this.dynamicValidateForm.options.length; j++) {
            const element2 = this.dynamicValidateForm.options[j]
            if (i === j) {
              element2.option = element1
            }
          }
        }
      },
      closeQrganization(userMessage) {
        this.flag = false
      },
      //586
      handleSuccess(res, file, fileList) {
        //上传成功要处理的事
        // this.dynamicValidateForm.url = res.data.url
        // this.dynamicValidateForm.fileName = res.data.fileName
           this.fileList.push(res.data[0])
           console.log(this.fileList)
      },
      //点击提交
      submit(formName) {
        //校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //准备入参
            debugger
            this.addIssuesParameter.topicName = this.dynamicValidateForm.topicName
            this.addIssuesParameter.topicDesc = this.dynamicValidateForm.topicDesc
            this.addIssuesParameter.optionMax = this.dynamicValidateForm.optionMax
            this.addIssuesParameter.optionTypes = this.dynamicValidateForm.optionTypes
            this.addIssuesParameter.optionMin = this.dynamicValidateForm.optionMin
            this.addIssuesParameter.specialistName = this.dynamicValidateForm.specialistName
            this.addIssuesParameter.url = this.dynamicValidateForm.url
            this.addIssuesParameter.biddingType = this.dynamicValidateForm.biddingType
            // this.addIssuesParameter.fileName = this.dynamicValidateForm.fileName
            this.addIssuesParameter.options = this.dynamicValidateForm.options
            this.addIssuesParameter.sponsorDept = this.dynamicValidateForm.department[0].deptId
           
            createIssues(this.addIssuesParameter).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$router.push({
                  path: '/issueLibrary'
                })
              }
            }).catch(function (error) {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            })
          } else {
            return false;
          }
        });
      }
    }
  }

</script>
<style scoped>
  .el-input {
    width: 50%;
  }

</style>
