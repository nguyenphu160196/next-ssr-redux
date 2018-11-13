import React, {Component} from 'react';
import {Button, Glyphicon, Panel, Grid, Row, Col, FormControl, FormGroup, ControlLabel, HelpBlock, InputGroup, Modal } from 'react-bootstrap'
import {getFile} from 'services/api'
import Datetime from 'react-datetime'
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
let moment = require('moment');

export const FieldGroup = ({ id, label, help, ...props }) => {
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel><span style={{color: '#000000'}}>{label}</span>
			</ControlLabel>
				<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	)
}

export const DatePickerGroup = ({id,label,help,...props}) => {
	const yesterday = Datetime.moment().subtract(1, 'day');
	let valid = (current) => { return current.isAfter(yesterday); };
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel>{label}
			</ControlLabel>
			<ControlLabel>
				<InputGroup>
					<Datetime 
						{...props}
						// defaultValue={ (new Date()) }
						viewDate={new Date()} 
						isValidDate={valid}
					/>
					<InputGroup.Addon>
						<Glyphicon glyph="glyphicon glyphicon-calendar" />
	      			</InputGroup.Addon>
				</InputGroup>
			</ControlLabel>
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	)
}

export const SelectGroup = ({id,label,help,state, classNamePrefix,...props}) => {
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel style={{color: '#000000'}}>{label}</ControlLabel>
				{!!state.length && <Select classNamePrefix={classNamePrefix || "react-select"} 
					{...props}	
					isSearchable={true}
					options={state}
				/>}
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	)
}

export const AddItem = ({id,label,help,value, onClick}) => {
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<div className="pick-control">
				<div className="show-value">
					{value}
				</div>
				<div onClick={onClick} className="add-item"></div>
			</div>
		</FormGroup>
	)
}


export const ModelPicker = ({id,label,dialogClassName,...props}) => {
	let prop = {...props}
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel>{label ? label : ''}</ControlLabel>
			<InputGroup style={{'display': prop.inputGroup ? prop.inputGroup : ''}}>
			<FormControl
				onKeyPress={e => {
						e.preventDefault();
					}}
				value={prop.value}
			/>
				<InputGroup.Addon>
					<div className="add-btn-custom"
						onClick={_=>{
							(prop.showModel());	
							(prop.checkChoosen());	
						}}
					></div>
				</InputGroup.Addon>
			</InputGroup>
			<Modal show={prop.show} onHide={prop.hideModel} enforceFocus={false} dialogClassName={dialogClassName || ''}>
				<Modal.Header closeButton>
					<Modal.Title>{prop.labelcustom ? prop.labelcustom : label}</Modal.Title>
				</Modal.Header>
				{!!props.isSearchable && 
				<div style={{margin: "0px 10px"}}>
					<SearchGroup
						listSearch={prop.isSearchable}
						onChange={e => {
							prop.onChange(e)
						}}
					/>
				</div>}
				<Modal.Body style={{
					display: !!prop.hideBody ? 'none' : '',
					maxHeight: prop.maxHeight || 415,
					overflowX: prop.overflowX || 'hidden',
					// overflowY: !prop.overflowX && (prop.bodyScroll || 'scroll'),
					overflowY: !props.overflowX && (prop.bodyScroll || 'scroll'),
					padding: 0
				}}>
					{prop.children}
				</Modal.Body>
				<Modal.Footer>
					{!!prop.customBtnLabel &&
					<Button 
						style={{float: 'left'}}
						className='btn btn-warning'
						onClick={_=> {
							(prop.customBtn());
						}}>{prop.customBtnLabel ? prop.customBtnLabel : ''}
					</Button>}
					{!prop.offCanelbtn &&
					<Button 
						className='btn btn-default'
						onClick={_=> {
							(prop.hideModel());
						}}>{prop.CloseLabel ? prop.CloseLabel : 'Cancel'}
					</Button>}
					<Button 
						className='btn btn-primary' 
						style={{marginLeft: 10}}
						onClick={e=> {
							(prop.hideModel());
							(prop.handleDone(e));
					}}>
					{prop.SubmitLabel ? prop.SubmitLabel : 'Done'}
					</Button>
			</Modal.Footer>
			</Modal>
		</FormGroup>
	)
}

export class FileGroup extends Component {
	state = {
    	dragOver: false,
  	}

  	constructor(props) {
    	super(props)
  	}

	render() {
		let {title,onDrop,onChange,children,style,accept} = this.props
		let {dragOver} = this.state
		return(
			<FormGroup style={{style}} className='custom-field'>
                <ControlLabel>{title}</ControlLabel>
                <div
                	className={"file-control " + (dragOver ? "drag-over" : "")}
                	onDragOver={e => {e.preventDefault();this.setState({dragOver:true});}}
                	onDragLeave={e => {e.preventDefault();this.setState({dragOver:false});}}
                	onDrop={e => {this.setState({dragOver:false});e.preventDefault();onDrop(e);}}
                >
                	{!children.length ? (
						<div className="drag-drop-content">
							<div className='upload-icon'></div>
							<div>Drag or Drop files here, or </div>
							<label>Browse Files<input accept={accept||"*/*"} multiple onChange={onChange} type="file" /></label>
						</div>
                	):(
                		<div className="file-content">{children}</div>
                	)}
                </div>
             </FormGroup>
		)
	}
}

