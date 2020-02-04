import React, {Component} from 'react';
import {NodeService} from '../service/NodeService';
import {EventService} from '../service/EventService';
import {OrganizationChart} from 'primereact/organizationchart';
import {DataTable} from 'primereact/datatable';
import {FullCalendar} from 'primereact/fullcalendar';
import {Tree} from 'primereact/tree';
import {TreeTable} from 'primereact/treetable';
import {Column} from 'primereact/column'
import {PickList} from 'primereact/picklist';
import {OrderList} from 'primereact/orderlist';
import {Panel} from 'primereact/panel';
import {Sidebar} from 'primereact/sidebar';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {BreadCrumb} from 'primereact/breadcrumb';
import {Checkbox} from 'primereact/checkbox';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Dialog} from 'primereact/dialog';
import {TabView,TabPanel} from 'primereact/tabview';
import PropertyComponent from "./PropertyComponent";
import DeviceAttribute from "./DeviceAttribute";
import TransformAttribute from "./TransformAttribute";
import CreateTemplate from './CreateTemplate';
import AddTemplate from './AddTemplate';
import {Menu} from 'primereact/menu';
import { ApiService } from '../service/ApiService';
import { CarService } from '../service/CarService';


export class DataDemo extends Component {

    constructor() {
        super();
        this.state = {
            visibleLeft: true,
            dataTableValue:[],
            dataViewValue:[],
            selectedFile:null,
            selectedFiles:null,
            documents:[],
            documentsSelection:null,
            layout: 'list',
            displayDialog: false,
            nextClickCount:0,
            displatTemplateModel: 'show',
            templateBtnText: 'Save',
            dataFromParent : 0,
            displayTransformModel:'hidden',
            displayDeviceModel:'hidden',
            displayPropertyModel:'hidden',
            displayTemplateModel:'hidden',
            displayTransformModelView:'hidden',
            displayDeviceModelView:'hidden',
            displayPropertyModelView:'hidden',
            displayTemplateModelView:'hidden',
            displayTemplateTextView:'show',
            activeIndex: 0,
            breadcrumbItems : [
                {label:'Dashboard'},
                {label:'Template',url: '#'}
            ],
            activeTemplateId: ''           
        };
        this.apiService = new ApiService();
        this.carservice = new CarService();
        this.onTemplateNameClick = this.onTemplateNameClick.bind(this);
        this.onTemplateAddClick = this.onTemplateAddClick.bind(this);
        this.nextTemplateClick = this.nextTemplateClick.bind(this);
        this.nextPropertyClick = this.nextPropertyClick.bind(this);
        this.nextDeviceClick = this.nextDeviceClick.bind(this);
        this.nextTransformClick = this.nextTransformClick.bind(this);
        
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
       
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
        this.apiService.getSampleData().then(data => this.setState({dataTableValue: data}));
    }
    
    save() {
        let cars = [...this.state.cars];
        if(this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({cars:cars, selectedCar:null, car: null, displayDialog:false});
    }

    delete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val,i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false});
    }

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({car: car});
    }

    onCarSelect(e){
        this.newCar = false;
        this.setState({
            displayDialog:true,
            car: Object.assign({}, e.data)
        });
    }

    handleClick(e){
        let breadcrumbItems = this.state.breadcrumbItems;
        let itemName= 'Template '+e.currentTarget.dataset.id;
       // breadcrumbItems.push( "{label:'Template ',url: '#'}");
       if(breadcrumbItems.length > 2)
       {
           console.log("aaa");
           breadcrumbItems[2] = { label:itemName};
       }
       else{
       breadcrumbItems.push({ label:itemName})
       }
        console.log(breadcrumbItems);
        this.setState({ 
            activeTemplateId: e.currentTarget.dataset.id,
            displayTransformModel:'hidden',
            displayDeviceModel:'hidden',
            displayPropertyModel:'hidden',
            displayTemplateModel:'hidden',
            displayTransformModelView:'show',
            displayDeviceModelView:'show',
            displayPropertyModelView:'show',
            displayTemplateModelView:'show',
            displayTemplateText:'hidden',
          });
    }
    onTemplateNameClick()
    {      
       
       
    }
    onTemplateAddClick(){
        this.setState({ 
            displayTransformModel:'show',
            displayDeviceModel:'show',
            displayPropertyModel:'show',
            displayTemplateModel:'show',
            displayTransformModelView:'hidden',
            displayDeviceModelView:'hidden',
            displayPropertyModelView:'hidden',
            displayTemplateModelView:'hidden',
            displayTemplateText:'hidden',
          });
    }

    nextTemplateClick()
    {
        this.setState({ 
            activeIndex: 1
          });    
    }

    nextPropertyClick()
    {
        this.setState({ 
            activeIndex: 2
          });    
    }

    nextDeviceClick()
    {
        this.setState({ 
            activeIndex: 3
          });    
    }

    nextTransformClick()
    {
           
    }
    render() {
        let headerTxt = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars
         </div>;
        let dialogFooterControls = <div className="ui-dialog-buttonpane p-clearfix">
        <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
        <Button label="Save" icon="pi pi-check" onClick={this.save}/>
    </div>;
        let dialogPropertyFooter = <div className="ui-dialog-buttonpane p-clearfix">
        <Button icon="pi pi-check" onClick={this.nextPropertyClick}  
    label={this.state.templateBtnText} />
    </div>;
    
   
        const numbers = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15];
