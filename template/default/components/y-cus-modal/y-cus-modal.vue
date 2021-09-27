<template>
	<view class="cus-modal">
		<uni-popup ref="popup" type="center" :custom="true" :maskClick="maskClick" @maskClick="bindMaskClick">
			<view class="cus-modal-box" v-if="!custom">
				<view v-if="showTitle" class="cus-modal-title flex-row-c" :style="[titleCss]"><text v-if="titleRequest" style="color: #F10000;">*</text>{{title}}</view>
				<view class="cus-modal-second-title flex-row-c" v-if="secondTitle" :style="[secondTitleCss]">{{secondTitle}}</view>
				<view class="cus-modal-content">
					{{content?content:''}}<text class="link" @click.stop="linkClick" v-if="link">《{{link}}》</text>
					<slot name="content"></slot>
				</view>
				<view style="width: 100%;">
					<view class="buttonList flex-row" v-if="!customButton">
						<view @click.stop="opt(item)" class="buttonList-item flex-row-c" v-for="item in buttonList" :key="item.label">
							{{item.label}}
						</view>
					</view>
					<slot name="button"></slot>
				</view>
			</view>
			<slot></slot>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'cus-modal',
		props:{
			custom: {
				type: Boolean,
				default:false
			},
			maskClick: {
				type: Boolean,
				default: true
			},
			content:[String,Number],
			link: [String,Number],
			title: {
				type: String,
				default: '提示'
			},
			secondTitle: {
				type: String,
				default: ''
			},
			titleCss:{
				type: Object,
				default: ()=>{}
			},
			secondTitleCss:{
				type: Object,
				default: ()=>{}
			},
			titleRequest:{
				type: Boolean,
				default:false
			},
			showTitle:{
				type: Boolean,
				default:true
			},
			// 自定义按钮
			customButton:{
				type: Boolean,
				default:false
			},
			buttonList: {
				type: Array,
				default: ()=>{
					return [{ label: '取消',value: 'cancel' },{ label: '确认',value:'confirm' }]
				}
			}
		},
		data(){
			return {
				show: false
			}
		},
		methods: {
			toggle(){
				if(this.show){
					this.close()
				}else{
					this.open()
				}
			},
			bindMaskClick(e){
				this.show = false
			},
			open() {
				this.show = true
				this.$refs.popup.open();
			},
			close() {
				this.show = false
				this.$refs.popup.close();
				this.$emit('close');
			},
			linkClick(){
				this.$emit('link');
			},
			opt(item){
				let result = {}
				result[item.value] = true
				this.$emit('confirm',result)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cus-modal-box{
		width: 608upx;
		background-color: #fff;
		border-radius: 10upx;
		overflow: hidden;
		position: relative;
		// padding-bottom:30upx;
		.cus-modal-title{
			color: $uni-color-primary;
			font-size: 34upx;
			padding-top: 20upx;
			// padding-bottom: 40upx;
		}
		.cus-modal-second-title{
			color: #666666;
			margin: 20upx 0;
			font-weight: bolder;
		}
		.cus-modal-content{
			font-size: 28upx;
			color: #666;
			padding: 0 60upx;
			margin: 30upx 0;
			text-align: center;
		}
		.link{
			color: $uni-color-primary;
		}
		
		.buttonList{
			&-item{
				flex: 1;
				height: 80rpx;
				text-align: center;
				&:nth-child(2n+1){
					border-top: 1px solid #C0C0C0;
				}
				&:nth-child(2n){
					background: $uni-color-primary;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
