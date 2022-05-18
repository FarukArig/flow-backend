const path = require("path");
// load dependencies
const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressHbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors());

//Loading Routes
const webRoutes = require("./routes/web");
const sequelize = require("./config/database");

env.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// required for csurf
/*app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  	cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new SequelizeStore({
    	db: sequelize,
    	table: "sessions",
    }),
}));
*/

app.use((req, res, next) => {
    next();
});

app.engine(
    "hbs",
    expressHbs({
        layoutsDir: "views/layouts/",
        defaultLayout: "web_layout",
        extname: "hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(webRoutes);

sequelize
    //.sync({force : true})
    .sync()
    .then(() => {
        app.listen(process.env.PORT);
        //pending set timezone
        console.log("App listening on port " + process.env.PORT);
    })
    .catch((err) => {
        console.log(err);
    });
