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

function isValid(obj)
{
    if (typeof obj == 'undefined' || obj == undefined || obj.length == 0)
        return false;

    return true;
}

class HouseView extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            comments: null,
            HousePic: null,
            value: '',
            userHouses: null,
            doneGettingComs: false,
            hasLiked: false,
        }
        //this.state is accessible with this.state.attribute
        //it is settable with this.setState({attribute: value})
        //will only override attribute and no other attributes

    }
    componentDidMount()
    {
        this.setState({comments: []})
        const db = this.props.firebase.firestore();
        let comments = [];
        let housePic = [];
        let userTemp = [];
        const user = this.props.user();


        db.collection('house').get().then((result) =>
        {
            result.forEach((doc, i) => { userTemp.push(doc.id) })
            this.setState({ userHouses: userTemp })
            db.collection("User").doc(this.props.openHouse).get().then((data) =>
            {
                let houseURL;
                let AvatarURL;
                try{
                    houseURL = data.data()["houseURL"];
                    AvatarURL = data.data()["avatar"];
                }
                catch (e) {
                    this.randomHouse();
                    this.componentDidMount()
                }


                if (houseURL === undefined || AvatarURL === undefined)
                    this.randomHouse();

                db.collection("house").doc(this.props.openHouse).collection('Comments').get().then((result) =>
                {
                    result.forEach(doc =>
                    {
                        comments.push(
                            <div className="comment">
                                <h4>{doc.data().user}</h4><p>{doc.data().text}</p></div>);
                        this.setState({ comments: comments });
                    })
                    this.setState({ doneGettingComs: true })
                });

                this.setState({ houseURL: houseURL, avatarURL: AvatarURL });
            })
        });
        
        db.collection("User").doc('ATwH5pTpJCNcXbUnazXZ').get().then((result) =>
        {
            housePic.push(result.data() ? result.data().Avatar : false);
        });

    }


    toggleShow = () =>
    {
        this.setState({ showHidden: !this.state.showHidden })
    }
    addComment = (event) =>
    {
        event.preventDefault();
        const newComment = this.state.value;
        let coms = this.state.comments;
        this.setState({ value: '' })
        if (newComment.length > 0)
        {
            try
            {
                const db = this.props.firebase.firestore()
                const user = this.props.user();
                console.log(user.displayName)
                const res = db.collection("house").doc(this.props.openHouse).collection("Comments").add({
                    text: newComment,
                    user: user.displayName,
                });
                res.then(() =>
                {
                    this.props.switchPage('MainPage');
                    this.props.switchPage('HouseView');
                })
            }
            catch (e)
            {
                console.log(e)
            }
        }

        this.setState({doneGettingComs: false})
        this.componentDidMount()

    }

    randomHouse = () =>
    {
        this.setState({ doneGettingComs: false })
        const houses = this.state.userHouses;
        this.props.setHouseID(houses[Math.floor(Math.random() * houses.length)]);
        this.componentDidMount();

    }

    handleChange = (event) =>
    {
        this.setState({ value: event.target.value })
    }

    addLike = () =>
    {
        if (this.state.hasLiked)
            return;

        const db = this.props.firebase.firestore();

        db.collection('User').doc(this.props.openHouse).get().then(result =>
        {

            const likes = result.data().candyCount + 1;
            db.collection('User').doc(this.props.openHouse).update({
                candyCount: likes,
            })
        })
        this.setState({ hasLiked: true })
    }

    render()
    {

        const { classes } = this.props;
        const { comments } = this.state;
        console.log(comments)
        const { houseURL, avatarURL } = this.state;

        if (!this.state.doneGettingComs)
        {
            return (
                <div className="peak" style={{ height: '100%' }}>
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
                        <div className="pictures-container">

                            <div className="picture-container">
                                <h4>
                                    My House Picture
							</h4>
                                <div className="picture-subcontainer">
                                    <p>X</p>
                                </div>
                            </div>

                            <div className="picture-container">

                                <h4>
                                    My Costume
							</h4>



                                <div className="picture-subcontainer">
                                    <p>X</p>
                                </div>






                            </div>


                        </div>



                        <Button style={{ backgroundColor: 'white', marginTop: '5em' }} onClick={() => this.addLike()}>
                            Give this house a candy!
                    </Button>

                        <br></br>
                        <hr></hr><br></br>

                        <div className="description-container">
                            <h2 className={classes.hoverStyle}>Comment</h2>
                            <form onSubmit={this.addComment} >
                                <input type="text" value={this.state.value} className="description-box" onChange={this.handleChange} />
                                <input type="submit" value="Submit" className="submit-button" />
                            </form>
                            <br />
                        </div>
                        <div className="comments_container">

                        </div>


                    </div>
                </div>
            )
        }

        return (
            <div className="peak" style={{ height: '100%' }}>
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


                    <div className="pictures-container">

                        <div className="picture-container">
                            <h4>
                                My House Picture
							</h4>

                            {
                                isValid(this.state.houseURL) ?
                                    <img className="profile_image" src={this.state.houseURL}></img>
                                    :
                                    <div className="picture-subcontainer">
                                        <p>X</p>
                                    </div>
                            }


                        </div>

                        <div className="picture-container">

                            <h4>
                                My Costume
							</h4>

                            {

                                isValid(this.state.avatarURL) ?
                                    <img className="profile_image" src={this.state.avatarURL}></img>
                                    :
                                    <div className="picture-subcontainer">
                                        <p>X</p>
                                    </div>

                            }




                        </div>


                    </div>



                    <Button style={{ backgroundColor: 'white', marginTop: '5em' }} onClick={() => this.addLike()}>
                        Give this house a candy!
                    </Button>

                    <br></br>
                    <hr></hr><br></br>

                    <div className="description-container">
                        <h2 className={classes.hoverStyle}>Comment</h2>
                        <form onSubmit={this.addComment} >
                            <input type="text" value={this.state.value} className="description-box" onChange={this.handleChange} />
                            <input type="submit" value="Submit" className="submit-button" />
                        </form>
                        <br />
                    </div>
                    <div className="comments_container">
                        {comments}
                    </div>


                </div>
            </div>
        )
    }


}


export default withStyles(styles)(HouseView);