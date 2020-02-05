import React, { Component } from 'react';

import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import { Table } from 'reactstrap';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Panel} from 'primereact/panel';
import PropertyComponent from "../../components/PropertyComponent";
import DeviceAttribute from "../../components/DeviceAttribute";
import Button from 'react-bootstrap/Button'
import TransformAttribute from "../../components/TransformAttribute";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Dialog} from 'primereact/dialog';
import CreateTemplate from './CreateTemplate';

class HomePage extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            isOpen: false,
            shouldHide: true,
            name: '',
            desc: '',
            selectedTemplate: '-1',
            templateData : [
          ],
          cars: [],
          displayDialog: false,
          progressIndex:0
        };

        this.toggle = this.toggle.bind(this);
        this.changeTemplate = this.changeTemplate.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
        this.changeTempaleName = this.changeTempaleName.bind(this);
        this.onHide = this.onHide.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.updateTemplateSection = this.updateTemplateSection.bind(this);
        this.actionTemplate = this.actionTemplate.bind(this);
    }
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/todos')
.then(response => response.json())
.then(data => this.setState({cars: data}));
     // this.propService.getCarsSmall().then(json => this.setState({cars: json}));
      console.log("--------------"+this.state.cars);
  }
    changeTemplate(e)
    {
      console.log("THE VAL", e.target.value);
    }
    addTemplate()
    {
      let tData = this.state.templateData;
      let templateName = 'Template '+ (this.state.templateData.length+1)
      tData.push({ label: templateName, value: templateName }); 
      this.setState({ templateData : tData ,
        name: templateName,
        selectedTemplate : templateName,
        shouldHide: false,
        displayDialog: true,
        displayPropertyModel: 'show',
        displayDeviceModel: 'hidden',
        displayTransformModel: 'hidden'
      })
    }

    updateTemplateSection()
    {
      
      this.setState({
        progressIndex : this.state.progressIndex++,
      })
      console.log(this.state.progressIndex)
    }

    changeTempaleName(e)
    {
      const tData = [];      
      this.state.templateData.map((cell, i) => {
        if (cell.value == this.state.name) {
          tData.push({ label: e.target.value, value: e.target.value });
        }
        else{
          tData.push({ label: cell.value, value: cell.value });
        }
      });
      this.setState({
        name : e.target.value,
        templateData : tData,
        selectedTemplate: e.target.value 
      })
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onHide() {
      this.setState({displayDialog: false});
  }
  changeSection()
  {
    //here we set the next section and index 
  }
  actionTemplate(rowData, column) {
    return <div>
   <span style={{paddingRight: '10px'}}> <FontAwesomeIcon icon={faUserEdit} /> </span>
   <span style={{paddingRight: '10px'}}> <FontAwesomeIcon icon={faCopy} /> </span>
   <span style={{paddingRight: '10px'}}> <FontAwesomeIcon icon={faRecycle} /> </span>
    
    </div>;
}
    render() {
      const footerModel = (
        <div>
           
            <Button color="primary" onClick={this.onHide}>Cancel</Button>{' '}
          <Button color="secondary" onClick={this.changeSection}>Next</Button>
        </div>
    );


      let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Templates List </div>;
      let footer = <div className="p-clearfix" style={{width:'100%'}}>
      <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
  </div>;
  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
  <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
  <Button label="Save" icon="pi pi-check" onClick={this.save}/>
</div>;

        return (
        <div>
           <div > 
           <Button color="primary" onClick={this.addTemplate} className="gap">+ Add Template</Button>
         
            </div>
            <div id="templatePage">
           
                  <div style={{marginBottom: '10px'}}>
                  <DataTable value={this.state.cars} scrollable={true} scrollHeight="400px" 
                   paginator={true} rows={15}  header={header} 
                   selectionMode="single" selection={this.state.selectedCar} 
                   onSelectionChange={e => this.setState({selectedCar: e.value})}
                   onRowSelect={this.onCarSelect}>
                  <Column field="id" header="Id" sortable={true}/>
                  <Column field="title" header="Name" sortable={true}/>
                  <Column header="Action" body={this.actionTemplate} style={{textAlign:'center', width: '10em'}}/>
 
                  </DataTable>
                  
                  
                <div className="content-section implementation">
              
                <Modal isOpen={this.state.displayDialog} size="lg"
                style={{width: '95% !important',  height: '600px', overflow: 'auto'}}>
      <div className="content-section introduction">
                    <div className="feature-intro" className="modalHeaderLook">
                    <span className="titleText">Tempalte Creation </span>
                       
                    </div>
                </div>
        <ModalBody>
        <div>
                            <CreateTemplate selectedIndex={this.state.progressIndex}/>
                            <div className={this.state.displayPropertyModel}>
                            <PropertyComponent />
                            </div>
                            <div className={this.state.displayDeviceModel}>
                            <DeviceAttribute />
                            </div>
                            <div className={this.state.displayTransformModel}>
                            <TransformAttribute />
                            </div>
                            </div>  
             
           </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onHide}>Cancel</Button>{' '}
          <Button color="secondary" onClick={this.updateTemplateSection}>Next</Button>
        </ModalFooter>
      </Modal>
                  

                   
                </div>
                   
                </div>

               <div>
              
                 </div>

            </div>
            
                  </div>
                
          
          
        );
    }
}

export default HomePage;