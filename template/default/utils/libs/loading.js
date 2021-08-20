function getCurPage(){
	let result = ''
	let routes = getCurrentPages().reverse()
	routes.length && (result = routes[0].route)
	return result
}

// 配合全局mixin
function setLoading(path,val){
	uni.$emit(path+'onSetData',val)
}

function noop(){}
/**
 * 
 * @param {*} options 
 * @options {loading} String
 * @options {navLoading} String
 * @returns 
 */
export function loading(options){
	const { loading='isLoading',navLoading='isNavLoading'} = (options||{})
	const loadings = {}
	const showLoading = uni.showLoading||noop
	const hideLoading = uni.hideLoading||noop
	const showNavigationBarLoading = uni.showNavigationBarLoading||noop
	const hideNavigationBarLoading = uni.hideNavigationBarLoading||noop
	/**
	 * 
	 * @param {custom} Boolen 是否使用自定义loading
	 * @param {path} String 页面路由地址
	 */
	uni.showLoading = function({ path,custom,...params }={}){
		path = path || getCurPage()
		path && !loadings[path+'loading'] && (loadings[path+'loading'] = true)
		setLoading( path,{ [loading]: true })
		!custom && showLoading(params)
	}
	uni.hideLoading = function({ path,custom }={}){
		path = path || getCurPage()
		path && loadings[path+'loading'] && (loadings[path+'loading'] = false)
		setLoading( path,{ [loading]: false })
		!custom && hideLoading()
	}
	uni.showNavigationBarLoading = function({path,custom}={}){
		path = path || getCurPage()
		path && !loadings[path+'navLoading'] && (loadings[path+'navLoading'] = true)
		setLoading( path,{ [navLoading]: true })
		!custom && showNavigationBarLoading()
	}
	uni.hideNavigationBarLoading = function({path,custom}={}){
		path = path || getCurPage()
		path && loadings[path+'navLoading'] && (loadings[path+'navLoading'] = false)
		setLoading( path,{ [navLoading]: false })
		!custom && hideNavigationBarLoading()
	}
	return loadings;
}
