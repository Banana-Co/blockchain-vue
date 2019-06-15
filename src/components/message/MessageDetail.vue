<template>
	<center>
		<div>


			<el-card class="message-detail">

				<div slot="header" class="clearfix">
					<el-row type="flex" justify="space-between">
						<el-col :span="4">
							<div class="grid-content">
								<el-button @click="handleClickReturn"> 返回 </el-button>
							</div>
						</el-col>
						<el-col :span="16">
							<div class="clearfix">{{title}}</div>
						</el-col>
						<el-col :span="4"></el-col>
					</el-row>
				</div>
				<div class="party">
					<el-row>
						<el-col :span="12">
							<div>甲方: {{partyA}} | 签署状态： <el-switch v-model="value1" disabled active-color="#13ce66" inactive-color="#ff4949">
							</el-switch></div>
							
						</el-col>
						<el-col :span="12">
							<div>乙方: {{partyB}} | 签署状态： <el-switch v-model="value2" disabled active-color="#13ce66" inactive-color="#ff4949">
							</el-switch></div>
							
						</el-col>
					</el-row>
				</div>

				<div >
					<mavon-editor v-model="content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false" @change="changeData" />
				</div>
				<div class="grid-content">
					<el-button @click="sign"> 签署 </el-button>
				</div>
			</el-card>

		</div>
	</center>
</template>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.left-bottom {
		margin-left: 240px;
	}

	.right-bottom {
		margin-right: 240px;
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

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.message-detail {
		width: 960px;
	}

	.box-card {
		margin-top: 30px;
		width: 960px;
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

	.party {
		border-bottom: lightsteelblue solid 1px;
		font: "agency fb";
		font-size: 19px;
	}
	.text_item{
		font: "agency fb";
		font-size: 18px;
		text-align: left;
		line-height: 2
	}
	
</style>

<script>
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		name: "MessageDetail",
		data() {
			return {
				title: '',
				content: '',
				signInfoVo: {
					user_name: getCookie('username'),
					message_id: this.$route.params.id
				},
				partyA: '',
				partyB: '',
				value1:false,
				value2:false,
				defaultData: "preview"
			}
		},

		methods: {
			sign() {
				this.$axios
					.post('/sign', {
						user_name: this.signInfoVo.user_name,
						message_id: this.signInfoVo.message_id,
					})
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data)
						if (successResponse.data.code === 200) {
							alert("签署成功")
						} else if (successResponse.data.code === 201) {
							alert("已签署过该合约")
						}else if (successResponse.data.code === 400) {
							alert("非法操作")
						}
						location.reload();
					})
					
					.catch(failResponse => {})
			},
			getMessageDetail() {
				this.$axios
					.get(`/getMessage/${this.$route.params.id}`)
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data);
						this.title = successResponse.data.title;
						this.content =successResponse.data.content;
						this.partyA = successResponse.data.partyA;
						this.partyB = successResponse.data.partyB;
						this.value1 = successResponse.data.pAsigned;
						this.value2 = successResponse.data.pBsigned;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleClickReturn() {
				this.$router.push({
					path: "/messageFlow"
				})
			}
		},
		created: function() {
			this.getMessageDetail()
		}
	}
</script>
