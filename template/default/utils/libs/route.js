// 路由拦截

uni.$router = {}

// uni.$router.beforeEnter = function(to, from, next,options,type){
    // next({ options,type })
// }
// uni.$router.afterEach = function(to, from){
    
// }
export function routeIntercept(){

    function defaultBeforeEnter(to, from, next,options,type) {
        next({ options,type })
    }
    
    function defaultAfterEach(to, from) {}
    
    function init(options={},type) {
        let route = getCurrentPages().reverse()
        let len = route.length
        route = route.map(item => item.route)
        let from = route[0]
        let to = ''
    
        if(!uni.$router.beforeEnter){
            uni.$router.beforeEnter = defaultBeforeEnter
        }
        if(!uni.$router.afterEach){
            uni.$router.afterEach = defaultAfterEach
        }
    
        if(/navigateTo|redirectTo|reLaunch|switchTab/.test(type)){
            to = options.url||''
        }else if(/navigateBack/.test(type)){
            to = route[1]
        }else{
            throw Error('跳转类型有误')
        }
    
        // if( length > 10 ){
    
        // }
    
        const cb = getMethod((complete)=>{
            uni.$router.afterEach(to,from,complete)
        })
    
        uni.$router.beforeEnter(to,from,({ options:opt,type:t }={})=>{
            cb&&cb(opt||options,t||type)
        },options,type)
    }
    
    const cacheNavigateTo = uni.navigateTo
    uni.navigateTo = function(options={}){
        init(options,'navigateTo')
    }
    
    const cacheRedirectTo = uni.redirectTo
    uni.redirectTo = function(options={}){
        init(options,'redirectTo')
    }
    
    const cacheReLaunch = uni.reLaunch
    uni.reLaunch = function(options={}){
        init(options,'reLaunch')
    }
    
    const cacheSwitchTab = uni.switchTab
    uni.switchTab = function(options={}){
        init(options,'switchTab')
    }
    
    const cacheNavigateBack = uni.navigateBack
    uni.navigateBack = function(options={}){
        init(options,'navigateBack')
    }
    
    function getMethod(callback){
    
        const fns = {
            navigateTo: cacheNavigateTo,
            redirectTo: cacheRedirectTo,
            reLaunch: cacheReLaunch,
            switchTab: cacheSwitchTab,
            navigateBack: cacheNavigateBack
        }
        return function(opt,type){
            const fn = fns[type]
            if(!fn){
                throw Error('跳转类型有误')
            }
            const complete = opt.complete
            fn({
                ...opt,
                complete: (res)=>{
                    complete && complete(res)
                    callback && callback(res)
                }
            })
        }
    }

}