const listItems = numbers.map((number) =>
  <li key={number.toString()} onClick={this.handleClick.bind(this)} data-id={number.toString()}
  className={this.state.activeTemplateId==number.toString()? 'active' : ''}>Template {number}</li>
);

        let headerTable1 = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Properties
          <span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}> <i class="pi pi-plus"  
onClick={(e) => this.setState({visible: true})}></i> </span>
<span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}>  <i class="pi pi-pencil"></i> </span>
<span style={{paddingRight: '10px', float:'right', cursor: 'pointer'}}> <i class="pi pi-copy"></i>  </span>
<span style={{paddingRight: '10px',  float:'right', cursor: 'pointer'}}> <i class="pi pi-trash"></i> </span>
 </div>;

let headerTable2 = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Device Attributes
<span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}> <i class="pi pi-plus"  
onClick={(e) => this.setState({visible: true})}></i> </span>
<span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}>  <i class="pi pi-pencil"></i> </span>
<span style={{paddingRight: '10px', float:'right', cursor: 'pointer'}}> <i class="pi pi-copy"></i>  </span>
<span style={{paddingRight: '10px',  float:'right', cursor: 'pointer'}}> <i class="pi pi-trash"></i> </span>
</div>;
let headerTable3 = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Transform Attributes
<span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}> <i class="pi pi-plus"  
onClick={(e) => this.setState({visible: true})}></i> </span>
<span style={{paddingRight: '10px',float:'right', cursor: 'pointer'}}>  <i class="pi pi-pencil"></i> </span>
<span style={{paddingRight: '10px', float:'right', cursor: 'pointer'}}> <i class="pi pi-copy"></i>  </span>
<span style={{paddingRight: '10px',  float:'right', cursor: 'pointer'}}> <i class="pi pi-trash"></i> </span>
</div>;  
        let paginatorLeft = <Button icon="pi pi-refresh"/>;
        const breadcrumbHome = {icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact'}

        
        const citySelectItems = [
            {label: 'New York', value: 'NY'},
            {label: 'Rome', value: 'RM'},
            {label: 'London', value: 'LDN'},
            {label: 'Istanbul', value: 'IST'},
            {label: 'Paris', value: 'PRS'}
        ];

        var header = <div style={{'textAlign':'left'}}>
        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} 
        placeholder="Global Search" size="50" id="tempSearch"/>
        <div style={{textAlign:'center'}}>List of Templates</div>
    </div>;

var headerProperty = <div style={{'textAlign':'left'}}>
<InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} 
placeholder="Global Search" size="50" id="tempSearch1"/>
 <div style={{textAlign:'center'}}>List of Properties</div>
 </div>;

  var headerDevice = <div style={{'textAlign':'left'}}>
        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} 
        placeholder="Global Search" size="50" id="tempSearch"/>
         <div style={{textAlign:'center'}}>List of Device Attributes</div>
 </div>;

          var headerTransform = <div style={{'textAlign':'left'}}>
        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} 
        placeholder="Global Search" size="50" id="tempSearch"/>
         <div style={{textAlign:'center'}}>List of Transform Attributes</div>
         </div>;

        const dialogFooter = (
            <div>
               <Button icon="pi pi-times" onClick={this.onBackClick} label="Back" className="p-button-secondary" />
               <Button icon="pi pi-check" onClick={this.changeTemplateSection}  label={this.state.templateBtnText} />
            </div>
        );
