const development = process.env.NODE_ENV == 'development';
export default {
	ifAdmin: 0,
	loginName: "",
	tk: '',
	loginStatus: false,     //登录态
	authLoginAlert: false,
	sendMsgBaseTime: 30,
	failMsg: "网络异常!!!",
	failAlert: false,  //网络异常弹窗是否弹出
	development: development ? 1 : 0,
	version: "1.0.0", //小程序版本号
	apiServer: development ? 'https://yuyue.wbtech.com/' : 'https://yueche.wbtech.com/', //环境地址
	picServer: "https://yueche.wbtech.com/file/",
	initPage: '/pages/common/index',
	loginPage: '/pages/common/login',
	deviceInfo: '',     //设备信息
	serverLists: [
		{
			name: '1',
			label: "测试",
			apiServer: 'https://yuyue.wbtech.com/',
			picServer: 'https://yuyue.wbtech.com/file/'
		},
		{
			name: '2',
			label: "生产",
			apiServer: "https://yueche.wbtech.com/",
			picServer: 'https://yueche.wbtech.com/file/'
		},
		{
			name: '3',
			label: "开发",
			apiServer: "http://10.0.182.25:30001/",
			picServer: 'http://10.0.182.25:30001/file/'
		}
	]
}
