import initState from "./state.js"
export default {
	changeApiServer(state, { name }){
		let serverLists = state.serverLists;
		let index = 0;
		for(let i=0;i<serverLists.length;i++){
			if(serverLists[i].name==name){
				index = i;
				break;
			}
		}
		state.apiServer = serverLists[index].apiServer;
		state.picServer = serverLists[index].picServer;
	},
	setState(state,v={}){
		let keys = Object.keys(v)
		for(let i= 0;i<keys.length;i++){
			let k = keys[i]
			state[k] = v[k]
		}
	},
	logout(state) {
		let { loginName,apiServer } = state
		Object.assign(state, { ...initState,loginName,apiServer });
	}
}