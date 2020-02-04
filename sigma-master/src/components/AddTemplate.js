import React, {Component} from 'react';

import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {InputSwitch} from 'primereact/inputswitch';

import ModelTemplate from "./ModelTemplate";

class AddTemplate extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            name: null,
            desc: null,
            cars: [],
            visible: true,
            checked: false
        };
        this.onClick = this.onClick.bind(this);
            this.onHide = this.onHide.bind(this);
        }
    
        onClick() {
            this.setState({visible: true});
        }
    
        onHide() {
            this.setState({visible: false});
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
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Properties Details </div>;
     
       
        return (
              
                <div className="p-grid" style={{display:'block'}}>
                <div className="p-col-12">
                <Panel header="Add Template">
   
                      
                        <div className="p-grid">
                           
                            <div className="p-col-12">
                                <InputText type="text" placeholder="Name" className="p-col-12"/>
                            </div>
                            <div className="p-col-12">
                                <InputText type="text" placeholder="Description" className="p-col-12"/>
                            </div>
                            
                          
                        </div>
                  
                </Panel>          
                   
</div>
</div>
                
                 
         
        )
    }
}

export default AddTemplate;
