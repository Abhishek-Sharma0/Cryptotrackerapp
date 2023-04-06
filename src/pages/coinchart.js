import { CircularProgress } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react'
import { HistoricalChart } from '../config/endpoints';
import { mycontext } from '../Maincontext';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import "../allcss/coindescription.css"
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
const Coinchart = ({ singlecoininfo }) => {
  console.log(singlecoininfo + " " + "chart");
  const [days, setdata] = useState(1);
  const [historicalchartinfo, setchartinfo] = useState();
  const { currency, setcurrency, symbol } = useContext(mycontext);
  const [flag, setflag] = useState(false);
  async function fetchhistchartinfo() {
    const { data } = await axios.get(HistoricalChart(singlecoininfo.id, days, currency));
    setflag(true);
    setchartinfo(data.prices);

  }
  useEffect(() => { fetchhistchartinfo() }, [days,currency]);
  console.log(historicalchartinfo );
  return(
  <div className='chartdiv'>
    {!historicalchartinfo | flag === false ? (
      <CircularProgress
        style={{ color: "gold" }}
        size={250}
        thickness={1}
      />
    ) : (
      <>
        <Line
          data={{
            labels: historicalchartinfo.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalchartinfo.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }} style={{height: "70%",color: "white"}} className="chart"
        />
      </>
      
    )
    }
    <div className='button' style={{display: "flex",width
  : "70%",justifyContent: "space-around",alignItems: "center",margin: "auto"}}>
      {[1,30,90,365].map((noofdays)=>{
          return <button className={`button${noofdays} nrmbutton`} style={{padding: "15px"}} 
          onClick={()=>{setdata(noofdays)}}>{noofdays} Days
          </button>
      })}
    </div>
  </div>
  )
}

export default Coinchart;
