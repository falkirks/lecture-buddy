import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Click from './Click';

export default class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            buttons: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.buttonsSet = this.buttonsSet.bind(this);
        this.receiveName = this.receiveName.bind(this);
        this.collapse = this.collapse.bind(this);

        window.socket.on('set-buttons', this.buttonsSet);
        window.socket.on('set-name', this.receiveName);
        window.socket.on('collapse', this.collapse);

    }

    receiveName(data){
        if(data.name != null) {
            this.setState({name: data.name});
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    buttonsSet(data){
        if(data.buttons != null) {
            this.setState({
                buttons: data.buttons
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    collapse(data){
        alert("That wasn't valid.");
        this.setState({
            key: ""
        });
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleSubmit(event) {
        alert('A key was submitted: ' + this.state.key);
        window.socket.emit('join', {
            key: this.state.key
        });
        event.preventDefault();
    }

    render() {
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (
                <div className="container">
                    <b>WE JOINED AND ITS {this.state.name}</b>

                    <br/>
                    <div>
                        <ul className="list-group">
                            {this.state.buttons.map((btn) => (
                                <li> < Click name={btn} /> </li>
                            ))}
                        </ul>
                    </div>


                </div>
            );
        }
        else{
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Key:
                        <input type="text" value={this.state.key} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="Join" type="submit" value="Join lecture"/>
                </form>
            );
        }
    }
}