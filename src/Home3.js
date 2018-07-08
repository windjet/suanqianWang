import React from 'react';

class Home3 extends React.Component {


  render() {
    console.log(this.props.history);
    return (
      <div className="Home3"  onClick={() => console.log(222222)}>
        home33333
      </div>
    );
  }
}

export default Home3;
