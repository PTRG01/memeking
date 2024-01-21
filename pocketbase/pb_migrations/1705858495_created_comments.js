migrate((db) => {
  const collection = new Collection({
    "id": "y1lt3hj0eve59u1",
    "created": "2024-01-21 17:34:55.189Z",
    "updated": "2024-01-21 17:34:55.189Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ml36k7gf",
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
        "id": "ruwrrlfw",
        "name": "contentText",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 500,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vy15mi5b",
        "name": "upvote_ids",
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
        "id": "b9ksbehr",
        "name": "post_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "6yhormzgeowbl0e",
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
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1");

  return dao.deleteCollection(collection);
})
