import React from 'react';

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
        return <button type="button" className="btn btn-primary" onClick={this.handleClick}>{this.props.name}</button>;
    }
}


