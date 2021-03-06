import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Steps} from 'primereact/steps';
import {TabView,TabPanel} from 'primereact/tabview';
import {Growl} from 'primereact/growl';


class CreateTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    
      static getDerivedStateFromProps(props, state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (props.selectedIndex !== state.activeIndex) {
          return {
            activeIndex: props.selectedIndex
          };
        }
        return null;
      }
    render() {
        const items = [{
                label: 'Template',
                command: (event) => {
                    this.growl.show({severity:'info', summary:'First Step', detail: event.item.label});
                }
            },
            {
                label: 'Properties',
                command: (event) => {
                    this.growl.show({severity:'info', summary:'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Device Attribute',
                command: (event) => {
                    this.growl.show({severity:'info', summary:'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Transform Attribute',
                command: (event) => {
                    this.growl.show({severity:'info', summary:'Last Step', detail: event.item.label});
                }
            }
        ];

        return (
            <div>

                <div className="content-section implementation">
                    <Growl ref={(el) => {this.growl = el}}></Growl>
                    <Steps model={items} activeIndex={this.props.selectedIndex} 
                    onSelect={(e) => this.setState({activeIndex: e.index})} readOnly={false} />

                 
                </div>

               

            </div>
        );
    }
}


export default CreateTemplate;