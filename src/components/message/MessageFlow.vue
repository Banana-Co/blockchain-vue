<template>
	<div class="message-flow">
		<div class="botton-area">
			<el-row :gutter="20" type="flex">
				<el-col :span="8">
					<div class="title">
						合同链
					</div>
				</el-col>

				<el-col :span="11">
					<div class="grid-content"></div>
				</el-col>

				<el-col :span="5">
					<div>
						<el-row type="flex" justify="end">
							<el-col class="refresh-bottom">
								<el-button @click="getMessagePage" icon=el-icon-refresh round></el-button>
							</el-col>
							<el-col class="refresh-bottom"></el-col>
							<el-col class="new-bottom">
								<el-button icon="el-icon-edit" @click="dialogFormVisible = true" type="primary" round> 创建合同 </el-button>
							</el-col>
						</el-row>
					</div>
				</el-col>

			</el-row>
		</div>

		<el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
			<el-table-column prop="createDate" label="创建时间">
			</el-table-column>
			<el-table-column prop="author" label="创建者">
			</el-table-column>
			<el-table-column prop="title" label="标题">
			</el-table-column>
			<el-table-column prop="partyA" label="甲方">
			</el-table-column>
			<el-table-column prop="partyB" label="乙方">
			</el-table-column>
		</el-table>

		<el-pagination layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="total"
		 @current-change="handleCurrentChange">
		</el-pagination>

		<el-dialog title="合同信息" :visible.sync="dialogFormVisible" width="70%">
			模板：<el-select v-model="tem" clearable filterable placeholder="请选择" @change="importModel(tem)" >
				<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-form :model="form">
				<el-form-item label="合同标题">
					<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入合同标题" v-model="form.title">
					</el-input>
				</el-form-item>
				<el-form-item label="合同内容">
					<br />
					<mavon-editor v-model="form.content" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关 闭</el-button>
				<el-button type="primary" @click="addMessage" :disabled="saveButtonDisabled">发 布</el-button>
			</div>
			甲方：<el-select v-model="form.value1" clearable filterable placeholder="请选择" @change="disable2(form.value1)">
				<el-option v-for="item in options1" :key="item.user_name" :label="item.user_name" :value="item.user_name" :disabled="item.disabled">
				</el-option>
			</el-select>
			&nbsp;&nbsp;&nbsp;乙方：<el-select v-model="form.value2" clearable filterable placeholder="请选择" @change="disable1(form.value2)">
				<el-option v-for="item in options2" :key="item.user_name" :label="item.user_name" :value="item.user_name" :disabled="item.disabled">
				</el-option>
			</el-select>
			
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

	.refresh-bottom {
		width: 64px;
	}

	.new-bottom {
		width: 128px;
	}

	.title {
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
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
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
					content: '',
					value1: '',
					value2: ''
				},
				options1: [],
				options2: [],
				options3: [{
					value: '1',
					label: '房屋买卖合同1'
				}, {
					value: '2',
					label: '房屋买卖合同2'
				}, {
					value: '3',
					label: '劳动合同'
				}, {
					value: '4',
					label: '劳务派遣合同'
				}, {
					value: '5',
					label: '个人借款合同'
				}, {
					value: '6',
					label: '土地租赁合同'
				}, {
					value: '7',
					label: '简易租房合同'
				}],
				tem: ''
			}
		}
	,
	mounted() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let uname = getCookie('username')
			this.form.author = uname
			/*如果cookie不存在，则跳转到登录页*/
			if (uname == "") {
				this.$router.replace('/')
			}
			this.$axios.get('/user').then((res) => {
				this.options1 = res.data
			})
			this.$axios.get('/user').then((res) => {
				this.options2 = res.data
			})
		},
		methods: {
			disable1(value){
				this.options1.forEach(item => {
					item.disabled=false;
					if (item.user_name==value) {
						item.disabled=true;
					}
				})
			},
			disable2(value){
				this.options2.forEach(item => {
					item.disabled=false;
					if (item.user_name==value) {
						item.disabled=true;
					}
				})
			},
			importModel(id){
				if(id==''){
					id=0;
				}
				this.$axios
					.get(`/getModel/${id}`)
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data);
						this.form.title = successResponse.data.title;
						this.form.content =successResponse.data.content;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
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
					.catch(function(error) {
						console.log(error);
					})
			},
			addMessage() {
				this.$axios
					.post('/addMessage', {
						author: this.form.author,
						title: this.form.title,
						content: this.form.content,
						partyA: this.form.value1,
						partyB: this.form.value2
					})
					.then(res => {
						if (res.data === 1) {
							this.dialogFormVisible = false
							this.$alert('您的合同已发布', '成功', {
								confirmButtonText: '确定',
							})
							this.form.name = ''
							this.form.title = ''
							this.form.content = ''
							this.value1 = ''
							this.value2 = ''
							this.getMessagePage();
						} else {
							this.$alert('标题内容不能为空')
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleRowClick: function(row) {
				if (row.partyA == this.form.author || row.partyB == this.form.author) {
					this.$router.push({
						path: `messageDetail/${row.id}`
					})
				} else {
					this.$router.push({
						path: `messageBrief/${row.id}`
					})
				}
			}
		},
		created: function() {
			this.pageNum = 1;
			this.total = 10;
			this.getMessagePage();
		}
	}
</script>
