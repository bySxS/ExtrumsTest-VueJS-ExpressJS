const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')

const corsOptions  = {
    origin: `${config.get('urlSiteForCors')}`,//разрешить запросы с сайта
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express();

app.use(cors(corsOptions))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${config.get('urlSiteForCors')}`);
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use('/api/idea', require('./routes/idea.routes'));
app.use('/', require('./routes/home.routes'));



const PORT = config.get('port') || 5000;

async  function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    app.listen(PORT, () => console.log(`App started on port ${PORT}`));

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();