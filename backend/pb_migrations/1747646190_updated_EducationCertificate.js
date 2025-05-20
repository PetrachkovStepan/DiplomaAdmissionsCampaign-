/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493156816")

  // remove field
  collection.fields.removeById("select1510617335")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1510617335",
    "max": 0,
    "min": 0,
    "name": "foreighnLanguage",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493156816")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select1510617335",
    "maxSelect": 1,
    "name": "foreighnLanguage",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "English",
      "German",
      "French",
      "Spanish",
      "Chinese"
    ]
  }))

  // remove field
  collection.fields.removeById("text1510617335")

  return app.save(collection)
})
