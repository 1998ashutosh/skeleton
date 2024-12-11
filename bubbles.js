// --------------------------------------------------
// TODO 2.2
// --------------------------------------------------
// TODO 2.2: define a function that accesses the number of dead and missing migrants from the data set called sizeValue
//const sizeValue =;
const sizeValue = d => d['Total Dead and Missing'];
// defines the maximum radius of a bubble
const maxRadius = 15;

const Bubbles = ({ 
    data,projection
}) => {
    const sizeScale = React.useMemo(() => {
        return d3.scaleSqrt()
            .domain([0, d3.max(data, sizeValue)])
            .range([0, maxRadius]);
    }, [data, sizeValue]);
    
    // TODO 4.2: Memoization for size scale
    // TODO 2.2: the area covered by a bubble should be scaled proportional to the sizeValue. define a sizeScale using d3.scaleSqrt or d3.scaleLinear (think about which one is a better fit)
    //const sizeScale = 
        // TODO 2.2: set the domain to the scale using the .domain function. the domain should start at zero and end at the maximum of the data (use sizeValue)
        // TODO 2.2: set the range to the scale using the .range function. the range should start at zero and end at maxRadius

    // TODO 2.2: return the bubbles svg definition
    return (
        // TODO 2.2 wrap everything that follows in a group element with className bubbleMarks
            // TODO 2.2: enter a JS scope
                // TODO 2.2: map the data to get each row and index
                    // TODO 2.2: use the projection to get the x and y coordinates from the coords
                    // TODO 2.2: return a circle with the key being the index, x and y the extracted coordinates and the radius passed through the sizeScale
        
        <g className="bubbleMarks">
        {data.map((d, i) => {
            const [x, y] = projection(d.coords);
            return (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={sizeScale(sizeValue(d))}
                />
            );
        })}
    </g>
        
    );
};