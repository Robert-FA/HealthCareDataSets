let covidClassifer
let canvas

function preload(){
  positiveImage = loadImage(`image55.png`)
  negativeImage = loadImage(`CHNCXR_0001_0.png`)
}

function setup() {
  canvas = createCanvas(400, 400);
  image(positiveImage,0,0,canvas.width /2,canvas.height /2)
  image(negativeImage,0,200,canvas.width /2,canvas.height /2)
  
  let options = {
    inputs:[64,64,4],
    task: 'imageClassification',
  }
  const modelData = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }
  
  covidClassifer = ml5.neuralNetwork(options)
  covidClassifer.load(modelData, modelLoaded)
}

function keyTyped(){
  if(key == "p"){
    covidClassifer.classify({image:positiveImage},(err,results) => {
      if(err) console.log(err)
      else{
        console.log()
        text(results[0].label + ":" + results[0].confidence,220,50)
      }
    })
  }
  if(key == "n"){
    covidClassifer.classify({image:negativeImage},(err,results) => {
      if(err) console.log(err)
      else{
        text(results[0].label + ":" + results[0].confidence,220,280)
      }
    })
  }
}

function modelLoaded(){
  console.log("loaded!")
}
