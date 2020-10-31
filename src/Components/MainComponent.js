import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import MainPage from './MainPage';


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
		},
		buttonStyle: {
			cursor: 'pointer'
		}
	})

class MainComponent extends Component
{
	constructor(props) {
		super(props);
		//this.state is accessible with this.state.attribute
		//it is settable with this.setState({attribute: value})
		//will only override attribute and no other attributes
		this.state={
			openPage: 'MainPage',
		}
	}

	renderPage = (param) => {
		switch(param)
		{
			case 'MainPage':
				return (<MainPage/>)
			default:
				return (<MainPage/>)
		}
	}

	render()
	{
		//render is what will be called any time there is an update to the component
		//only do things that are necessary here as it causes a performance hit
		const {classes} = this.props
		//classes.styleSheetItem will give you the class from the style sheet
		//className={classes.styleSheet} will assign a class to the style sheet to the component
		return(
			<div className="App" style={{backgroundImage: background}}>
				<header className="App-header" >
					{this.renderPage(this.state.openPage)}
				</header>
			</div>
		)
	}


}

export default withStyles(styles)(MainComponent);