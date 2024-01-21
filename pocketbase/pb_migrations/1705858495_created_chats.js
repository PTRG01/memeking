migrate((db) => {
  const collection = new Collection({
    "id": "8sgoy2rmztbaer0",
    "created": "2024-01-21 17:34:55.189Z",
    "updated": "2024-01-21 17:34:55.189Z",
    "name": "chats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dmec1rdf",
        "name": "users",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8sgoy2rmztbaer0");

  return dao.deleteCollection(collection);
})
