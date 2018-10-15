import React, { Component } from 'react';
import './App.css';

const space = String.fromCharCode(160);
const dataA = [
  {letter: 'Q', id: 'Heater-1', url: 'Heater-1.mp3'},
  {letter: 'W', id: 'Heater-2', url: 'Heater-2.mp3'},
  {letter: 'E', id: 'Heater-3', url: 'Heater-3.mp3'},
  {letter: 'A', id: 'Heater-4', url: 'Heater-4_1.mp3'},
  {letter: 'S', id: 'Clap', url: 'Heater-6.mp3'},
  {letter: 'D', id: 'Open-HH', url: 'Dsc_Oh.mp3'},
  {letter: 'Z', id: 'Kick-n\'-Hat', url: 'Kick_n_Hat.mp3'},
  {letter: 'X', id: 'Kick', url: 'RP4_KICK_1.mp3'},
  {letter: 'C', id: 'Closed-HH', url: 'Cev_H2.mp3'}
];
const dataB = [
  {letter: 'Q', id: 'Chord-1', url: 'Chord_1.mp3'},
  {letter: 'W', id: 'Chord-2', url: 'Chord_2.mp3'},
  {letter: 'E', id: 'Chord-3', url: 'Chord_3.mp3'},
  {letter: 'A', id: 'Shaker', url: 'Give_us_a_light.mp3'},
  {letter: 'S', id: 'Open-HH', url: 'Dry_Ohh.mp3'},
  {letter: 'D', id: 'Closed-HH', url: 'Bld_H1.mp3'},
  {letter: 'Z', id: 'Punchy-Kick', url: 'punchy_kick_1.mp3'},
  {letter: 'X', id: 'Side-Stick', url: 'side_stick_1.mp3'},
  {letter: 'C', id: 'Snare', url: 'Brk_Snr.mp3'}
];
const Header = () => {
  return (
    <div className="header">
      <h1>Drum Machine</h1>
    </div>
  );
};
const Footer = () => {
  return (
    <div className="footer">Created by <a href="https://www.linkedin.com/in/kouroutsidou" target="_blank" rel="noopener noreferrer">Frosso</a> using React.js</div>
  );
};
class Pad extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const padClass = this.props.onOff ? 'drum-pad pad-active' : 'drum-pad pad-inactive';
    return (
      <button className={padClass} id={this.props.el.id} value={this.props.el.url} onClick={this.props.play} onKeyPress={this.props.keyPress}>
        {this.props.el.letter}
      </button>
    );
  }
};
const Drum = (props) => {
  const arr = props.data;
  return (
    <div id="drum">
      {
        arr.map((elem) => {
          return (
            <Pad el={elem} key={elem.letter} play={props.play} onOff={props.onOff} keyPress={props.keyPress}/>
          );
        })
      }
    </div>
  );
};
const Switch = (props) => {
  const switchOn = props.onOff ? 'out out-active' : 'out out-inactive';
  return (
    <div className={switchOn} onClick={props.switch}>
      <div className="in">
        {String.fromCharCode(160)}
      </div>
    </div>
  );
};
const Options = (props) => {
  return (
    <div>
      <p className="labels">On / Off</p>
      <Switch switch={props.turnOff} onOff={props.onOff}/>
      <div id="display">{props.display}</div>
      <div className="vol">
        <label for="volume" className="labels">Volume</label>
        <input type="range" id="start" name="volume" min="0" max="1" step="0.01" value={props.volume} onChange={props.changeVol}/>
      </div>
      <p className="labels">Choose sounds</p>
      <Switch switch={props.changeBank} onOff={props.bank}/>
    </div>
  );
};
class Machine extends Component {
  constructor() {
    super();
    this.state = {
      volume: 0.3,
      display: space,
      on: true,
      dataIndex: true,
      data: dataA
    };
    this.changeVolume = this.changeVolume.bind(this);
    this.playSound = this.playSound.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.changeBank = this.changeBank.bind(this);

    this.handleKey = this.handleKey.bind(this);
  }
  displayTime = null;
  clearDisplay() {
    clearTimeout(this.displayTime);
    this.displayTime = setTimeout(() => {
      this.setState({
        display: space
      });
    }, 1000)
  }
  changeVolume(e) {
    const {value} = e.target;
    const text = `Volume: ${parseInt(value * 100)}`;
    this.setState({
      volume: value,
    });
  this.changeDisplay(text);
  this.clearDisplay();
  }
  playSound(e) {
    if (!this.state.on) {
      return;
    }
    this.play(e.target.value, e.target.id)
  }
  play(url, id) {
    const soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/' + url;
    const audio = new Audio(soundUrl);
    audio.volume = this.state.volume;
    this.changeDisplay(id);
    audio.play();
    this.clearDisplay();
  }
  changeDisplay(string) {
    this.setState({
      display: string
    });
  }
  turnOff(e) {
    this.setState({
      on: !this.state.on
    });
  }
  changeBank(e) {
    const array = !this.state.dataIndex ? dataA : dataB;
    this.setState({
      dataIndex: !this.state.dataIndex,
      data: array
    });
    this.changeDisplay(!this.state.dataIndex ? 'Sound-bank One' : 'Sound-bank Two');
    this.clearDisplay();
  }
  handleKey(event) {
    const keyPressed = event.key.toUpperCase();
    this.state.data.forEach((el, ind) => {
      if (el.letter === keyPressed) {
        this.play(el.url, el.id);
      }
    });
  }
  render() {
    return (
      <div className="machine" onKeyPress={this.handleKey}>
      <Header />
      <div className="desktop">
        <Drum play={this.playSound} onOff={this.state.on} data={this.state.data} />
        <Options
          volume={this.state.volume}
          changeVol={this.changeVolume}
          display={this.state.display}
          turnOff={this.turnOff}
          onOff={this.state.on}
          changeBank={this.changeBank}
          bank={this.state.dataIndex}
        />
      </div>
    </div>
    );
  }
};
class App extends Component {
  render() {
    return (
      <div id="drum-machine">
        <Machine />
        <Footer />
      </div>
    );
  }
};
export default App;
