// the URL where the world atlas data is downloaded from
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

// place data reading logic in a hook (hooks start with 'use')
const useWorldAtlas = () => {
    // this creates a state that returns a the data (represents the state) and
    // a function that can be used to set the data (state)
    // the state is initially null which tells the user that the data has no yet been loaded
    const [data, setData] = React.useState(null);

    // useEffect ensures that the data is only loaded once. if it was loaded before the function
    // is not executed again
    React.useEffect(() => {
        // using d3's json function we can download the json from the URL
        // when the download has finished the function will be executed
        d3.json(jsonUrl).then(topology => {
            // grab the countries and land masses from the topoJson file
            const { countries, land } = topology.objects;
            // this sets the data to the state defined before above
            setData({
                // convert the topoJson land to geoJson land using "feature(...)"
                land: topojson.feature(topology, land),
                // extract countries that do not face water
                interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
            });
        });
    }, []);
    // with the useState and useEffect combination this function (when called repeatedly) will in the beginning
    // always return null (the data) until the download was finished and the data set. Then the same data will
    // be returned and no additional downloads are necessary.
    return data;
};

// the URL where the missing migrants data is downloaded from
const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

const row = d => {
    d.coords = d['Location Coordinates'] ? d['Location Coordinates'].split(',').map(value => +value).reverse() : [];
    d['Total Dead and Missing'] = +d['Total Dead and Missing'];
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
};

const useData = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvUrl, row).then(fetchedData => {
            setData(fetchedData);
        });
    },[]);
    return data;
}; 
