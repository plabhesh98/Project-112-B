prediction = "";
prediction_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function Take_Snapshot() {
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version: " , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/nS7xhR36T/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function Identify_color() {
img = document.getElementById("captured_image");
classifier.classify(img,gotResult);
}

function gotResult(error, results) {
    if(error){
        console.log(error);
    }else{
        console.log(results);  
        document.getElementById("color_name").innerHTML = results[0].label;  
        document.getElementById("color_name2").innerHTML = results[1].label;
        prediction = results[0].label;
        prediction_1 = results[1].label;
        speak()
    }
}

function speak() {
    var synth = window.speechSynthesis;
    Speak_data = "The first prediction " + prediction;
    Speak_data_1 = "And the second prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(Speak_data + Speak_data_1);
    synth.speak(utterThis);
}
