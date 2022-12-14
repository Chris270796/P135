status = "";
objects = [];
target = "";

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocosd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    target = document.getElementById("input").value;
}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function draw() {
    image(video, 0, 0, 500, 400);
    objects
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == target) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = target + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(target + " Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML = target + " Not Found";
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}