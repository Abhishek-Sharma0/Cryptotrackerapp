import React from 'react'
import axios from 'axios';
import { mycontext } from '../Maincontext';
import { TrendingCoins } from '../config/endpoints';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../allcss/causrosel.css"
import AliceCarousel from 'react-alice-carousel';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const { currency, symbol } = useContext(mycontext);
    const [trending, settrending] = useState([]);
    const trendingfetch = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        settrending(data)
        // console.log(data);
    }
    useEffect(() => { trendingfetch() }, [currency])
    
    const items = trending.map((element) => {
        let profit = element?.price_change_percentage_24h >= 0;

        return (
            <Link to={`/coins/${element.id}`} className='cauroselitem'>
                <img src={element?.image} alt={element.name} height="80" style={{ marginBottom: 10 }} />
                <span>
                    {element?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {element?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(element?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
    const responsiven = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
    return (

        <div className='caurosel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsiven}
                items={items}
                autoPlay
            />
        </div>
    )
}

export default Carousel
