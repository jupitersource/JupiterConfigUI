import React, {Component} from 'react';

import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import PropertyService from './PropertyService';
import ModelComponent from "./ModelComponent";

import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PropertyMasterComponet extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            name: null,
            desc: null
        };

       
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        }); 
    }
    componentDidMount() {
       
    }
    render() {
       
        return (
            <div>
    
            </div>
        )
    }
}

export default PropertyMasterComponet;


