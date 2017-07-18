> db.posts.aggregate(
  [
    {$unwind: "$comments"},
    {$group:{_id:"$comments.author", "count": {$sum: 1}}},
    {$sort: {"count" : -1}},
    {$limit: 5}
  ]
)


db.messages.aggregate(
	[
	{$unwind: "$headers.To"},
	{$group:{
			_id:{"from": "$headers.From", "to": "$headers.To"},
			count: {$sum: 1}
		}
	},
    {$sort: {"count" : -1}},
    {$limit: 5}
	]
)

db.zips.aggregate(
  [
    {$match:{
      $or:[
        {state:"CA"},
        {state: "NY"}
      ]
    }},
    {
      $match: {
        "pop": {$gt: 25000}
      }
    },
    {
      $group: {
        "_id": null,
        avg: {"$avg": "$pop"}
      }
    }
  ]
)

db.grades.aggregate(
  [
    {"$unwind": "$scores"},
    {"$match": {
      $or: [ {"scores.type": "homework"},{"scores.type": "exam" } ]
    }},
    {$group: {
      "_id": {"class": "$class_id", "student": "$student_id"},
      "student_average": {"$avg": "$scores.score"}
    }},
    {
      $group: {
        "_id": "$_id.class", "class_average": {"$avg": "$student_average"}
      }
    },
    {$sort: {class_average: -1}}
  ]
)

db.zips.aggregate([
    {$project:
      {
        first_char: {$substr : ["$city",0,1]},
        population: "$pop"
      }
    },
    {
      $match:
      {
        "first_char": {$in: ["B", "D", "O", "G", "N","M"]}
      }
    },
    {
      $group: {"_id": null, total: {$sum:"$population"}}
    }
])
