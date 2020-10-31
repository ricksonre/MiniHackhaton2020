import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background2 from "../back_test.png";
import background from "../back.png";
import {Button} from "@material-ui/core";


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

class MainPage extends Component
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

	render()
	{

		const {classes} = this.props;
		
		return(
			<div className="App" style={{backgroundImage: background2}}>
				<p>asdfffffffffffffff</p>
			</div>
		)
	}


}

export default withStyles(styles)(MainPage);