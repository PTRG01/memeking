migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 6,
    "onlyEmailDomains": null,
    "onlyVerified": false,
    "requireEmail": false
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v31ud2b9",
    "name": "followers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rf1igeag",
    "name": "aboutText",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 50,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8phl8qvv",
    "name": "backgroundImage",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/webp"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": false
  }

  // remove
  collection.schema.removeField("v31ud2b9")

  // remove
  collection.schema.removeField("rf1igeag")

  // remove
  collection.schema.removeField("8phl8qvv")

  return dao.saveCollection(collection)
})
