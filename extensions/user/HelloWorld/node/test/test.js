
var xcode = require("./../xcode.js"),
    should = require('should'),
    $ = require('jquery');

    var testFiles = ['/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/LoggingUtils.swift','/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/Logger.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/AbstractHandler.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/DefaultConsoleHandler.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/DefaultFileHandler.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/AbstractFormatter.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/DefaultFormatter.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/DefaultFileFormatter.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/LogRecord.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/LogLevel.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/LoggingError.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/HandlerAdapterEvergreen.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/FormatterAdapterEvergreen.swift', '/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/Dependencies/Evergreen/BaseLogger.swift', ' /Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/Dependencies/Evergreen/BaseHandler.swift', ' /Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging/Dependencies/Evergreen/BaseFormatter.swift'];

describe('#cmdGetMemory()', function() {
  it('respond with a Structure', function(done) {
      

    
    console.log('testFiles.length: ' + testFiles.length);
    require("jsdom").env("", function(err, window) {
            if (err) {
                console.error(err);
                return;
            }
            var $ = require("jquery")(window);
            
            function testParse(testFile) {
                var result = new $.Deferred();
                
                xcode.cmdGetParsedSwiftFile(testFile, function(err, response) {
                    result.resolve(response);
                });
                return result.promise();
            }

            var testParsePromises = [];
            for (var i = 0; i < testFiles.length; i++) {
                testParsePromises.push(testParse(testFiles[i]));
            }

            Promise.all(testParsePromises)
                .then(function(values) {
                    // console.log('values: ' + JSON.stringify(values.length, null, 2));
                    done();
                });
    });
 

  });
});

describe('#it should use fs statSync() correctly', function() {
    it('try to check good path exists', function(done) {
        var file = testFiles[0];
        var test = xcode.cmdTestFileExists(file);
        should.equal(test, true);
        done();
    });
    it('try to check bad path does not exist', function(done) {
        var file = testFiles[0] + '/dummy';
        var test = xcode.cmdTestFileExists(file);
        should.equal(test, false);
        done();
    });
});

describe('It should parse the Xcproject file, and return the PBXGroupData', function() {
    it('Returns the PBXGroups in the project', function(done) {
        var response = xcode.cmdGetPbxGroups();
        
            // console.log('response: ' + JSON.stringify(response, null, 2));
            // console.log('response: ' + Object.keys(response).length);
            Object.keys(response).length.should.be.greaterThanOrEqual(1);
            done();
    });
});

describe('It should parse the Xcproject file, and return all the Swift files and framework dependencies', function() {
    it('Returns the PBXFileReferences that are of type *.swift, or *.framework', function(done) {
        var response = xcode.cmdGetSwiftFramework('/Users/i826181/sapgithub/healthcaresdk/Foundation/Logging/Logging.xcodeproj');
        var swiftFiles = response[0];
            // console.log('swiftFiles: ' + JSON.stringify(swiftFiles, null, 2));
            console.log('swiftFiles.length: ' + Object.keys(swiftFiles).length);
            Object.keys(swiftFiles).length.should.be.greaterThanOrEqual(1);
        
        var frameworkFiles = response[1];
            // console.log('frameworkFiles: ' + JSON.stringify(frameworkFiles, null, 2));
            console.log('frameworkFiles.length: ' + Object.keys(frameworkFiles).length);
            Object.keys(frameworkFiles).length.should.be.greaterThanOrEqual(1);   
        
        var frameworkProductName = response[2];
            // console.log('frameworkProductName: ' + JSON.stringify(frameworkProductName, null, 2));
            console.log('frameworkProductName.length: ' + Object.keys(frameworkProductName).length);
            Object.keys(frameworkProductName).length.should.be.greaterThanOrEqual(1);   
            done();    
    });
});

describe('It should parse the Xcproject file, and return all the Swift files', function() {
    it('Returns the PBXFileReferences that are of type *swift', function(done) {
        var response = xcode.cmdGetSwiftFiles();
        var swiftFiles = response[0];
            // console.log('swiftFiles: ' + JSON.stringify(swiftFiles, null, 2));
            // console.log('swiftFiles.length: ' + Object.keys(swiftFiles).length);
            Object.keys(swiftFiles).length.should.be.greaterThanOrEqual(1);
 
        done(); 
    });
});

 describe('It inspect the directory, and return all files by name', function() {
    it('returns the files directory', function(done) {
        var testRoot = '/Users/i826181/sapgithub/healthcaresdk/Foundation/ODataCommunication';
        xcode.cmdGetDirectoryContents(testRoot, function(err, response) {
            Object.keys(response).length.should.be.greaterThanOrEqual(1);
            done(); 
        });
        
    });
    
 });