var Gearman = require('node-gearman');
var Backbone = require('backbone');

var Model = Backbone.Model.extend({
    validate: function(attrs) {
        if (attrs.value != 1) return "Value must be 1";
    }
});

var conn = new Gearman('localhost', 4730);

conn.registerWorker("test", function(payload, worker) {
    payload = JSON.parse(payload);
    console.log('Job!', payload);
    var done = false;
    var m = new Model();
    m.on('error', function(error) {
        done = true;
        console.log('Payload is bad');
        return worker.error();
    });
    m.set(payload);

    if(!done) {
        console.log("Payload is good");
        return worker.end(true);
    }
});
