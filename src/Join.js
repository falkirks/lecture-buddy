import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Click from './Click';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

export default class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            buttons: [],
            open : false
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
        this.handleTouchTap();
        /*alert("That wasn't valid.");*/
        this.setState({
            key: ""
        });
    }

    handleChange(event) {
        this.setState({key: event.target.value});
    }

    handleSubmit(event) {
        // alert('A key was submitted: ' + this.state.key);
        window.socket.emit('join', {
            key: this.state.key
        });
        event.preventDefault();
    }


    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    render() {const style={
        color: 'white',
    }
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (
                <div>
                <header2>Lecture Buddy</header2>
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
                </div>
            );
        }
        else{
            return (
            <div>
                <header2>Lecture Buddy</header2>
                <div className="join-state">
                    <Snackbar
                        open={this.state.open}
                        message="Your PIN-CODE SUCKS"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField inputStyle="color:white;" hintText="Lecture Key" value={this.state.key} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="Join" type="submit" value="Join lecture"/>
                </form>
                </div>
            </div>
            );
        }
    }
}
