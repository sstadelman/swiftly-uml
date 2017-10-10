(function () {
    "use strict";
    
    var cp = require("child_process");

    function init(domainManager) {
        if (!domainManager.hasDomain("sourcekitten")) {
            domainManager.registerDomain("sourcekitten", {major: 0, minor: 1});
        }
             
        domainManager.registerCommand(
            "sourcekitten",       // domain name
            "getParsedSwiftFile",    // command name
            cmdGetParsedSwiftFile,   // command handler function
            true,          
            "Returns the parsed swift file object from SourceKitten",
            [{
                    name: "filePath", // parameters
                    type: "string",
                    description: "Path to the *.swift file to parse"
                }],
            [{
                    name: "structure", // return values
                    type: "string",
                    description: "parsed file JSON structure"
                }]);
    }
    
    function cmdGetParsedSwiftFile(filePath, cb) {
        cp.exec( 
            '/usr/local/bin/sourcekitten index --file ' + filePath, 
            {},//shell: 'bin\bash' 
            function( err, stdout, stderr ) {
                process.nextTick(function() {
                    cb( err, stderr + stdout);
                });
        });
    }
        
    exports.init = init;
    exports.cmdGetParsedSwiftFile = cmdGetParsedSwiftFile;
}());