import React from 'react'
import { mycontext } from '../../Maincontext';
import { useContext } from 'react';
import { numberWithCommas } from '../Carousel';
import { AiFillDelete } from "react-icons/ai";
import { icons } from 'react-icons';
import { db } from '../../firebas';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import "../../allcss/sidebar.css"
const Watchlist = () => {
  const { currency, setcurrency, symbol,user,watchlist,coinlist} = useContext(mycontext);
  async function Removefromwatchlist(coin){
    const docref=doc(db,"watchlist",user.uid);
    try{
      await setDoc(docref,
        {coins: watchlist.filter((removeelemnt)=> removeelemnt!==coin.id) },{ merge: true })
    }
    catch(error){
      console.log(error);
    }

  }
  return (
    user? 
    (<div className='watchlistcontainer'>
      <h2 style={{fontSize: "20px",textAlign: "center"}}>Watchlist</h2>
      {coinlist.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="item">
                          <span style={{width: "60%"}}>{coin.name}</span>
                          <span style={{ display: "flex", justifyContent: "space-between" ,width: "32%",fontSize: "15px"}}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(0))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => Removefromwatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
    </div>):
    (<div></div>)
  )

  }
export default Watchlist
