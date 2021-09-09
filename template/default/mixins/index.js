let mixin = {
	data() {
		return {
			refresh: false,
			curPage: '',
			prePage: '',
			route: [],
			isLoading: false,
			isNavLoading:false
		}
	},
	computed:{
	},
	onLoad() {
		let route = getCurrentPages().reverse()
		route = route.map(item => item.route)
		this.curPage = route[0]
		route.length > 1 && (this.prePage = route[1])
		this.route = route
		this.addListener()
	},
	onUnload() {
		this.$api&&this.$api.clearCurPageReq&&this.$api.clearCurPageReq()
		this.removeListener()
	},
	methods: {
		// 无法在onload onshow 等生命周期中派发
		addListener() {
			let curPage = this.curPage
			uni.$on((curPage + 'onSet'), (filed, value) => {
				this[filed] = value
			})
			uni.$on((curPage +'onSetData'),(value={})=>{
				let keys = Object.keys(value)
				for(let i = 0;i<keys.length;i++){
					let key = keys[i]
					let v = value[key]
					if( typeof v != 'object' ){
						this[key] = v
					}else{
						let k = Object.keys(v)
						for(let j =0;j<k.length;j++){
							let ik = k[j]
							let iv = v[ik]
							this.$set(this[key],ik,iv)
						}
					}
				}
			})
			uni.$on((curPage + 'onMethods'), (method, ...params) => {
				this[method] && this[method](...params)
			})
		},
		removeListener() {
			let curPage = this.curPage
			uni.$off(curPage + 'onSet')
			uni.$off(curPage + 'onSetData')
			uni.$off(curPage + 'onMethods')
		},
		logOut(){
			this.$u.showModal({
				content: '确认退出?',
				success:(res)=>{
					if(res.confirm){
						this.$api.logOut({},{ toastErr: true })
						.then(res=>{
							this.$store.commit('logout')
							this.$store.dispatch('toLoginPage')
						})						
					}
				}
			})
		},
	}
}
module.exports = mixin
