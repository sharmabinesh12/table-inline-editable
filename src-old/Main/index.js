import React, {Component} from 'react';
import EditableTable from '../components/editableTable';
import './index.scss';
class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [{
				name:'DoubleVar',
				type : 'Double',
				value : '12.34',
				isEdit : false
			}]
		}
	}

	
	/**
	 * Change handler to set updated value to state
	 * @param {*} e event of changed element 
	 * @param {number} index index of editing row 
	 */
	onChangeHandler = (e,index) =>{
		let targetElem = e.target; 
		let data  = [...this.state.data];
		if(targetElem.name === 'name'){
  		let value = e.target.value.replace(/[^A-Za-z]/ig, '');
			data[index][targetElem.name] = value;
		}else {
			data[index][targetElem.name] = targetElem.value;
		}
		this.setState({data})
	}

	/**
	 * Action handler to take action on particular row
	 * @param {string} action action value can be edit, add, save and delete
	 * @param {number} index index of row 
	 */
	onActionHandler = (action, index) =>{
		let data  = [...this.state.data];
		switch(action){
			case 'add':
				data.push({
					name:'',
					type : 'Double',
					value : '',
					isEdit : true
				})
				break;
			case 'edit':
				data[index].isEdit = true;
				break;
			case 'delete':
				data.splice(index,1);
				localStorage.setItem('data',JSON.stringify(data))
				break;
			case 'save':
				this.saveData(data,index);
				break;
			default:
				break;
		}
		this.setState({data})
	}

	/**
	 * Saving data to local storage
	 * @param {array} data complete data set 
	 * @param {number} index index of row 
	 */
	saveData = (data, index) =>{
		if(this.validateName(data[index].name)){
			if(this.validateValue(data[index].type,data[index].value)){
				data[index].isEdit = false;
				localStorage.setItem('data',JSON.stringify(data))
			}
		} 
	}

	/**
	 * Validating name field
	 * @param {string} name name field to be validated
	 */
	validateName = name =>{
		if(name.length === 0){
			alert("Name is required field");
			return false;
		} else if(name.length > 32){
			alert("Max length for name field is 32");
		} else {
			return true;
		}
	}

	/**
	 * Validating value field based on type
	 * @param {string} type selected type
	 * @param {*} value value to be validated
	 */
	validateValue = (type,value) => {
		switch(type) {
			case 'String':
				var stringRule = /^[ A-Za-z_./-]*$/
				if(value.length > 16){
					alert('max length for value is 16')
				} else if(stringRule.test(value.trim())){
					return true;
				} else {
					alert("Value field should contains alphabets(a-z or A-Z) and (-, _ and .) special character");
				}
				break;
			case 'Double':
				if((value.match(/^-?\d*(\.\d+)?$/))){
					return true;
				} else {
					alert('Please enter valid double number')
				}
				break;
			case 'Boolean':
				if(value === 'true' || value === 'false'){
					return true;
				} else {
					alert('Value should be true/false');
				}
				break;
			default:
				break;
		}
	}

	render(){
		const { data } =this.state;
		return (
			<div className="main-container">
				<EditableTable 
					data={data}
					onChangeHandler = {this.onChangeHandler}
					onActionHandler = {this.onActionHandler}
				/>
			</div>
		)
	}
}
export default Main;