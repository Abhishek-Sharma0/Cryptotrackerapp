import React, { useContext } from 'react'
import { AppBar, Container, Select, MenuItem, Toolbar, Typography, MenuIcon, Button, InputLabel, IconButton, makeStyles, createTheme, ThemeProvider, FormControl, Modal } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { mycontext } from '../Maincontext';
import TransitionsModal from './Modal';
import Profile from './authcomponent/Profile';
import Sidebar from './authcomponent/Sidebar';
const Header = () => {
    const { currency, setcurrency, user } = useContext(mycontext);
    const usestyles = makeStyles(() => ({
        app: {
            backgroundColor: '#14161a',
            color: "white",
            minHeight: "5vh",
            boxShadow: "0px 0px 10px 0 white",
            padding: "20px",
            
        },
        title: {
            flex: "1",
            fontWeight: "bold",
            cursor: "pointer",
            color: "gold",
        },

    }))
    const navigate = useNavigate();
    const classes = usestyles();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: 'dark',
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position='static' color='transparent' className={classes.app}  >
                <Container>
                    <Toolbar>
                        <Typography variant='h6' className={classes.title} onClick={() => navigate("/")}>CryptoTracker</Typography>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label" style={{ marginLeft: 10 }}>{currency}</InputLabel>
                            <Select variant='outlined' color='white' style={{
                                marginRight: 15, width
                                    : 100
                            }} label="INR" value={currency} onChange={(e) => { setcurrency(e.target.value) }} >
                                <MenuItem value="INR">INR</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </Select>
                        </FormControl>
                        {user?<Sidebar />:<TransitionsModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
