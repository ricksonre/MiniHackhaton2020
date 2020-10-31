import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import {Button} from "@material-ui/core";


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

class MainPage extends Component
{
	constructor(props) {
		super(props);
		//this.state is accessible with this.state.attribute
		//it is settable with this.setState({attribute: value})
		//will only override attribute and no other attributes
		this.state={
			showHidden: false,
			userHouses: [],
		}
	}

	componentDidMount() {
		let userTemp = [];
		const db = this.props.firebase.firestore();
		db.collection('house').get().then((result) => {
			result.forEach((doc, i )=> {userTemp[i] = doc.id})
		});
		this.setState({userHouses: userTemp})
	}

	toggleShow = () => {
		this.setState({showHidden: ! this.state.showHidden})
	}

	randomHouse =()=>{
		const houses = this.state.userHouses;
		this.props.switchPage('HousePage');
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	render()
	{
		//render is what will be called any time there is an update to the component
		//only do things that are necessary here as it causes a performance hit
		const {classes} = this.props;

		console.log();
		//console.log(this.props.firebase.database().ref('Users/gVBmMWF7m7cD8IwUTqG3'))
		//classes.styleSheetItem will give you the class from the style sheet
		//className={classes.styleSheet} will assign a class to the style sheet to the component
		return(
			<div className="App" style={{backgroundImage: background}}>
				<header className="App-header" >
					<div style={{position: 'absolute', top: 0}}>
						<div>
							<h1>Trick or Tweet</h1>
						</div>
						<div className={classes.buttonStyle} style={{marginTop: '10em'}} onClick={() => this.randomHouse()}>
							<h2>Go to a random house</h2>
						</div>
						<div className={classes.buttonStyle}>
							<h2>Post your house</h2>
						</div>
						<div className={classes.buttonStyle}>
							<h3 style={{marginTop: '5em'}}>Setup Account</h3>
						</div>
					</div>
				</header>
			</div>
		)
	}


}

export default withStyles(styles)(MainPage);