<template>
  <div class="message-flow">
		<div class="botton-area">
		<el-row :gutter="20" type="flex">
				<el-col :span="8"><div class="title">
					留言板
				</div></el-col>
				
				<el-col :span="11"><div class="grid-content"></div></el-col>
				
				<el-col :span="5"><div>
					<el-row type="flex" justify="end">
						<el-col class="refresh-bottom">
							<el-button @click="getMessagePage" icon=el-icon-refresh round></el-button>
						</el-col>
						<el-col class="refresh-bottom"></el-col>
						<el-col class="new-bottom">
							<el-button icon="el-icon-edit" @click="dialogFormVisible = true" type="primary" round> 新建留言 </el-button>
						</el-col>
					</el-row>
				</div></el-col>
				
    </el-row>
   </div>
		
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="handleRowClick">
      <el-table-column
        prop="createDate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="author"
        label="留言者">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
	  <el-table-column
	    prop="like_number"
	    label="点赞量">
	  </el-table-column>
    </el-table>
    
    <el-pagination
    layout="prev, pager, next"
    :current-page="pageNum"
    :page-size="pageSize"
    :total="total"
    @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="留言信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="留言标题" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入留言标题" v-model="form.title"> </el-input>
        </el-form-item>
        <el-form-item label="留言内容" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入留言内容" v-model="form.content"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="addMessage" :disabled="saveButtonDisabled">发 布</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .message-flow {
    margin-left: 130px;
    margin-right: 130px
  }
  .botton-area {
    margin-top: 10px;
    margin-bottom: 10px
  }
	.refresh-bottom{
		width: 64px;
	}
	.new-bottom{
		width: 128px;
	}
	.title{
		font: "agency fb";
		font-size: 40px;
		width: 140px;
	}
	.el-row {
	  margin-bottom: 20px;
	  &:last-child {
	    margin-bottom: 0;
	  }
	}
	.el-col {
	  border-radius: 4px;
	}
	.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
	.message-detail {
	  margin-left: 240px;
	  margin-right: 240px;
	}
	
	.box-card {
	  margin-top: 30px;
		width: 960px;
	}
	
	.text {
	  font-size: 18px;
	  text-align: left;
	  line-height: 2
	}
	
	.item {
	  margin-top: 18px;
	  margin-left: 60px;
	  margin-right: 60px;
	  margin-bottom: 18px;
	}
	
	.clearfix {
	  line-height: 50px;
	  font-size: 30px
	}
	
</style>


<script>
	import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
  export default {
    name: 'MessageFlow',
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: undefined,
        dialogFormVisible: false,
        saveButtonDisabled: false,
        dialogVisible: false,
        form: {
          author: 'A',
          title: '',
          content: ''
        }
      }
    },
		mounted(){
		    /*页面挂载获取保存的cookie值，渲染到页面上*/
		    let uname = getCookie('username')
		    this.form.author = uname
		    /*如果cookie不存在，则跳转到登录页*/
		    if(uname == ""){
		        this.$router.replace('/')
		    }
		},
    methods: {
      handleCurrentChange: function(currentPage) {
        this.pageNum = currentPage;
        this.getMessagePage();
      },
      getMessagePage() {
        this.$axios
          .post('/getMessagePage', {
            pageNum: this.pageNum, 
            pageSize: this.pageSize
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data);
              this.tableData = successResponse.data.list;
              this.total = successResponse.data.total;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      addMessage() {
        this.$axios
          .post('/addMessage', {
            author: this.form.author,
            title: this.form.title,
            content: this.form.content
          })
          .then(res => {
            if (res.data === 1) {
              this.dialogFormVisible = false
              this.$alert('您的留言已发布', '成功', {
                confirmButtonText: '确定', 
              })
              this.form.name = ''
              this.form.title = ''
              this.form.content = ''
              this.getMessagePage();
            } else {
              this.$alert('标题内容不能为空')
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleRowClick: function(row) {
        this.$router.push({path: `messageDetail/${row.id}`})
      }
    },
      created: function() {
        this.pageNum = 1;
        this.total = 10;
        this.getMessagePage();
      }
  }
</script>