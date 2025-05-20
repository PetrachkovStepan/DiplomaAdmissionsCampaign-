/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_818547900")

  // remove field
  collection.fields.removeById("select4224597626")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4224597626",
    "max": 0,
    "min": 0,
    "name": "subject",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_818547900")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select4224597626",
    "maxSelect": 1,
    "name": "subject",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "physics",
      "mathematics",
      "biology",
      "chemistry",
      "history",
      "foreign",
      "social",
      "geography",
      "lang"
    ]
  }))

  // remove field
  collection.fields.removeById("text4224597626")

  return app.save(collection)
})
