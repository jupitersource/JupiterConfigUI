import React, {Component} from 'react';

import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import PropertyService from './PropertyService';
import TransformModelComponent from "./TransformModelComponent";
import {InputSwitch} from 'primereact/inputswitch';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';


class TransformAttribute extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            name: null,
            desc: null,
            cars: []
        };

        this.state = {};
        this.propService = new PropertyService();
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => this.setState({cars: data}));
       // this.propService.getCarsSmall().then(json => this.setState({cars: json}));
        console.log("--------------"+this.state.cars);
    }
    render() {

        const citySelectItems = [
            {label: 'New York', value: 'NY'},
            {label: 'Rome', value: 'RM'},
            {label: 'London', value: 'LDN'},
            {label: 'Istanbul', value: 'IST'},
            {label: 'Paris', value: 'PRS'}
        ];
       
        return (
<div className="p-grid">
            <div className="p-col-12">
            <Panel header="Add Transform Property">
            <div className="p-grid">
                           <div className="p-col-12">
                               <InputText type="text" placeholder="Name" className="p-col-12"/>
                           </div>
                           <div className="p-col-12">
                               <InputText type="text" placeholder="Description" className="p-col-12"/>
                           </div>
                           <div className="p-col-12">
                              <Dropdown value={this.state.city} options={citySelectItems} 
                              onChange={(e) => {this.setState({city: e.value})}} 
                              placeholder="Select a DataType"/>
                           </div>
                
                           <div className="p-col-12">
                               <InputText type="text" placeholder="Formula" className="p-col-12"/>
                           </div>
                           <div className="p-col-12">
                               <InputText type="text" placeholder="Engineering Unit" className="p-col-12"/>
                           </div>
                           <div className="p-col-12">
                           <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.value})} />
                   <span style={{paddingLeft:'10px'}}>is Matrices</span>
                           </div>
                           <div className="p-col-12"> Extension</div>
                           <div className="p-col-12">
                           <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.value})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Alarm</span>
                           
                           <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.value})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Statistics</span>
                           
                           <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.value})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>History</span>
                           </div>
                       </div>
                       </Panel>
            </div>
            </div>
          
        )
    }
}

export default TransformAttribute;