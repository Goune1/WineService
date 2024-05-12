const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


/* CONNECTION A MONGODB */
const loginCollection = require("./schemas/loginSchema")
const wineCollection = require("./schemas/wineSchema")

const DB_URL = "mongodb://goune:goune1407@ac-nef3pac-shard-00-02.0x9jwgi.mongodb.net:27017,ac-nef3pac-shard-00-01.0x9jwgi.mongodb.net:27017,ac-nef3pac-shard-00-00.0x9jwgi.mongodb.net:27017/WineApp?authSource=admin&replicaSet=atlas-tibrt3-shard-0&ssl=true";

async function connectToDatabase() {
    try {
      await mongoose.connect(DB_URL);
      console.log("Connecté à la base de données MongoDB");
    } catch (error) {
      console.error(`Impossible de se connecter à la base de données MongoDB: ${error}`);
    }
}

connectToDatabase()


// création de la db pour la session
const store = new MongoDBStore({
    uri: "mongodb://goune:goune1407@ac-nef3pac-shard-00-02.0x9jwgi.mongodb.net:27017,ac-nef3pac-shard-00-01.0x9jwgi.mongodb.net:27017,ac-nef3pac-shard-00-00.0x9jwgi.mongodb.net:27017/WineApp?authSource=admin&replicaSet=atlas-tibrt3-shard-0&ssl=true",
    collection: "Sessions"
});

app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
);



app.post('/api/addWine', async (req, res) => {
    const formData = req.body;
    // Traitez les données du formulaire ici (par exemple, enregistrez-les dans une base de données)
    const data = {
        castle: formData.castle,
        year: formData.year,
        quantity: formData.quantity
    }

    const wineData = await wineCollection.insertMany(data); 
});

app.post('/api/signup', async (req, res) => {
  const formData = req.body;
  // Traitez les données du formulaire ici (par exemple, enregistrez-les dans une base de données)
  const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
  }

  const user = await loginCollection.findOne({email: formData.email})

  if (user) {
    req.session.error("Cet utilisateur existe déjà")
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(formData.password, saltRounds)
  data.password = hashedPassword

  const userdata = await loginCollection.insertMany(data)

  req.session.isLoggedIn = true;
  res.send('Correctly Logged IN')
});

  


// CONNEXION AU SERVEUR
const PORT = process.env.PORT || 3001; // Utilise le port dynamique attribué par le fournisseur d'hébergement ou le port 3000 par défaut en local

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur  http://localhost:${PORT}`);
});
