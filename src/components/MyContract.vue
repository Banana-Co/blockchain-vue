<template>
<div id="app" class="all">

<el-container>
  <el-header>
    <el-page-header content="我的合同"></el-page-header>
  </el-header>

  <el-container>
    <el-header>
      <el-button type="plain" @click="dialogFormVisible = true"> 新建合同 </el-button>
    </el-header>

    

    <el-container>

      <el-aside>
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <span slot="title">查看已签署合同</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
            <span>查看未签署合同</span>
            </template>
            <el-menu-item index="2-1">我（甲方）未签署</el-menu-item>
            <el-menu-item index="2-2">我（乙方）未签署</el-menu-item>
            <el-menu-item index="2-3">对方（乙方）未签署</el-menu-item>
          </el-submenu>  
        </el-menu>
      </el-aside>
      
      <el-main>
      </el-main>

    </el-container>
  </el-container>
  <el-col :span="4">
    
  </el-col>
</el-container>

 <el-dialog title="合同信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="乙方用户名" :label-width="formLabelWidth">
      <el-autocomplete class="inline-input" v-model="form.name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="合同标题" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入合同标题" v-model="form.title"> </el-input>
    </el-form-item>
    <el-form-item label="合同内容" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入合同内容" v-model="form.content"> </el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">关 闭</el-button>
    <el-button type="primary" @click="addContract" :disabled="saveButtonDisabled">保 存</el-button>
  </div>
</el-dialog>
</div>
</template>

<style>
  .all {
    margin-left: 120px;
    margin-right: 120px;
  }
  
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    width: 180px;
  }

  .el-menu, .el-menu-item, .el-submenu {
    width: 180px;
  }
  
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<script>
export default {
  name: 'MyContract',
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      saveButtonDisabled: false,
      form: {
        name: '',
        title: '',
        content: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    querySearch(queryString, cb) {
        result = this.$axios
          .post('/getUsersByPrefix', {prefix: queryString});
        cb(results)
    },
    addContract() {
      this.$axios
        .post('/addContract', {
          partyB: this.form.name,
          title: this.form.title,
          content: this.form.content
        })
        .then(res => {
          if (res.data === 1) {
            this.dialogFormVisible = false
            this.$alert('您的合同已保存', '成功', {
              confirmButtonText: '确定', 
            })
            this.form.name = ''
            this.form.title = ''
            this.form.content = ''
          }
        })
    }
  }
}
</script>