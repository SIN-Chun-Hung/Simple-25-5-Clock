// direct code from FFC FreeCodeCamp
const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel };

};
//

class SimpleClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bkLength: 5,
      snLength: 25,
      timer: 1500,
      currentType: 'Session',
      currentState: 'stop',
      screenColor: {
        backgroundColor: '#A9A9A9',
        color: 'WhiteSmoke' },

      intervalID: '' };


    this.timeLengthController = this.timeLengthController.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.showMinSec = this.showMinSec.bind(this);
    this.warning = this.warning.bind(this);
    this.switchType = this.switchType.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.timerPhaseControl = this.timerPhaseControl.bind(this);
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerController = this.timerController.bind(this);
    this.reset = this.reset.bind(this);
  }

  timeLengthController(currentType, sign, targetChangeLength, currentLength) {
    if (this.state.currentState == 'running') {
      return;
    }

    if (this.state.currentType == currentType) {
      if (sign == "-" && currentLength !== 1) {
        this.setState({
          [targetChangeLength]: currentLength - 1 });

      } else if (sign == "+" && currentLength !== 60) {
        this.setState({
          [targetChangeLength]: currentLength + 1 });

      }
    } else

    if (sign == "+" && currentLength !== 60) {
      this.setState({
        [targetChangeLength]: currentLength + 1,
        timer: currentLength * 60 + 60 });

    } else if (sign == "-" && currentLength !== 1) {
      this.setState({
        [targetChangeLength]: currentLength - 1,
        timer: currentLength * 60 - 60 });

    }
  }

  setBreakLength(e) {
    this.timeLengthController('Session', e.currentTarget.value, 'bkLength', this.state.bkLength);
  }

  setSessionLength(e) {
    this.timeLengthController('Break', e.currentTarget.value, 'snLength', this.state.snLength);
  }

  showMinSec() {
    let mins = Math.floor(this.state.timer / 60);
    let secs = this.state.timer - mins * 60;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;

    return mins + ':' + secs;
  }

  timeDecrement() {
    this.setState({
      timer: this.state.timer - 1 });

  }

  warning(time) {
    if (time < 61) {
      this.setState({ screenColor:
        { backgroundColor: 'Gold',
          color: 'red' } });

    } else {
      this.setState({
        screenColor:
        { backgroundColor: '#A9A9A9',
          color: 'WhiteSmoke' } });

    }
  }

  stopMusic(time) {
    if (time == 0) {
      this.audioBeep.play();
    }
  }

  switchType(num, str) {
    this.setState({
      timer: num,
      currentType: str,
      screenColor: {
        backgroundColor: '#A9A9A9',
        color: 'WhiteSmoke' } });


  }

  timerPhaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.stopMusic(timer);

    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }

      if (this.state.currentType === 'Break') {
        this.startTimerCount();
        this.switchType(this.state.snLength * 60, 'Session');
      } else {
        this.startTimerCount();
        this.switchType(this.state.bkLength * 60, 'Break');
      }
    }
  }

  startTimerCount() {
    this.setState({
      intervalID: accurateInterval(
      () => {
        this.timeDecrement();
        this.timerPhaseControl();
      }, 1000) });


  }

  timerController() {
    if (this.state.currentState === 'stop') {
      this.startTimerCount();
      this.setState({
        currentState: 'running' });

    } else {
      this.setState({
        currentState: 'stop' });

      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }

  reset() {
    this.setState({
      bkLength: 5,
      snLength: 25,
      timer: 1500,
      currentType: 'Session',
      currentState: 'stop',
      screenColor: {
        backgroundColor: '#A9A9A9',
        color: 'WhiteSmoke' },

      intervalID: '' });


    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "info" }, /*#__PURE__*/
      React.createElement("div", { id: "clock-title" }, "Simple 25+5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "author" }, "SIMON SIN Chun Hung")), /*#__PURE__*/


      React.createElement("div", { className: "time-control-container", id: "tcc1" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", value: "+", onClick: this.setBreakLength }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" })), /*#__PURE__*/

      React.createElement("span", { id: "break-length" }, this.state.bkLength), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", value: "-", onClick: this.setBreakLength }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-down fa-2x" }))), /*#__PURE__*/



      React.createElement("div", { className: "time-control-container", id: "tcc2" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", value: "+", onClick: this.setSessionLength }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" })), /*#__PURE__*/

      React.createElement("span", { id: "session-length" }, this.state.snLength), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", value: "-", onClick: this.setSessionLength }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-down fa-2x" }))), /*#__PURE__*/



      React.createElement("div", { id: "timer", style: this.state.screenColor }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.currentType), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.showMinSec())), /*#__PURE__*/


      React.createElement("div", { id: "control-buttons" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.timerController }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-play fa-2x" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-pause fa-2x" })), /*#__PURE__*/


      React.createElement("button", { id: "reset", onClick: this.reset }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-refresh fa-2x" }))), /*#__PURE__*/




      React.createElement("audio", { id: "beep", preload: "auto", ref: audio => {this.audioBeep = audio;}, src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(SimpleClock, null), document.getElementById('simple-clock'));