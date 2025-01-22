           
            const AxisLeft = ({ yScale, innerWidth, tickOffset }) => (
              <g className="y-axis">
                {yScale.ticks().map((tickValue) => (
                  <g
                    className="tick"
                    key={tickValue}
                    transform={`translate(0,${yScale(tickValue)})`}
                  >
                    <line x2={innerWidth} stroke="black" />
                    <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
                      {tickValue}
                    </text>
                  </g>
                ))}
              </g>
            );
            

const AxisBottom = ({ xScale, innerHeight, tickOffset }) => (
    <g className="x-axis" transform={`translate(0,${innerHeight})`}>
      {xScale.ticks().map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(${xScale(tickValue)},0)`}
        >
          <line y2={-innerHeight} stroke="black" />
          <text style={{ textAnchor: "middle" }} dy=".71em" y={tickOffset}>
            {d3.timeFormat("%b %Y")(tickValue)}
          </text>
        </g>
      ))}
    </g>
  );

            const Bars = ({ binnedData, xScale, yScale, innerHeight, fill }) => (
                <g className="bars">
                  {binnedData.map((bin, index) => (
                    <rect
                      className="bar"
                      key={index}
                      x={xScale(bin.x0)}
                      y={yScale(bin.y)}
                      width={xScale(bin.x1) - xScale(bin.x0)}
                      height={innerHeight - yScale(bin.y)}
                      fill={fill} 
                    />
                  ))}
                </g>
              );
const yAxisLabelOffset = 30;
const margin = { top: 0, right: 30, bottom: 20, left: 45 };

// TODO 4.1: brush extent setter as parameter
const Histogram = ({width, height, data}) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yValue = (d) => d["Total Number of Dead and Missing"];
    const xValue = (d) => d["Reported Date"];

    const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();	
    // TODO 4.2: Memoization for scale
    
    const binnedData = d3
    .bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(...xScale.domain()))(data)
    .map((bin) => ({
      x0: bin.x0,
      x1: bin.x1,
      y: d3.sum(bin, yValue),
    }));
    // TODO 4.2: Memoization for the binned data
    
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(binnedData, (bin) => bin.y)])
    .range([innerHeight, 0]);

    // TODO 4.2: Memoization for scale
    
    // TODO 4.1: D3 provides a horizontal brush object called d3.brushX that can be manipulated interactively. The brush 
    // 			 element itself is a part of the DOM, i.e., it is a graphical element.  For manipulation of DOM elements 
    // 			 through JSX, we need a reference to them. use React.useRef() to create a const brushRef
    // TODO 4.1: When loading the data we used React.useEffect to ensure that the code was only executed once and performing
    // 			 side effects. We want do the same here to setup the brush and create a side effect of the brush which will 
    // 			 call the setter of brush extent that we passed in earlier.
    // TODO 4.1: the useEffect function requires a list of dependencies. Think about what variables the function depends on.
        // TODO 4.1: setup the brush using d3.brushX() and set its extent. assign it to a variable called brush
        // TODO 4.1: connect the brush with the group element by calling brush() on the group element (use d3.select())
        // TODO 4.1: add an event listener to the brush which listens for the "brush end" event. inside set the brush extent. 
        //  		 You have to invert the selection by mapping the selection using xScale.invert
       
    return (
        <>
            <rect width={width} height={height} fill="white"  />
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickOffset={5} />
                <Bars
                binnedData={binnedData}
                xScale={xScale}
                yScale={yScale}
                innerHeight={innerHeight}
                fill="#137B80"
                />
                <text
                className="axis-label"
                transform={`translate(${-yAxisLabelOffset},${
                    innerHeight / 2
                }) rotate(-90)`}
                textAnchor="middle"
                style={{
                  fontWeight: 'bolder',
                  fontSize: 'x-small',
                  fontFamily: 'fangsong',
                }}
                >
                Total Dead and Missing
                </text>
            </g>
                // TODO 4.1: add a group element with attrbute ref being the previously defined reference to the brus
        </>
        )
};