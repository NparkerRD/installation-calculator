import * as rates from "./js/rates.js";
import { roundUp10, roundUp100 } from "./js/helpers.js";

// REFACTOR - Move to separate file: view
// Hangle toggle button
const toggleEl = document.querySelector(".toggle");
let toggleActive = false; // Use to determine how to calculate results

// REFACTOR - Move to separate file: view
// TODO - Create a function that will update the input fields when the 'Calculate flying cost' option has been activated
function renderView(inputNames, resultNames) {
  const calcInputs = document.querySelector(".calc_inputs");
  const calcResults = document.querySelector(".calc_results");

  inputNames.forEach((input) => {
    const inputGroupMarkup = `
        <div class="input_group">
          <label for="${input.toLowerCase()}">${input}</label>
          <input type="number" name="${input.toLowerCase()}" id="${input.toLowerCase()}" value="900" />
        </div>
    `;

    calcInputs.insertAdjacentHTML("beforeend", inputGroupMarkup);
  });

  // Markup can be an array
  resultNames.forEach((result) => {
    const resultGroupMarkup = `
        <div class="result-group">
            <p>${result}</p>
            <div class="result result--${result.toLowerCase()}"></div>
        </div>
        `;

    console.log(resultGroupMarkup);
    // calcResults.insertAdjacentHTML("beforeend", resultGroupMarkup);
  });
}

// REFACTOR - Move to separate file: controller
toggleEl.addEventListener("click", (e) => {
  e.target.closest(".toggle").classList.toggle("toggle--on");
  toggleActive = toggleEl.classList.contains("toggle--on") ? true : false;
  //   TODO - Remove the "Distance" input when toggle is on
  if (toggleActive)
    document.querySelector("#distance")
      ? document.querySelector("#distance").parentElement.remove()
      : "";

  if (!toggleActive) renderView(["Distance"], ["Tickets", "Car Rental"]);
});

// REFACTOR - Move to separate file: model
// WORKING
function calcDrive(miles, cars = 1) {
  const gasPerCar = rates.MILEAGE_RATE * (miles * 2);
  return {
    mileage: roundUp10(gasPerCar),
    totalMileage: roundUp10(gasPerCar * cars),
  };
}

// REFACTOR - Move to separate file: model
// WORKING
function calcFly(people) {
  const ticketCost = rates.TICKET_RATE + rates.CANCELLATION_FEE;
  return {
    tickets: ticketCost,
    ticketTotal: ticketCost * people,
  };
}

// REFACTOR - Move to separate file: model
// WORKING
function calcTravel(days, nights, people, hours) {
  const hotel = rates.HOTEL_RATE * nights * people;
  const travelTime = rates.TRAVEL_RATE * (hours * 2) * people;
  const perDiem = rates.PER_DIEM_RATE * days * people;
  return {
    hotel: hotel,
    travelTime: travelTime,
    perDiem: perDiem,
    travelTotal: hotel + travelTime + perDiem,
  };
}

// REFACTOR - Move to separate file: model
// WORKING
function calcInstall(doors) {
  const doorInstall = rates.STANDARD_DOOR * doors;
  const wiring = rates.HOURLY_RATE * doors;
  return {
    doorInstall: doorInstall,
    wiring: wiring,
    installTotal: doorInstall + wiring,
  };
}

// TODO - Create main calculator function
function calc() {
  const [inDoors, inDays, inNights, inPeople, inHours, inDistance] =
    document.querySelectorAll("input");
  const inputs = document.querySelectorAll("input");

  const travelCosts = calcTravel(
    inDays.value,
    inNights.value,
    inPeople.value,
    inHours.value
  );
  const installCosts = calcInstall(inDoors.value);
  if (!toggleActive) {
    const drivingCosts = calcDrive(inDistance.value);
    console.log("Cost of driving", drivingCosts);
    console.log(
      travelCosts.travelTotal +
        installCosts.installTotal +
        drivingCosts.totalMileage
    );
  }

  if (toggleActive) {
    const flyingCosts = calcFly(inPeople.value);
    console.log("Cost of flying", flyingCosts);
    console.log(
      travelCosts.travelTotal +
        installCosts.installTotal +
        flyingCosts.ticketTotal
    );
  }
}

const btnCalc = document.querySelector(".btn--calculate");
btnCalc.addEventListener("click", (e) => calc());

// REFACTOR - Move to separate file: view
// TODO - Create a function for rendering the results
function renderResults(parentEl, results) {}
