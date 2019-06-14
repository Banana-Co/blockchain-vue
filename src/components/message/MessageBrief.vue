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
							<div>甲方: {{partyA}} <el-switch v-model="value1" disabled>
							</el-switch></div>
							
						</el-col>
						<el-col :span="12">
							<div>乙方: {{partyB}} <el-switch v-model="value2" disabled>
							</el-switch></div>
							
						</el-col>
					</el-row>
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
		width: 48rem;
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
</style>

<script>
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		name: "MessageBrief",
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
				value2:false
			}
		},

		methods: {
			getMessageDetail() {
				this.$axios
					.get(`/getMessage/${this.$route.params.id}`)
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data);
						this.title = successResponse.data.title;
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
