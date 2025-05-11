/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_211440711")

  // remove field
  collection.fields.removeById("date852947741")

  // remove field
  collection.fields.removeById("date3418666719")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text852947741",
    "max": 0,
    "min": 0,
    "name": "birthDate",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3418666719",
    "max": 0,
    "min": 0,
    "name": "givenDate",
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
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date852947741",
    "max": "",
    "min": "",
    "name": "birthDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "date3418666719",
    "max": "",
    "min": "",
    "name": "givenDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("text852947741")

  // remove field
  collection.fields.removeById("text3418666719")

  return app.save(collection)
})
