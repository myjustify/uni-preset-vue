export default {
	data() {
		return {
			scrollTop: 0
		}
	},
	onPageScroll({ scrollTop }) {
		this.scrollTop = scrollTop
	}
}
