import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import { Button } from "@material-ui/core";
import "../homeview.css";




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

class Leaderboard extends Component
{
    constructor(props)
    {
        super(props);
        //this.state is accessible with this.state.attribute
        //it is settable with this.setState({attribute: value})
        //will only override attribute and no other attributes
        this.state = {
            names: 'Carter, Ren, Aedan, Rick',
            showHidden: false,
            users: null,
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

    toggleShow = () =>
    {
        this.setState({ showHidden: !this.state.showHidden })
    }

    pageSwitch = (page) =>
    {
        console.log("WHYYYYYYYYYYYYYY")
        console.log(page)
        this.props.switchPage(page)
    }
    componentDidMount()
    {

        console.log(1);

        let users = []
        const db = this.props.firebase.firestore()
        db.collection('User').orderBy("candyCount", "desc").limit(4).get().then((result) =>
        {
            result.forEach(doc => { users.push((<div onClick={() => this.props.setHouseID(doc.id)} className="comment"><h4>{doc.data().name}</h4><p>{doc.data().candyCount + " Candies!"}</p></div>)) });
            this.setState({ users: users });
        });

        this.setState({ users: users });

    }

    render()
    {
        //render is what will be called any time there is an update to the component
        //only do things that are necessary here as it causes a performance hit
        const { classes } = this.props;
        const { users } = this.state;

        console.log(this.state);

        //classes.styleSheetItem will give you the class from the style sheet
        //className={classes.styleSheet} will assign a class to the style sheet to the component
        return (
            <div className="peak" style={{ height: '100%' }}>
                <div className="content-body">

                    <div className="header">
                        <span className={classes.buttonStyle} onClick={() => this.props.switchPage('MainPage')}>
                            My Home
									</span>
                    </div>

                    <h3>Leaderboard! Highest candy counts!</h3>
                    <div className="comments_container">
                        {users}
                    </div>
                </div>

            </div>

        )
    }


}

export default withStyles(styles)(Leaderboard);