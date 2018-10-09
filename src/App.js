import React, { Component } from 'react';
import './App.css';

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
    this.playSound = this.playSound.bind(this);
  }
  playSound(e) {
    const url = 'https://s3.amazonaws.com/freecodecamp/drums/' + this.props.el.url;
    const audio = new Audio(url);
    audio.play();
  }
  render() {
    return (
      <button className="drum-pad" id={this.props.el.id} onClick={this.playSound}>
        {this.props.el.letter}
      </button>
    );
  }
};
const data = [
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
const Drum = () => {
  return (
    <div id="drum">
      {
        data.map((elem) => {
          return (<Pad el={elem} key={elem.letter} />);
        })
      }
    </div>
  );
};
const Options = () => {
  return (
    <div id="display">display</div>
  );
};
const Machine = () => {
  return (
    <div className="machine">
      <Header />
      <Drum />
      <Options />
    </div>
  );
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
}
export default App;
