import React from 'react';

class Home3 extends React.Component {

	goBack = () => {
		this.props.history.goBack()
	};

  render() {
    console.log(this.props.history);
    return (
      <div className="Home3"  onClick={this.goBack}>
        home33333
      </div>
    );
  }
}

export default Home3;
