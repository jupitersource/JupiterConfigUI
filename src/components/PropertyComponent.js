import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModelComponent from "./ModelComponent";
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Panel } from 'primereact/panel';

import { Dialog } from 'primereact/dialog';
import { CarService } from '../service/CarService';


class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };

        this.state = {

        };
        this.carservice = new CarService();
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
    render() {
        let headerTable1 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Properties
          <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-plus"
                onClick={(e) => this.setState({ visible: true })}></i> </span>
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
                <div className="p-grid">
                    <div className="p-col-4">Key</div>
                    <div className="p-col-8">Sample Key 1</div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Value</div>
                    <div className="p-col-8">Sample value Here
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">is Override</div>
                    <div className="p-col-8">Sample value Here
    </div>
                </div>

                <div className={this.state.displayPropertyModel}>

                    <div style={{ padding: '0 10px 10px 10px' }}>
                        <DataTable value={this.state.cars} responsive="true"
                            header={headerTable1}
                            paginator={true} paginatorLeft={paginatorLeft}
                            rows={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            selectionMode="single" selection={this.state.selectedCar}
                            onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="year" header="Key" sortable={true} />
                            <Column field="brand" header="Value" sortable={true} />
                            <Column field="color" header="is Override" sortable={true} />
                        </DataTable>

                        <Dialog visible={this.state.displayDialog} width="300px" header="Property Details"
                            modal={true} footer={dialogFooterControls} onHide={() => this.setState({ displayDialog: false })}>
                            {
                                this.state.car &&

                                <div className="p-grid p-fluid">
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="vin">Key</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="vin" onChange={(e) => { this.updateProperty('vin', e.target.value) }} value={this.state.car.vin} />
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Value</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="year" onChange={(e) => { this.updateProperty('year', e.target.value) }} value={this.state.car.year} />
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Is Override</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="brand"
                                            onChange={(e) => { this.updateProperty('brand', e.target.value) }}
                                            value={this.state.car.brand} />
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
