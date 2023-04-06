import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebas';
import { doc, onSnapshot } from 'firebase/firestore';
import { CoinList } from './config/endpoints'
import axios from 'axios';
export const mycontext=createContext();
const Maincontext = ({children}) => {
    const [currency,setcurrency]=useState("INR");
    const [symbol,setsymbol]=useState("₹");
    const [user,setuser]=useState(null);
    const [watchlist,setwatchlist]=useState([]);
    const [coinlist, setcoinlist] = useState([]);
    const coinlistfetch = async () => {
      const { data } = await axios.get(CoinList(currency));
      console.log(await axios.get(CoinList(currency)));
      setcoinlist(data);
  }
// The user object will have the following properties:
// uid: The user's unique identifier.
// displayName: The user's display name.
// email: The user's email address.
// photoURL: The user's profile photo URL.
// If there is no signed-in user, the user object will be null.
    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,(user)=>{
        if(user) setuser(user);
        else setuser(null);
        return () => {
          unsubscribe();
        };
      })
  }, [])
    useEffect(()=>{
        if(currency==="INR") setsymbol("₹")
        else {setsymbol("$")}
    }, [currency])
    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        //Whenever there is a change to the "watchlist" document for the current user, the onSnapshot function will execute the callback function with a snapshot of the updated document. The coin parameter in the callback function will contain the updated document snapshot.
        const unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            setwatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
    
        // Cleanup function
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
    useEffect(() => { coinlistfetch() }, [currency]);
  return (
    <mycontext.Provider value={{currency,setcurrency,symbol,user,watchlist,setwatchlist,coinlist, setcoinlist}}>
        {children}
    </mycontext.Provider>
    
  )
}

export default Maincontext
