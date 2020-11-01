import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import "../mainpage.css";
import background from "../back.png";
import { Button } from "@material-ui/core";
import HandleImage from "../Helpers/HandleImage.js";

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
			"&:hover": {
				color: 'grey'
			}
		}
	})

class MainPage extends Component
{
	constructor(props)
	{
		super(props);
		//this.state is accessible with this.state.attribute
		//it is settable with this.setState({attribute: value})
		//will only override attribute and no other attributes
		this.state = {
			showHidden: false,
			userHouses: [],
		}
	}

	componentDidMount()
	{
		let userTemp = [];
		const db = this.props.firebase.firestore();
		db.collection('house').get().then((result) =>
		{
			result.forEach((doc, i) => { userTemp[i] = doc.id })
			this.setState({ userHouses: userTemp })
		});
		db.collection('User').doc(this.props.userID).get().then(result =>
		{
			this.setState({ userHouse: result ? result.houseID : undefined })
		})
	}

	toggleShow = () =>
	{
		this.setState({ showHidden: !this.state.showHidden })
	}

	randomHouse = () =>
	{
		const houses = this.state.userHouses;
		this.props.switchPage('HousePage');
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	render()
	{
		const { classes, userHouse } = this.props;
		const user = this.props.user();

		console.log(user)

		return (
			<div className="peak" style={{ height: '100%' }}>
				<div className="content-body">
					<div className="header">
						<span className={classes.buttonStyle} onClick={() => this.props.switchPage('MainPage')}>
							My Home
									</span>
						<span className={classes.buttonStyle}>
							Visit Homes
									</span>
						<span className={classes.buttonStyle} style={{ marginTop: '10em' }} onClick={() => this.randomHouse()}>
							Random Home
								</span>
						<span className={classes.buttonStyle} onClick={() => this.props.switchPage('Leaderboard')}>
							Leaderboard
									</span>
					</div>

					<div>
						<h1 className="userName">{user["displayName"]}</h1>
					</div>

					<div className="pictures-container">

						<div className="picture-container">
							<h4>
								House Picture
							</h4>

							<div className="picture-subcontainer">
								<p>Upload Picture</p>
							</div>

						</div>
							
						<div className="picture-container">

							<h4>
								My Picture
							</h4>

							<div className="picture-subcontainer">
								<p>Upload Picture</p>
							</div>

						</div>


					</div>

					<div>
						<h4>My House Description:</h4>
						<input></input>
						<button>Post</button>
					</div>


					<hr></hr>

				</div>
			</div>

		)
	}


}

export default withStyles(styles)(MainPage);