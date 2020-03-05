import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column'

import { Panel } from 'primereact/panel';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { BreadCrumb } from 'primereact/breadcrumb';
import { Checkbox } from 'primereact/checkbox';

import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import PropertyComponent from "./PropertyComponent";
import DeviceAttribute from "./DeviceAttribute";
import TransformAttribute from "./TransformAttribute";
import CreateTemplate from './CreateTemplate';
import AddTemplate from './AddTemplate';
import { ApiService } from '../service/ApiService';
import { CarService } from '../service/CarService';


export class DataDemo extends Component {

    constructor() {
        super();
        this.state = {
            visibleLeft: true,
            dataTableValue: [],
            dataViewValue: [],
            selectedFile: null,
            selectedFiles: null,
            documents: [],
            documentsSelection: null,
            layout: 'list',
            displayDialog: false,
            nextClickCount: 0,
            displatTemplateModel: 'show',
            templateBtnText: 'Save',
            dataFromParent: 0,
            displayTransformModel: 'hidden',
            displayDeviceModel: 'hidden',
            displayPropertyModel: 'hidden',
            displayTemplateModel: 'hidden',
            displayTransformModelView: 'hidden',
            displayDeviceModelView: 'hidden',
            displayPropertyModelView: 'hidden',
            displayTemplateModelView: 'hidden',
            displayTemplateTextView: 'show',
            activeIndex: 0,
            breadcrumbItems: [
                { label: 'Dashboard' },
                { label: 'Template', url: '#' }
            ],
            activeTemplateId: '',
            templateList: []
        };
        this.apiService = new ApiService();
        this.carservice = new CarService();
        this.onTemplateNameClick = this.onTemplateNameClick.bind(this);
        this.onTemplateAddClick = this.onTemplateAddClick.bind(this);

        this.nextPropertyClick = this.nextPropertyClick.bind(this);
        this.nextDeviceClick = this.nextDeviceClick.bind(this);
        this.nextTransformClick = this.nextTransformClick.bind(this);

        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);

    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
        this.apiService.getSampleData().then(data => this.setState({ dataTableValue: data }));
        this.apiService.getAllTemplatesData().then(data => this.setState({ templateList: data }));
        console.log(this.state.templateList);
    }

    save() {
        let cars = [...this.state.cars];
        if (this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({ cars: cars, selectedCar: null, car: null, displayDialog: false });
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

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({ car: car });
    }

    onCarSelect(e) {
        this.newCar = false;
        this.setState({
            displayDialog: true,
            car: Object.assign({}, e.data)
        });
    }

    handleClick(e) {
        let breadcrumbItems = this.state.breadcrumbItems;
        let itemName = 'Template ' + e.currentTarget.dataset.id;
        // breadcrumbItems.push( "{label:'Template ',url: '#'}");
        if (breadcrumbItems.length > 2) {
            console.log("aaa");
            breadcrumbItems[2] = { label: itemName };
        }
        else {
            breadcrumbItems.push({ label: itemName })
        }
        console.log(breadcrumbItems);
        this.setState({
            activeTemplateId: e.currentTarget.dataset.id,
            displayTransformModel: 'hidden',
            displayDeviceModel: 'hidden',
            displayPropertyModel: 'hidden',
            displayTemplateModel: 'hidden',
            displayTransformModelView: 'show',
            displayDeviceModelView: 'show',
            displayPropertyModelView: 'show',
            displayTemplateModelView: 'show',
            displayTemplateText: 'hidden',
        });
    }
    onTemplateNameClick() {


    }
    onTemplateAddClick() {
        this.setState({
            displayTransformModel: 'show',
            displayDeviceModel: 'show',
            displayPropertyModel: 'show',
            displayTemplateModel: 'show',
            displayTransformModelView: 'show',
            displayDeviceModelView: 'show',
            displayPropertyModelView: 'show',
            displayTemplateModelView: 'hidden',
            displayTemplateText: 'hidden',
        });
    }



    nextPropertyClick() {
        this.setState({
            activeIndex: 2
        });
    }

    nextDeviceClick() {
        this.setState({
            activeIndex: 3
        });
    }

    nextTransformClick() {

    }
    render() {
        let headerTxt = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>CRUD for Cars
         </div>;
        let dialogFooterControls = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;
        let dialogPropertyFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button icon="pi pi-check" onClick={this.nextPropertyClick}
                label={this.state.templateBtnText} />
        </div>;


        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const listItems = numbers.map((number) =>
            <li key={number.toString()} onClick={this.handleClick.bind(this)} data-id={number.toString()}
                className={this.state.activeTemplateId == number.toString() ? 'active' : ''}>Template {number}</li>
        );

        let headerTable1 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Properties
          <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-plus"
                onClick={(e) => this.setState({ visible: true })}></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}>  <i class="pi pi-pencil"></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-copy"></i>  </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-trash"></i> </span>
        </div>;

        let headerTable2 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Device Attributes
<span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-plus"
                onClick={(e) => this.setState({ visible: true })}></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}>  <i class="pi pi-pencil"></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-copy"></i>  </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-trash"></i> </span>
        </div>;
        let headerTable3 = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}> Transform Attributes
