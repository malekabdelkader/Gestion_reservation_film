require('./db');
const express = require('express');

const film_router= require('./routers/film')
const seance_router= require('./routers/seance')
const reservation_router= require('./routers/reservation')

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())


app.use('/film',film_router);
app.use('/seance',seance_router);
app.use('/reservation',reservation_router);


    
app.listen(port, ()=> console.log('Server UP',port));