cordova.define("fr.sellsy.startio.StarPrinter", function(require, exports, module) {
    var exec = require("cordova/exec");
    
    module.exports = {
        checkStatus: function (port, callback) {
            exec(function (result) {
                    callback(null, result)
                },
                function (error) {
                    callback(error)
                }, 'StarIOPlugin', 'checkStatus', [port]);
        },
        portDiscovery: function (type, callback) {
            type = type || 'All';
            exec(function (result) {
                    callback(null, result)
                },
                function (error) {
                    callback(error)
                }, 'StarIOPlugin', 'portDiscovery', [type]);
        },
        printReceipt: function (port, receipt, callback) {
            exec(function (result) {
                    callback(null, result)
                },
                function (error) {
                    callback(error)
                }, 'StarIOPlugin', 'printReceipt', [port, receipt]);
        },
        printBuffer: function (port, buffer, callback) {

            var binary = '';
            var bytes = new Uint8Array(buffer);
            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode( bytes[i] );
            }

            var bufferString = window.btoa(binary);
    
            exec(function (result) {
                callback(null, result)
            },
            function (error) {
                callback(error)
            }, 'StarIOPlugin', 'printBuffer', [port, bufferString]);
    
        },
        openCashDrawer: function (port, callback) {
            exec(function (result) {
                    callback(null, result)
                },
                function (error) {
                    callback(error)
                }, 'StarIOPlugin', 'openCashDrawer', [port]);
        },
        connect: function (port, callback) {
            var connected = false;
            exec(function (result) {
                    //On initial connection - fire callback, otherwise fire a window event
                    if (!connected) {
                        callback(null, result);
                        connected = true;
                    } else {
                        //This event will be to notify of events like barcode scans
                        cordova.fireWindowEvent("starIOPluginData", result);
                    }
                },
                function (error) {
                    callback(error)
                }, 'StarIOPlugin', 'connect', [port]);
        }
    };
    });
    