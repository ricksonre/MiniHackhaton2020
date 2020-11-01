import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase, {initializeApp} from 'firebase';

import MainPage from './MainPage';
import MainPageAlt from "./MainPageAlt";
import Leaderboard from "./Leaderboard";
import LogInPage from "./LogInPage";
import HouseView from "./HouseView"



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

firebase.initializeApp(firebaseConfig);


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
		//this.state is accessible with this.state.attribute
		//it is settable with this.setState({attribute: value})
		//will only override attribute and no other attributes
		this.state=
        {
			openHouse: null,
			openPage: null,
			page: null
		}
		
		this.provider = new firebase.auth.GoogleAuthProvider();
		
		this.user = null;
	}

	componentDidMount() 
	{
		if(this.user == undefined)
			this.renderPage("LogInPage");
		else
			this.renderPage("HouseView");

	}
	
	userData = (data = null) =>
	{
		if(data != null)
			this.user = data;
		
		return this.user;	
	}

	setHouseID = (id) => {
		console.log("AAAAAAAAAAAAA")
		console.log(id)
		this.houseID = id;
		this.renderPage('HouseView')
	}

	renderPage = (page) => {
		switch(page)
		{
			case 'MainPage':
				this.setState({page: (<MainPage userID={this.user.uid} user={this.userData}  setHouseID={this.setHouseID} firebase={firebase} switchPage={this.renderPage}/>)});
				return;
			case 'MainPageAlt':
				this.setState({page: (<MainPageAlt setHouseID={this.setHouseID} user={this.userData}  firebase={firebase} switchPage={this.renderPage}/>)});
				return;
			case 'LogInPage':
				this.setState({page: (<LogInPage provider={this.provider} firebase={firebase} user={this.userData} switchPage={this.renderPage}/>)});
				return;
			case 'HouseView':
				this.setState({page: (<HouseView openHouse={this.houseID} setHouseID={this.setHouseID} comments={[]} provider={this.provider} firebase={firebase} user={this.userData} switchPage={this.renderPage}/>)});
				return;
			case 'Leaderboard':
				this.setState({ page: (<Leaderboard setHouseID={this.setHouseID} firebase={firebase} user={this.userData} switchPage={this.renderPage}/>)});
				return;
			default:
				this.setState({page: (<MainPage userID={this.user.uid} user={this.userData}  setHouseID={this.setHouseID} firebase={firebase} switchPage={this.renderPage}/>)});
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
			<div className="App">
				{page}
			</div>
		)
	}


}

export default withStyles(styles)(MainComponent);