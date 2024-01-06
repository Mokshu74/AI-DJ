song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload() {
    song=loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(500,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet model is intialized");
}

function gotPoses(results) {
if(results.length > 0)
{
  console.log(results);
  scorerightWrist=results[0].pose.keypoints[10].score;
  scoreleftWrist=results[0].pose.keypoints[9].score;
  console.log("Score leftwrist: "+scoreleftWrist);
  console.log("Score rightwrist: "+scorerightWrist);
  leftWristX=results[0].pose.leftWrist.x;
  leftWristY=results[0].pose.leftWrist.y;
        
  rightWristX=results[0].pose.rightWrist.x;
  rightWristY=results[0].pose.rightWrist.y;

  console.log("leftWristX= "+leftWristX +"leftWristY= "+leftWristY +"rightWristX= "+rightWristX +"rightWristY= "+rightWristY);
}

}

function draw() {
    image(video,0,0,500,600);
    fill("#FF0000");
    stroke("FF0000");
    if(scoreleftWrist > 0.2)
    {
    circle(LeftWristX,LeftWristY,20);

    InnumberLeftWristY=Number(LeftWristY);
    remove_decimals=floor(InnumberLeftWristY);
    volume=remove_decimals/500;

    document.getElementById('volume').innerHTML="VOLUME : "+volume;
    song.setVolume(volume);
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1.0);
        }
        
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristY <= 400)
        { 
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2.0);
        }

        else if(rightWristY > 400)
        {
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);

        }

    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}






