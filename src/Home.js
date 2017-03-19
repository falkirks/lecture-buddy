import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
    width:  150,
    height: 50,
    borderRadius:10,
    fontWeight:700,
}

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <header>
               <b className="topic">Lecture Buddy</b>
            </header>
        <div className="home-buttons">
            <RaisedButton  backgroundColor='#f44336' labelColor='#ffffff' style={style} onClick={e => this.props.onItemSelect('join')}>Join</RaisedButton>
            <RaisedButton  backgroundColor='#26a69a' style={style}  onClick={e => this.props.onItemSelect('create')}>Create</RaisedButton>
        </div>
        <cover></cover>
        </div>
        );
    }
}