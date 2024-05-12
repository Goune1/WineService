const mongoose = require("mongoose");
const COLLECTION_NAME = "WineList";

// Définition du schéma pour la collection 'users'
const WineSchema = new mongoose.Schema({
  castle: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

// Création des modèles correspondants aux schémas
const WineModel = mongoose.model(COLLECTION_NAME, WineSchema);


// Export des modèles
module.exports = WineModel;
