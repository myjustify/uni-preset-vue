<template>
	<view :class="[ comName ]">
			home
	</view>
</template>

<script>
	export default {
		name:"home",
		data(){
			return {
				comName: "home",
			}
		}
	}
</script>

<style lang="scss" scoped>
$name: '.home';
#{$name}{

}
</style>