return (
    
<div>
    <div><BreadCrumb model={this.state.breadcrumbItems} home={breadcrumbHome}/></div>
               
<div className="p-grid">

    <div className="p-col-fixed" id="templateList">
    
<div class="vertical-menu1">
  <a href="javascript:void(0);" class="active">Template
  <span style={{paddingLeft:'10px',paddingRight: '5px', cursor: 'pointer'}}> <i class="pi pi-plus"  
onClick={this.onTemplateAddClick}></i> </span>
<span style={{paddingRight: '5px'}}>  <i class="pi pi-pencil"></i> </span>
<span style={{paddingRight: '5px'}}> <i class="pi pi-copy"></i>  </span>
<span style={{paddingRight: '5px',  float:'right', cursor: 'pointer'}}> <i class="pi pi-trash"></i> </span>
</a>
</div>
<div class="vertical-menu">
  
<ul>
{listItems}
</ul>
</div>

    </div>
    <div className="p-col">
<div>

<div className="content-section implementation">
    <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                        <TabPanel header="Templates" leftIcon="pi pi-calendar">
                            <p>
                            
                        <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                        <div className="p-grid">
    <div className="p-col-12"><i>Click on + button to create a template</i></div>
</div>
</div>
                        <div id="templatePanel" className={this.state.displayTemplateModelView}>
                        <div className="p-grid">
    <div className="p-col-4">Name</div>
    <div className="p-col-8">Template 1</div>
</div>
<div className="p-grid">
    <div className="p-col-4">Description</div>
    <div className="p-col-8">Sample Description here Sample Description here Sample Description here Sample Description here Sample Description here Sample Description here 
    Sample Description here Sample Description here Sample Description here Sample Description here 
    </div> 
</div>

                        </div>
                
        <div className={this.state.displayTemplateModel}>
                <div className="p-grid" style={{display:'block'}}>
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
</div>
</div>

        </p>
                        </TabPanel>
                        <TabPanel header="Properties" leftIcon="pi pi-user">
                        <p>
                        <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                        <div className="p-grid">
    <div className="p-col-12"><i>Click on + button to create a template</i></div>
</div>
</div>
                        <div id="propertyPanel" className={this.state.displayPropertyModelView}>
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
                        </div>

                <div className={this.state.displayPropertyModel}>
               
                <div style={{padding: '0 10px 10px 10px'}}>
            <DataTable value={this.state.cars} responsive="true"
                  header={headerTable1} 
                  paginator={true} paginatorLeft={paginatorLeft} 
                  rows={10} 
                  rowsPerPageOptions={[5,10,20]}
                               selectionMode="single" selection={this.state.selectedCar}
                               onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect}>
                        <Column field="year" header="Key" sortable={true} />
                        <Column field="brand" header="Value" sortable={true} />
                        <Column field="color" header="is Override" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Property Details" 
                    modal={true} footer={dialogFooterControls} onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.car &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Key</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="vin" onChange={(e) => {this.updateProperty('vin', e.target.value)}} value={this.state.car.vin}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Value</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="year" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Override</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>
                            </div>
                        }
                    </Dialog>
       
            </div>
                
                <div className="p-grid" >

<Dialog header="Add Property" visible={this.state.visible} style={{width: '50vw'}} 
modal={true} 
footer={dialogPropertyFooter}
onHide={() => this.setState({visible: false})}>


                            <div className="p-grid p-fluid" >
                                <div className="p-col-4" style={{padding:'.75em'}}>
                                <label htmlFor="vin">Key</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="vin" value=""/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Value</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="vin" value=""/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Override</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                </div>
                            </div>                
</Dialog>

                        </div>
                   
            </div>
        </p>
                           </TabPanel>
                        <TabPanel header="Device Attributes" leftIcon="pi pi-search" >
                            <p>    
                            <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                        <div className="p-grid">
    <div className="p-col-12"><i>Click on + button to create a template</i></div>
</div>
</div>        
                     <div id="propertyPanel" className={this.state.displayDeviceModelView}>
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
    <div className="p-col-4">Initial value</div>
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
                        </div>
