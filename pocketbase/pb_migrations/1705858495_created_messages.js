migrate((db) => {
  const collection = new Collection({
    "id": "jpyvs34jbguvqkq",
    "created": "2024-01-21 17:34:55.189Z",
    "updated": "2024-01-21 17:34:55.189Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ptnp5nqq",
        "name": "chat_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "8sgoy2rmztbaer0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "x7wvzsan",
        "name": "author_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "gamszwkp",
        "name": "content",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("jpyvs34jbguvqkq");

  return dao.deleteCollection(collection);
})
