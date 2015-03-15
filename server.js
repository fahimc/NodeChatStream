var mic = require('microphone');
var Lame = require('lame');
var Speaker = require('speaker');
var io = require('socket.io').listen(80);
var stream = require('socket.io-stream');
var lame = new Lame.Decoder();
var speaker = new Speaker({
channels:2,
bitDepth:16,
sampleRate:44100
});
var RaspiCam = require("raspicam");
var camera = new RaspiCam({
mode:'timelapse',
tl:1,
t:-1,
w:180,
h:180,
output:'rc.jpg'
});


var Server=
{
  init:function(){
    this.startServer();
    this.startMic();
    //this.startCamera();
  },
  startServer:function(){

  },
  startMic:function(){
    mic.audioStream.pipe(speaker);

    mic.startCapture();
    mic.audioStream.on('data',function(data){
    //if(data)process.stdout.write(data);
    //lame.write(data);
     stream.pipe(data);
    });
  },
  startCamera:function(){
    camera.start( );
    camera.on("read", function(err, timestamp, filename){
    //do stuff
    console.log(filename);
    });
  }
}

Server.init();
//process.stdin.resume();
//process.stdin.pipe(speaker);



//lame.resume();






//to take a snapshot, start a timelapse or video recording


//listen for the "read" event triggered when each new photo/video is saved
