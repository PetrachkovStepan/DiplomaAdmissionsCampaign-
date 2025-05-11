/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493156816")

  // remove field
  collection.fields.removeById("date35049182")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text35049182",
    "max": 0,
    "min": 0,
    "name": "releaseDate",
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
    "id": "date35049182",
    "max": "",
    "min": "",
    "name": "releaseDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("text35049182")

  return app.save(collection)
})
