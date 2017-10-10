(function () {
    "use strict";
    
    var os = require("os");
    var cp = require("child_process");
    var nodeXcode = require('xcode');
    var fs = require("fs");
    
    var projectPath = "/Users/i826181/sapgithub/healthcaresdk/Foundation/ODataStore/ODataStore.xcodeproj/project.pbxproj";
    var pbxprojSuffix = '/project.pbxproj';

    function init(domainManager) {
        if (!domainManager.hasDomain("xcode")) {
            domainManager.registerDomain("xcode", {major: 0, minor: 1});
        } 
                
        domainManager.registerCommand(
            "xcode",       // domain name
            "getSwiftFramework",    // command name
            cmdGetSwiftFramework,   // command handler function
            false,          // this command is synchronous in Node
            "Returns the parsed xcproject PBXGroup node and children",
            [{
                    name: "path", // parameters
                    type: "string",
                    description: "Path to the *.xcodeproj file"
                }],
            [{
                    name: "framework data", // return values
                    type: "array",
                    description: "[swift files, dependency frameworks, product name]"
                }]);
    }
    
    function cmdGetSwiftFramework(path) {

        console.log('cmdGetSwiftFramework');
        var project = nodeXcode.project(path + pbxprojSuffix);
        
        var proj = project.parseSync();
        
        var targets = proj.hash.project.objects.PBXNativeTarget;   
        var tKeys = Object.keys(targets).filter(filterUniques).filter(filterComment);
        var tArray = [];
        for (var i = 0; i < tKeys.length; i++) { 
            tArray.push(targets[tKeys[i]]); 
        }

        var buildPhaseFiles = proj.hash.project.objects.PBXSourcesBuildPhase;
        var bpKeys = Object.keys(buildPhaseFiles).filter(filterUniques).filter(filterComment);
        var bpArray = [];
        for (var i = 0; i < bpKeys.length; i++) {
            bpArray.push(buildPhaseFiles[bpKeys[i]]);
        }

        var mainTargetSourceFiles = bpArray[0].files;

        mainTargetSourceFiles = mainTargetSourceFiles.map(function(val) {
                    var firstIndex = val.comment.indexOf(' ');
                    return firstIndex > 0 ? val.comment.slice(0, firstIndex) : val.comment;
                });
        
        var files = proj.hash.project.objects.PBXFileReference;
        var keys = Object.keys(files).filter(filterUniques).filter(filterComment);
        var array = [];
        for (var i = 0; i < keys.length; i++) {
            
            array.push(files[keys[i]]);
        }
        
        var swiftFiles = array.filter(filterSwiftFile).filter(function(val) {
            return mainTargetSourceFiles.indexOf(val.path) >= 0;
        });
        var frameworkFiles = array.filter(filterFrameworkFile);
        var frameworkProductName = tArray.filter(filterFrameworkProductName);
        
        var groups = proj.hash.project.objects.PBXGroup;
        var groupArray = [];
        var groupKeys = Object.keys(groups).filter(filterUniques).filter(filterComment);
        for (var i = 0; i < groupKeys.length; i++) {
            groupArray.push(groups[groupKeys[i]]);
        }

        var returnSet = [swiftFiles, frameworkFiles, frameworkProductName, groupArray];

        return(returnSet);
    };
    
    /*
    FILTER Statements
    */
    function filterComment(value) {
        return value.indexOf('comment') < 0;
    }
    function filterUniques(value, index, self) { 
        return self.indexOf(value) === index;
    }
    function filterSwiftFile(value, index, self) { 
        return (Object.prototype.hasOwnProperty.call(value, 'lastKnownFileType') && 
                value.lastKnownFileType == 'sourcecode.swift');
    }
    function filterFrameworkFile(value, index, self) { 
        return (Object.prototype.hasOwnProperty.call(value, 'lastKnownFileType') && 
                value.lastKnownFileType == 'wrapper.framework');
    }
    function filterFrameworkProductName(value, index, self) { 
        return (Object.prototype.hasOwnProperty.call(value, 'productType') && 
                value.productType == "\"com.apple.product-type.framework\"");
    }
    //

    exports.init = init;
    exports.cmdGetSwiftFramework = cmdGetSwiftFramework;
    }());