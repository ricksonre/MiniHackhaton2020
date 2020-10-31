import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import {Button} from "@material-ui/core";


const styles = (theme) =>
	({
		style1EX: {
			someCSS: 'value',
			anotherCSS: 'value',
		},
		buttonStyle: {
			cursor: 'pointer'
		},
		hoverStyle: {
			"&:hover":{
				color: 'grey'
			}
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
			this.setState({userHouses: userTemp})
		});
		db.collection('User').doc(this.props.userID).get().then(result => {
			this.setState({userHouse: result? result.houseID: undefined})
		})
	}

	toggleShow = () => {
		this.setState({showHidden: ! this.state.showHidden})
	}

	randomHouse =()=>{
		const houses = this.state.userHouses;
		this.props.switchPage('HouseView');
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	render()
	{
		//render is what will be called any time there is an update to the component
		//only do things that are necessary here as it causes a performance hit
		const {classes,userHouse} = this.props;

		console.log();
		//console.log(this.props.firebase.database().ref('Users/gVBmMWF7m7cD8IwUTqG3'))
		//classes.styleSheetItem will give you the class from the style sheet
		//className={classes.styleSheet} will assign a class to the style sheet to the component
		return(
	
				<header className="App-header" >
					<div style={{position: 'absolute', top: 0}}>
						<div>
							<h1>Trick or Tweet</h1>
						</div>
						<div className={classes.buttonStyle} style={{marginTop: '10em'}} onClick={() => this.randomHouse}>
							<h2 className={classes.hoverStyle}>Go to a random house</h2>
						</div>
						{userHouse ? (<div className={classes.buttonStyle}>
							<h2 className={classes.hoverStyle}>View your house</h2>
						</div>) :
							(
								<div className={classes.buttonStyle}>
									<h2 className={classes.hoverStyle}>Post your house</h2>
								</div>
							)
						}

						<div className={classes.buttonStyle} onClick={() => this.props.switchPage('Leaderboard')}>
							<h3 style={{marginTop: '5em'}} className={classes.hoverStyle}>Leaderboard</h3>
						</div>
					</div>
				</header>
	
		)
	}


}

export default withStyles(styles)(MainPage);