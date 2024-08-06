const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./info.json');

app.use(cors());

app.get('/api/appliances', (req,res) => {
    console.log('Sending data:', data);  // Add this line to log the data being sent
   console.log('Number of appliances:', data.appliances.length); 
   return res.json(data);
});

const PORT = process.env.PORT || 8895;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});