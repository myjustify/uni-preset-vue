import req from "y-uni-request";
import store from "@/store/index.js"
const util = require('@/utils/index.js')
const log = require('@/utils/log.js')
let reqBody = new req();
reqBody.beforeRequest = ({params,extra,curPage})=>{
	let tk = store.state.tk||""
	let u = params.url
	if(u!='login'&&tk&&extra.takeTk){
		params.header.Cookie=tk;
	}
	let apiServer = store.state.apiServer
	params.url = apiServer + params.url||''
}
reqBody.afterRequest = ({ res,resolve,reject,params,extra })=>{
	if(extra.requestType=='uploadFile'){
		res.data = res.data || '{}'
		try{
			res.data = JSON.parse(res.data)
		}catch(err){}
	}
	let statusCode = res.statusCode
	let data = res.data||{}
	if(statusCode==401||data.code==2){
		if(store.state.authLoginAlert||store.state.loginStatus){
			return
		}
		store.commit('setState',{ field:'authLoginAlert',value:true })
		util.alert({
			msg: data.message||'登录失效，重新登录',
			success:()=>{
				store.commit('logout')
				store.commit('setState',{ field:'authLoginAlert',value:false })
				store.dispatch('toLoginPage')
			}
		});
		log.info(res,{ ...params });
		return
	}
	if(statusCode==200&&data.code==0){
		resolve(res)
	}else{
		if (extra.toastErr) {
			util.alertManage({
				...data,
				success: ()=>{
					extra.errBack&&extra.errBack();
				}
			})
		} else {
			let dataType = typeof data;
			if(dataType=='string'){data = { message: data }};
			reject({errType: 'err',err: data });
		}
		log.info(res,{ ...params });
	}
}
reqBody.failRequest = ({ err,resolve,reject,params,extra })=>{
	if(extra.toastFail&&!store.state.failAlert){
		store.commit("setState",{ field:'failAlert',value: true })
		util.alert({
			content: store.state.failMsg,
			complete() {
				store.commit("setState",{ field:'failAlert',value: false })
			}
		})
	}else{
		reject({ errType:'fail',err:{ message: "网络异常!!!" } })
	}
}

// 自动导入api
let apis = {}
const requireComponent = require.context('./', true, /\.js$/)
requireComponent.keys().forEach(fileName=>{
	if(fileName!="./index.js"){
		const componentConfig = requireComponent(fileName)
		apis = { ...apis,...componentConfig }
	}
})
const api = {
	reqBody,
	clearCurPageReq(){
		this.reqBody.clearCurPageReq();
	},
	...apis
}

module.exports = api;