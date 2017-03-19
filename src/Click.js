import React from 'react';

export default class Click extends React.Component {




    render() {
        return <button type="button" className="btn btn-primary" onClick={this.handleClick}>{this.props.name}</button>;
    }
}


