import React,{Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'
//denpends jQ
class RichEditor extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.loadEditor()
	}
	componentWillReceiveProps(nextProps){
		if(this.props.defaultDetail!=nextProps.defaultDetail){
			console.log(nextProps.defaultDetail)
			this.simditor.setValue(nextProps.defaultDetail)
		}
	}
	loadEditor(){
		let element = this.refs['textarea']
		this.simditor = new Simditor({
			textarea:$(element),
			defaultValue:this.props.placeholder||'请输入内容',
			imageButton:['upload','external'],
			upload:{
				url: '/manage/product/richtext_img_upload.do',
			    fileKey: 'upload_file',
			}
		})
		this.bindEditorEvent()
	}
	bindEditorEvent(){
		this.simditor.on('valuechanged',(e)=>{
				this.props.onValueChange(this.simditor.getValue())
		})
	}
	render(){
		return (
			<div className="rich-editor">
				<textarea ref="textarea"></textarea>
			</div>
			)
	}
}
export default RichEditor