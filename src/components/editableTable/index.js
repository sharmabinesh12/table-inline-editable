import React, { Component } from 'react';
import './index.scss';

const typeOptions = ['Double', 'String', 'Boolean'];

class EditableTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data : props.data ? props.data : []
		}
	}
	componentDidMount() {
		if(this.props.data){
			this.setState({data: this.props.data})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data){
			this.setState({data: nextProps.data})
		}
	}

	handleUpDown = (aciton,index) =>{
		let data = this.state.data;
		let Integer = data[index].Integer;
		let Delta = data[index].Delta;
		let event = {
			target : {name : 'Integer',}
		};
		if(aciton === 'up'){
			event.target.value = parseInt(Integer) + parseInt(Delta);
			this.props.onChangeHandler(event,index);
		} 
		if(aciton === 'down') {
			event.target.value = Integer - Delta;
			this.props.onChangeHandler(event,index);
		}
	}

	render(){
		const {onChangeHandler, onActionHandler} = this.props;
		const {data} = this.state;
		return(
			<div className="editable-container">
				<div className="add-btn-box">
					<button className="btn-add" type="button" onClick={()=>onActionHandler('add')}>Add</button>
				</div>
				
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Value</th>
							<th style={{maxWidth:'100px',minWidth:'100px'}}>Integer</th>
							<th style={{maxWidth:'100px',minWidth:'100px'}}>Delta</th>
							<th>UP/Down</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item,index) =>{
							return(
								<tr>
									<td>
										{item.isEdit ?
											<input type="text" name="name" onChange={e=>onChangeHandler(e,index)} value={item.name} placeholder="Enter name" />
											:
											<span>{item.name}</span>
										}
									</td>
									<td>
										{item.isEdit ?
											<select onChange={e=>onChangeHandler(e,index)} name="type">
												{typeOptions.map(type=><option value={type} selected={type===item.type}>{type}</option>)}
											</select>
											:
											<span>{item.type}</span>
										}
									</td>
									<td>
										{item.isEdit ?
											<input type="text" name="value" onChange={e=>onChangeHandler(e,index)} value={item.value} placeholder="Enter Value"/>
											:
											<span>{item.value}</span>
										}
									</td>
									<td style={{maxWidth:'100px',minWidth:'100px'}}>
										{item.isEdit ?
											<input type="number" name="Integer" onChange={e=>onChangeHandler(e,index)} value={item.Integer} placeholder="Enter Integer"/>
											:
											<span>{item.Integer}</span>
										}
									</td>
									<td style={{maxWidth:'100px',minWidth:'100px'}}>
										{item.isEdit ?
											<input type="number" name="Delta" onChange={e=>onChangeHandler(e,index)} value={item.Delta} placeholder="Enter Delta"/>
											:
											<span>{item.Delta}</span>
										}
									</td>
									<td>
										<button type="button" onClick={()=>this.handleUpDown('up',index)} className="btn-up" disabled={!item.isEdit}>&uarr; UP</button>
										<button type="button" onClick={()=>this.handleUpDown('down',index)} className="btn-down" disabled={!item.isEdit}>Down &darr;</button>
									</td>
									<td>
										{item.isEdit ? 
											<button type="button" onClick={()=>onActionHandler('save',index)} className="btn-save">Save</button>
											:
											<div className="edit-box">
												<button type="button" onClick={()=>onActionHandler('edit',index)} className="btn-edit">Edit</button>
												<img src={require('../../assets/images/ic_delete_grey.png')} onClick={()=>onActionHandler('delete',index)} alt="delete icon" className="btn-del"/>
											</div>
										}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}
export default EditableTable;