export class AvatarGroup extends Component {
	state = {

	}

	constructor(props) {
		super(props)
	}

	render() {
		let {onChange, src} = this.props
		return(
			<FormGroup className='custom-field'>
				<div className="flex-center">
					<label>
	                	<div className="avatar large no-margin editable" style={{backgroundImage: src ? `url(${src})` : '', backgroundSize: src ? 'cover' : 'auto'}} type="user">
	                		<Glyphicon glyph="glyphicon glyphicon-camera" />
	                	</div>
	                	<input onChange={onChange} type="file" accept="image/*" style={{display: 'none',}}/>
					</label>
				</div>
            </FormGroup>
		)
	}
}

export class HightLightDatePicker extends Component {
	constructor(props) {
		super(props)
		this.renderDay = this.renderDay.bind(this)
	}

	state = {
	}

	componentWillMount() {
	}

	renderDay(prop, currentDate, selectDate) {
		let {listHL} = this.props
		if(!listHL) {
			listHL = []
		}
		prop.className += ' custom-day'
		let hl = false
		for(let i = 0; i < listHL.length; i++) {
			if(listHL[i].format('LL') == currentDate.format('LL')) {
				hl = true
				prop.className += ' hl'
				break;
			}
		}
		return <td {...prop}>{currentDate.date()}</td>
	}

	renderInput(prop, openCalendar, closeCalendar) {
		return(
			<div className="cld-btn" onClick={openCalendar}>
	            <Glyphicon glyph="glyphicon glyphicon-calendar" style={{margin: 'auto'}} />
			</div>
		)
	}

	render() {
		
		return (
			<Datetime 
				className="hl-dp"
				onChange={this.props.onChange}
				renderInput={this.renderInput}
				renderDay={this.renderDay}
				timeFormat={false}
			/>
		)
	}
}
export class SelectShowResult extends Component {
	constructor(props) {
		super(props)
		
	}

	state = {
		forSelect: [],
		forValue: [],
		Tempo: []
	}

