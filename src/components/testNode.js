var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'api.mavenstamp.com',
  'path': '/v1/timestamp/create',
  'headers': {
    'Content-Type': 'application/json',
    'AccessKey': '1616b5bc-3061-47d5-b7f3-aa4f02e70541'
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "{\r\n\t\"comment\": \"create with existing hash\",\r\n\t\"notifications\": [\r\n    {\r\n      \"currency\": 0,\r\n      \"notification_type\": 0,\r\n      \"target\": \"support@mavennet.com\"\r\n    }\r\n  ],\r\n  \"hash\": \"7E8AB922FD332EE183AF0D7AD79D9E6EA4A5A6EBEF012E618518E330D9EE3180\"\r\n}";

req.write(postData);
console.log("processing");

req.end();