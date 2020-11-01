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

	isValid(obj)
	{
		if(typeof obj == 'undefined' || obj==undefined || obj.length == 0)
			return false;

		return true;
	}

	componentDidMount()
	{
		let userTemp = [];
		const db = this.props.firebase.firestore();
		db.collection("User").doc(this.props.userID).get().then(result =>
		{
			this.setState({houseImageURL: result.data().houseURL, avatarImageURL: result.data().avatar})
		})
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
		this.props.switchPage('HouseView');
		this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
	}

	uploadHousePic = () =>
	{
		this.setState({dialogOpen: true, uploadingHouse: true})

	}

	uploadUserPic = () =>
	{
		this.setState({dialogOpen: true, uploadingAvatar: true})
	}

	handleFileChange =(files) =>
	{
		let handleImage = new HandleImage(firebase);
		this.setState({files: files, open: false})
		this.state.uploadingHouse ?
			handleImage.uploadImage(files[0], this.props.userID + 'house'):
			handleImage.uploadImage(files[0], this.props.userID + 'avatar')

		var storageRef = this.props.firebase.storage().ref();

		storageRef.child(this.props.userID + (this.state.uploadingHouse ? 'house' : 'avatar')).getDownloadURL().then(result =>
		{this.state.uploadingHouse ?
			this.setState({houseImageURL: result})
		:
			this.setState({avatarImageURL: result});
			this.updateFirebase();
		})
		this.setState({uploadingAvatar: false, uploadingHouse: false})
	}

	updateFirebase = () =>
	{
		const db = this.props.firebase.firestore();
		db.collection("house").doc(this.props.user.houseID).update(
			{
				imageURL: this.state.houseImageURL,
			}
		);
		db.collection("User").doc(this.props.user.id).update(
			{
				houseURL: this.state.houseImageURL,
				avatar: this.state.avatarImageURL,
			}
		);

	}

	render()
	{
		const { classes, userHouse } = this.props;
		const user = this.props.user();
		const {dialogOpen} = this.state;
		const { houseImageURL, avatarImageURL} = this.state;
		
		
		if(this.isValid(this.state.avatarImageURL))
		{

		}



		return (
			<div className="peak" style={{ height: '100%' }}>
				<DropzoneDialog
					open={dialogOpen}
					onSave={this.handleFileChange}
					acceptedFiles={['image/jpeg']}
					onClose={() => this.setState({dialogOpen: false})}
					filesLimit={1}/>
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

							{
								this.isValid(this.state.houseImageURL) ?
									<img src={this.state.avatarImageURL}></img>
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
								this.isValid(this.state.avatarImageURL) ?
									<img src={this.state.avatarImageURL}></img>
									:
									<div className="picture-subcontainer" onClick={this.uploadUserPic}>
										<p>Upload Picture</p>
									</div>
							}

							

						</div>


					</div>

					<div className="description-container">
						<h4>My House Description:</h4>
						<textarea className="description-box" type=""></textarea>
						<br></br>
						<button>Update</button>
					</div>


					<hr></hr>

					<div>
						<h4>Comments:</h4>
						<div className="comments_container">

						</div>
					</div>

				</div>
			</div>

		)
	}


}

export default withStyles(styles)(MainPage);