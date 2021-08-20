<template>
	<view :class="[ comName ]" :style="[customStyle]">
		<slot></slot>
		<view :class="[ safeAreaInsetBottom?'safeAreaInsetBottom':'' ]"></view>
	</view>
</template>

<script>
	export default {
		name:"y-warp",
		props:{
			customStyle: {
				type: Object,
				default: ()=>{}
			},
			safeAreaInsetBottom:{
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				comName: "y-warp",
			}
		}
  }
</script>

<style lang="scss" scoped>
$name: '.y-warp';
#{$name}{
	.safeAreaInsetBottom{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>
