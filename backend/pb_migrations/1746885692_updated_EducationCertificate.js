/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493156816")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number848901969",
    "max": 100,
    "min": 40,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1624259110",
    "max": 0,
    "min": 0,
    "name": "documentName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2759159842",
    "max": 0,
    "min": 0,
    "name": "scoolType",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2682209641",
    "max": 0,
    "min": 0,
    "name": "schoolName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
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

  // update field
  collection.fields.addAt(7, new Field({
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493156816")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number848901969",
    "max": 100,
    "min": 40,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1624259110",
    "max": 0,
    "min": 0,
    "name": "documentName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2759159842",
    "max": 0,
    "min": 0,
    "name": "scoolType",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2682209641",
    "max": 0,
    "min": 0,
    "name": "schoolName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date35049182",
    "max": "",
    "min": "",
    "name": "releaseDate",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1510617335",
    "maxSelect": 1,
    "name": "foreighnLanguage",
    "presentable": false,
    "required": true,
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

  return app.save(collection)
})
