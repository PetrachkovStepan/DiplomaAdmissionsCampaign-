/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_919187366",
    "hidden": false,
    "id": "relation1912603425",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "specExtraInfoId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // remove field
  collection.fields.removeById("relation1912603425")

  return app.save(collection)
})
