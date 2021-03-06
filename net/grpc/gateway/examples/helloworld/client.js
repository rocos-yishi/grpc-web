/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const {HelloRequest, RepeatHelloRequest,
       HelloReply} = require('./helloworld_pb.js');
const {GreeterClient} = require('./helloworld_grpc_web_pb.js');

var client = new GreeterClient('http://' + window.location.hostname + ':8080',
                               null, null);

// simple unary call
// var request = new HelloRequest();
// request.setName('World');

// client.sayHello(request, {}, (err, response) => {
//   console.log('sayHello', response.getMessage());
// });


// server streaming call
var streamRequest = new RepeatHelloRequest();
streamRequest.setName('name');
streamRequest.setCount(1000);
streamRequest.setInterval(100);  // in ms
streamRequest.setMessageSize(100); // in KB

var stream = client.sayRepeatHello(streamRequest, {});
stream.on('data', (response) => {
  console.log('data');
  // console.log(response.getMessage());
});
  

// // deadline exceeded
// var deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 1);

// client.sayHelloAfterDelay(request, {deadline: deadline.getTime()},
//   (err, response) => {
//     console.log('Got error, code = ' + err.code +
//                 ', message = ' + err.message);
//   });
