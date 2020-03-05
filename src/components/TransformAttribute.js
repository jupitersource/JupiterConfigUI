import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PropertyService from './PropertyService';
import TransformModelComponent from "./TransformModelComponent";
import { InputSwitch } from 'primereact/inputswitch';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { CarService } from '../service/CarService';
import { Checkbox } from 'primereact/checkbox';

class TransformAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: null,
            desc: null,
            cars: [],
            templateBtnText: 'Save'
        };

        this.state = {};
        this.propService = new PropertyService();
        this.carservice = new CarService();
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => this.setState({ cars: data }));
        // this.propService.getCarsSmall().then(json => this.setState({cars: json}));
        console.log("--------------" + this.state.cars);
        this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
    }
    render() {
        let headerTable3 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Transform Attributes
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
        let dialogTransformFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button icon="pi pi-check" onClick={this.nextPropertyClick}
                label={this.state.templateBtnText} />
        </div>;
        const citySelectItems = [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
        ];

        return (
            <div>
                <div className="p-grid">
                    <div className="p-col-4">Name</div>
                    <div className="p-col-8">Sample Name</div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Description</div>
                    <div className="p-col-8">Sample Description  Here Sample Description  Here Sample Description  Here Sample Description  Here
                    Sample Description  Here Sample Description  Here Sample Description  Here Sample Description  Here
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">DataType</div>
                    <div className="p-col-8">Sample value Here
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Formula</div>
                    <div className="p-col-8">Sample value Here
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Engineering Unit</div>
                    <div className="p-col-8">Sample value Here
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Is Matrices</div>
                    <div className="p-col-8">True
    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-4">Extension</div>
                    <div className="p-col-8">Sample values Here
    </div>
                </div>


                <div className="p-grid" className={this.state.displayTransformModel}>
                    <div style={{ padding: '0 10px 10px 10px' }}>
                        <DataTable value={this.state.cars} responsive="true"
                            header={headerTable3}
                            paginator={true} paginatorLeft={paginatorLeft}
                            rows={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            selectionMode="single" selection={this.state.selectedCar}
                            onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="year" header="Name" sortable={true} />
                            <Column field="brand" header="Description" sortable={true} />
                            <Column field="color" header="Data Type" sortable={true} />
                            <Column field="brand" header="Formula" sortable={true} />
                            <Column field="color" header="Eng. Unit" sortable={true} />
                        </DataTable>

                        <Dialog visible={this.state.displayDialog} width="300px" header="Transform Attribute Details"
                            modal={true} footer={dialogFooterControls}
                            onHide={() => this.setState({ displayDialog: false })}>
                            {
                                this.state.car &&

                                <div className="p-grid p-fluid">
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Name</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="vin" onChange={(e) => { this.updateProperty('year', e.target.value) }} value={this.state.car.year} />
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Description</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="year" onChange={(e) => { this.updateProperty('brand', e.target.value) }} value={this.state.car.brand} />
                                    </div>

                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="color">DataType</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <Dropdown value={this.state.city} options={citySelectItems}
                                            onChange={(e) => { this.setState({ city: e.value }) }}
                                            placeholder="Select a DataType" />
                                    </div>
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Formula</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="brand" onChange={(e) => { this.updateProperty('brand', e.target.value) }} value={this.state.car.brand} />
                                    </div>
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="color">Engineering Unit</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <InputText id="brand" onChange={(e) => { this.updateProperty('color', e.target.value) }} value={this.state.car.color} />
                                    </div>
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Is Matrices</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                    </div>
                                    <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Extension</label></div>
                                    <div className="p-col-8" style={{ padding: '.5em' }}>
                                        <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                        <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Alarm</span>

                                        <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                        <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Statistics</span>

                                        <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                        <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>History</span>
                                    </div>
                                </div>
                            }
                        </Dialog>

                    </div>

                    <div className="p-grid" >

                        <Dialog header="Add Transform Attribute" visible={this.state.visible} style={{ width: '50vw' }}
                            modal={true}
                            footer={dialogTransformFooter}
                            onHide={() => this.setState({ visible: false })}>


                            <div className="p-grid p-fluid" >
                                <div className="p-col-4" style={{ padding: '.75em' }}>
                                    <label htmlFor="vin">Name</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="vin" value="" />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Description</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="vin" value="" />
                                </div>

                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Data Type</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <Dropdown value={this.state.city} options={citySelectItems}
                                        onChange={(e) => { this.setState({ city: e.value }) }}
                                        placeholder="Select a DataType" />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Formula</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText type="text" className="p-col-12" />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Engineering Unit</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText type="text" className="p-col-12" />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Is Matrices</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                </div>
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Extension</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                    <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Alarm</span>

                                    <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                    <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Statistics</span>

                                    <Checkbox checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                    <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>History</span>
                                </div>
                            </div>
                        </Dialog>

                    </div>
                </div>
            </div>
        )
    }
}

export default TransformAttribute;
