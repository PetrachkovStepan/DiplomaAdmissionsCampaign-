/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1701487149")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool3663063936",
    "name": "blocked",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1701487149")

  // remove field
  collection.fields.removeById("bool3663063936")

  return app.save(collection)
})
