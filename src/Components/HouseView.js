import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import {Button} from "@material-ui/core";
import MainPage from "./MainPage";


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

class HouseView extends Component {
    constructor(props) {
        super(props);
        this.state= {
            comments: null
        }
        //this.state is accessible with this.state.attribute
        //it is settable with this.setState({attribute: value})
        //will only override attribute and no other attributes

    }
    componentDidMount() {
        const db = this.props.firebase().firestore();
        let comments = [];
        db.collection("House").doc(this.props.uid).get().then((result) => {
            result.forEach(doc => {
                comments.push(<tr><h>doc.data().userName</h><p>doc.data().comment</p></tr>)
            })
        });

    }


    toggleShow = () => {
        this.setState({showHidden: ! this.state.showHidden})
    }

    render()
    {
        //render is what will be called any time there is an update to the component
        //only do things that are necessary here as it causes a performance hit
        const {classes} = this.props
        const {comments} = this.props.comments
        //classes.styleSheetItem will give you the class from the style sheet
        //className={classes.styleSheet} will assign a class to the style sheet to the component

        return(
            <div className="App" style={{backgroundImage: background}}>
                <header className="App-header" >
                    <Button text={"Comment"} style={{color: 'blue', width: '10em',height: '5em', border: '2px solid white'}} onClick={() => this.props.switchPage('House')}/>
                    <table>
                        <tr>
                            <h>Aedan</h>
                            <p>Cool House</p>
                        </tr>
                        <tr>
                            <h>Carter</h>
                            <p>dumb house</p>
                        </tr>
                    </table>
                </header>
            </div>
        )
    }


}


export default withStyles(styles)(MainPage);