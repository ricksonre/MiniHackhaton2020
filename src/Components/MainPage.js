import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";


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
			names: 'Carter, Ren, Aedan, Rick',
			showHidden: false,
		}
	}

	example = () =>
	{
		//example function
		//use arrow functions so we can include it in our components
		//when you include it don't add the () to the end of the name, just do example
		//unless you are calling it within this file

		//if you need to include arguments, do something like
		// example = (arg1, arg2 ... ) => {function stuff}

	}

	toggleShow = () => {
		this.setState({showHidden: ! this.state.showHidden})
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
					<div style={{position: 'absolute', top: 0}}>
						<div onClick={this.toggleShow}>
							<h1>Trick or Tweet</h1>
						</div>
						<div style={{marginTop: '10em'}} onClick={this.toggleShow}>
							<h2>Go to a random house</h2>
						</div>
						<div onClick={this.toggleShow}>
							<h2>Post your house</h2>
						</div>
						<div onClick={this.toggleShow}>
							<h3 style={{marginTop: '5em'}}>Setup Account</h3>
						</div>
						{this.state.showHidden ?
							(<h1>{this.state.names}</h1>):
							(null)
						}
					</div>
				</header>
			</div>
		)
	}


}

export default withStyles(styles)(MainPage);