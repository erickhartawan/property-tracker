import { csv, arc, pie, scaleBand, scaleLinear, format } from 'd3';
import { compose } from "redux"
import { connect } from "react-redux"
import st from "./graphing.module.css"


const BarGraph = (props) => {
    var dat = props.apiResponse //data to be put inside bar graph
    const width = 1200; //width of chart
    const height = 700; // height of chart
    const margin = { top: 50, right: 40, bottom: 60, left: 200 }
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.right - margin.left
    const xAxisLabelOffset = 55;

    if (dat.data == undefined) {
        return (
            <pre>Loading...</pre> //placeholder for no data #ideally we want an empty graph#
        )
    } else {
        //Band scaling code 
        const yScale = scaleBand()
            .domain(dat.data.map(d => d.C_Date)) //create bars labelled by Contract Date
            .range([0, innerHeight])
            .padding(0.1)

        //Linear scaling (figuring out size of bars (price))
        const xScale = scaleLinear()
            .domain([0, props.maxPrice]) //size of 0 to the maximum price
            .range([0, innerWidth]) //from lowest point of graph to highest point

        return (
            <svg width={width} height={height}>
                <text className={st.title} x={innerWidth/2} y={30}>{props.address[0]} {props.address[1]}, {props.suburb}</text>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {xScale.ticks().map(tickValue => (
                        <g className={st.tick} key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
                            <line className={st.line} y2={innerHeight} />
                            <text y={innerHeight+20} style={{textAnchor:'middle'}}>{format(",d")(tickValue)}</text>
                        </g>
                    ))}
                    <text className={st.axisLabelY} x={-150} y={innerHeight/2} textAnchor="middle">Date Purchased</text>
                    {yScale.domain().map(tickValue => (
                        <g className={st.tick} key={tickValue} transform={`translate(0,${yScale(tickValue) + yScale.bandwidth()/2})`}>
                            <text x={-50}style={{textAnchor:'middle'}} >{tickValue}</text>
                        </g>
                    ))}
                    <text className={st.axisLabelX} x={innerWidth/2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">Price ($AUD)</text>
                    {dat.data.map(d => (
                        <rect
                            className={st.mark}
                            key={d.C_Date}
                            x={0}
                            y={yScale(d.C_Date)}
                            width={xScale(d.P_Price)}
                            height={yScale.bandwidth()}
                        >
                            <title>$ {format(",d")(d.P_Price)}</title>
                        </rect>
                    ))}
                    <line className={st.line} y1={innerHeight} y2={innerHeight} x2={innerWidth}/>
                    <line className={st.line} x1={0} y2={innerHeight}/>
                </g>
            </svg>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        apiResponse: state.apiResponse,
        maxPrice: state.maxPrice,
        address: state.address,
        suburb: state.suburb,
    }
}

const enhanced = compose(
    connect(mapStateToProps)
)

export default enhanced(BarGraph);