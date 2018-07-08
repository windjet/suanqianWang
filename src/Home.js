import React from 'react';
import logo from './react.svg';
import './Home.css';
import {Link} from "react-router-dom";
import DocumentTitle from 'react-document-title'

class Home extends React.Component {
	render() {
		return (
			<DocumentTitle title='Homesssss'>

				<div className="Home">
					<Link to="/Home2">goto home2</Link>
					<div className="Home-header">
						<img src={logo} className="Home-logo" alt="logo"/>
						<h2>Welcome to Razzle</h2>
					</div>
					<p className="Home-intro">
						To get started, edit <code>src/App.js</code> or{' '}
						<code>src/Home.js</code> and save to reload.
					</p>
					<ul className="Home-resources">
						<li>
							<a href="https://github.com/jaredpalmer/razzle">Docs</a>
						</li>
						<li>
							<a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
						</li>
						<li>
							<a href="https://palmer.chat">Community Slack</a>
						</li>
					</ul>
				</div>
			</DocumentTitle>
		);
	}
}

export default Home;
