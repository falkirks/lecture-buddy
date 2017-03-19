import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

export default class Click extends React.Component {




    constructor(props) {
        super(props);
        this.handleClick = this._handleClick.bind(this)
    }


    _handleClick(){
        window.socket.emit('button', {
            name: this.props.name
        });

    }




    render() {
        return (
            <RaisedButton style={style} onClick={this.handleClick} label={this.props.name} />
        );
    }
}


