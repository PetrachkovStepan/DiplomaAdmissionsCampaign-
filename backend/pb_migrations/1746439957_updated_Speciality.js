/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3162376613",
    "max": null,
    "min": null,
    "name": "paidBarrier",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2205508107",
    "max": null,
    "min": null,
    "name": "budgetBarrier",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number94023519",
    "max": null,
    "min": null,
    "name": "paidCount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1677269293",
    "max": null,
    "min": null,
    "name": "budgetCount",
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
  collection.fields.removeById("number3162376613")

  // remove field
  collection.fields.removeById("number2205508107")

  // remove field
  collection.fields.removeById("number94023519")

  // remove field
  collection.fields.removeById("number1677269293")

  return app.save(collection)
})
