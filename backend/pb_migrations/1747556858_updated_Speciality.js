/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // remove field
  collection.fields.removeById("number2205508107")

  // remove field
  collection.fields.removeById("number1677269293")

  // remove field
  collection.fields.removeById("number882606264")

  // remove field
  collection.fields.removeById("number3162376613")

  // remove field
  collection.fields.removeById("number94023519")

  // remove field
  collection.fields.removeById("number1391998666")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2221414658",
    "max": null,
    "min": null,
    "name": "fullTimeBudgetPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2905727114",
    "max": null,
    "min": null,
    "name": "fullTimePaidPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number3697836392",
    "max": null,
    "min": null,
    "name": "partTimeBudgetPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2767791448",
    "max": null,
    "min": null,
    "name": "partTimePaidPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number1332455455",
    "max": null,
    "min": null,
    "name": "distanceBudgetPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number1925025750",
    "max": null,
    "min": null,
    "name": "distancePaidPlaces",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1111135182")

  // add field
  collection.fields.addAt(4, new Field({
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
  collection.fields.addAt(5, new Field({
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
  collection.fields.addAt(7, new Field({
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
  collection.fields.addAt(8, new Field({
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

  // remove field
  collection.fields.removeById("number2221414658")

  // remove field
  collection.fields.removeById("number2905727114")

  // remove field
  collection.fields.removeById("number3697836392")

  // remove field
  collection.fields.removeById("number2767791448")

  // remove field
  collection.fields.removeById("number1332455455")

  // remove field
  collection.fields.removeById("number1925025750")

  return app.save(collection)
})
