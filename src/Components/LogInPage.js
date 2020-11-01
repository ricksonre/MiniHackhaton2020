import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import back from "../ttest.png";
import gbn from "../gsignn.png";
import gbp from "../gsignp.png";
import {Button} from "@material-ui/core";
import $ from 'jquery'


const styles = (theme) =>
	({
		style1EX: 
		{
			someCSS: 'value',
			anotherCSS: 'value',
		},
		buttonStyle: 
		{
			cursor: 'pointer'
		}
	})

class LogInPage extends Component
{
	constructor(props) 
	{
		super(props);
		//this.state is accessible with this.state.attribute
		//it is settable with this.setState({attribute: value})
		//will only override attribute and no other attributes
		this.state={
			names: 'Carter, Ren, Aedan, Rick',
			showHidden: false,
		}
		
		this.button = [ gbn, gbp];
	}
	
	click_button(state)
	{
		if(state)
			$("#signin").attr("src", this.button[1] );
		else
			$("#signin").attr("src", this.button[0] );
			
	}
	
	gSignIn()
	{
		var provider = this.props.provider;

		var that = this;
		firebase.auth().signInWithPopup(provider)
				.then(function(result) 
				{
					// This gives you a Google Access Token. You can use it to access the Google API.
					var token = result.credential.accessToken;
					// The signed-in user info.
					var user = result.user;
					
					that.props.user(user);
					
					//getting specific user
					const db = that.props.firebase.firestore();
					const res = db.collection('User').doc(user["uid"]).get();
					
					res.then(result => 
					{
						if(result.data() == undefined)
						{
							db.collection('User').doc(user["uid"]).set(
							{
								avatar: null,
								name: user["displayName"],
								candyCount: 0,
								houseID: user["uid"],
							});

							db.collection('house').doc(user["uid"]).set(
								{
									"commentss": null,
									'url': "",
									'SpookyRating': user["displayName"],
									'userID': user["uid"],
									"imageURL": null,
									"houseURL": null
								});
						}
					});
					that.props.switchPage("MainPage");
					
				})
				.catch(function(error) 
				{
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  // The email of the user's account used.
				  var email = error.email;
				  // The firebase.auth.AuthCredential type that was used.
				  var credential = error.credential;
				  // ...
				  
				  console.log(error)
				});
				
				
	}

	render()
	{

		const {classes} = this.props;
		
		return(
			<React.Fragment>
			   <img src={back} style={{width: '100%', height: '100%'}} >
			   </img>
			   <button style={{margin: '0 0 0 0 ', padding: '0 0 0 0', border: "0", background: 'none',
							position: "fixed", left: "20%", top: "40%"}} 
						onClick={ ()=>{ this.gSignIn(); } }
						onMouseDown={ ()=> { this.click_button(true); }}
						onMouseUp={ ()=> { this.click_button(false); }}>
					<img id="signin" src={this.button[0]} style={{width:"100%", height:"100%"}}></img>
			   </button>

			</React.Fragment>
	
		)
	}


}

export default withStyles(styles)(LogInPage);