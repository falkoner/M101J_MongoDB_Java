var dropper1 = function () {
  var list = db.grades.find().sort({'student_id': 1, 'score': 1})
  var sid = null
  list.forEach(function (item) {
    if (item.student_id !== sid) {
      sid = item.student_id
      db.grades.deleteOne(item)
    }
  })
  list.close()
}

var dropper = function () {
  var list = db.students.find()
  list.forEach(function (item) {
    var minScore = null

    item.scores.forEach(function (score) {
      if (score.type === 'homework' && (score.score < minScore || minScore == null)) {
        minScore = score.score
      }
    })

    if (minScore != null) {
      db.students.update(item, {$pull: {'scores': {'type': 'homework', 'score': minScore}}})
    }
  })
}


var dorpper = function () {;
  var images = db.images.find()
  images.forEach (function (image) {
    // print(image["_id"]);
    var albums = db.albums.find({images: image["_id"]}).limit(1).toArray();
    print(albums);
    if (albums == null || albums.length == 0) {
      print("Deleting " + image);
      db.images.deleteOne(image);
    }
  })
}