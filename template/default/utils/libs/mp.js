import config from './config.js'
import { rmParamsNull } from './util.js'
import { isEmpty } from './dataType.js'
export function showModal(params={}){
	!isEmpty(params.msg) && (params.content=params.msg); //兼容老代码
	params = rmParamsNull(params)
	let p = {
		...config.showModal,
		...params
	}
	uni.showModal({...p})
}
// 强提示
export function alert(params) {
	params = rmParamsNull(params)
	params = {
		...params,
		showCancel:false
	}
	showModal(params)
}
// 弱提示
export function toast(params) {
	!isEmpty(params.msg) && (params.title=params.msg); //兼容老代码
	params = rmParamsNull(params)
	const success = params.success
	const complete = params.complete
	params = {
		...config.toast,
		...params,
		success:(res)=>{
			if(success){
				setTimeout(() => {
					success(res)
				}, params.duration)
			}
		},
		complete:(res)=>{
			if(complete){
				setTimeout(() => {
					complete(res)
				}, params.duration)
			}
		}
	}
	uni.showToast(params)
}

export function goBack(n){
	n = n?n:'1'
	// #ifndef H5
	uni.navigateBack({
		delta:Number(n)
	})
	// #endif
	// #ifdef H5
	let history = window.history||history
	history.back(-n)
	// #endif
}
// 预览图片
export function previewImage(pathList, current) {
	current = current ? current : 0;
	uni.previewImage({
		current: pathList[current],
		urls: pathList
	})
}
// 选择图片
export function chooseImg(params={}) {
	params = rmParamsNull(params)
	params = { ...config.chooseImg,...params}
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			success: function(res) {
				resolve(res)
			},
			fail:(err)=> {
				if(!err.errMsg.includes('cancel')) toast({title: err.errMsg});
			},
			...params
		})
	})
}

export function makePhoneCall(phoneNumber=''){
	phoneNumber = String(phoneNumber);
	if(!phoneNumber){
		toast({title: '号码为空'});
		return;
	}
	uni.makePhoneCall({
		phoneNumber
	})
}

// 判断是否获取地理位置授权
export function getLocationAuth(callback) {
	return new Promise((resolve,reject)=>{
		// #ifdef H5
		let navigator = navigator || window.navigator
		navigator.geolocation.getCurrentPosition((res) => {
			resolve(true)
		}, (err) => {
			if (err.code != 1) {
				resolve(true)
			} else {
				reject(false)
			}
		})
		// #endif
		// #ifdef MP-WEIXIN
		let scope = 'scope.userLocation'
		getSetting(scope)
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				authorize(scope)
					.then(res=>{
						resolve(res)
					})
					.catch(err=>{
						reject(err)
					})
			})
		// #endif
		// #ifdef APP-PLUS
		let auth = plus.navigator.checkPermission('LOCATION');
		if (auth == 'authorized') {
			resolve(true)
		} else {
			reject(false)
		}
		// #endif
	})
}

// 获取是否授权
export function getSetting(scope){
	return new Promise((resolve,reject)=>{
		uni.getSetting({
			success(res) {
				if (res.authSetting[scope]) {
					resolve(true)
				}else{
					reject(false)
				}
			}
			,fail() {
				reject(false)
			}
		})
	})
}
// 调起授权
export function authorize(scope){
	return new Promise((resolve,reject)=>{
		uni.authorize({
			scope,
			success: () => {
				resolve(true)
			},
			fail: (res) => {
				reject(false)
			}
		})
	})
}

	/*
	* @ prams code 
	* 1 弱提
	* 3 强提
	* 4 不提示
	*/
export function alertManage(params){
	params = params?params:{}
	let msg = params.message||'';
	let code = params.code;
	let success = params.success;
	setTimeout(()=>{
		if(code==1){
			toast({msg,success:()=>{success&&success()}})
		}else if(code==3){
			alert({msg,success:()=>{success&&success()}})
		}
		else if(code==4){
			success&&success()
		}
		else{
			toast({msg,success:()=>{success&&success()}})
		}		
	})
}