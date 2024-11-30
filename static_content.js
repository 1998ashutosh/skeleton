
const Introduction = () => {

    const introText = "Explore the global impact of missing migrants through interactive visualizations.";
    const data = useData();

    return (
        <>
        
        <div className="introTitle">
                Description
                <br/>
            </div>

            <div className="intro" style={{ fontSize: '12px' }}>
                <i>
            {introText + " Data count is " + data?.length + " rows &  " + (data?.length ? Object.keys(data[0]).length : 0) + " columns"}
            </i>
            </div>
            <br></br>
        </>
        )
};


const projection = d3.geoNaturalEarth1();
const path = d3.geoPath().projection(projection);
const graticule = d3.geoGraticule();

const WorldGraticule = ({ width, height }) => {

    return (
        <g className="worldGraticule">
            
            <path d={path({ type: "Sphere" })}/>
            <path className="graticule" d={path(graticule())}/>
        </g>
    );
};


// --------------------------------------------------
// TODO 2.1 
// --------------------------------------------------

// the data we work on is composed of land and interiors (use destructuring)
const Countries = ({ 
    worldAtlas: {land, interiors}, 
}) => 
(
    // TODO 2.1: delete the following line
    //<div>Placeholder</div>
    // TODO 4.2: Memoization for land and interiors
    // TODO 2.1: create a group with class name countries for styling that wraps the following JS scope
        // TODO 2.1: enter a JS scope inside the group element (everything that follows will be in curly braces)
            // TODO 2.1: create a react fragment
                // TODO 2.1: inside the fragment enter another JS scope
                    // TODO 2.1: map the land features to path elements that draw the land masses (styling will make sure the paths are filled with the correct color)
                // TODO: 2.1: draw another path for the interiors
                <g className="countries">
                {
                    // React fragment to group the land and interiors paths
                    <>
                        {
                            // Map over the land features to create paths for each landmass
                            land.features.map((feature, i) => (
                                <path 
                                    key={`land-${i}`} 
                                    className="land" 
                                    d={path(feature)} 
                                />
                            ))
                        }
                        {
                            // Draw a single path for the interiors
                            <path 
                                className="interiors" 
                                d={path(interiors)} 
                            />
                        }
                    </>
                }
            </g>
            
);
