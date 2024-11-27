let config = {}

function controlLabel(div, label, control) {
  const wrapper = createP(label + ":")
  wrapper.child(control)
  div.child(wrapper)
}

function setup() {
  config = {
    mainCircleRadius: createSlider(10, 500, 150), // Radius of the main circle
    circleThickness: createSlider(1, 20, 2), // Thickness of the main circle
    innerOuterOffset: createSlider(0, 100, 30), // Distance between helper circles
    innerCircleCount: createSlider(0, 10, 2), // Number of inner helper circles
    outerCircleCount: createSlider(0, 10, 2), // Number of outer helper circles
    lineCount: createSlider(0, 200, 96), // Number of lines around the circle
    lineLengthInward: createSlider(0, 500, 50), // Line length inward from the circle
    lineLengthOutward: createSlider(0, 500, 50), // Line length outward from the circle
    lineThickness: createSlider(0, 10, 2), // Thickness of the lines
    extraRotation: createSlider(0, 360, 40), // Additional rotation for each line (degrees)
    lineColor: [130, 130, 130], // Fixed color for the lines
  };

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();

  // input = createInput('Type your name');
  let controlsDiv = createDiv('Controls');
  controlsDiv.style('position', 'absolute');
  controlsDiv.style('border-radius', '5px');
  controlsDiv.style('margin', '5px');
  controlsDiv.style('padding', '5px');
  controlsDiv.style('top', '0');
  controlsDiv.style('left', '0');
  controlsDiv.style('border', '1px solid gray');
  controlLabel(controlsDiv, "mainCircleRadius", config.mainCircleRadius)
  controlLabel(controlsDiv, "circleThickness", config.circleThickness)
  controlLabel(controlsDiv, "innerOuterOffset", config.innerOuterOffset)
  controlLabel(controlsDiv, "innerCircleCount", config.innerCircleCount)
  controlLabel(controlsDiv, "outerCircleCount", config.outerCircleCount)
  controlLabel(controlsDiv, "lineCount", config.lineCount)
  controlLabel(controlsDiv, "lineLengthInward", config.lineLengthInward)
  controlLabel(controlsDiv, "lineLengthOutward", config.lineLengthOutward)
  controlLabel(controlsDiv, "lineThickness", config.lineThickness)
  controlLabel(controlsDiv, "extraRotation", config.extraRotation)
  const save = createButton("Save")
  controlsDiv.child(save)
}

function draw() {
  const mainCircleRadius = config.mainCircleRadius.value()
  const circleThickness = config.circleThickness.value()
  const innerOuterOffset = config.innerOuterOffset.value()
  const innerCircleCount = config.innerCircleCount.value()
  const outerCircleCount = config.outerCircleCount.value()
  const lineCount = config.lineCount.value()
  const lineLengthInward = config.lineLengthInward.value()
  const lineLengthOutward = config.lineLengthOutward.value()
  const lineThickness = config.lineThickness.value()
  const extraRotation = config.extraRotation.value()
  background(255);
  translate(width / 2, height / 2);

  // Draw the main circle
  strokeWeight(circleThickness);
  ellipse(0, 0, mainCircleRadius * 2);

  // Draw inner helper circles
  for (let i = 1; i <= innerCircleCount; i++) {
    let radius = mainCircleRadius - i * innerOuterOffset;
    strokeWeight(1);
    ellipse(0, 0, radius * 2);
  }

  // Draw outer helper circles
  for (let i = 1; i <= outerCircleCount; i++) {
    let radius = mainCircleRadius + i * innerOuterOffset;
    strokeWeight(1);
    ellipse(0, 0, radius * 2);
  }

  // Draw lines starting from the main circle's edge
  let angleStep = 360 / lineCount;
  for (let i = 0; i < lineCount; i++) {
    // Calculate the starting angle of the line
    let angle = i * angleStep;

    // Calculate the start point on the circle
    let x1 = cos(angle) * mainCircleRadius;
    let y1 = sin(angle) * mainCircleRadius;

    // Calculate the line's directions with the extra rotation
    let adjustedAngle = angle + extraRotation;

    let x2 = x1 + cos(adjustedAngle) * lineLengthOutward;
    let y2 = y1 + sin(adjustedAngle) * lineLengthOutward;
    let x3 = x1 - cos(adjustedAngle) * lineLengthInward;
    let y3 = y1 - sin(adjustedAngle) * lineLengthInward;

    // Draw the line
    stroke(config.lineColor);
    strokeWeight(lineThickness);
    line(x3, y3, x2, y2);
  }
  // nameP.html(input.value());
  // text(input.value(), 10, 20);
}


// Always resize the canvas to fill the browser window.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}