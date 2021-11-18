//express
const express = require("express");
//sequelize
const sequelize = require("./config/connection");
//handlebars
const path = require("path");
const exhbhs = require("express-handlebars");
const hbs = exhbhs.create({});
//local modules
const routes = require("./controllers");

//Express initialization
const app = express();
const PORT = process.env.PORT || 3001;

//session setting
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new sequelizeStore({
		db: sequelize, //connection to store session into db. creates session table.
	}),
};

app.use(session(sess));

//handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
