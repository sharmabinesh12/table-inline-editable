import React from 'react';
import './index.scss';

const typeOptions = ['Double', 'String', 'Boolean'];

const EditableTable = ({
	data,
	onChangeHandler,
	onActionHandler
}) =>{
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
export default EditableTable;