import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModelComponent from "./ModelComponent";
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Panel } from 'primereact/panel';
import {Growl} from 'primereact/growl';
import { Dialog } from 'primereact/dialog';
import { CarService } from '../service/CarService';
import { ApiService } from '../service/ApiService';


class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.state = {
            visible: false,
            displayDialog: false,
            key:'',
            value: '',
            isOveride: ''
        };
        this.carservice = new CarService();
        this.apiService = new ApiService();
        this.updateProperty = this.updateProperty.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        /*    fetch('http://jupiterconf.azurewebsites.net/api/projects/c4e147df-8377-4411-a7e4-e67df98e54cc/deviceTemplates')
                .then(response => response.json())
                .then(data => this.setState({ cars: data }));
            // this.propService.getCarsSmall().then(json => this.setState({cars: json}));
            console.log("--------------" + this.state.cars);
            */
        this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
    }

    updateProperty(property, value) {
       // let car = this.state.car;
        //car[property] = value;
        this.setState({ 
           // key: key,
            //value: value,
            //isOveride: isover 
        });
        
    }
    save() {
       /* let cars = [...this.state.cars];
        if (this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;
            */
           this.apiService.savePropertyInfo('',this.state.key, this.state.value, this.state.isOveride);
           this.showSuccess();
            this.setState({ key: '', value: '', isOveride: '', displayDialog: false });
        
        }

    delete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val, i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false
        });
    }
    showSuccess() {
        this.growl.show({severity: 'success', summary: 'Success', detail: 'Record submitted'});
    }


    render() {
let headerTable1 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Properties
          <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-plus"
                onClick={(e) => this.setState({ displayDialog: true })}></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}>  <i class="pi pi-pencil"></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-copy"></i>  </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-trash"></i> </span>
        </div>;
        let paginatorLeft = <Button icon="pi pi-refresh" />;
        let dialogFooterControls = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;
        
        return (

            <div>
                  <Growl ref={(el) => this.growl = el}></Growl>
                   <div className="p-grid p-fluid" >
                        <div className="p-col-4" style={{ padding: '.75em' }}>
                            <label htmlFor="vin">Name</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <InputText id="vin" value={this.props.templateData1}/>
                        </div>
                        <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Description</label></div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                        <InputText id="desc" value={this.props.templateData1}  />
                        
                        </div>

                    </div>  

                <div className={this.state.displayPropertyModel}>

                    <div style={{ padding: '0 10px 10px 10px' }}>
                        <DataTable value={this.props.templateData} responsive="true"
                            header={headerTable1}
                            paginator={true} paginatorLeft={paginatorLeft}
                            rows={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            selectionMode="single" selection={this.state.selectedCar}
                            onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="key" header="Key" sortable={true} />
                            <Column field="value" header="Value" sortable={true} />
                            <Column field="isOverride" header="is Override" sortable={true} />
                        </DataTable>

                        <Dialog visible={this.state.displayDialog} width="300px" header="Property Details"
                            modal={true} footer={dialogFooterControls} onHide={() => this.setState({ displayDialog: false })}>
                            {
                               
                                <div className="p-grid p-fluid">
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="vin">Key</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id={this.state.key} value={this.state.key} onChange={(e) => this.setState({key: e.target.value})} /> 
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Value</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id={this.state.value} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} /> 
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Is Override</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="brand"
                                            value={this.state.isOverride} onChange={(e) => this.setState({isOveride: e.target.value})} />  
                                    </div>
                                </div>
                            }
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyComponent;
