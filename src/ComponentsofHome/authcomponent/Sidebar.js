import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { mycontext } from '../../Maincontext';
import { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import Watchlist from './Watchlist';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebas';
import { FiX } from "react-icons/fi";
import "../../allcss/sidebar.css"
const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    pic: {
        backgroundColor: "gold",
    },
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        height: "92%",
        position: "relative",
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
}));

export default function Sidebar() {
    const { user } = useContext(mycontext);
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <React.Fragment key="right">
                
                <div className={classes.root} id='root'>
                    <Avatar src={user.photoURL} className={classes.pic} onClick={toggleDrawer("right", true)} id="positioned" />
                </div>
                <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)} id="draw">
                    <div className={classes.container}>
                        <div className={classes.profile}>
                        <FiX style={{fontSize: "20px",position: "absolute",top: "15px",right: "15px",zIndex: "200"}} onClick={toggleDrawer("right", false)}/>
                            <Avatar
                                className={classes.picture}
                                src={user.photoURL}
                                alt={user.displayName || user.email}
                            />
                            <span
                                style={{
                                    width: "100%",
                                    fontSize: 25,
                                    textAlign: "center",
                                    fontWeight: "bolder",
                                    wordWrap: "break-word",
                                }}
                            >
                                {user.displayName || user.email}
                            </span>
                        </div>
                        <Watchlist />
                        <button style={{marginTop: "20px"}} onClick={()=>{signOut(auth);toggleDrawer("right", false);}}>Logout</button>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

