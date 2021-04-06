/*
[Ref]
https://www.npmjs.com/package/amqplib
*/
import * as _ from 'lodash';
var amqp = require('amqplib');
var mq_host = 'amqp://127.0.0.1';
(()=>{
    var fn = {
 
        '_'(){ 
            amqp.connect(mq_host).then(function(conn) {
                return conn.createChannel().then(function(ch) {
                    var q = 'hello';
                    var msg = 'Hello World!';
                
                    var ok = ch.assertQueue(q, {durable: false});
                
                    return ok.then(function(_qok) {
                    ch.sendToQueue(q, Buffer.from(msg));
                    console.log(" [x] Sent '%s'", msg);
                    return ch.close();
                    });
                }).finally(function() { conn.close(); });
            }).catch(console.warn);
        },
        'x'(){
            amqp.connect(mq_host).then(function(conn) {
            process.once('SIGINT', function() { conn.close(); });
            return conn.createChannel().then(function(ch) {

                var ok = ch.assertQueue('hello', {durable: false});

                ok = ok.then(function(_qok) {
                return ch.consume('hello', function(msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
                });

                return ok.then(function(_consumeOk) {
                console.log(' [*] Waiting for messages. To exit press CTRL+C');
                });
            });
            }).catch(console.warn);
        },
        /* 
        Publish/Subscribe
        https://github.com/squaremo/amqp.node/blob/main/examples/tutorials/emit_log.js
        */
        'emit_log.js'(){
            amqp.connect(mq_host).then(function(conn) {
                return conn.createChannel().then(function(ch) {
                  var ex = 'logs';
                  var ok = ch.assertExchange(ex, 'fanout', {durable: false})
                  
                  var message = 
                    //process.argv.slice(2).join(' ') ||
                    'info: Hello World!';
              
                  return ok.then(function() {
                    ch.publish(ex, '', Buffer.from(message));
                    console.log(" [x] Sent '%s'", message);
                    return ch.close();
                  });
                }).finally(function() { conn.close(); });
              }).catch(console.warn);
        },
        /*
        https://github.com/squaremo/amqp.node/blob/main/examples/tutorials/receive_logs.js
        使用RabbitMQ作為廣播機制。 emitt_log向扇出交換機發送“ log”消息，
        並且所有receive_logs進程都接收日誌消息。
         */
        'receive_logs'(){
            amqp.connect(mq_host).then(function(conn) {
                process.once('SIGINT', function() { conn.close(); });
                return conn.createChannel().then(function(ch) {
                  var ok = ch.assertExchange('logs', 'fanout', {durable: false});
                  ok = ok.then(function() {
                    return ch.assertQueue('', {exclusive: true});
                  });
                  ok = ok.then(function(qok) {
                    return ch.bindQueue(qok.queue, 'logs', '').then(function() {
                      return qok.queue;
                    });
                  });
                  ok = ok.then(function(queue) {
                    return ch.consume(queue, logMessage, {noAck: true});
                  });
                  return ok.then(function() {
                    console.log(' [*] Waiting for logs. To exit press CTRL+C');
                  });
              
                  function logMessage(msg) {
                    console.log(" [x] '%s'", msg.content.toString());
                  }
                });
              }).catch(console.warn);

        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()