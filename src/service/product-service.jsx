import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
class Product{
	getProductList(listParam){
		let url='',
		data={}
		if(listParam.listType==='list'){
			url='/manage/product/list.do',
			data.pageNum=listParam.pageNum
		}else if(listParam.listType==='search'){
			url='/manage/product/search.do',
			data.pageNum=listParam.pageNUm,
			data[listParam.searchType]=listParam.keyword
		}
		return _mm.request({
			type:'post',
			url:url,
			data:data
		})
	}
	checkProduct(product){
		let result={
			status:true,
			msg:'验证通过'
		}
		console.log(product.subimages)
		if(typeof product.name!=='string'||product.name.length ==0 ){
			return {
				status:false,
				msg:'商品名称不能为空'
			}
		}
		if(typeof product.subtitle!=='string'||product.subtitle.length ==0 ){
			return {
				status:false,
				msg:'商品描述不能为空'
			}
		}
		if(typeof product.categoryId!=='number'|| !(product.categoryId > 0) ){
			return {
				status:false,
				msg:'请选择品类'
			}
		}
		if( typeof product.price!=='number' || !(product.price >= 0)) {
			return {
				status:false,
				msg:'价格不正确'
			}
		}
		if(typeof product.stock!=='number'|| !(product.stock >= 0) ){
			return {
				status:false,
				msg:'库存不正确'
			}
		}
		return result
	}
	setProductStatus(productStatus){
		return _mm.request({
		type:'post',
		url :'/manage/product/set_sale_status.do',
		data:productStatus
		})
	}
	getCategoryList(parentCategoryId){
		return _mm.request(
			{
			type:'post',
			url:'/manage/category/get_category.do',
			data:{
				categoryId:parentCategoryId||0
			}
		})
	}
	saveProduct(product){
		return _mm.request(
			{
			type:'post',
			url:'/manage/product/save.do',
			data:product
		})
	}
	getProduct(productId){
		return _mm.request(
			{
			type:'post',
			url:'/manage/product/detail.do',
			data:{
				productId:productId||0
			}
		})
	}
	
	
}
export default Product