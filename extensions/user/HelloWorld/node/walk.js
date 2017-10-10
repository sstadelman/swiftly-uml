(function () {
    "use strict";
    
    var walk = require('walk');
    
    function init(domainManager) {
        if (!domainManager.hasDomain("walk")) {
            domainManager.registerDomain("walk", {major: 0, minor: 1});
        }
                
        domainManager.registerCommand(
            "walk",       // domain name
            "getDirectoryContents",    // command name
            cmdGetDirectoryContents,   // command handler function
            true,          
            "Returns the parsed swift file object from SourceKitten",
            [{
                    name: "rootDirectory", // parameters
                    type: "string",
                    description: "Root directory of the xcode project"
                }],
            [{
                    name: "directory contents", // return values
                    type: "array",
                    description: "array of all files in the project, with [name, fullyqualifiedpath]"
                }]); 
    }
    
    function cmdGetDirectoryContents(rootDirectory, cb) {
        var directoryContents = {};
        var walker = walk.walk(rootDirectory, {followLinks: false});
        
        walker.on('file', function (path, stat, next) {
            var fullyQualifiedPath = [path, '/', stat.name].join('');
            directoryContents[stat.name] = fullyQualifiedPath;
            // console.log('cmdGetDirectoryContents: ' +  fullyQualifiedPath );
            next();
        });
        walker.on('error', function (path, err, next) {
            next();
        });
        walker.on('end', function () {
            process.nextTick(function() {
                cb(null, directoryContents);
            });
        });
    }
  
    exports.init = init;
    exports.cmdGetDirectoryContents = cmdGetDirectoryContents;
}());