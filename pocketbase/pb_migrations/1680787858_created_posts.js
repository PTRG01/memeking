migrate((db) => {
  const collection = new Collection({
    "id": "6yhormzgeowbl0e",
    "created": "2023-04-06 13:30:58.569Z",
    "updated": "2023-04-06 13:30:58.569Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ztiglkmu",
        "name": "text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 250,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e");

  return dao.deleteCollection(collection);
})
