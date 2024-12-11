// --------------------------------------------------
// TODO 2.2
// --------------------------------------------------

// TODO 2.2: define a function that accesses the number of dead and missing migrants from the data set called sizeValue
const sizeValue = d => d['Total Dead and Missing'];
// defines the maximum radius of a bubble
const maxRadius = 15;

const Bubbles = ({data, projection}) => {
    
    // TODO 4.2: Memoization for size scale
    // TODO 2.2: the area covered by a bubble should be scaled proportional to the sizeValue. define a sizeScale using d3.scaleSqrt or d3.scaleLinear (think about which one is a better fit)
    const sizeScale = d3.scaleSqrt()
        // TODO 2.2: set the domain to the scale using the .domain function. the domain should start at zero and end at the maximum of the data (use sizeValue)
        .domain([0, d3.max(data, sizeValue)])
        // TODO 2.2: set the range to the scale using the .range function. the range should start at zero and end at maxRadius
        .range([0, maxRadius])

    // TODO 2.2: return the bubbles svg definition
    return (
        // TODO 2.2 wrap everything that follows in a group element with className bubbleMarks
        <g className = "bubbleMarks">
            // TODO 2.2: enter a JS scope
                // TODO 2.2: map the data to get each row and index
                    // TODO 2.2: use the projection to get the x and y coordinates from the coords
                {data.map((d, i) => {
                    const [x, y] = projection(d.coords);

                    // TODO 2.2: return a circle with the key being the index, x and y the extracted coordinates and the radius passed through the sizeScale
                    return(
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={sizeScale(sizeValue(d))}
                            fill="rgba(30, 144, 255, 0.6)"
                            stroke="black"
                            strokeWidth={0.5}
                        ></circle>
                    )
                })}

        // TODO 2.2: delete the following line
        // <div>Placeholder</div>
        </g>
    );
};