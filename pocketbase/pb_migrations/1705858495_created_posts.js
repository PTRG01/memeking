migrate((db) => {
  const collection = new Collection({
    "id": "6yhormzgeowbl0e",
    "created": "2024-01-21 17:34:55.189Z",
    "updated": "2024-01-21 17:34:55.189Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ztiglkmu",
        "name": "contentText",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 250,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hjdtfsrw",
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
        "id": "k7mt0vwx",
        "name": "upvote_ids",
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
      },
      {
        "system": false,
        "id": "xwin4dkz",
        "name": "avatar",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "lmq32nev",
        "name": "group_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "cvcflvfdma9gdlx",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
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
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e");

  return dao.deleteCollection(collection);
})
