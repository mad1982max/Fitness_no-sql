const mongoose = require('mongoose');
const express = require('express');
//const expressValidator = require('express-validator'); //temp not use
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const https = require('https');

const localConfig = require('./config/localhost.config');
const mongoConfig = require('./config/mongo.config');
const sslConfig = require('./config/ssl.config');
const service = require('./services/logger.service');
const MyErrors = require('./services/error.service');

//routes
const adminRoutes = require('./routes/admin.routes');
const clientRoutes = require('./routes/clients.routes');
const exRoutes = require('./routes/ex.routes');
const coachRoutes = require('./routes/coach.routes');
const cardsRoutes = require('./routes/cards.routes');
const recRoutes = require('./routes/recs.routes');
const planRoutes = require('./routes/plans.routes');

const tokenVerif = require('./middleware/tokenVerif.mw');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(expressValidator()); //temp not use

app.use(helmet());
app.use(morgan('combined'));
app.use(service.handleLogger);

app.use('/admin', adminRoutes);//jwt

app.use('/clients', tokenVerif.verifAdmin, clientRoutes);
app.use('/ex', exRoutes);
app.use('/coaches', tokenVerif.verifAdmin, coachRoutes);
app.use('/cards', tokenVerif.verifAdmin, cardsRoutes);
app.use('/recs', recRoutes);
app.use('/plans', planRoutes);

const connection = () => {
    mongoose.connect(`mongodb://mongo:${mongoConfig.localhost}/${mongoConfig.dbName}`, mongoConfig.options);
}
connection();

mongoose.connection.on('open', () => {
    const server = https.createServer(sslConfig, app);
    server.listen(localConfig.server.port, () => console.log(`****** port: ${localConfig.server.port} is listening`));
    console.log('------ mongodb connected');
});

mongoose.connection.on('error', (err) => {
    this.attempts = this.attempts || 1;
    console.log(`------ mongodb error: attempt ${this.attempts}`);
    if(this.attempts++ < 3) {
        setTimeout(connection, 2000);
    } else {
        console.log('EXIT: failed to connect to server');
        process.exit(1);
    }
});

app.use(MyErrors.error404);
app.use(MyErrors.errorLogger);
app.use(MyErrors.errorHandler);
