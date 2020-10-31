import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import firebase from 'firebase';
import background from "../back.png";
import {Button} from "@material-ui/core";
import MainPage from "./MainPage";

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
            comments: null,
            HousePic: null
        }
        //this.state is accessible with this.state.attribute
        //it is settable with this.setState({attribute: value})
        //will only override attribute and no other attributes

    }
    componentDidMount() {
        const db = this.props.firebase.firestore();
        let comments = [];
        let housePic = [];
        db.collection("house").doc('ATwH5pTpJCNcXbUnazXZ').collection('comments').get().then((result) => {
            result.forEach(doc => {
                comments.push(<tr><h>doc.data().userName</h><p>doc.data().comment</p></tr>);
                result.forEach(doc => {console.log(doc.data.Image)});
            })
        });

        db.collection("User").doc('ATwH5pTpJCNcXbUnazXZ').get().then((result) => {
            housePic.push(result.data() ? result.data().Avatar : false);
        });

    }


    toggleShow = () => {
        this.setState({showHidden: ! this.state.showHidden})
    }
    addComment = (newComment) => {
        if(newComment.length > 0)
        {
            const db = this.firebase.firestore()
            const res = db.collection("house").document('ATwH5pTpJCNcXbUnazXZ').collection("Comments").add({
                text: newComment,
                user: this.props.uid
            });
            return "";
        } else
        {
            return "Please Enter a comment...";
        }


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
                    <img src = "House URL HERE" />
                    <img src = "Avata URL HERE"/>
                    <table>
                        <tr>
                    <div className={classes.buttonStyle} style={{marginTop: '10em'}} onClick={() => document.getElementById("commentBox").value = this.addComment( document.getElementById("commentBox").value)}>
                        <h2 className={classes.hoverStyle}>Comment</h2>
                        <input type="text" id="commentBox" name="commentBox"/>
                    </div>
                        </tr>
                        <tr>
                            <h>Aedan</h>
                            <p>Cool House</p>
                        </tr>
                        <tr>
                            <h>Carter</h>
                            <p>dumb house</p>
                        </tr>
                        comments
                    </table>
                </header>
            </div>
        )
    }


}


export default withStyles(styles)(HouseView);