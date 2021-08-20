import {
	isEmpty
} from './dataType.js'
// 剔除参数中的空
export function rmParamsNull(params = {}) {
	params = { ...params }
	let a = {};
	for (let key in params) {
		if (!isEmpty(params[key])) {
			a[key] = params[key];
		}
	}
	return a;
}

// 剔除参数中的非
export function rmParamsFalse(params = {}) {
	let p = { ...params }
	let a = {};
	for (let key in p) {
		if (p[key]) {
			a[key] = p[key];
		}
	}
	return a;
}

// 替换null为空串
export function rpParamsNull(params = {}) {
	let p = {
		...params
	}
	for (let key in p) {
		if (isEmpty(p[key])) {
			p[key] = ''
		}
	}
	return p;
}

// 唯一特征
export function generateUUID() {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

// 判断是否是正确的时期格式
export function testDate(str = '', connect = '-') {
	let defaultDate = '2099-12-31'
	let obj = {
		value: defaultDate,
		flag: false
	}
	try {
		str = str.toString()
	} catch (err) {
		str = ''
		return obj;
	}
	if (/^\d{4}[\-\/\.]{0,1}\d{1,2}[\-\/\.]{0,1}\d{1,2}$/.test(str)) {
		obj.value = str.replace(/\./g, connect);
		obj.flag = true;
	}
	return obj;
}

/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @param floor 四舍五入 0是1否;
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatMoney(num, cent = 2, isThousand = 1, floor = 0, fill = true) {
	let reg = /(\-)?(\d*)?\.?(\d*)/
	// 检查传入数值为数值类型
	if (isNaN(num)) {
		console.error(
			`${num} 该数据不是数字类型，请检查数据`
		)
		return '金额数据异常'
	}
	num = +num
	num = num.toString().replace(/\$|\,/g, '')

	let [, sign, nums = 0, cents = 0] = num.match(reg)
	// 获取小数部分
	cents = Math.floor(+('0.' + cents) * Math.pow(10, cent) + (floor ? 0 : 0.50000000001)).toString()

	if (isThousand) {
		// 对整数部分进行千分位格式化.
		for (var i = 0; i < Math.floor((nums.length - (1 + i)) / 3); i++) {
			nums =
				nums.substring(0, nums.length - (4 * i + 3)) +
				',' +
				nums.substring(nums.length - (4 * i + 3))
		}
	}
	if (cent > 0) {
		if (!fill) {
			let decimals = +(cents.split('').reverse().join('')).toString()
			decimals = decimals.split('').reverse().join('')
			decimals = +decimals ? '.' + decimals : ''
			return (sign || '') + nums + decimals
		} else {
			return (sign || '') + nums + '.' + cents
		}
	} else {
		return (sign || '') + nums
	}
}

export function getDateTime(str, connector) {
	str = str ? str : 0;
	let all = getDateAll(newDate(str));
	if (!connector) {
		return all.Y + '-' + all.M + '-' + all.D + ' ' + all.h + ':' + all.m + ':' + all.s
	} else if (connector == 'CN') {
		return all.Y + '年' + all.M + '月' + all.D + '日' + ' ' + all.h + '时' + all.m + '分' + all.s + '秒';
	}
}

export function getYearDateTime(str, connector) {
	str = str ? str : 0;
	let all = getDateAll(newDate(str));
	if (!connector) {
		return all.Y + '-' + all.M + '-' + all.D;
	} else if (connector == 'CN') {
		return all.Y + '年' + all.M + '月' + all.D + '日';
	}
}

export function getDateAll(date, fillZero = true) {
	let weekName = ['日', '一', '二', '三', '四', '五', '六']
	let Y = '', M = '', D = '', h = '', m = '', s = '', sss = '', w = '';
	Y = date.getFullYear()
	M = date.getMonth() + 1
	D = date.getDate()
	h = date.getHours()
	m = date.getMinutes()
	s = date.getSeconds()
	sss = date.getMilliseconds()
	w = weekName[date.getDay()]
	if (fillZero) {
		Y = fillZeros(Y)
		M = fillZeros(M)
		D = fillZeros(D)
		h = fillZeros(h)
		m = fillZeros(m)
		s = fillZeros(s)
		if (sss < 99) {
			sss = '0' + sss
		} else if (sss < 9) {
			sss = '00' + sss
		}
	}
	return {
		Y, M, D, h, m, s, sss, w
	}
}

export function newDate(str) {
	if (!str) {
		return new Date(0)
	}
	if (typeof str == 'number') {
		return new Date(str)
	}
	let a = str.split(' ')
	a[0] = a[0].replace(/\D/g, '/')
	return new Date(a.join(' '))
}

// 补零
export function fillZeros(number) {
	if (!number) {
		return '00';
	}
	number = number <= 9 ? '0' + number : number;
	return number;
}

// 获取当前年月日
export function getNowDate(connector, fillZero) {
	if (!connector) {
		connector = '-'
	}
	let now = newDate()
	let a = getDateAll(now, fillZero)
	return a.Y + connector + a.M + connector + a.D
}

// 加减天数
export function calcDateByDay(params) {
	params.str = params.str ? params.str : '1970-01-01'
	params.step = params.step ? params.step : -1
	params.fillZero = params.fillZero == undefined ? true : params.fillZero;
	let now = newDate(params.str)
	let nowTimeStamp = Date.parse(now)
	let resDate = ''
	resDate = newDate(nowTimeStamp + 60 * 60 * 24 * 1000 * (params.step))
	let all = getDateAll(resDate, params.fillZero)
	return all
}

// 获取近一周的时间
export function getSomeDaysDate(n = 7) {
	let dayTotal = 1 * 1000 * 60 * 60 * 24
	let currentTime = Date.now()
	let onweekTime = [currentTime]
	for (let i = 0; i < n - 1; i++) {
		let a = +onweekTime[i] + dayTotal;
		onweekTime.push(a);
	}
	let result = []
	onweekTime.forEach(item => {
		let res = getDateAll(newDate(item))
		let date = res.M + '-' + res.D
		let week = res.w
		let obj = { date, week, timeStamp: item, ...res }
		result.push(obj)
	})
	return JSON.parse(JSON.stringify(result))
}