var Gearman = require('node-gearman');

var conn = new Gearman('localhost', 4730);

function submit(val) {
    var job = conn.submitJob('test', JSON.stringify(val));
    var recvd = '';
    job.on('data', function(data) {
        recvd = recvd + data;
    });
    job.on('end', function() {
        console.log("Done", JSON.parse(recvd));
    });
    job.on('error', function(error) {
        console.log(error);
    });
}

submit({value: 0});
submit({value: 1});
