
import React, {Component} from 'react';

class TransformModelComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isOpen: false,
        name: null,
        desc: null,
        visible: false
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
       Ankush
    </div>
  );
}
    }
export default TransformModelComponent;