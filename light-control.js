var url = '128.122.151.15';           // the hub IP address
var username = 'x19VZTDs7MOAdQ1O4wvQDU5QynGNuHDu3q9r2rbR';    // fill in your Hub-given username var resultDiv;
var dimmer;
var lightNumber = [3,10,15,16,17,18,21,22];
/*3:toplight SL,   0
10:Hue lightstrip cable rack,   1
15:Hue lightstrip kitchen       2
16:frontlight SR                3
17:frontlight SL                4
18:toplight SR                  5
21:backlight SR                 6
22:backlight SL                 7
*/
var sname='sequenceName';
var iflightup=false;
let timer = 6;
let a=6;
let count=0;
let button1;
let start=false;
let if1=false;//All off
let if2=false;//all up
let if3=false;//Walk&openning
let if4=false;//blue/purple flash
let if5=false;//highlight face
let if6=false;//walk&openning2
let if7=false;//Changing CT
let if8=false;//walk & openning (off)Changing CT (off)
// let color= color(255, 204, 0);
let timeInterval=2000;//every 2 seconds as a Interval
function setup() {
  createCanvas(windowWidth, 2000);

  resultDiv = createDiv('Hub response');  // a div for the Hue hub's responses
  resultDiv.position(10, 100); 
    // connect to Hue hub; it will show all light states   
    connect();  
  
  var offButton = createButton("All off"); //light off all lights
  offButton.position(100, 210);
  offButton.mouseClicked(lightOff);


  var onButton = createButton("light up"); //light up all lights
  onButton.position(100, 110);
  onButton.mouseClicked(lightUp);

  

  var seq1Button =createButton("Walk&openning"); //light up all lights
  seq1Button.position(100, 310);
  seq1Button.mouseClicked(myCheckedSeq1);

  
  var seq2Button = createButton("blue/purple flash"); //light up all lights
  seq2Button.position(100, 410);
  seq2Button.mouseClicked(myCheckedSeq2);

 

  var seq3Button = createButton("highlight face"); //light up all lights
  seq3Button.position(100, 510);
  seq3Button.mouseClicked(myCheckedSeq3);


  var seq4Button = createButton("walk&openning2"); //light up all lights
  seq4Button.position(100, 510);
  seq4Button.mouseClicked(myCheckedSeq4);

 

  var seq5Button = createButton("Changing CT"); //light up all lights
  seq5Button.position(100, 610);
  seq5Button.mouseClicked(myCheckedSeq5);



  var seq6Button = createButton("Walk & openning (off)Changing CT (off)"); //light up all lights
  seq6Button.position(100, 710);
  seq6Button.mouseClicked(myCheckedSeq6);

 
  background(255, 204, 100);
  

  

  
 

}

function draw(){

 if(if1){
  sname='all off';
  
  }else if(if2){
    sname='all on';

  }
   if(if3){
    sname='Walk&openning';

  }
   if(if4){
   sname='blue/purple flash';

  }
  if(if5){
   sname='highlight face';
  
  }
   if(if6){
    sname='walk&openning2';

  }
   if(if7){
    sname='Changing CT';
  
  }
   if(if8){
    sname='Walk(off) & CT (off)';
    
  }


  fill(0, 0, 0,150);
  rect(350, 20, 600, 650);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text(sname, 650, 300);

  
  if(a==timeInterval-1){
    count++;
  }
  if(count>0&&start){
  text(timer, width/2, height/2);
  }

  if(second()%timeInterval==0&&count>0&&start){
  timer=0;
  color=255;
  }
  else if(count>0&&start){
    timer=a;
    color=0;
  }

}
/*
this function makes the HTTP GET call to get the light data:
HTTP GET http://your.hue.hub.address/api/username/lights/
*/
function connect() {
  url = "http://" + url + '/api/' + username + '/lights/';
  httpDo(url, 'GET', getLights);
}

/*
this function uses the response from the hub
to create a new div for the UI elements
*/
function getLights(result) {
  resultDiv.html(result);
}

function lightOff() {
  
if1=true;
//  var ifOn = this.value(); // get the value of this slider
 var lightState = {             // make a JSON object with it
  //  bri: brightness,
   on: false
 }
// make the HTTP call with the JSON object:
for(let i=0;i<lightNumber.length;i++){
 setLight(lightNumber[i], lightState);
}
}

/*
0:30 - Model first reveal moment, (all lights on)
No colored lights
White bulbs (0, cold)
60% brightness
Winter themed
*/

