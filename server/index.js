const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


/* CONNECTION A MONGODB */
const loginCollection = require("./schemas/loginSchema")
const WineList = require("./schemas/wineSchema");
const consoCollection = require("./schemas/ConsoSchema");

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

app.get('/', (req, res) => {
  res.send("yo les boyz")
})


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
    return res.status(400).json({ message: "Cet utilisateur existe déjà !" });
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(formData.password, saltRounds)
  data.password = hashedPassword

  const userdata = await loginCollection.insertMany(data)

  req.session.isLoggedIn = true;


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'goune.ledreo@gmail.com', // Adresse e-mail Gmail
        pass: 'ytij ijwl esem odwy ' // Mot de passe Gmail
    }
  });

  // Options du mail
  const mailOptions = {
      from: "WineService",
      to: formData.email,
      subject: "Bienvenue chez nous !",
      text: `Bonjour et bienvenue ${req.body.username}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
      }
  })

  res.status(200).json({ message: "Correctly Logged IN", user: data });
});

app.post("/api/login", async (req, res) => {
  const formData = req.body;

  const data = {
    email: formData.email,
    password: formData.password
  }

  const user = await loginCollection.findOne({ email: data.email })

  if (!user) {
    return res.status(400).json({ message: "Cet utilisateur n'existe pas !" });
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect !" });
  }

  const dataSent = {
    username: user.username,
    email: data.email
  }


  req.session.isAuth = true;
  res.status(200).json({ message: "Correctly Logged IN", user: dataSent });
})

app.post('/api/search', async (req, res) => {
  const formData = req.body
  const email = formData.email

  const user = await WineList.find({ email })

  res.status(200).json({ message: "Correctly fetched", wines: user });
})


app.post('/api/addWine', async (req, res) => {
  try {
    const { email, castle, year, quantity, type } = req.body;

    // Validation des données
    if (!email || !castle || !year || !quantity || !type) {
      return res.status(400).json({ message: "Toutes les données du formulaire sont requises." });
    }

    const newWine = { castle, year, quantity, type };

    // Recherche de la liste de vins de l'utilisateur
    let wineList = await WineList.findOne({ email });

    if (!wineList) {
      // Si aucune liste de vins n'existe pour cet utilisateur, créez-en une nouvelle
      wineList = new WineList({ email, wines: [newWine] });
    } else {
      // Vérifiez s'il y a déjà un vin avec le même château dans la liste
      const existingWine = wineList.wines.find(wine => wine.castle === castle);

      // Ajoutez le nouveau vin à la liste existante
      wineList.wines.push(newWine);
    }

    // Enregistrez les modifications dans la base de données
    await wineList.save();
    res.status(200).json({ message: 'Vin ajouté avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vin :', error);
  }
});


app.post("/api/deleteCastle", async (req, res) => {
  try {
    const castleToDelete = req.body.castleToDelete;
    const email = req.body.email;
    const user = await WineList.findOne({ email });
    const castle = user.wines.find(wine => wine.castle === castleToDelete);

    // Vérifier si le château a été trouvé
    if (!castle) {
      return res.status(404).json({ message: "Castle not found" });
    }

    // Supprimer le château de la liste de vins de l'utilisateur
    await WineList.updateOne(
      { email },
      { $pull: { wines: { _id: castle._id } } }
    );

    res.status(200).json({ message: "Castle deleted successfully" });
  } catch (error) {
    console.error("Error deleting castle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/editQuantity", async (req, res) => {
  formData = req.body

  const email = formData.email
  const castleToEdit = formData.castle
  const newQuantity = formData.newQuantity 
  const currentQuantity = formData.currentQuantity


  const user = await WineList.findOne({ email })
  const castle = user.wines.find((wine) => wine.castle === castleToEdit && wine.quantity === currentQuantity);

  castle.quantity = newQuantity

  if(newQuantity < currentQuantity) {
    const quantityToAdd = currentQuantity - newQuantity

    let checkUser = await consoCollection.findOne({ email });
    if (!checkUser) {
      const data = {
        email: email,
        consommed: quantityToAdd
      }

      checkUser = new consoCollection({ email, consommed: quantityToAdd });
      const userdata = await consoCollection.insertMany(data)
    } else {
      // Ajoutez le nouveau vin à la liste existante
      const quantityToPush = quantityToAdd
      console.log(quantityToPush)

      checkUser.consommed.push(quantityToPush);
    }

    await checkUser.save();
  }

  await user.save();

  return res.status(200).json({ message: "Quantité mise à jour avec succès" });
})

app.post('/api/searchConsommation', async (req, res) => {
  const formData = req.body
  const email = formData.email
  console.log(req.body)

  try {
    const result = await consoCollection.aggregate([
      { $match: { email: email } }, // Filtrer par email
      { $unwind: '$consommed' },    // Décomposer le tableau en documents individuels
      { $group: { 
          _id: '$email', 
          totalConsommed: { $sum: { $toInt: '$consommed' } } // Convertir les éléments en entier et les sommer
        }
      }
    ]);

    if (result.length > 0) {
      console.log(`Total consommed for ${email}:`, result[0].totalConsommed);
      res.status(200).json({ message: "Correctly fetched", consommation: result[0].totalConsommed});
    } else {
      console.log(`No data found for email: ${email}`);
    }

  } catch (error) {
    console.error('Error during aggregation:', error);
  }
})



// CONNEXION AU SERVEUR
const PORT = process.env.PORT || 3001; // Utilise le port dynamique attribué par le fournisseur d'hébergement ou le port 3000 par défaut en local

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur  http://localhost:${PORT}`);
});
