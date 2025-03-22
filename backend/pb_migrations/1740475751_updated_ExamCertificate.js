/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_818547900")

  // update field
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
      "geography"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_818547900")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select4224597626",
    "maxSelect": 1,
    "name": "subject",
    "presentable": false,
    "required": false,
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
      "geography"
    ]
  }))

  return app.save(collection)
})
