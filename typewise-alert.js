const COOLING_LIMITS = {
  PASSIVE_COOLING: {lowerLimit: 0, upperLimit: 35},
  HI_ACTIVE_COOLING: {lowerLimit: 0, upperLimit: 45},
  MED_ACTIVE_COOLING: {lowerLimit: 0, upperLimit: 40},
};

function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  } else if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function classifyTemperatureBreach(coolingType, temperatureInC, limits) {
  const {lowerLimit, upperLimit} = limits[coolingType];
  return inferBreach(temperatureInC, lowerLimit, upperLimit);
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const breachType = classifyTemperatureBreach(
    batteryChar["coolingType"],
    temperatureInC,
    COOLING_LIMITS
  );
  if (alertTarget == "TO_CONTROLLER") {
    sendToController(breachType);
  } else if (alertTarget == "TO_EMAIL") {
    sendToEmail(breachType);
  }
}

function sendToController(breachType) {
  const header = 0xfeed;
  print(`${header}, ${breachType}`);
}

function sendToEmail(breachType) {
  const recepient = "a.b@c.com";
  if (breachType == "TOO_LOW") {
    print(`To: ${recepient}`);
    print("Hi, the temperature is too low");
  } else if (breachType == "TOO_HIGH") {
    print(`To: ${recepient}`);
    print("Hi, the temperature is too high");
  }
}
function print(message){
  console.log(message);
}

module.exports = {
  inferBreach,
  classifyTemperatureBreach,
  checkAndAlert,
  sendToController,
  sendToEmail,
  COOLING_LIMITS
};
