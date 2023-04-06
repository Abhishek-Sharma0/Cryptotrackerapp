import React, { useEffect, useState } from 'react'
import { Typography, Container } from '@material-ui/core'
import "../allcss/Home.css"

import Carousel from '../ComponentsofHome/Carousel';
import Cointable from '../ComponentsofHome/Cointable';
const Home = () => {
    return (<>
        <div className='topcontent'>
            <Container className='container'>
                <div className='insidecontainer'>
                    <Typography variant='h1'>Crypto Tracker</Typography>
                    <Typography variant='h6'>Get All The Info Regarding Your Favorite Crypto Currency</Typography>
                    <Carousel />
                </div>
            </Container>
            
        </div>
        <Cointable />
    </>
    )
}

export default Home
