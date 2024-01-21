migrate((db) => {
  const collection = new Collection({
    "id": "cvcflvfdma9gdlx",
    "created": "2024-01-21 17:34:55.189Z",
    "updated": "2024-01-21 17:34:55.189Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nrvrwmjv",
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
      },
      {
        "system": false,
        "id": "xyxko0ro",
        "name": "posts",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "6yhormzgeowbl0e",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "yopsvqjz",
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
        "id": "hx6wucwx",
        "name": "title",
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
        "id": "9ubuk1of",
        "name": "aboutText",
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
        "id": "yuz1mcen",
        "name": "avatar",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 6291456,
          "mimeTypes": [
            "image/jpeg",
            "image/png"
          ],
          "thumbs": []
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
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx");

  return dao.deleteCollection(collection);
})
