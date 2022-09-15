import React from "react";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h6>Hello, world! It is {this.state.date.toLocaleTimeString()}</h6>
          
        </div>
      );
    }
  }
  
  //const root = ReactDOM.createRoot(document.getElementById('root'));
  //root.render(<Clock />);
  export default Clock;