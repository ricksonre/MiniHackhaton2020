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
            HousePic: null,
            value: '',
            userHouses: null,
            doneGettingComs: false,
        }
        //this.state is accessible with this.state.attribute
        //it is settable with this.setState({attribute: value})
        //will only override attribute and no other attributes

    }
    componentDidMount() {
        const db = this.props.firebase.firestore();
        let comments = [];
        let housePic = [];
        let userTemp=[];
        console.log(this.props.openHouse)
        db.collection('house').get().then((result) =>
        {
            result.forEach((doc, i) => { userTemp.push(doc.id) })
            this.setState({ userHouses: userTemp })
        });
        db.collection("house").doc(this.props.openHouse).collection('Comments').get().then((result) => {
            result.forEach(doc => {
                comments.push(<tr><h>{doc.data().user}</h><p>{doc.data().text}</p></tr>);
                this.setState({comments: comments});
            })
            this.setState({doneGettingComs: true})
        });

        db.collection("User").doc('ATwH5pTpJCNcXbUnazXZ').get().then((result) => {
            housePic.push(result.data() ? result.data().Avatar : false);
        });

    }


    toggleShow = () => {
        this.setState({showHidden: ! this.state.showHidden})
    }
    addComment = (event) => {
        event.preventDefault();
        const newComment=this.state.value;
        let coms = this.state.comments;
        this.setState({value: ''})
        if(newComment.length > 0)
        {
            try {
                const db = this.props.firebase.firestore()
                const res = db.collection("house").doc(this.props.openHouse).collection("Comments").add({
                    text: newComment,
                    user: this.props.user.displayName,
                });
                res.then(() => {
                    this.props.switchPage('MainPage');
                    this.props.switchPage('HouseView');
                })
            }
            catch (e) {
                console.log(e)
            }
        }

    }

    randomHouse = () =>
    {
        const houses = this.state.userHouses;
        this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);

    }

    handleChange = (event) =>
    {
        this.setState({value: event.target.value})
    }

    addLike =()=>
    {
        const db = this.props.firebase.firestore();
        db.collection('User').doc(this.props.openHouse).get().then(result => {
            const likes = result.data().candyCount +1;
            db.collection('User').doc(this.props.openHouse).update({
                candyCount: likes,
            })
        })
    }

    render()
    {
        //render is what will be called any time there is an update to the component
        //only do things that are necessary here as it causes a performance hit
        const {classes} = this.props;
        const {comments} = this.state;
        console.log(comments)
        //classes.styleSheetItem will give you the class from the style sheet
        //className={classes.styleSheet} will assign a class to the style sheet to the component

        if(!this.state.doneGettingComs)
        {return(<div/>)}

        return(
            <div className="App" style={{backgroundImage: background}}>
                <header className="App-header" >
                    <div className="header" style={{position: 'absolute', top: 0, width: '100%'}}>
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
                    <div style={{ marginTop: '10em'}}>
                        <img src = "House URL HERE" />
                        <img src = "Avata URL HERE"/>
                    </div>
                    <Button style={{backgroundColor: 'white', marginTop: '5em'}} onClick={() => this.addLike}>
                        Like this house
                    </Button>
                    <table>
                        <tr>
                    <div style={{marginTop: '10em'}}>
                        <h2 className={classes.hoverStyle}>Comment</h2>
                        <form onSubmit={this.addComment}>
                                <input style={{width: '20em', height: '3em'}} type="text" value={this.state.value} onChange={this.handleChange} />
                            <input type="submit" value="Submit"  style={{height: '3.5em', width: '5em', marginLeft: '1em'}}/>
                        </form>
                        <br/>
                    </div>
                        </tr>
                        {comments}
                    </table>
                </header>
            </div>
        )
    }


}


export default withStyles(styles)(HouseView);