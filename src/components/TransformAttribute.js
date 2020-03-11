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
import { ApiService } from '../service/ApiService';
import {Growl} from 'primereact/growl';
class TransformAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            description: '',
            isMetric: '',
            dataType: '',
            initialValue: '',
            engUnit: '',
            extension:'',
            city: '',
            cars: [],
            displayDialog: false,
            alarm:'',
            statistics:'',
            history:'',
            templateBtnText: 'Save',
            transformListData: []
        };

        this.state = {};
        this.apiService = new ApiService();
        this.carservice = new CarService();
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
               const alarm = this.state.alarm? 'alarm': '';
               const statistics =  this.state.statistics ? 'statistics': '';
               const history = this.state.history ? 'history' : '';
               const extension = alarm + ","+statistics+"," + history;
               const dataType = this.state.city;
               this.apiService.saveTransformAttrInfo('',this.state.name, this.state.description, dataType
               , this.state.initialValue, this.state.isMetric, this.state.engUnit, this.state.extension, this.state.formula);
    
            
               this.showSuccess();
                this.setState({  name: '',
                description: '',
                isMetric: '',
                dataType: '',
                initialValue: '',
                engUnit: '',
                extension: '',
                alarm:'',
                statistics:'',
                history: '',
                formula: '',
                displayDialog: false });
                console.log(this.state.name, this.state.description, this.state.dataType
                 , this.state.initialValue, this.state.isMetric, this.state.engUnit, extension,
                 this.state.alarm,this.state.statistics, this.state.history,this.state.city);
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
        let  transformDataList = [] ;
        console.log("---id==="+this.props.selectedTemplateId);
                 console.log(this.props.templateData);
                 if(this.props.selectedTemplateId){
        transformDataList = this.props.templateData.map((cell, i) => {
              return  <div className="p-grid">
              <div className="p-col-4">Name</div>
              <div className="p-col-8">
                 {cell.name}
              </div>
             
                  <div className="p-col-4">Description
                </div>
              <div className="p-col-8">
                   {cell.description}
            </div> 
            <div className="p-col-4">DataType
                </div>
              <div className="p-col-8">
                   {cell.datatype}
            </div>     
            <div className="p-col-4">Engineering Unit</div>
              <div className="p-col-8">
                 {cell.engUnit}
              </div>
             
                  <div className="p-col-4">isMatric
                </div>
              <div className="p-col-8">
                   {cell.isMatric}
            </div>  
            <div className="p-col-4">Extension</div>
                    <div className="p-col-8">  {cell.isMatric}
            </div>          
          </div>  ;       
          });    
        }
          //console.log(transformDataList);      
    
        let headerTable3 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Transform Attributes
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
                    <Growl ref={(el) => this.growl = el}></Growl>
              
               {/* {transformDataList} */}

                <div className="p-grid" className={this.state.displayTransformModel}>
                    <div style={{ padding: '0 10px 10px 10px' }}>
                        <DataTable value={this.props.templateData} responsive="true"
                            header={headerTable3}
                            paginator={true} paginatorLeft={paginatorLeft}
                            rows={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            selectionMode="single" selection={this.state.selectedCar}
                            onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="name" header="Name" sortable={true} />
                            <Column field="description" header="Description" sortable={true} />
                            <Column field="datatype" header="Data Type" sortable={true} />
                            <Column field="engUnit" header="Eng. Unit" sortable={true} />
                            <Column field="isMetric" header="is Metric" sortable={true} />
                        </DataTable>

                        <Dialog visible={this.state.displayDialog} width="300px" header="Transform Attribute Details"
                            modal={true} footer={dialogFooterControls}
                            onHide={() => this.setState({ displayDialog: false })}>
                            {
                  <div className="p-grid p-fluid">
                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="year">Name</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <InputText id={this.state.name} value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                  </div>

                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Description</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <InputText id={this.state.description} value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                  </div>

                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="color">Formula</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                  <InputText id={this.state.formula} value={this.state.formula} onChange={(e) => this.setState({formula: e.target.value})} />
                 
                  </div>
                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Initial Value</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <InputText id={this.state.initialValue} value={this.state.initialValue} onChange={(e) => this.setState({initialValue: e.target.value})} />
                  </div>
                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="color">Engineering Unit</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <InputText id={this.state.engUnit} value={this.state.engUnit} onChange={(e) => this.setState({engUnit: e.target.value})} />
                  </div>
                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Is Matrices</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <Checkbox checked={this.state.isMetric} onChange={e => this.setState({ isMetric: e.checked })} />
                  </div>
                  <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="brand">Extension</label></div>
                  <div className="p-col-8" style={{ padding: '.5em' }}>
                      <Checkbox checked={this.state.alarm} onChange={e => this.setState({ alarm: e.checked })} />
                      <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Alarm</span>

                      <Checkbox checked={this.state.statistics} onChange={e => this.setState({ statistics: e.checked })} />
                      <span style={{ paddingLeft: '10px', paddingRight: '20px' }}>Statistics</span>

                      <Checkbox checked={this.state.history} onChange={e => this.setState({ history: e.checked })} />
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
