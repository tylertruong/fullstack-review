const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});



let repoSchema = mongoose.Schema({
   author: String,
   name: String,
   url: {type: String, unique: true},
   updatedAt: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  for (let i = 0; i < data.length; i++) {
    let obj = {author: data[i].owner.login, name: data[i].name, url: data[i].html_url, updatedAt: data[i].updated_at};
    let instance = new Repo(obj);
    instance.save(function (err, instance) {
      if (err) return console.error(err);
    })

  }
  // This function should save a repo or repos to
  // the MongoDB
}

let find = (callback) => {
  Repo.find()
    .limit(25) 
    .sort({updatedAt: -1})
    .exec(callback);
  //Repo.find(data, callback);
}

module.exports.save = save;
module.exports.find = find;