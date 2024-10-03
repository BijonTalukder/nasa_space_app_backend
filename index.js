const { default: axios } = require('axios');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send('Successful response.');
  });

  app.get('/exoplanet', async (req, res) => {
    try {
      
        const planetName = req.query.planetName || 'OGLE-TR-10 b'; 
        const stNphot = req.query.st_nphot || 0; 

    //   
        // const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars+where+pl_name+like+%27${encodeURIComponent(planetName)}%25%27+and+st_nphot%3E${stNphot}&format=json`;


        const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars+where+pl_name+like+%27%OGLE-TR-10%20b%25%27+and+st_nphot%3E0&format=json'
     
        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});
  app.listen(4000, () => console.log('Example app is listening on port 4000.'));