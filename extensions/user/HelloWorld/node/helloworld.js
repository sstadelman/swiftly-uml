(function () {
    "use strict";
    
    var fs = require("fs");
    
    // Test variables
    var projectPath = "/Users/i826181/sapgithub/healthcaresdk/Foundation/ODataStore/ODataStore.xcodeproj/project.pbxproj";

    
    function init(domainManager) {
        if (!domainManager.hasDomain("helloworld")) {
            domainManager.registerDomain("helloworld", {major: 0, minor: 1});
        }
                
        domainManager.registerCommand(
            "xcode",       // domain name
            "helloWorld",    // command name
            cmdHelloWorld,   // command handler function
            true,          
            "Returns something",
            [{
                    name: "structure", // return values
                    type: "string",
                    description: "hello world structure"
                }]); 
    }       
      
    function cmdHelloWorld(cb) {
        // console.log('cb: ' + JSON.stringify(cb, null, 2));
        fs.stat(projectPath, function(err, stats) {
            cb(err, stats);
        });
    }     

    exports.init = init;
    exports.cmdHelloWorld = cmdHelloWorld;
}());