/*
{
    "_type": "UMLInterface",
    "_id": "AAAAAAFUNK1qw2zqoX4=",
    "_parent": {
        "$ref": "AAAAAAFUNKwGdmzV1AM="
    },
    "name": "EntityManager",
    "ownedElements": [
        {
            "_type": "UMLDependency",
            "_id": "AAAAAAFUNQQ7yHIyVhI=",
            "_parent": {
                "$ref": "AAAAAAFUNK1qw2zqoX4="
            },
            "source": {
                "$ref": "AAAAAAFUNK1qw2zqoX4="
            },
            "target": {
                "$ref": "AAAAAAFUKpxYLHTcDjo="
            },
            "visibility": "public"
        }
    ],
    "visibility": "public",
    "attributes": [
        {
            "_type": "UMLAttribute",
            "_id": "AAAAAAFUNOM0OG/CI+k=",
            "_parent": {
                "$ref": "AAAAAAFUNK1qw2zqoX4="
            },
            "name": "databaseStore",
            "visibility": "public",
            "isStatic": false,
            "isLeaf": false,
            "type": {
                "$ref": "AAAAAAFUKqH2unWi3h4="
            },
            "isReadOnly": false,
            "isOrdered": false,
            "isUnique": false,
            "isDerived": false,
            "aggregation": "none",
            "isID": false
        }
    ],
    "operations": [
        {
            "_type": "UMLOperation",
            "_id": "AAAAAAFUNOLHZW+wdyc=",
            "_parent": {
                "$ref": "AAAAAAFUNK1qw2zqoX4="
            },
            "name": "persist",
            "stereotype": "func",
            "visibility": "public",
            "isStatic": false,
            "isLeaf": false,
            "parameters": [
                {
                    "_type": "UMLParameter",
                    "_id": "AAAAAAFUNOL+9m+3lnA=",
                    "_parent": {
                        "$ref": "AAAAAAFUNOLHZW+wdyc="
                    },
                    "name": "entry",
                    "visibility": "public",
                    "isStatic": false,
                    "isLeaf": false,
                    "type": "Entry",
                    "isReadOnly": false,
                    "isOrdered": false,
                    "isUnique": false,
                    "direction": "in"
                }
            ],
            "concurrency": "sequential",
            "isQuery": false,
            "isAbstract": false
        },
        {
            "_type": "UMLOperation",
            "_id": "AAAAAAFUNOL//W+5c/o=",
            "_parent": {
                "$ref": "AAAAAAFUNK1qw2zqoX4="
            },
            "name": "persist",
            "stereotype": "func",
            "visibility": "public",
            "isStatic": false,
            "isLeaf": false,
            "parameters": [
                {
                    "_type": "UMLParameter",
                    "_id": "AAAAAAFUNOMmym/ADE0=",
                    "_parent": {
                        "$ref": "AAAAAAFUNOL//W+5c/o="
                    },
                    "name": "entryCollection",
                    "visibility": "public",
                    "isStatic": false,
                    "isLeaf": false,
                    "type": "EntryCollection",
                    "isReadOnly": false,
                    "isOrdered": false,
                    "isUnique": false,
                    "direction": "in"
                }
            ],
            "concurrency": "sequential",
            "isQuery": false,
            "isAbstract": false
        }
    ],
    "isAbstract": false,
    "isFinalSpecialization": false,
    "isLeaf": false
},
*/