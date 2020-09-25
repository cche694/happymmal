import React from 'react'
class MUtil{
		request(param){
			return new Promise((resolve,reject)=>{
				$.ajax({
					type:param.type||'get',
					url:param.url||'',
					dataType:param.dataType||'json',
					data:param.data||null,
					success:res=>{
						if(res.status===0){
							typeof resolve==='function'&& resolve(res.data,res.msg)
						}
						//no login status
						else if(res.status===10){
							console.log(this)
							this.doLogin();
						}
						else{
							typeof resolve==='function'&&reject(res.msg||res.data)
						}
					},
					error:err=>{
						typeof resolve==='function'&&reject(err.statusText||'数据获取错误')
					}
				})
			})
			
		}
		//跳转登录
		doLogin(){
			document.location.href='/login?redirect='+encodeURIComponent(window.location.pathname)
		}
		getUrlParam(name){
			let queryString = window.location.search.split('?')[1] || '',
				 reg =new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
				 result =queryString.match(reg);
			return result ? decodeURIComponent(result[2]):null
		}
		successTips(msg){
			alert(msg||'成功啦~~~')
		}
		errorTips(msg){
			alert(msg||'好像哪里不对呢~')
		}

		setStorage(name,data){
			let dataType = typeof data
			if(dataType === 'object'){
				window.localStorage.setItem(name,JSON.stringify(data))
			}
			else if(['string','boolean','number'].indexOf(dataType) >= 0){
				window.localStorage.setItem(name,data)
			}else{
				alert('该类型不适用本地存储')
			}
		}

		getStorage(name){
			let data = window.localStorage.getItem(name)
			if(data){
				return JSON.parse(data)
			}
			else{
				return ''
			}
		}
		removeStorage(name){
			window.localStorage.removeItem(name)
		}

}



export default MUtil