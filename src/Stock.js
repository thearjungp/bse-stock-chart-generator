import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            symbol : 'TCS',
            tempSymbol : '',
            data : []
        }
    }


    componentDidMount()
    {
        this.fetchStock(this.state.symbol);
    }

    fetchStock(symbol)
    {
        const API_KEY = '3PVP2CLKHM97YR8F';

        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + symbol + '.BSE&interval=5min&outputsize=compact&apikey=' + API_KEY;

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];


        fetch(API_Call)
        .then((response)=>{
            return response.json();
        })
        .then((resp_data)=>{
            // console.log(data);
            for(var key in resp_data['Time Series (Daily)'])
            {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(resp_data['Time Series (Daily)'][key]['4. close'])
            }

            let newData = [
                {
                    x: stockChartXValuesFunction,
                    y: stockChartYValuesFunction,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'green'},
                },
            ]

            // console.log(stockChartXValuesFunction);
            // console.log(stockChartYValuesFunction);


            this.setState({
                data:newData
            },()=>{
                console.log(this.state)
            })




        })

    }

    typeStock(value)
    {
        this.setState({
            tempSymbol : value
        })
        // console.log(this.state.tempSymbol)
    }

    changeSymbol()
    {

        this.setState({
            symbol : this.state.tempSymbol,
            tempSymbol : ''
        }, ()=>{
            this.fetchStock(this.state.symbol)
        })
    }


    render()
    {
        return(
            <div>
                <h1>Stock Market</h1>
                <div>
                    <p>Enter Symbol</p>
                    <input type="text" value={this.state.tempSymbol} onChange={(e) => this.typeStock(e.target.value)} name="symbol"></input>
                    <button onClick={() =>this.changeSymbol()}>Submit</button>
                </div>
                <div>
                <Plot
                    data={this.state.data}
                    layout={ {width: 1080, height: 600, title: this.state.symbol} }
                />
                </div>
            </div>
        )
    }
}

export default Stock;