import {sleep,subscribe,publish} from './koios_util.mjs';


export async function DisplayMessage(text) {
    console.log("In DisplayMessage");
    var msg=document.getElementById("message");
    var msgtext=document.getElementById("msg-text");
    //console.log(msg);
    msgtext.innerText=text;

    msg.style.display="block";
    await sleep(1000);
    msg.style.display="none";
}

export async function SwitchDisplayMessageContinous(fOn) {
    console.log("In InitDisplayMessageContinous");
    var msg=document.getElementById("message");
    msg.style.display=fOn?"block":"none";

    var msgtext=document.getElementById("msg-text");
    msgtext.innerText = "";

}


export async function DisplayMessageContinous(text) {
    //console.log("In DisplayMessageContinous");
    var msg=document.getElementById("message");
    var msgtext=document.getElementById("msg-text");
    //console.log(msg);
    msgtext.innerText +=text+"\n";
    msgtext.scrollTop = msgtext.scrollHeight; // keep the windows "scrolled down"

}

var prevtime=0;
async function VisibilityChange() {
      console.log(`VisibilityChange ${document.visibilityState}`);
      if (document.visibilityState == 'visible') {
          var currenttime = new Date();
          DisplayMessage(`Welcome back after ${Math.round( (currenttime.getTime()-prevtime.getTime())/1000)} seconds`);
      }   else
          prevtime=  new Date()
}

var prevsum=0
var count =10;

function TestAccelerometer() {
    let accelerometer = null;
    try {
        accelerometer = new Accelerometer({ referenceFrame: 'device' });
        accelerometer.addEventListener('error', event => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
                // Branch to code for requesting permission.
            } else if (event.error.name === 'NotReadableError' ) {
                console.log('Cannot connect to the sensor.');
            }
        });
        accelerometer.addEventListener('reading', x=> {
                var sum = (x.target.x + x.target.y + x.target.z)
                var delta = Math.abs(sum-prevsum)
                count++
                if (delta > 3 ) {
                    console.log(`delta ${delta} ${count}`)
                    if (count > 10) {
                        DisplayMessage("Phone is shaking");
                        count = 0;
                    }
                }
                 prevsum = sum;
        } );
        accelerometer.start();
    } catch (error) {
        // Handle construction errors.
        if (error.name === 'SecurityError') {
            // See the note above about feature policy.
            console.log('Sensor construction was blocked by a feature policy.');
        } else if (error.name === 'ReferenceError') {
            console.log('Sensor is not supported by the User Agent.');
        } else {
            throw error;
        }
    }
}


var countor =10;
function handleOrientation(event) {
    var x= event.beta
    var y= event.gamma
    var sum = Math.abs(x+y)
    countor++;
    console.log(`sum=${sum} ${countor}`);
    if (sum < 3) {

         if (countor > 10) {
              DisplayMessage("Phone perfectly flat");
              countor=0;
         }
    }
}

async function MessagesStart() {
    SwitchDisplayMessageContinous(true)
    DisplayMessageContinous("Starting Koios online player");
    document.addEventListener('visibilitychange',VisibilityChange)

    console.log(window.Gyroscope);
    console.log(window.ProximitySensor);
    console.log(window.AmbientLightSensor);
    console.log(window.Accelerometer);
    TestAccelerometer();

    window.addEventListener("deviceorientation", handleOrientation, true);

}

async function Playerloaded() {
    await DisplayMessageContinous("Player loaded, have fun today");
    await sleep(3000);
    SwitchDisplayMessageContinous(false)
}

subscribe('playerstart',    MessagesStart);
subscribe('playerloaded',   Playerloaded);
