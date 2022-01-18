require('dotenv').config();
const mongoose = require('mongoose');
try {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, function(err) {
console.log({err});
});
} catch (e) {
  console.log(e);
}

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  "name": {
    "type": String,
    "required": true,
  },
  "age": Number, 
  "favoriteFoods": [{"type": String}]
});

// Compile model from schema
let Person = mongoose.model('Person', PersonSchema );

const createAndSavePerson = (done) => {
  const person = new Person({name: 'Olivier', age: 33, favoriteFoods: ['pizza']});
  person.save((err) => {
    if (err) {
      done(err);
    } else {
      done(null, person);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {return done(err);}
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
  if (err) {return done(err);}
  done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
  if (err) {return done(err);}
  done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
  if (err) {return done(err);}
  done(null, data);
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  try {
    let pers = await Person.findById(personId);
    pers.favoriteFoods.push(foodToAdd);
    pers.markModified('favoriteFoods');
    let updatePers = await pers.save();
    done(null, updatePers);
  } catch (e) {
    done(e);
  }
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  let pers = await Person.findOne({name: personName});
  pers.markModified('age');
  pers.age = ageToSet;
  let updatedPers = await pers.save();
  done(null, updatedPers);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
