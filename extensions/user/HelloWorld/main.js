define(function (require, exports, module) {
    "use strict";

    var workspaceRoot = "/Users/i826181/sapgithub/healthcaresdk/Foundation/";
    
    var xcworkspace = {
        "DBSchemaManager": workspaceRoot + "DBSchemaManager/DBSchemaManager.xcodeproj",
        "HttpClient" : workspaceRoot + "HttpClient/HttpClient.xcodeproj",
        "OData" : workspaceRoot + "OData/OData.xcodeproj",
        "OAuth" : workspaceRoot + "OAuth/OAuth.xcodeproj",
        "ODataStore" : workspaceRoot + "ODataStore/ODataStore.xcodeproj",
        "ODataCommunication" : workspaceRoot + "ODataCommunication/ODataCommunication.xcodeproj",
        "SecureStorage" : workspaceRoot + "SecureStorage/SecureStorage.xcodeproj",
        "Logging" : workspaceRoot + "Logging/Logging.xcodeproj",
        "BarcodeScanner" : workspaceRoot + "BarcodeScanner/BarcodeScanner.xcodeproj",
        "OAuthHttpInterceptor" : workspaceRoot + "OAuthHttpInterceptor/OAuthHttpInterceptor.xcodeproj",
        "UserActivation" : workspaceRoot + "UserActivation/UserActivation.xcodeproj",
        "NetworkConnectivityCheck" : workspaceRoot + "NetworkConnectivityCheck/NetworkConnectivityCheck.xcodeproj"
    }
    
    var Commands       = app.getModule("command/Commands"),
        CommandManager = app.getModule("command/CommandManager"),
        MenuManager    = app.getModule("menu/MenuManager"),
        ExtensionUtils = app.getModule("utils/ExtensionUtils"),
        NodeDomain     = app.getModule("utils/NodeDomain"),
        Factory        = app.getModule("engine/Factory"),
        Repository     = app.getModule("core/Repository"),
        ProjectManager = app.getModule('engine/ProjectManager');
     
    var xcodeDomain = new NodeDomain("xcode", ExtensionUtils.getModulePath(module, "node/xcode"));
    var sourcekittenDomain = new NodeDomain("sourcekitten", ExtensionUtils.getModulePath(module, "node/sourcekitten"));
    var walkDomain = new NodeDomain("walk", ExtensionUtils.getModulePath(module, "node/walk"));
    var helloworldDomain = new NodeDomain("helloworld", ExtensionUtils.getModulePath(module, "node/helloworld"));
    
    var project;
    var rootModel;
    
    function visibility(string) {
        switch(string) {
            case "source.lang.swift.accessibility.public":
                return "public";
            case "source.lang.swift.accessibility.internal":
                return "public";
            default: break;
        }
    }
    /*
    HELPER FUNCTION
    */
    function existingUMLPackages() {
        var project = ProjectManager.getProject();
        var model = project.ownedElements[0];
        return model.ownedElements.filter(filterUMLPackage).map(function(val) {
                    return val.name;
                }).filter(filterUniques).sort();
    }
    
    function testProjectPathDependenciesAlreadyExist(projectPath) {
        var result = new $.Deferred();
        
        var project = ProjectManager.getProject();
        var model = project.ownedElements[0]; // "TopModel"
        
        xcodeDomain.exec("getSwiftFramework", projectPath)
            .done(function(frameworkArray) {
                
                var existingOwnedElements = model.ownedElements.filter(filterUMLPackage).map(function(val) {
                    return val.name;
                }).filter(filterUniques).sort();
                
                // console.log('E: ', existingOwnedElements);
                var dependencies = frameworkArray[1].map(function(val) {
                    return val.name.replace('.framework', '');
                }).sort();

                var dependenciesExist = true;
                for (var i = 0; i < dependencies.length; i++) {
                    if (existingOwnedElements.indexOf(dependencies[i]) < 0) {
                        dependenciesExist = false;
                    }
                }
                result.resolve([projectPath, dependenciesExist]);
            });
        return result.promise();
        };
    
    function buildNewUMLPackageFromXcodeprojPath(projectPath) {
        var result = new $.Deferred();
        
        var project = ProjectManager.getProject();
        var model = project.ownedElements[0]; 
        
        xcodeDomain.exec("getSwiftFramework", projectPath)
            .done(function(frameworkArray) {
                
                var packageName = frameworkArray[2].shift().name;
                var options = {
                        modelInitializer: function (elem) {
                            elem.name = packageName;
                            elem.documentation = projectPath;
                        }
                    };
                var pack = Factory.createModel("UMLPackage", model, 'ownedElements', options);
                // console.log('pack: ' + pack.name);
                result.resolve([frameworkArray, pack]);
            });
        return result.promise();
    };

    function getAllParsedSwiftFilesForUMLPackage(umlPackage) { 
        // umlPackage = [frameworkArray, umlPackage]
        console.log('getAllParsedSwiftFilesForUMLPackage');
        var result = new $.Deferred();
        
        var lastIndex = umlPackage[1].documentation.lastIndexOf(umlPackage[1].name);
        var root = umlPackage[1].documentation.slice(0, lastIndex - 1);
        var files = umlPackage[0][0];
        
        getProjectDirectoryContents(root)
        .then(function(fileArrays) {
            
           var promiseArray = [];
            for (var i = 0; i < files.length; i++) {
            var file = files[i].path;
                promiseArray.push(parseSwiftFile(fileArrays[file], umlPackage));
            }  
            return Promise.all(promiseArray);
        })
        .then(function(allParsedSwiftFiles) {
            result.resolve(allParsedSwiftFiles);
        });
        return result.promise();
    }
    
    function getProjectDirectoryContents(rootDirectory) {
        var result = new $.Deferred();
        walkDomain.exec("getDirectoryContents", rootDirectory)
            .done(function(filesArray) {
                // console.log("filesArray: " + JSON.stringify(filesArray, null, 2));
                result.resolve(filesArray);
            })
            .fail(function (err) {
                console.error("err: " + JSON.stringify(err, null, 2));
                result.reject(err);
            });
        return result.promise();
    }
    
    function parseSwiftFile(filePath, umlPackage) {
        // console.log('parseSwiftFile: ' + filePath);
        var pack = !!umlPackage ? umlPackage[1] : {};
        
        var result = new $.Deferred();
        sourcekittenDomain.exec("getParsedSwiftFile", filePath)
            .done(function(parsedFile) {
                // console.log('parsedFile: ' + JSON.stringify(parsedFile, null, 2));
                result.resolve([parsedFile, pack]);
            })
            .fail(function (err) {
                console.error("err: " + JSON.stringify(err, null, 2));
                result.reject(err);
            });
        return result.promise();
    }
    
    // Handler for GetSwiftFiles
    function handleGetSwiftFramework() {
        console.log('handleGetSwiftFramework');
        
        var projectPathKeys = Object.keys(xcworkspace);
        var projectPathArray = [];
        var promiseArray = [];
        for (var i = 0; i < projectPathKeys.length; i++) {
            projectPathArray.push(xcworkspace[projectPathKeys[i]]);
            
            if (existingUMLPackages().indexOf(projectPathKeys[i]) < 0) {
                promiseArray.push(testProjectPathDependenciesAlreadyExist(projectPathArray[i]));
            }
        }
        console.log('ARRAY_STEP_1');
        runTestProjectPathDependenciesArray(promiseArray)
        .then(function(testResults) {
            /* testResults should contain the [projPath, boolean] of whether dependencies exist */
            console.log('ARRAY_STEP_1_RESPONSE');
            
            var trueValues = testResults.filter(filterDependenciesTrue);
            var promiseArray = [];
            for (var i = 0; i < trueValues.length; i++) {
                var projectPath = trueValues[i][0];
                /* 
                Call buildNewUMLPackageFromXcodeprojPath on the xcproj's where dependencies exist
                buildNewUMLPackageFromXcodeprojPath invokes the xcode getSwiftFramework for the xcodePath, and adds a SwiftUML UMLPackage to the project.
                Returns the [frameworkDefinition, UMLPackage]
                */
                promiseArray.push(buildNewUMLPackageFromXcodeprojPath(projectPath));
            }
            console.log('ARRAY_STEP_2');
            return runBuildNewUMLPackageFromXcodeprojPath(promiseArray);
        })
        .then(function(addedUMLPackageObjects) {
            /* all packages should be added at this point.*/
            console.log('ARRAY_STEP_2_RESPONSE');
            console.log('addedUMLPackageObjects.length; ' + addedUMLPackageObjects.length);
            var promiseArray = [];
            for (var i = 0; i < addedUMLPackageObjects.length; i++) {
                promiseArray.push(getAllParsedSwiftFilesForUMLPackage(addedUMLPackageObjects[i]));
            }
            console.log('ARRAY_STEP_3');
            return runGetAllParsedSwiftFilesForUMLPackage(promiseArray);
        })
        .then(function(parsedSwiftFilesForUMLPackage) {
            /*
            Returns  [][parsedSwiftFiles arrayPerPackage, UMLPackage]
            */
            console.log('ARRAY_STEP_3_RESPONSE');
            console.log('parsedSwiftFilesForUMLPackage[0].length; ' + parsedSwiftFilesForUMLPackage[0].length);
            
            for (var i = 0; i < parsedSwiftFilesForUMLPackage[0].length; i++) {
                var structure = parsedSwiftFilesForUMLPackage[0][i];
                processObject([JSON.parse(structure[0]), structure[1]]);
            }
        });
        
    }
    
    function runTestProjectPathDependenciesArray(array) {
        return Promise.all(array);
    }
    
    function runBuildNewUMLPackageFromXcodeprojPath(array) {
        return Promise.all(array);
    }
    
    function runGetAllParsedSwiftFilesForUMLPackage(array) {
        return Promise.all(array);
    }
    
    // Handler for GetPBXGroups
    function handleGetPBXGroups() {

        xcodeDomain.exec("getPbxGroups", false)
            .done(function(groups) {
                console.log('groups: ' + JSON.stringify(groups, null, 2));
            });
    }
    
    
    // Handler for HelloWorld command
    function handleHelloWorld() {

        helloworldDomain.exec("helloWorld")
            .done(function(memory) {
                window.alert("Hello, world with memory: " + memory);
            })
            .fail(function (err) {
                console.error("err: " + JSON.stringify(err, null, 2));
            });
    }
    
    // Handler for testing; not used in production
    function handleGetDirectoryContents() {
        getProjectDirectoryContents('/Users/i826181/sapgithub/healthcaresdk/Foundation/ODataCommunication')
        .then(function(output) {
            console.log('output: ' + output);
        });
    }
    
    // Handler for testing; not used in production
    function handleGetParsedFile() {
        parseSwiftFile('/Users/i826181/sapgithub/healthcaresdk/Foundation/ODataCommunication/ODataCommunication/Impl/DataRequestFactoryImpl.swift')
        .then(function(output) {
            console.log('output: ' + output);
        });
    }

    
    function convertUMLClassifierType(obj) {
        
        switch(obj["key.kind"]) {
            case "source.lang.swift.decl.protocol":
                return "UMLInterface";
            case "source.lang.swift.decl.var.instance":
                return "UMLAttribute";
            case "source.lang.swift.decl.function.method.instance":
                return "UMLOperation";
            case "source.lang.swift.decl.var.parameter":
                return "UMLParameter";
            case "source.lang.swift.decl.var.static":
                return "UMLAttribute";
            case "source.lang.swift.expr.dictionary":
                return "UMLDataType";
            case "source.lang.swift.decl.class":
                return "UMLClass";
            default:
                return "UML_IGNORE";
        }
    }
    
    function convertFieldName(umlModelType) {
        switch(umlModelType) {
            case "UMLAttribute":
                return "attributes";
            case "UMLOperation":
                return "operations";
            case "UMLParameter":
                return "parameters";
            default:
                return null;
        }
    }
    
    function convertUMLModelOptions(obj) {
        
        var options = { 
            modelInitializer: function(elem) {
                if (obj.hasOwnProperty("key.name")) {
                    var key_name = obj["key.name"];
                    var parenIndex = key_name.indexOf('(');
                    if (parenIndex > 0) {
                        key_name = key_name.slice(0, parenIndex);
                    }
                    elem.name = key_name;} 
                if (obj.hasOwnProperty("key.accessibility")) {elem.visibility = visibility(obj["key.accessibility"]);}
                if (obj.hasOwnProperty("key.typename") && beginsUpperCase(obj["key.typename"])) {elem.type = obj[ "key.typename"];}
            }
        }
        return options;
    }

    function processAttributes(structure, parentUMLClassifier) {
        
    }
    
    function processObject(structure) {
        
        var json = structure[0];
        var umlPackage = structure[1];        
        var rootObjects = json.hasOwnProperty("key.substructure") ? json["key.substructure"] : [];
        
        for (var i = 0; i < rootObjects.length; i++) {
            var obj = rootObjects[i];
            var newlyCreatedUMLModel = createUMLModel(obj, umlPackage);
        }
    }
    function createUMLModel(obj, parent) {
        
        var m_parent = parent !== null ? parent : rootModel;
        var umlModelType = convertUMLClassifierType(obj);
        
        if (umlModelType === 'UML_IGNORE') return;
        
        var fieldName = convertFieldName(umlModelType);
        var options = convertUMLModelOptions(obj);
        
        var newModel = Factory.createModel(umlModelType, m_parent, fieldName, options);
        
        processObject([obj, newModel]);
    }
    
    function createUMLClass(definition) {
        
    }
    
    function createUMLInterface(obj) {

        // Create a UMLAttribute element and add to the field 'attributes' of the class
        var attr = Factory.createModel("UMLAttribute", protocol, 'attributes');

        // Create a UMLClass with options
        // var options = {
        //     modelInitializer: function (elem) {
        //         elem.name = obj["key.name"];
        //     }
        // };
        // var class2 = Factory.createModel("UMLClass", newModel, 'ownedElements', options);
        
    }

    // Add a HelloWorld command
    var CMD_HELLOWORLD = "tools.helloworld";
    var CMD_GETDIRECTORYCONTENTS = "tools.getdirectorycontents";
    var CMD_GETPARSEDFILE = "tools.getparsedfile";
    var CMD_GETPBXGROUPS = "tools.getpbxgroups";
    var CMD_GETSWIFTREFERENCES = "tools.getswiftreferences";
    
    CommandManager.register("Hello World", CMD_HELLOWORLD, handleHelloWorld);
    CommandManager.register("Get Directory Contents", CMD_GETDIRECTORYCONTENTS, handleGetDirectoryContents);
    CommandManager.register("Get ParsedFile", CMD_GETPARSEDFILE, handleGetParsedFile);
    CommandManager.register("Get PBXGroups", CMD_GETPBXGROUPS, handleGetPBXGroups);
    CommandManager.register("Get Swift Framework", CMD_GETSWIFTREFERENCES, handleGetSwiftFramework);

    

    // Add HelloWorld menu item (Tools > Hello World)
    var menu = MenuManager.getMenu(Commands.TOOLS);
    menu.addMenuItem(CMD_HELLOWORLD);
    menu.addMenuItem(CMD_GETDIRECTORYCONTENTS);
    menu.addMenuItem(CMD_GETPARSEDFILE);
    menu.addMenuItem(CMD_GETPBXGROUPS);
    menu.addMenuItem(CMD_GETSWIFTREFERENCES);

   
    /*
    FILTER statements
    */
    function filterUMLPackage(value, index, self) { 
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((value).constructor.toString());
        var constructorFunctionName = (results && results.length > 1) ? results[1] : "";
        return constructorFunctionName == 'UMLPackage';
    }
    function filterUniques(value, index, self) { 
        return self.indexOf(value) === index;
    }
    function filterDependenciesTrue(value) {
        return value[1] === true;
    }
    function filterSwiftFilesInDirectoryContent(value) {
        return value[0].indexOf('.swift') >= 0;
    }
    /*
    HELPER functions
    */
    function beginsUpperCase(myString) {
        var firstChar = myString.slice(0,1);
        return firstChar == firstChar.toUpperCase();
    }

    
});
