import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            buttons: [],
            clicks: {},
            clickLog: [],
            questions: [],
            students: 0
        };
        this.DISPLAY_DIST = 20*1000;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.keySubmit = this.keySubmit.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
        this.questionGot = this.questionGot.bind(this);
        this.buttonsSet = this.buttonsSet.bind(this);
        this.changeStudent = this.changeStudent.bind(this);

        window.socket.on('set-key', this.keySubmit);
        window.socket.on('set-buttons', this.buttonsSet);
        window.socket.on('button', this.buttonPressed);
        window.socket.on('question', this.questionGot);
        window.socket.on('student', this.changeStudent);

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

    changeStudent(data){
        if(data.action == 'remove'){
            this.setState({
                students: this.state.students-1
            });
        }
        else{
            this.setState({
                students: this.state.students+1
            });
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
        var style = {
            height: '20px'
        };

        var validClicks = [];
        for(var i = 0; i < this.state.buttons.length; i++){
            validClicks.push({name: this.state.buttons[i], amount: 0});
        }
        for(i = 0; i < this.state.clickLog.length; i++){
            console.log(this.state.clickLog[i]);
            if(this.state.clickLog[i].time + this.DISPLAY_DIST >= Date.now()){
                validClicks[this.state.buttons.indexOf(this.state.clickLog[i].name)].amount++;
            }
        }
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (<div>
                <h1>WE GOT DAT KEY AND ITS {this.state.key}</h1>
                <div>
                    {validClicks.map((click) => (
                        <div>
                            <Card>
                                <CardHeader
                                    title={click.name}
                                />
                                <LinearProgress mode="determinate" value={click.amount} max={this.state.students} style={style} />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>);
        }
        else{
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField hintText="Lecture Name" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="Create" type="submit" value="Create lecture"/>
                </form>

            );
        }
    }
}