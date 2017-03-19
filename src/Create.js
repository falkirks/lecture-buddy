import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            clicks: {},
            clickLog: [],
            questions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.keySubmit = this.keySubmit.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
        this.questionGot = this.questionGot.bind(this);

        window.socket.on('set-key', this.keySubmit);
        window.socket.on('button', this.buttonPressed);
        window.socket.on('question', this.questionGot);

    }

    keySubmit(data){
        if(data.key != null) {
            this.setState({key: data.key});
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    buttonPressed(data){
        if(data.name != null) {
            var clicks = this.state.clicks;
            if(clicks[data.name] == null){
                clicks[data.name] = 0;
            }
            clicks[data.name]++;

            var clickLog = this.state.clickLog;
            clickLog.push({
                name: data.name,
                time: Date.now()
            });

            this.setState({
                clicks: clicks,
                clickLog: clickLog
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    questionGot(data){
        if(data.text != null) {
            var questions = this.state.questions;
            questions.push({
                text: data.text,
                time: Date.now()
            });

            this.setState({
                questions: questions
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        window.socket.emit('create', {
            name: this.state.name
        });
        event.preventDefault();
    }

    render() {
        if(this.state.name != '' && this.state.key != '') {
            return (<b>WE GOT DAT KEY AND ITS {this.state.key}</b>);
        }
        else{
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="SHIT" type="submit" value="Create lecture"/>
                </form>
            );
        }
    }
}