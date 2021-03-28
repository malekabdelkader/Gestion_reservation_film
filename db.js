const mongoose = require('mongoose');
            
mongoose.connect('mongodb+srv://malek:malek123@cluster0.dj8j4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser : true, useUnifiedTopology : true})
            .then(()=> console.log('DB connection success'))
            .catch( err => console.log('DB Failed !', err));