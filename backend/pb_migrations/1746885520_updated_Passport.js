/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_211440711")

  // remove field
  collection.fields.removeById("number2526027604")

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2526027604",
    "max": 0,
    "min": 0,
    "name": "number",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_211440711")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2526027604",
    "max": 7,
    "min": 7,
    "name": "number",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text2526027604")

  return app.save(collection)
})
