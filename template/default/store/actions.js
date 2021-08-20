import * as util from "@/utils/index.js"
let $api = require("@/api/index.js")
export default {
	async autoLogin({ state, dispatch }) {
		if (!state.tk) {
			dispatch('toLoginPage')
			return
		}
		let userInfo = await $api.getUserRoles({}, { toastFail: false })
			.catch(err => {
				util.toast({
					text: err.err.message || '',
					success() {
						setTimeout(() => {
							dispatch('toLoginPage')
						}, 600)
					}
				})
				return false;
			})
		if (userInfo) {
			state.ifAdmin = userInfo.data.data
		} else {
			return
		}
		setTimeout(() => {
			dispatch("toInitPage")
		}, 600)
	},
	toInitPage({ state }, type = 'reLaunch', params = {}) {
		uni[type]({
			url: state.initPage,
			...params
		})
	},
	toLoginPage({ state }, type = 'reLaunch', params = {}) {
		uni[type]({
			url: state.loginPage,
			...params
		})
	}
}