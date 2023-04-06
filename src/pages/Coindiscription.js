import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext,useState,useEffect } from 'react';
import { mycontext } from '../Maincontext';
import { numberWithCommas } from '../ComponentsofHome/Carousel';
import axios from 'axios';
import "../allcss/coindescription.css"
import { LinearProgress } from '@material-ui/core';
import Coinchart from './coinchart';
import { db } from '../firebas';
import { doc, setDoc } from 'firebase/firestore';
const Coindiscription = () => {
  const { id } = useParams();
  const { currency, symbol,user,watchlist,} = useContext(mycontext);
  const [singlecoininfo, setsinglecoininfo] = useState();
  const [flag,setflag] = useState(false);
  
  console.log(id);
  async function fetchsiglecoin(){
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    await setsinglecoininfo(data);
    setflag(true);
  }
  const coinexist = watchlist.includes(singlecoininfo?.id);
  useEffect(()=>{fetchsiglecoin()},[])
  console.log(singlecoininfo);
  //here we are creating refernce in firebase db called docref with inside watchlist folder we have document for every user withhis specific userid
  //we wiil use setDoc function which requires docref and value to be set we are storing object with key coins and keep on adding all coins which 
  //will be added to watchlist
  async function addtowatchlist(){
    const docref=doc(db,"watchlist",user.uid);
    try{
      await setDoc(docref,
        {coins: watchlist? [...watchlist,singlecoininfo.id]:[singlecoininfo.id]},{ merge: true })
    }
    catch(error){
      console.log(error);
    }
  }
  async function Removefromwatchlist(){
    const docref=doc(db,"watchlist",user.uid);
    try{
      await setDoc(docref,
        {coins: watchlist.filter((removeelemnt)=> removeelemnt!==singlecoininfo.id) },{ merge: true })
    }
    catch(error){
      console.log(error);
    }

  }

  if (!singlecoininfo) {
    // Show loading spinner or message when data is being fetched
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }
  return (
    <div className='maindiv'>
      <div className='sidediv'>
        <img className='infoimg' src={singlecoininfo?.image.large} alt="hi" width='150px'></img>
         <h1>{singlecoininfo?.name}</h1>
         <p className='alignstart sm'>{singlecoininfo.description.en.split(".")[0]}</p>
         <p className='alignstart'><span className='fl'>Rank : </span>{singlecoininfo?.market_cap_rank}</p>
         <p className='alignstart'><span className='fl'>Current Price : {symbol}</span>{numberWithCommas(
                singlecoininfo?.market_data.current_price[currency.toLowerCase()]
              )}</p>
         <p className='alignstart'><span className='fl'>Market Cap : {symbol} </span>{numberWithCommas(
                singlecoininfo.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M</p>
              {user? <button style={{marginTop: "30px",padding:"10px"}} onClick={coinexist ? Removefromwatchlist : addtowatchlist}>{coinexist?"Remove from Watchlist": "Add to Watchlist"}</button>:null}
              
      </div>
      <Coinchart singlecoininfo={singlecoininfo} />
    </div>
  )
}

export default Coindiscription
