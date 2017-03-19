import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends React.Component {
    render() {
        return (
        <div>
            <RaisedButton onClick={e => this.props.onItemSelect('join')} primary={true}>Join</RaisedButton>
            <RaisedButton secondary={true} onClick={e => this.props.onItemSelect('create')}>Create</RaisedButton>
        </div>);
    }
}

