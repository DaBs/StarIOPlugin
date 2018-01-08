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

        var blob = new Blob([buffer], { type: 'text/plain' });
        var reader = new FileReader();

        reader.onload = function(event) {
            const bufferString = event.target.result;

            exec(function (result) {
                callback(null, result)
            },
            function (error) {
                callback(error)
            }, 'StarIOPlugin', 'printBuffer', [port, bufferString]);
        };

        reader.readAsText(blob);
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