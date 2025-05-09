/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number882606264",
    "max": null,
    "min": null,
    "name": "budgetSpots",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number1391998666",
    "max": null,
    "min": null,
    "name": "paidSpots",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // remove field
  collection.fields.removeById("number882606264")

  // remove field
  collection.fields.removeById("number1391998666")

  return app.save(collection)
})
