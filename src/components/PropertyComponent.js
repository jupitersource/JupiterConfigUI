import React, {Component} from 'react';

import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import ModelComponent from "./ModelComponent";
import {InputText} from 'primereact/inputtext';
import {InputSwitch} from 'primereact/inputswitch';
import {Panel} from 'primereact/panel';

class PropertyComponent extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            cars: [],
            name: null,
            desc: null,
            visible: false,
            checked: false
    
        };

        this.state = {};
      
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentWillMount() {
        fetch('http://jupiterconf.azurewebsites.net/api/projects/c4e147df-8377-4411-a7e4-e67df98e54cc/deviceTemplates')
  .then(response => response.json())
  .then(data => this.setState({cars: data}));
       // this.propService.getCarsSmall().then(json => this.setState({cars: json}));
        console.log("--------------"+this.state.cars);
    }
    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Properties Details </div>;
return (                

               
                        <div className="p-grid">
                        <div className="p-col-12">
                        <Panel header="Add Property">
                        <div className="p-grid">
                            <div className="p-col-12">
                                <InputText type="text" placeholder="Key" className="p-col-12"/>
                            </div>
                            <div className="p-col-12">
                                <InputText type="text" placeholder="Value" className="p-col-12"/>
                            </div>
                            <div className="p-col-12">
                            <InputSwitch checked={this.state.checked} onChange={(e) => this.setState({checked: e.value})} />
                    <span style={{paddingLeft:'10px'}}>is OverRide</span>
                            </div>
                            </div>
                        </Panel>
                        </div>
                        </div>
        )
    }
}

export default PropertyComponent;
