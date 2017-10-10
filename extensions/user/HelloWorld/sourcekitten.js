/*
{
  "key.substructure" : [
    {
      "key.kind" : "source.lang.swift.decl.class",
      "key.offset" : 240,
      "key.namelength" : 14,
      "key.bodyoffset" : 274,
      "key.bodylength" : 1837,
      "key.length" : 1872,
      "key.name" : "ODataStoreImpl",
      "key.nameoffset" : 246,
      "key.inheritedtypes" : [
        {
          "key.name" : "ODataStore"
        }
      ],
      "key.accessibility" : "source.lang.swift.accessibility.internal",
      "key.substructure" : [
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 298,
          "key.attributes" : [
            {
              "key.attribute" : "source.decl.attribute.final"
            }
          ],
          "key.nameoffset" : 302,
          "key.namelength" : 6,
          "key.length" : 58,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "logger",
          "key.name" : "logger"
        },
        {
          "key.kind" : "source.lang.swift.expr.call",
          "key.offset" : 311,
          "key.nameoffset" : 311,
          "key.namelength" : 16,
          "key.bodyoffset" : 328,
          "key.bodylength" : 27,
          "key.length" : 45,
          "key.name" : "Logger.getLogger"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 374,
          "key.nameoffset" : 378,
          "key.namelength" : 15,
          "key.length" : 37,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.setter_accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "ServiceDocument?",
          "key.name" : "serviceDocument"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 424,
          "key.nameoffset" : 428,
          "key.namelength" : 16,
          "key.length" : 39,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.setter_accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "MetadataDocument?",
          "key.name" : "metadataDocument"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 481,
          "key.nameoffset" : 485,
          "key.namelength" : 7,
          "key.length" : 32,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "SecureDatabaseStore",
          "key.name" : "dbStore"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 526,
          "key.nameoffset" : 530,
          "key.namelength" : 15,
          "key.length" : 40,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "MetadataManagerImpl",
          "key.name" : "metadataManager"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 579,
          "key.nameoffset" : 583,
          "key.namelength" : 9,
          "key.length" : 21,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "String",
          "key.name" : "storeName"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 613,
          "key.nameoffset" : 617,
          "key.namelength" : 13,
          "key.length" : 37,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.setter_accessibility" : "source.lang.swift.accessibility.private",
          "key.typename" : "EntityManagerImpl?",
          "key.name" : "entityManager"
        },
        {
          "key.kind" : "source.lang.swift.decl.var.instance",
          "key.offset" : 660,
          "key.nameoffset" : 664,
          "key.namelength" : 13,
          "key.bodyoffset" : 700,
          "key.bodylength" : 61,
          "key.accessibility" : "source.lang.swift.accessibility.internal",
          "key.length" : 38,
          "key.typename" : "SecureDatabaseStore",
          "key.name" : "databaseStore"
        },
        {
          "key.kind" : "source.lang.swift.decl.function.method.instance",
          "key.offset" : 772,
          "key.nameoffset" : 772,
          "key.namelength" : 53,
          "key.bodyoffset" : 827,
          "key.bodylength" : 162,
          "key.accessibility" : "source.lang.swift.accessibility.internal",
          "key.substructure" : [
            {
              "key.kind" : "source.lang.swift.decl.var.parameter",
              "key.offset" : 777,
              "key.nameoffset" : 777,
              "key.namelength" : 7,
              "key.length" : 28,
              "key.typename" : "SecureDatabaseStore",
              "key.name" : "dbStore"
            },
            {
              "key.kind" : "source.lang.swift.decl.var.parameter",
              "key.offset" : 807,
              "key.nameoffset" : 807,
              "key.namelength" : 9,
              "key.length" : 17,
              "key.typename" : "String",
              "key.name" : "storeName"
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 925,
              "key.nameoffset" : 925,
              "key.namelength" : 19,
              "key.bodyoffset" : 945,
              "key.bodylength" : 38,
              "key.length" : 59,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 945,
                  "key.nameoffset" : 945,
                  "key.namelength" : 7,
                  "key.bodyoffset" : 954,
                  "key.bodylength" : 7,
                  "key.length" : 16,
                  "key.name" : "dbStore"
                },
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 963,
                  "key.nameoffset" : 963,
                  "key.namelength" : 9,
                  "key.bodyoffset" : 974,
                  "key.bodylength" : 9,
                  "key.length" : 20,
                  "key.name" : "storeName"
                }
              ],
              "key.name" : "MetadataManagerImpl"
            }
          ],
          "key.name" : "init(dbStore:storeName:)",
          "key.length" : 218
        },
        {
          "key.kind" : "source.lang.swift.syntaxtype.comment.mark",
          "key.offset" : 1002,
          "key.nameoffset" : 0,
          "key.namelength" : 0,
          "key.length" : 40
        },
        {
          "key.kind" : "source.lang.swift.decl.function.method.instance",
          "key.offset" : 1052,
          "key.attributes" : [
            {
              "key.attribute" : "source.decl.attribute.__raw_doc_comment"
            }
          ],
          "key.nameoffset" : 1057,
          "key.namelength" : 20,
          "key.bodyoffset" : 1105,
          "key.bodylength" : 36,
          "key.accessibility" : "source.lang.swift.accessibility.internal",
          "key.length" : 90,
          "key.name" : "getMetadataManager()"
        },
        {
          "key.kind" : "source.lang.swift.decl.function.method.instance",
          "key.offset" : 1152,
          "key.nameoffset" : 1157,
          "key.namelength" : 32,
          "key.bodyoffset" : 1215,
          "key.bodylength" : 621,
          "key.accessibility" : "source.lang.swift.accessibility.internal",
          "key.substructure" : [
            {
              "key.kind" : "source.lang.swift.decl.var.parameter",
              "key.offset" : 1174,
              "key.nameoffset" : 0,
              "key.namelength" : 0,
              "key.length" : 14,
              "key.typename" : "Schema",
              "key.name" : "schema"
            },
            {
              "key.kind" : "source.lang.swift.stmt.if",
              "key.offset" : 1224,
              "key.nameoffset" : 0,
              "key.namelength" : 0,
              "key.length" : 86,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.stmt.brace",
                  "key.offset" : 1266,
                  "key.nameoffset" : 0,
                  "key.namelength" : 0,
                  "key.bodyoffset" : 1267,
                  "key.bodylength" : 42,
                  "key.length" : 44
                }
              ],
              "key.elements" : [
                {
                  "key.kind" : "source.lang.swift.structure.elem.condition_expr",
                  "key.offset" : 1227,
                  "key.length" : 38
                }
              ]
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 1345,
              "key.nameoffset" : 1345,
              "key.namelength" : 17,
              "key.bodyoffset" : 1363,
              "key.bodylength" : 71,
              "key.length" : 90,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 1363,
                  "key.nameoffset" : 1363,
                  "key.namelength" : 13,
                  "key.bodyoffset" : 1378,
                  "key.bodylength" : 13,
                  "key.length" : 28,
                  "key.name" : "databaseStore"
                },
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 1393,
                  "key.nameoffset" : 1393,
                  "key.namelength" : 6,
                  "key.bodyoffset" : 1401,
                  "key.bodylength" : 6,
                  "key.length" : 14,
                  "key.name" : "schema"
                },
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 1409,
                  "key.nameoffset" : 1409,
                  "key.namelength" : 9,
                  "key.bodyoffset" : 1420,
                  "key.bodylength" : 14,
                  "key.length" : 25,
                  "key.name" : "storeName"
                }
              ],
              "key.name" : "EntityManagerImpl"
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 1501,
              "key.nameoffset" : 1501,
              "key.namelength" : 21,
              "key.bodyoffset" : 1523,
              "key.bodylength" : 6,
              "key.length" : 29,
              "key.name" : "buildSchemaDescriptor"
            },
            {
              "key.kind" : "source.lang.swift.stmt.brace",
              "key.offset" : 1551,
              "key.nameoffset" : 0,
              "key.namelength" : 0,
              "key.bodyoffset" : 1552,
              "key.bodylength" : 58,
              "key.length" : 60,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.expr.call",
                  "key.offset" : 1569,
                  "key.nameoffset" : 1569,
                  "key.namelength" : 12,
                  "key.bodyoffset" : 1582,
                  "key.bodylength" : 18,
                  "key.length" : 32,
                  "key.name" : "schema.apply"
                }
              ]
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 1626,
              "key.nameoffset" : 1626,
              "key.namelength" : 38,
              "key.bodyoffset" : 1666,
              "key.bodylength" : 9,
              "key.length" : 50,
              "key.name" : "SchemaError.UnsupportedSchemaMigration"
            },
            {
              "key.kind" : "source.lang.swift.stmt.brace",
              "key.offset" : 1678,
              "key.nameoffset" : 0,
              "key.namelength" : 0,
              "key.bodyoffset" : 1679,
              "key.bodylength" : 116,
              "key.length" : 118,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.expr.call",
                  "key.offset" : 1692,
                  "key.nameoffset" : 1692,
                  "key.namelength" : 12,
                  "key.bodyoffset" : 1705,
                  "key.bodylength" : 80,
                  "key.length" : 94,
                  "key.name" : "logger.error"
                }
              ]
            }
          ],
          "key.name" : "getEntityManager(_:)",
          "key.length" : 685
        },
        {
          "key.kind" : "source.lang.swift.syntaxtype.comment.mark",
          "key.offset" : 1849,
          "key.nameoffset" : 0,
          "key.namelength" : 0,
          "key.length" : 23
        },
        {
          "key.kind" : "source.lang.swift.decl.function.method.instance",
          "key.offset" : 1890,
          "key.attributes" : [
            {
              "key.attribute" : "source.decl.attribute.__raw_doc_comment"
            }
          ],
          "key.nameoffset" : 1895,
          "key.namelength" : 37,
          "key.bodyoffset" : 1961,
          "key.bodylength" : 148,
          "key.accessibility" : "source.lang.swift.accessibility.private",
          "key.substructure" : [
            {
              "key.kind" : "source.lang.swift.decl.var.parameter",
              "key.offset" : 1917,
              "key.nameoffset" : 0,
              "key.namelength" : 0,
              "key.length" : 14,
              "key.typename" : "Schema",
              "key.name" : "schema"
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 1990,
              "key.nameoffset" : 1990,
              "key.namelength" : 23,
              "key.bodyoffset" : 2014,
              "key.bodylength" : 48,
              "key.length" : 73,
              "key.substructure" : [
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 2014,
                  "key.nameoffset" : 2014,
                  "key.namelength" : 11,
                  "key.bodyoffset" : 2027,
                  "key.bodylength" : 6,
                  "key.length" : 19,
                  "key.name" : "odataSchema"
                },
                {
                  "key.kind" : "source.lang.swift.decl.var.parameter",
                  "key.offset" : 2035,
                  "key.nameoffset" : 2035,
                  "key.namelength" : 11,
                  "key.bodyoffset" : 2048,
                  "key.bodylength" : 14,
                  "key.length" : 27,
                  "key.name" : "tablePrefix"
                }
              ],
              "key.name" : "SchemaDescriptorBuilder"
            },
            {
              "key.kind" : "source.lang.swift.expr.call",
              "key.offset" : 2083,
              "key.nameoffset" : 2083,
              "key.namelength" : 19,
              "key.bodyoffset" : 2103,
              "key.bodylength" : 0,
              "key.length" : 21,
              "key.name" : "schemaBuilder.build"
            }
          ],
          "key.name" : "buildSchemaDescriptor(_:)",
          "key.length" : 220
        }
      ],
      "key.runtime_name" : "_TtC8__main__14ODataStoreImpl",
      "key.elements" : [
        {
          "key.kind" : "source.lang.swift.structure.elem.typeref",
          "key.offset" : 262,
          "key.length" : 10
        }
      ]
    }
  ],
  "key.offset" : 0,
  "key.diagnostic_stage" : "source.diagnostic.stage.swift.parse",
  "key.length" : 2112
}
*/