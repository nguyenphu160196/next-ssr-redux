import {signin} from '../services/api'
const isBrowser = typeof window !== 'undefined'

class Auth {
	constructor() {
		if(isBrowser){
			this.getInfo()
			this.role()
		}
	}

	login(data) {
		if(isBrowser){
			return new Promise((resolve,reject) => {
				signin(data)
				.then(res => {
					let {success,results} = res
					if(success) {
						localStorage.setItem('user',JSON.stringify(results.user))
						localStorage.setItem('tenantsTab', JSON.stringify(results.tenantsTab))
						localStorage.setItem('token',results.token)
						resolve(res);
					} else {
						reject(res);
					}
				})
				.catch(err => {
					reject(err)
				})
			})
		}
	}

	logout() {
		if(isBrowser){
			delete this._userInfo
			localStorage.clear()
			return new Promise((resolve,reject) => {
				resolve()
			})
		}
	}

	checkAuth() {
		if(isBrowser){
			let token = localStorage.token
			if(token && token.length > 0) {
				return true
			} else {
				delete this._userInfo
				return false
			}
		}
	}

	role() {
		this.getToken()
		let info = this.getInfo()
		let {role} = info
		if(!!role && role.length) {
			return role[0]
		} else {
			return undefined
		}
	}

	getInfo() {
		if(isBrowser){
			if(!!!this._userInfo) {
				let user = localStorage.user
				if(user) {
					this._userInfo = JSON.parse(user)
				} else {
					this._userInfo = {}
				}
			}
			return this._userInfo
		}
	}

	getToken() {
		if(isBrowser){
			let token = localStorage.token
			if(token != this._token) {
				delete this._userInfo
				this.getInfo()
			}
			this._token = token
			return this._token
		}
	}
}

export default Auth;