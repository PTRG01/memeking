migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "khwsl21t",
    "name": "comment_ids",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y1lt3hj0eve59u1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "khwsl21t",
    "name": "comment_ids",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y1lt3hj0eve59u1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
