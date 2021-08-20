var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
module.exports = {
	flag: process.env.NODE_ENV=='development',
	info() {
		if (!log||this.flag) return
		log.info.apply(log, arguments)
	},
	warn() {
		if (!log||this.flag) return
		log.warn.apply(log, arguments)
	},
	error() {
		if (!log||this.flag) return
		log.error.apply(log, arguments)
	},
	setFilterMsg(msg) { // 从基础库2.7.3开始支持
		if (!log || !log.setFilterMsg||this.flag) return
		if (typeof msg !== 'string') return
		log.setFilterMsg(msg)
	},
	addFilterMsg(msg) { // 从基础库2.8.1开始支持
		if (!log || !log.addFilterMsg||this.flag) return
		if (typeof msg !== 'string') return
		log.addFilterMsg(msg)
	}
}
