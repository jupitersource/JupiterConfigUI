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
        this.state = {           
            activeIndex: 0, 
            templateBtnText: 'Save',           
        };    
            this.nextTemplateClick = this.nextTemplateClick.bind(this);
        }
    
        nextTemplateClick()
        {
            this.setState({ 
                activeIndex: 1
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
              
            <div className="p-col-12">
            <Panel header="Add Template">

                  
            <div className="p-grid p-fluid" >
                            <div className="p-col-4" style={{padding:'.75em'}}>
                            <label htmlFor="vin">Name</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="vin" value=""/>
                            </div>
                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Description</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="vin" value=""/>
                            </div>

                    </div>
              <div id="addTempFooter">
          <Button icon="pi pi-check" onClick={this.nextTemplateClick}  label={this.state.templateBtnText} />
        </div>
            </Panel>          
               
</div>
         
        )
    }
}

export default AddTemplate;
