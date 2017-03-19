import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
    width:  150,
    height: 50
}

export default class Home extends React.Component {
    render() {
        return (
        <div className="home-buttons">
            <RaisedButton backgroundColor='#f44336'style={style} onClick={e => this.props.onItemSelect('join')}>Join</RaisedButton>
            <RaisedButton backgroundColor='#26a69a'style={style}  onClick={e => this.props.onItemSelect('create')}>Create</RaisedButton>
        </div>);
    }
}