	componentWillMount() {
		let {listSelect, defaultList} = this.props
		let {forSelect, forValue, Tempo} = this.state
		forSelect = listSelect.map(v => ({value: v._id, label: v.name}))
		forValue = listSelect
		if(!!defaultList && !!defaultList.length){
			defaultList.map(v => {
				if(!!v.avatar){
					this.getAvatar(v.avatar.path)
					.then(res => {
						v.blob = res
						Tempo.push(v)
						this.setState({Tempo})
					})
				}else{
					Tempo.push(v)
					this.setState({Tempo})
				}
				forSelect.splice(forSelect.findIndex(x => x.value == v._id),1)
				this.setState({forSelect, forValue})
				return
			})
		}else{
			this.setState({forSelect, forValue})
		}	
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps != this.props) {
			let {listSelect, defaultList} = nextProps
			let {forSelect, forValue, Tempo} = this.state
			forSelect = []
             listSelect.map(v => {
				if(Tempo.findIndex(k => k._id == v._id) < 0) {
					forSelect.push({value: v._id, label: v.name})
				}
			})
			forValue = listSelect
			if(!!defaultList && !!defaultList.length){
				Tempo = defaultList
				Tempo.map(v => {
					if(!!v.avatar){
						this.getAvatar(v.avatar.path)
						.then(res => {
							v.blob = res
							this.setState({Tempo})
						})
					}else{
						this.setState({Tempo})
					}
					forSelect.splice(forSelect.findIndex(x => x.value == v._id),1)
					this.setState({forSelect, forValue})
					return
				})
			}else{
				this.setState({forSelect, forValue})
			}	
		}
	}
	
	getAvatar(path){
		return new Promise(resolve => {
			getFile(path)
			.then(res => {
				resolve(URL.createObjectURL(new Blob([res])))
			})
		})
	}

	render(){
		let {forSelect, forValue, Tempo} = this.state
		let {label, id, help, defaultList, noneAvatar, noneRemove} = this.props
		return(
			<FormGroup className='custom-field'  controlId={id}>
				<ControlLabel style={{color: '#000000'}}>{label}</ControlLabel>
					{!!forSelect.length && 
					<Select classNamePrefix="react-select" 
							{...this.props}
							isSearchable={true}
							options={forSelect}
							onChange={e => {
								forValue.filter(v => v._id == e.value).map(v => {
									if(!!v.avatar){
										this.getAvatar(v.avatar.path)
										.then(res => {
											v.blob = res
											Tempo.push(v)
											if(!!defaultList){
												this.props.onChange(Tempo)
												this.setState({Tempo})
											}else{
												let subTempo = JSON.parse(JSON.stringify(Tempo))
												subTempo = subTempo.map(v => ({value: v._id, label: v.name}))
												this.props.onChange(subTempo)
												this.setState({Tempo})
											}
										})
									} else {
										Tempo.push(v)
										if(!!defaultList){
											this.props.onChange(Tempo)
											this.setState({Tempo})
										}else{
											let subTempo = JSON.parse(JSON.stringify(Tempo))
											subTempo = subTempo.map(v => ({value: v._id, label: v.name}))
											this.props.onChange(subTempo)
											this.setState({Tempo})
										}
									}
									return
								})
								forSelect.splice(forSelect.findIndex(v => v.value == e.value),1)
								this.setState({forSelect})
							}}
					/>}
				{help && <HelpBlock>{help}</HelpBlock>}
				<div className="row-custom" style={{marginTop: 5}}>
					{!!Tempo.length && Tempo.map((v, k) => {
						return <Grid key={k} style={{width: '100%', marginTop: 5}}>
									<div className="display-flex align-items-center" style={{marginBottom: 5}}>
										{!noneAvatar ? <Col xs={2} md={2}>
											<div className={!!v.avatar ? 'none' : 'modal-class-custom-company'}
												 style={{
													backgroundImage: `url(${!!v.blob ? v.blob : ''})`,
													backgroundSize: '100% 100%',
													backgroundRepeat: 'no-repeat',
													borderRadius: '50%',
													height: 40,
													width: 40
												 }}
											></div>
										</Col>:''}
										<Col xs={!noneAvatar ? 9 : 11} md={!noneAvatar ? 9 : 11}>
											{v.name}
										</Col>
										<Col xs={1} md={1}>
										{!noneRemove && <div className="x-attach-file"
                                            onClick={_ =>{
												Tempo.splice(k, 1)
												forSelect.push({value: v._id,label: v.name})
												if(!!defaultList){
													this.props.onChange(Tempo)
													this.setState({Tempo, forSelect})
												}else{
													let subTempo = JSON.parse(JSON.stringify(Tempo))
													subTempo = subTempo.map(v => ({value: v._id, label: v.name}))
													this.props.onChange(subTempo)
													this.setState({Tempo, forSelect})
												}
                                            }}
                                        >×</div>}
										</Col>
									</div>
								</Grid>
						})}
				</div>
			</FormGroup>
		)
	}
}
export const SelectMultiGroup = ({id,label,help,state,...props}) => {
	return (
		<FormGroup className='custom-field' controlId={id}>
			<ControlLabel style={{color: '#000000'}}>{label}</ControlLabel>
				{!!state.length && <Select classNamePrefix="react-select" 
					{...props}	
					isClearable
					isSearchable
					isMulti
					options={state}
					className="basic-multi-select"
					classNamePrefix="select"
				/>}
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	)
}

export class SearchGroup extends Component{
	constructor(props){
		super(props)
		this.handleSearch = this.handleSearch.bind(this)
	}

	state={
		listS: []
	}

	componentDidMount(){
		let {listSearch} = this.props 
		this.setState({listS: listSearch})
	}

	componentWillReceiveProps(nextProps){

	}

	handleSearch(search){
		let {listS}  = this.state
		if(!!listS.length){
			let clone = listS.filter(v => 
				v.label.toUpperCase().indexOf(search.toUpperCase())>-1
			).map(v => v)
			this.props.onChange(clone)
		}
	}

	render(){
		let {id, label, help} = this.props
		let {listS} = this.state
		return(
			<FormGroup className='custom-field' controlId={id}>
				<ControlLabel><span>{label}</span>
				</ControlLabel>
					{!!listS.length &&
					<FormControl  
						type="text"
						placeholder="Search"
						onChange={e => {
							this.handleSearch(e.target.value)
						}}
					/>}
				{help && <HelpBlock>{help}</HelpBlock>}
			</FormGroup>
		)
	}
}

export class SearchPage extends Component {
	constructor(props){
		super(props)
	}

	state={

	}

	componentDidMount(){

	}

	render() {
		let {onChange, value} = this.props
		return(
			<div className="search-page">
				<input
					type="text"
					className={!!(!!value && value.length) ? "focus" : ""}
					onChange={onChange}
					value={value}
					placeholder="Search..." />
			</div>
		)
	}
}

export class MultipleSearch extends Component {
	constructor(props){
		super(props)
	}
	state = {

	}

	componentDidMoun(){

	}

	render(){
		let {onChange, value, children} = this.props
		return(
			<div className="search-page inputContainer">
				<input
					type="text"
					className="focus"
					maxLength='80'
					onChange={e => {
						onChange(e)
					}}
					value={value}
					placeholder="Search..." />
				<span
					 className="inputContentInside">
					{children}
				</span>
			</div>
		)
	}
}









