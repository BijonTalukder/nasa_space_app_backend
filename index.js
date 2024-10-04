const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
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

app.get('/getplanets', async (req, res) => {
    try {
      
        const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'
     
        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getsingleplanet/:id', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'
        var id = req.params.id;
        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars+where+objectid=${id}&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getdiscyearcount', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'

        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+disc_year+as+year,+count(*)+as+discoveries+from+pscomppars+group+by+disc_year+order+by+disc_year&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getdiscmethodcount', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'

        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+discoverymethod+as+name,+count(*)+as+value+from+pscomppars+group+by+discoverymethod&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getplanetscount', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'

        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+count(*)+from+pscomppars&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getnearestplanet', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'

        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,sy_dist+from+(select+objectid,pl_name,sy_dist+from+pscomppars+order+by+sy_dist+asc)+where+rownum=1&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});

app.get('/getfarthestplanet', async (req, res) => {
    try {
      
        //const apiUrl ='https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,pl_masse,pl_name,pl_orbper,sy_dist,st_logg+from+pscomppars+order+by+sy_dist+asc&format=json'

        const apiUrl =`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+objectid,pl_name,sy_dist+from+(select+objectid,pl_name,sy_dist+from+pscomppars+order+by+sy_dist+desc)+where+rownum=1&format=json`

        const response = await axios.get(apiUrl);

     
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the external API');
    }
});
//listen

  app.listen(4000, () => console.log('Example app is listening on port 4000.'));