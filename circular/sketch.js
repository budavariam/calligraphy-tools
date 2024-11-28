let config = {}

function controlLabel(div, label, control) {
  const wrapper = createDiv()
  const labelText = createSpan(label + ":")
  const valueText = createSpan(control.value())

  // Update value text when slider changes
  control.input(() => {
    valueText.html(control.value())
  })

  // Add the label, slider, and value text to the wrapper
  wrapper.child(labelText)
  wrapper.child(control)
  wrapper.child(valueText)

  div.child(wrapper)
}

function saveValues() {
  const values = {
    mainCircleRadius: config.mainCircleRadius.value(),
    circleThickness: config.circleThickness.value(),
    innerOuterOffset: config.innerOuterOffset.value(),
    innerCircleCount: config.innerCircleCount.value(),
    outerCircleCount: config.outerCircleCount.value(),
    verticalLineCount: config.verticalLineCount.value(),
    lineLengthInward: config.lineLengthInward.value(),
    lineLengthOutward: config.lineLengthOutward.value(),
    lineThickness: config.lineThickness.value(),
    extraRotation: config.extraRotation.value(),
    startRotation: config.startRotation.value(),
    lineColor: config.lineColor,
    centerX: config.centerX.value(),
    centerY: config.centerY.value(),
  }
  if (window.localStorage) {
    localStorage.setItem("controls", JSON.stringify(values))
  }
  console.log(values)
}

function loadValues() {
  const savedValues = JSON.parse(localStorage.getItem("controls"))
  if (savedValues) {
    config.mainCircleRadius.value(savedValues.mainCircleRadius)
    config.circleThickness.value(savedValues.circleThickness)
    config.innerOuterOffset.value(savedValues.innerOuterOffset)
    config.innerCircleCount.value(savedValues.innerCircleCount)
    config.outerCircleCount.value(savedValues.outerCircleCount)
    config.verticalLineCount.value(savedValues.verticalLineCount)
    config.lineLengthInward.value(savedValues.lineLengthInward)
    config.lineLengthOutward.value(savedValues.lineLengthOutward)
    config.lineThickness.value(savedValues.lineThickness)
    config.extraRotation.value(savedValues.extraRotation)
    config.startRotation.value(savedValues.startRotation)
    config.lineColor = savedValues.lineColor
    config.centerX.value(savedValues.centerX)
    config.centerY.value(savedValues.centerY)
  }
}

function setup() {
  config = {
    mainCircleRadius: createSlider(10, 500, 150),
    circleThickness: createSlider(1, 20, 2),
    innerOuterOffset: createSlider(0, 100, 30),
    innerCircleCount: createSlider(0, 10, 2),
    outerCircleCount: createSlider(0, 10, 2),
    verticalLineCount: createSlider(0, 200, 96),
    lineLengthInward: createSlider(0, 500, 50),
    lineLengthOutward: createSlider(0, 500, 50),
    lineThickness: createSlider(0, 10, 2),
    extraRotation: createSlider(0, 360, 40),
    startRotation: createSlider(0, 720, 0),
    lineColor: [130, 130, 130],
    centerX: createSlider(-windowWidth / 2, windowWidth / 2, 0),
    centerY: createSlider(-windowHeight / 2, windowHeight / 2, 0),
  }
  loadValues()

  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  noFill()

  let controlsDiv = createDiv('Controls')
  controlsDiv.style('position', 'absolute')
  controlsDiv.style('border-radius', '5px')
  controlsDiv.style('margin', '5px')
  controlsDiv.style('padding', '5px')
  controlsDiv.style('top', '0')
  controlsDiv.style('left', '0')
  controlsDiv.style('border', '1px solid gray')

  controlLabel(controlsDiv, "Baseline Radius", config.mainCircleRadius)
  controlLabel(controlsDiv, "Baseline Thickness", config.circleThickness)
  controlLabel(controlsDiv, "Helper Lines offset", config.innerOuterOffset)
  controlLabel(controlsDiv, "Helper Lines Inner Count", config.innerCircleCount)
  controlLabel(controlsDiv, "Helper Lines Outer Count", config.outerCircleCount)
  controlLabel(controlsDiv, "Vertical Line Count", config.verticalLineCount)
  controlLabel(controlsDiv, "Vertical Line Length Inward", config.lineLengthInward)
  controlLabel(controlsDiv, "Vertical Line Length Outward", config.lineLengthOutward)
  controlLabel(controlsDiv, "Vertical Line Thickness", config.lineThickness)
  controlLabel(controlsDiv, "Vertical Line Rotation", config.extraRotation)
  controlLabel(controlsDiv, "Vertical Line Offset", config.startRotation) // New label
  controlLabel(controlsDiv, "Center X", config.centerX)
  controlLabel(controlsDiv, "Center Y", config.centerY)

  const saveButton = createButton("Save")
  saveButton.mousePressed(saveValues)
  controlsDiv.child(saveButton)
}

function draw() {
  const mainCircleRadius = config.mainCircleRadius.value()
  const circleThickness = config.circleThickness.value()
  const innerOuterOffset = config.innerOuterOffset.value()
  const innerCircleCount = config.innerCircleCount.value()
  const outerCircleCount = config.outerCircleCount.value()
  const verticalLineCount = config.verticalLineCount.value()
  const lineLengthInward = config.lineLengthInward.value()
  const lineLengthOutward = config.lineLengthOutward.value()
  const lineThickness = config.lineThickness.value()
  const extraRotation = config.extraRotation.value()
  const startRotation = config.startRotation.value()
  const centerX = config.centerX.value()
  const centerY = config.centerY.value()

  background(255)
  translate(width / 2 + centerX, height / 2 + centerY)

  strokeWeight(circleThickness)
  ellipse(0, 0, mainCircleRadius * 2)

  for (let i = 1; i <= innerCircleCount; i++) {
    let radius = mainCircleRadius - i * innerOuterOffset
    strokeWeight(1)
    ellipse(0, 0, radius * 2)
  }

  for (let i = 1; i <= outerCircleCount; i++) {
    let radius = mainCircleRadius + i * innerOuterOffset
    strokeWeight(1)
    ellipse(0, 0, radius * 2)
  }

  let angleStep = 360 / verticalLineCount
  for (let i = 0; i < verticalLineCount; i++) {
    let angle = i * angleStep + startRotation

    let x1 = cos(angle) * mainCircleRadius
    let y1 = sin(angle) * mainCircleRadius

    let adjustedAngle = angle + extraRotation
    let x2 = x1 + cos(adjustedAngle) * lineLengthOutward
    let y2 = y1 + sin(adjustedAngle) * lineLengthOutward
    let x3 = x1 - cos(adjustedAngle) * lineLengthInward
    let y3 = y1 - sin(adjustedAngle) * lineLengthInward

    stroke(config.lineColor)
    strokeWeight(lineThickness)
    line(x3, y3, x2, y2)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
