import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import "../mainpage.css";
import background from "../back.png";
import { Button } from "@material-ui/core";
import HandleImage from "../Helpers/HandleImage.js";
import {DropzoneDialog} from "material-ui-dropzone";
import handleImage from "../Helpers/HandleImage.js";

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

function isValid(obj)
{
	if (typeof obj == 'undefined' || obj == undefined || obj.length == 0)
		return false;

	return true;
}

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
			files: [],
			dialogOpen: false,
			uploadingHouse: false,
			uploadingAvatar: false,
			houseImageURL: null,
			avatarImageURL: null,
		}
	}

	

	componentDidMount()
	{
		let userTemp = [];
		const db = this.props.firebase.firestore();
		db.collection("User").doc(this.props.userID).get().then(result =>
		{
			if(!isValid(result.data()))
			{
				return;
			}

			this.setState({houseImageURL: result.data().houseURL, avatarImageURL: result.data().avatar})
		})
		db.collection('house').get().then((result) =>
		{
			result.forEach((doc, i) => { userTemp.push(doc.id) })
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
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	uploadHousePic = () =>
	{
		this.setState({ dialogOpen: true, uploadingHouse: true, uploadingAvatar: false})

	}

	uploadUserPic = () =>
	{
		this.setState({ dialogOpen: true, uploadingAvatar: true, uploadingHouse: false})
	}

	handleFileChange =(files) =>
	{

		let handleImage = new HandleImage(firebase);
		this.setState({files: files, open: false, dialogOpen: false})

		this.state.uploadingHouse ?
			handleImage.uploadImage(files[0], this.props.userID + 'house'):
			handleImage.uploadImage(files[0], this.props.userID + 'avatar')

		var storageRef = this.props.firebase.storage().ref();

		storageRef.child(this.props.userID + (this.state.uploadingHouse ? 'house' : 'avatar')).getDownloadURL().then(result =>
		{

			if (this.state.uploadingHouse)
				this.setState({"houseImageURL" : result});
			else if (!this.state.uploadingHouse)
				this.setState({ "avatarImageURL": result });

			this.updateFirebase();

			this.props.switchPage("Leaderboard");
			this.props.switchPage("MainPage");
		});
	} 

	updateFirebase = () =>
	{
		const db = this.props.firebase.firestore();
		const user = this.props.user();

		db.collection("house").doc(user.uid).update(
			{
				imageURL: this.state.houseImageURL,
			}
		);
		db.collection("User").doc(user.uid).update(
			{
				houseURL: this.state.houseImageURL,
				avatar: this.state.avatarImageURL,
			}
		);

		this.componentDidMount()

	}

	render()
	{
		const { classes, userHouse } = this.props;
		const user = this.props.user();
		const {dialogOpen} = this.state;
		const { houseImageURL, avatarImageURL} = this.state;
		 

		return (
			<div className="peak" style={{ height: '100%' }}>
				<DropzoneDialog
					open={dialogOpen}
					onSave={this.handleFileChange}
					acceptedFiles={['image/jpeg', 'image/png']}
					onClose={() => this.setState({dialogOpen: false})}
					filesLimit={1}/>
				<div className="content-body">
					<div className="header">
						<span className={classes.buttonStyle} onClick={() => this.props.switchPage('MainPage')}>
							My Home
									</span>
						<span className={classes.buttonStyle} style={{ marginTop: '10em' }} onClick={() => this.randomHouse()}>
							Visit Homes
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

							{
								isValid(this.state.houseImageURL) ?
									<img className="profile_image" src={this.state.houseImageURL} onClick={this.uploadHousePic}></img>
									:
									<div className="picture-subcontainer" onClick={this.uploadHousePic}>
										<p>Upload Picture</p>
									</div>
									
							}

						</div>
							
						<div className="picture-container">

							<h4>
								My Picture
							</h4>

							{
								isValid(this.state.avatarImageURL) ?
									<img className="profile_image" src={this.state.avatarImageURL} onClick={this.uploadUserPic}></img>
									:
									<div className="picture-subcontainer" onClick={this.uploadUserPic}>
										<p>Upload Picture</p>
									</div>
							}

							

						</div>
						<h4>If you image does not update when you upload it please refresh the page</h4>

					</div>

				</div>
			</div>

		)
	}


}

export default withStyles(styles)(MainPage);