<div className="p-grid" className={this.state.displayDeviceModel}>

                   <div style={{padding: '0 10px 10px 10px'}}>
            <DataTable value={this.state.cars} responsive="true"
                  header={headerTable2} 
                  paginator={true} paginatorLeft={paginatorLeft} 
                  rows={10} 
                  rowsPerPageOptions={[5,10,20]}
                               selectionMode="single" selection={this.state.selectedCar}
                               onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect}>
                        <Column field="year" header="Name" sortable={true} />
                        <Column field="brand" header="Description" sortable={true} />
                        <Column field="color" header="Data Type" sortable={true} />
                        <Column field="brand" header="Initial value" sortable={true} />
                        <Column field="color" header="Eng. Unit" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Device Attribute Details" 
                    modal={true} footer={dialogFooterControls} 
                    onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.car &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Name</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="vin" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Description</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="year" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">DataType</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Dropdown value={this.state.city} options={citySelectItems} 
                              onChange={(e) => {this.setState({city: e.value})}} 
                              placeholder="Select a DataType"/>
                               </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Initial Value</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Engineering Unit</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={this.state.car.color}/>
                                </div> 
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Matrices</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Extension</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Alarm</span>
     
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Statistics</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>History</span>
                                </div> 
                            </div>
                        }
                    </Dialog>
       
            </div>
                
                <div className="p-grid" >

<Dialog header="Add Device Attribute" visible={this.state.visible} style={{width: '50vw'}} 
modal={true} 
footer={dialogPropertyFooter}
onHide={() => this.setState({visible: false})}>


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

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Data Type</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Dropdown value={this.state.city} options={citySelectItems} 
                              onChange={(e) => {this.setState({city: e.value})}} 
                              placeholder="Select a DataType"/>
                              </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Initial Value</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText type="text" className="p-col-12"/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Engineering Unit</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText type="text" className="p-col-12"/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Matrices</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Extension</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Alarm</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Statistics</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>History</span>
                                </div>
                            </div>                
</Dialog>

                        </div>        
            </div>
 
</p>
                        </TabPanel>
                        <TabPanel header="Transform Attributes" leftIcon="pi pi-user">
<p>
<div id="templatePaneldefault" className={this.state.displayTemplateText}>
                        <div className="p-grid">
    <div className="p-col-12"><i>Click on + button to create a template</i></div>
</div>
</div>
      <div id="propertyPanel" className={this.state.displayTransformModelView}>
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
</div>

<div className="p-grid" className={this.state.displayTransformModel}>
<div style={{padding: '0 10px 10px 10px'}}>
            <DataTable value={this.state.cars} responsive="true"
                  header={headerTable3} 
                  paginator={true} paginatorLeft={paginatorLeft} 
                  rows={10} 
                  rowsPerPageOptions={[5,10,20]}
                               selectionMode="single" selection={this.state.selectedCar}
                               onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect}>
                        <Column field="year" header="Name" sortable={true} />
                        <Column field="brand" header="Description" sortable={true} />
                        <Column field="color" header="Data Type" sortable={true} />
                        <Column field="brand" header="Formula" sortable={true} />
                        <Column field="color" header="Eng. Unit" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Transform Attribute Details" 
                    modal={true} footer={dialogFooterControls} 
                    onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.car &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Name</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="vin" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Description</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="year" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">DataType</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <Dropdown value={this.state.city} options={citySelectItems} 
                              onChange={(e) => {this.setState({city: e.value})}} 
                              placeholder="Select a DataType"/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Formula</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Engineering Unit</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={this.state.car.color}/>
                                </div> 
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Matrices</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Extension</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Alarm</span>
     
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Statistics</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>History</span>
                                </div> 
                            </div>
                        }
                    </Dialog>
       
            </div>
                
                <div className="p-grid" >

<Dialog header="Add Transform Attribute" visible={this.state.visible} style={{width: '50vw'}} 
modal={true} 
footer={dialogPropertyFooter}
onHide={() => this.setState({visible: false})}>


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

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Data Type</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Dropdown value={this.state.city} options={citySelectItems} 
                              onChange={(e) => {this.setState({city: e.value})}} 
                              placeholder="Select a DataType"/>
                              </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Formula</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText type="text" className="p-col-12"/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Engineering Unit</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText type="text" className="p-col-12"/>
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Is Matrices</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                                </div>
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Extension</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Alarm</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>Statistics</span>
                           
                   <Checkbox checked={this.state.checked} onChange={e => this.setState({checked: e.checked})} />
                   <span style={{paddingLeft:'10px',  paddingRight: '20px'}}>History</span>
                                </div>
                            </div>                
</Dialog>

                        </div>     
            </div>      
    </p>
                        </TabPanel>
                    </TabView>
                </div>
       <div>    </div>
       </div>
</div> 
</div>                         
</div>
        );
    }
}