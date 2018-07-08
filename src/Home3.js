import React from 'react';

class Home2 extends React.Component {


  render() {
    console.log(this.props.history);
    return (
      <div className="Home2"  onClick={() => console.log(222222)}>
        home22222
      </div>
    );
  }
}

export default Home2;
