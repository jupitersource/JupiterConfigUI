
import React, {Component} from 'react';
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {InputSwitch} from 'primereact/inputswitch';

class ModelComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isOpen: false,
        name: null,
        desc: null,
        visible: false,
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
    
render() {

  return (
    <div>
     
<div className="p-col-12">
    <div className="">
    <h1>Add Property
                                    <Button label="Add" icon="pi pi-plus" 
                                    style={{borderRadius: '0px', textAlign:'right', float:'right'}}
                                    onClick={this.onClick} />
                        </h1> 
    <Dialog header="Template Creation" visible={this.state.visible} modal={true} width="400px" 
   onHide={() => this.setState({visible:false})}>
                      
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
                            <div className="p-col-12">
                            <Button icon="pi pi-times" style={{marginRight:'10px'}} onClick={() => this.setState({visible:false})} label="Cancel" className="p-button-secondary" />
               <Button icon="pi pi-check" onClick={() => this.setState({visible:false})} label="Save" />
            
                            </div>
                        </div>
                  
                          
                        </Dialog>
</div>
</div>
    </div>
  );
}
    }
export default ModelComponent;