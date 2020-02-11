const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: 'Enter a store name' },
  slug: String,
  description: { type: String, trim: true },
  tags: [String],
  created: { type: Date, default: Date.now },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [{ type: Number, required: 'Coordinates are mandatory' }],
    address: { type: String, required: 'Address is mandatory' }
  }
});

storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
  // TODO: slugs must be unique
});

module.exports = mongoose.model('Store', storeSchema);
