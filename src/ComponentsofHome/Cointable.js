import React from 'react'
import { CoinList } from '../config/endpoints'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { mycontext } from '../Maincontext';
import { Container, TextField, Typography } from '@material-ui/core';
import { withStyles, makeStyles, ThemeProvider,createTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Pagination } from '@material-ui/lab';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../allcss/table.css"
import { numberWithCommas } from './Carousel';
import { useNavigate } from 'react-router-dom';
const Cointable = () => {
    const { currency, setcurrency, symbol,coinlist,setcoinlist } = useContext(mycontext);
    const [trending, settrending] = useState([]);
    const [search, setsearch] = useState([]);
    const [page, setPage] = useState(1);
    const useStyles = makeStyles({
        row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          fontFamily: "Montserrat",
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "gold",
          },
        },
      });
    
      const classes = useStyles();
    const Navigate=useNavigate();
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });
    
    function handlechange() {
        return coinlist.filter((coin) => {
            return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        })

    }
    


    // useEffect(()=>{console.log(search)},[search]) 
    return (
        <ThemeProvider theme={darkTheme}>
        <Container>
            <div className='alltablecontent'>
                <Typography style={{ textAlign: "center" }} variant="h3">Cryptocurrency Prices by Market Cap</Typography>
                <TextField label="Search for a Cryptocurrency here" className='textfeild'
                    variant="outlined" color='white' onChange={(e) => { setsearch(e.target.value) }}></TextField>
            </div>
            <TableContainer component={Paper} style={{ marginTop: "40px", backgroundColor: "black", color: "white" }}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead style={{ backgroundColor: "gold" }}>
                        <TableRow className='mainrow'>
                            {["Coin", "Price", "24h Change", "Market cap"].map((element) => {
                                return <TableCell id='tablereow' key={element} style={{color: "black",fontSize: "25px"}}>{element}</TableCell>
                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handlechange().slice((page-1)*10,(page-1)*10+10).map((row) => {
                            const profitt = row.price_change_percentage_24h > 0;
                            return(
                            <TableRow key={row.name} onClick={()=>{Navigate(`/coins/${row.id}`)}} >
                                <TableCell component="th" scope="row" style={{ display: "flex", gap: "20px", color: "white" }} className='rowitem'>
                                    <img src={row.image}></img>
                                    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                        <span style={{ fontSize: "25px", fontWeight: "700", textTransform: "uppercase" }}>{row.symbol}</span>
                                        <span style={{ fontsize: "16px" }}>{row.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row" style={{ color: "white" }}>
                                    <span style={{ fontsize: "16px" }}>{symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}</span>
                                        </TableCell>
                                <TableCell component="th" scope="row" style={{ color: "white" }}>
                                    <span style={{ fontsize: "16px", color: profitt > 0 ? "rgb(14, 203, 129)" : "red",}}>
                                        {profitt&& "+"}
                                        {row.price_change_percentage_24h}
                                    </span>
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ color: "white" }}>
                                    <span style={{ fontsize: "24px"}}>
                                        {symbol}&nbsp;
                                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                    </span>
                                    </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
          count={(handlechange()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        </Container>
        </ThemeProvider>
    )
}

export default Cointable;
