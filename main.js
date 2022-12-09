prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Q9-nA5OXZ/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis
    speak_data_1 = "The first prediction is " + prediction_1
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        speak();
        if (results[0].label == "Proper Mask") {
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
            document.getElementById("result_emotion_name").innerHTML = "Entry Allowed"
        }
        if (results[0].label == "Improper Mask") {
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
            document.getElementById("result_emotion_name").innerHTML = "Please Adjust Mask Before Entering";
        }
        if (results[0].label == "No Mask") {
            document.getElementById("update_emoji").innerHTML = "&#x26d4;";
            document.getElementById("result_emotion_name").innerHTML = "Entry Denied";
        }
    }
}