import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import Signup from './authcomponent/Signup';
import Login from './authcomponent/Login';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 450,
        width: 420,
    },
}));

export default function TransitionsModal() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        console.log(newValue+" "+"newvalue");
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <button type="button" onClick={handleOpen} style={{
                width: "80px",
                padding: "10px",
                backgroundColor: "rgba(241, 207, 11, 0.959)",
                borderRadius: "10px",
                border: "2px solid black"

            }} id='loginclickbtn'>
                Login
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="LOGIN"/>
                            <Tab label="SIGN UP" />
                            
                        </Tabs>
                        {value===0?<Login handleClose={handleClose} />:<Signup handleClose={handleClose} />}
                        
                        </>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}