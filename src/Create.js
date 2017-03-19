import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
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
        this.removeQuestion = this.removeQuestion.bind(this);

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

    removeQuestion(name){
        var index = this.state.buttons.indexOf(name);
        if (index > -1) {
            var buttons = this.state.buttons;
            buttons.splice(index, 1);
            this.setState({
                buttons: buttons
            });
            window.socket.emit('set-buttons', {buttons: buttons});
        }
        console.log(name);
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
        var style2 = {

        };
        var style3 = {

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
            return (
            <div>
                <header2>Lecture Buddy</header2>
                <h1>WE GOT DAT KEY AND ITS {this.state.key}</h1>
                <div>
                    {validClicks.map((click) => (
                        <div>
                            <AppBar
                                title={<span style={style3}>{click.name}</span>}
                                iconElementRight={<span style={style3}> <IconButton><NavigationClose /></IconButton></span>}
                                onRightIconButtonTouchTap={(function(event){ this.removeQuestion(click.name) }).bind(this)}
                                iconElementLeft={<span></span>}
                                style={style2}
                            />
                            <LinearProgress color="#FF4081" mode="determinate" value={click.amount} max={this.state.students} style={style} />
                            <br />
                        </div>
                    ))}
                </div>
            </div>);
        }
        else{
            return (
                <div>
                <header2>Lecture Buddy</header2>
                <div className="join-state">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField hintText="Lecture Name" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="Create" type="submit" value="Create lecture"/>
                </form>
                </div>
                </div>
            );
        }
    }
}