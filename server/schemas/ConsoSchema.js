const mongoose = require("mongoose");
const COLLECTION_NAME = "conso";

// Définition du schéma pour la collection 'users'
const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  consommed: {
    type: Array,
    required: true
  }
});

// Création des modèles correspondants aux schémas
const UserModel = mongoose.model(COLLECTION_NAME, LoginSchema);


// Export des modèles
module.exports = UserModel;