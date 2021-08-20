const path = require('path')
const plat = process.env.UNI_PLATFORM
module.exports = {
	//   parser: require('postcss-comment'),
	plugins: [
		require('postcss-import')({
			resolve(id, basedir, importOptions) {
				if (id.startsWith('~@/')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
				} else if (id.startsWith('@/')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
				} else if (id.startsWith('/') && !id.startsWith('//')) {
					return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
				}
				return id
			}
		}),
		//去除所有css注释
		require('postcss-discard-comments')({
			removeAll: true
		}),
		//微信小程序去掉样式自动补全
		plat == 'mp-weixin' ? '' : require('autoprefixer')({
			remove: plat !== 'h5'
		}),
		require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
	]
}
