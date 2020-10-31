import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import "../mainpage.css";
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
		this.props.switchPage('HousePage');
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	render()
	{
		const {classes,userHouse} = this.props;

		return(
					<div style={{height: '100%'}}>

							<div className="content-body">
							<div>
								<h1>Haunter</h1>
							</div>
							<div className={classes.buttonStyle} style={{marginTop: '10em'}} onClick={() => this.randomHouse()}>
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
					</div>

		)
	}


}

export default withStyles(styles)(MainPage);