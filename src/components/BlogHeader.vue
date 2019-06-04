<template>
<div id="header" class="header">
  <el-row>

    <el-col :span="4">
        <img src="@/assets/logo.png" alt="">
    </el-col>

    <el-col :span="11" :offset="5">
      <el-input placeholder="搜索合同" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="按标题" value="1"></el-option>
          <el-option label="按编号" value="2"></el-option>
          <el-option label="按签署人" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-dropdown>
        <el-button type="plain">
          <i class="el-icon-user el-icon--right"></i>
          账户管理
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改个人信息</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

  </el-row>
  <el-divider></el-divider>
</div>
</template>

<style>
  .header {
    margin-left: 120px;
    margin-right: 120px;
  }
  .el-select{
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
export default {
  name: 'BlogHeader',
  data() {
    return {
      input: '',
      select: ''
    }
  }
}
</script>