import React from 'react';

class Home2 extends React.Component {

	goHome3 = () => {
		//this.props.history.goBack()
	  this.props.history.push('/home3')
  };
  render() {
    console.log(this.props.history);
    return (
      <div className="Home2"  onClick={this.goHome3}>
        home22222
      </div>
    );
  }
}

export default Home2;
