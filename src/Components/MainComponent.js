import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase, {initializeApp} from 'firebase';
import background from "../back.png";

import MainPage from './MainPage';
import MainPageAlt from "./MainPageAlt";
import LogInPage from "./LogInPage";


firebase.initializeApp({
	apiKey: "AIzaSyD9O2AQQLt_BewjHewrUBhmlBDukaw4ArY",
	authDomain: "hackathon2020-498db.firebaseapp.com",
	databaseURL: "https://hackathon2020-498db.firebaseio.com",
	projectId: "hackathon2020-498db",
	storageBucket: "hackathon2020-498db.appspot.com",
	messagingSenderId: "637374311684",
	appId: "1:637374311684:web:be0b04ceb878a5131db451",
	measurementId: "G-2DLHMCCWG3"
});

const firebaseConfig = {
	apiKey: "AIzaSyD9O2AQQLt_BewjHewrUBhmlBDukaw4ArY",
	authDomain: "hackathon2020-498db.firebaseapp.com",
	databaseURL: "https://hackathon2020-498db.firebaseio.com",
	projectId: "hackathon2020-498db",
	storageBucket: "hackathon2020-498db.appspot.com",
	messagingSenderId: "637374311684",
	appId: "1:637374311684:web:be0b04ceb878a5131db451",
	measurementId: "G-2DLHMCCWG3"
};


const styles = (theme) =>
	({
		style1EX: {
			someCSS: 'value',
			anotherCSS: 'value',
		}
	})

class MainComponent extends Component
{
	constructor(props) {
		super(props);

		this.state=
		{
			openPage: null,
			page: (null)
		}
		
		this.provider = new firebase.auth.GoogleAuthProvider();
		
		this.user = null;
	}

	componentDidMount() 
	{
		
		if(this.user == undefined)
			this.renderPage("LogInPage");
		else
			this.renderPage("MainPage");

	}

	renderPage = (page) => {
		switch(page)
		{
			case 'MainPage':
				this.setState({page: (<MainPage switchPage={this.renderPage}/>)});
				return;
			case 'MainPageAlt':
				this.setState({page: (<MainPageAlt switchPage={this.renderPage}/>)});
				return;
			case 'LogInPage':
				this.setState({page: (<LogInPage switchPage={this.renderPage}/>)});
				return;
			default:
				this.setState({page: (<MainPage switchPage={this.renderPage}/>)});
		}
	}

	render()
	{
		//render is what will be called any time there is an update to the component
		//only do things that are necessary here as it causes a performance hit
		const {classes} = this.props;
		const {page} = this.state;
		//classes.styleSheetItem will give you the class from the style sheet
		//className={classes.styleSheet} will assign a class to the style sheet to the component
		return(
			<div className="App" style={{backgroundImage: background}}>
				<header className="App-header" >
					{page}
				</header>
			</div>
		)
	}


}

export default withStyles(styles)(MainComponent);