<span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-plus"
                onClick={(e) => this.setState({ visible: true })}></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}>  <i class="pi pi-pencil"></i> </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-copy"></i>  </span>
            <span style={{ paddingRight: '10px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-trash"></i> </span>
        </div>;
        let paginatorLeft = <Button icon="pi pi-refresh" />;
        const breadcrumbHome = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact' }


        const citySelectItems = [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
        ];

        var header = <div style={{ 'textAlign': 'left' }}>
            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })}
                placeholder="Global Search" size="50" id="tempSearch" />
            <div style={{ textAlign: 'center' }}>List of Templates</div>
        </div>;

        var headerProperty = <div style={{ 'textAlign': 'left' }}>
            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })}
                placeholder="Global Search" size="50" id="tempSearch1" />
            <div style={{ textAlign: 'center' }}>List of Properties</div>
        </div>;

        var headerDevice = <div style={{ 'textAlign': 'left' }}>
            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })}
                placeholder="Global Search" size="50" id="tempSearch" />
            <div style={{ textAlign: 'center' }}>List of Device Attributes</div>
        </div>;

        var headerTransform = <div style={{ 'textAlign': 'left' }}>
            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })}
                placeholder="Global Search" size="50" id="tempSearch" />
            <div style={{ textAlign: 'center' }}>List of Transform Attributes</div>
        </div>;

        const dialogFooter = (
            <div>
                <Button icon="pi pi-times" onClick={this.onBackClick} label="Back" className="p-button-secondary" />
                <Button icon="pi pi-check" onClick={this.changeTemplateSection} label={this.state.templateBtnText} />
            </div>
        );
        return (

            <div>
                <div><BreadCrumb model={this.state.breadcrumbItems} home={breadcrumbHome} /></div>

                <div className="p-grid">

                    <div className="p-col-fixed" id="templateList">

                        <div class="vertical-menu1">
                            <a href="javascript:void(0);" class="active">Template
  <span style={{ paddingLeft: '10px', paddingRight: '5px', cursor: 'pointer' }}> <i class="pi pi-plus"
                                    onClick={this.onTemplateAddClick}></i> </span>
                                <span style={{ paddingRight: '5px' }}>  <i class="pi pi-pencil"></i> </span>
                                <span style={{ paddingRight: '5px' }}> <i class="pi pi-copy"></i>  </span>
                                <span style={{ paddingRight: '5px', float: 'right', cursor: 'pointer' }}> <i class="pi pi-trash"></i> </span>
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
                                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
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
                                                <div className="p-grid" style={{ display: 'block' }}>
                                                    <AddTemplate />
                                                </div>
                                            </div>

                                        </p>
                                    </TabPanel>
                                    <TabPanel header="Properties" leftIcon="pi pi-user">

                                        <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                                            <div className="p-grid">
                                                <div className="p-col-12"><i>Click on + button to create a template</i></div>
                                            </div>
                                        </div>
                                        <div id="propertyPanel" className={this.state.displayPropertyModelView}>
                                            <PropertyComponent />
                                        </div>

                                    </TabPanel>
                                    <TabPanel header="Device Attributes" leftIcon="pi pi-search" >

                                        <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                                            <div className="p-grid">
                                                <div className="p-col-12"><i>Click on + button to create a template</i></div>
                                            </div>
                                        </div>
                                        <div id="propertyPanel" className={this.state.displayDeviceModelView}>
                                            <DeviceAttribute />
                                        </div>


                                    </TabPanel>
                                    <TabPanel header="Transform Attributes" leftIcon="pi pi-user">

                                        <div id="templatePaneldefault" className={this.state.displayTemplateText}>
                                            <div className="p-grid">
                                                <div className="p-col-12"><i>Click on + button to create a template</i></div>
                                            </div>
                                        </div>
                                        <div id="propertyPanel" className={this.state.displayTransformModelView}>
                                            <TransformAttribute />
                                        </div>
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