function lightUp() {
  if2=true;
    var brightness = 255; // get all lights light up 
   var lightState = {             
    bri: brightness,
     on: true
   }
  // make the HTTP call with the JSON object:
  for(let i=0;i<lightNumber.length;i++){
   setLight(lightNumber[i], lightState);
  }
  }

  function ifStart(){
    if (this.checked()) {
    start=true;
    }
    else{
      start=false;
      count=0;
    }
  }
  
  
  function iflightoffChecked(){

    iflightup=false;
    

  }
  function iflightupChecked(){

    iflightup=true;

  }

  function myCheckedSeq1(){
     if3=true;
    sequence1();
   
  }


  function sequence1(){ 

    var brightness =255;           //Back SR bri:255
    var lightState = {             // make a JSON object with it
      bri: brightness,
      on: true
    }
    setLight(lightNumber[6], lightState);
    var brightness2 =255;  
    var lightState2 = {             // Back SL bri:255
      bri: brightness2,
      ct:153,
      on: true
    }
    setLight(lightNumber[7], lightState2);


    var lightState3 = {             
      //  bri: brightness,
       on: false
     }
    // make the HTTP call with the JSON object:
    for(let i=0;i<(lightNumber.length-2);i++){
     setLight(lightNumber[i], lightState3);
    }

    } 
    

  function myCheckedSeq2(){
     if4=true;
      setTimeout(sequence4, 0);
      setTimeout(sequence3, 3000);
      setTimeout(sequence4, 6000);
      setTimeout(sequence3, 9000);
  
    
    
  }

  function sequence4(){ 

      //Back SR bri:255      
    var lightState = {             // make a JSON object with it
      bri: 255,
      on: true
    }
    setLight(lightNumber[6], lightState);
 
    var lightState2 = {             // Back SL bri:255
      bri: 0,
      ct:153,
      on: true
    }
    setLight(lightNumber[7], lightState2);
    var lightState3 = {             // Top SR blue 41579
      bri: 255,
      hue: 41579,
      on: true
    }
    setLight(lightNumber[5], lightState3);
    var lightState4 = {             // Strip purple 50431
      bri: 255,
      hue: 50431,
      on: true
    }
    setLight(lightNumber[1], lightState4);

    var lightState5 = {             
      //  bri: brightness,
       on: false
     }

     setLight(lightNumber[0], lightState5);
     setLight(lightNumber[3], lightState5);
     setLight(lightNumber[4], lightState5);
   
    } 

    function sequence3(){ 

      var lightState = {             // make a JSON object with it
        bri: 0,
        on: true
      }
      setLight(lightNumber[6], lightState);
   
      var lightState2 = {             // Back SL bri:255
        bri: 255,
        ct:153,
        on: true
      }
      setLight(lightNumber[7], lightState2);
     
      var lightState3 = {             // Top SR blue 50431
        bri: 255,
        hue: 50431,
        on: true
      }
      setLight(lightNumber[5], lightState3);
      var lightState4 = {             // Strip purple 41579
        bri: 255,
        hue: 41579,
        on: true
      }
      setLight(lightNumber[1], lightState4);

      var lightState5 = {             
        //  bri: brightness,
         on: false
       }
  
       setLight(lightNumber[0], lightState5);
       setLight(lightNumber[3], lightState5);
       setLight(lightNumber[4], lightState5);
  
  
      } 



  function myCheckedSeq3(){
     if5=true;
      sequence5();
   
  }

  
 
  function sequence5(){         // highlight face
 
    var lightState = {             // front SR 
      bri: 255,
      ct:153,
      on: true
    }
    setLight(lightNumber[3], lightState);
    var lightState2= {             // front SL
      bri: 128,
      on: true
    }
    setLight(lightNumber[4], lightState2);
    var lightState3 = {             // Strip purple 41579
      bri: 255,
      hue: 41579,
      on: true
    }
    setLight(lightNumber[1], lightStat3);

    var lightState5 = {             
      //  bri: brightness,
       on: false
     }

     setLight(lightNumber[0], lightState5);
     setLight(lightNumber[5], lightState5);
     setLight(lightNumber[6], lightState5);
     setLight(lightNumber[7], lightState5);

  }


 function myCheckedSeq4(){
     if6=true;
      setTimeout(sequence6, 0);
      setTimeout(lightOff, 10000);
   
  }

// Walk & openning2
  function sequence6(){ 
    var lightState = {             // front SR 
      bri: 255,
      ct:153,
      on: true
    }
    setLight(lightNumber[3], lightState);
    var lightState2= {             // front SL & back SR
      bri: 128,
      on: true
    }
    setLight(lightNumber[4], lightState2);
    setLight(lightNumber[6], lightState2);
    var lightState3= {             // back SL
      bri: 255,
      ct:153,
      on: true
    }
    setLight(lightNumber[7], lightState3);

    var lightState5 = {             
      //  bri: brightness,
       on: false
     }

     setLight(lightNumber[0], lightState5);
     setLight(lightNumber[1], lightState5);
     setLight(lightNumber[5], lightState5);

  }



  function myCheckedSeq5(){
     if7=true;
      sequence7();
   
  }

// changing CT
  function sequence7(){
    var lightState = {             // front SR 
      bri: 255,
      ct:454,
      on: true
    }
    setLight(lightNumber[3], lightState);
    var lightState2= {             // front SL & back SR
      bri: 128,
      on: true
    }
    setLight(lightNumber[4], lightState2);
    setLight(lightNumber[6], lightState2);

    var lightState3= {             // back SL
      bri: 255,
      ct:454,
      on: true
    }
    setLight(lightNumber[7], lightState3);

    var lightState4 = {             // Strip purple 50431
      bri: 255,
      hue: 8057,
      sat: 255,
      on: true
    }
    setLight(lightNumber[1], lightState4);

    var lightState5 = {             
      //  bri: brightness,
       on: false
     }

     setLight(lightNumber[0], lightState5);
     setLight(lightNumber[5], lightState5);
  }

  function myCheckedSeq6(){
     if8=true;
      sequence8();
   
  }

  function sequence8(){
    var lightState = {             // front SR 
      bri: 255,
      ct:454,
      on: true
    }
    setLight(lightNumber[3], lightState);
    var lightState2= {             // front SL & back SR
      bri: 128,
      on: true
    }
    setLight(lightNumber[4], lightState2);

    var lightState4 = {             // Strip purple 50431
      bri: 255,
      ct:153,
      hue: 8057,
      on: true
    }
    setLight(lightNumber[1], lightState4);

    var lightState5 = {             
      //  bri: brightness,
       on: false
     }

     setLight(lightNumber[0], lightState5);
     setLight(lightNumber[5], lightState5);
     setLight(lightNumber[6], lightState5);
     setLight(lightNumber[7], lightState5);
  }

function setLight(whichLight, data) {
  var path =    url + whichLight + '/state/';

  var content = JSON.stringify(data);				 // convert JSON obj to string

  httpDo( path, 'PUT', content, 'text', getLights); //HTTP PUT the change
}




