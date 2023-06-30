import React from "react";
import { wineData } from "../Data.js";
import "./style.css";

export default function Gamma() {
  // Array to store the measures
  const measures = ["GammaMean", "GammaMedian", "GammaMode"];

  // Array to store classNames (unique Alcohol values)
  const classNames = [];

  // Iterate over the wineData to find unique classNames
  for (let i of wineData) {
    const className = i.Alcohol;

    // Check if the className is already present in the array
    if (!classNames.includes(className)) {
      classNames.push(className);
    }
  }

  // Object to store the result
  const result = {};

  // Iterate over the classNames
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    // Filter the wineData based on the className
    const classData = wineData.filter((item) => item.Alcohol === i + 1);

    // Calculate the gamma values using formula ((Ash * Hue) / Magnesium)
    const gamma = classData.map((item) =>
      (
        (parseFloat(item.Ash) * parseFloat(item.Hue)) /
        parseFloat(item.Magnesium)
      ).toFixed(3)
    );

    const sortedgamma = gamma.map((x) => parseFloat(x)).sort((a, b) => a - b);
    // Calculate the gammaMean
    const gammaMean = (
      gamma.map((x) => parseFloat(x)).reduce((sum, value) => sum + value) /
      classData.length
    ).toFixed(3);

    // Calculate the gammaMedian

    const mid = (classData.length + 1) / 2;
    const gammaMedian =
      classData.length % 2 !== 0
        ? parseFloat(sortedgamma[mid - 1]).toFixed(3)
        : (sortedgamma[mid - 1.5] + sortedgamma[mid - 0.5]) / 2;
    console.log(gammaMedian);
    console.log(sortedgamma);
    // Calculate the gammaMode using modeData function
    const mode = modeData(gamma);

    // Store the calculated values in the result object
    result[className] = [gammaMean, gammaMedian, mode];
  }

  // Function to calculate the mode data
  function modeData(gammas) {
    const frequencies = {};

    // Initialize frequencies array with zeros
    for (const x of gammas) {
      frequencies[x] = 0;
    }

    // Count the frequency of each value in gammas array
    for (const x of gammas) {
      frequencies[x]++;
    }

    // Sort the frequencyArray based on frequency
    const frequencyArray = Object.entries(frequencies).sort(
      (a, b) => a[1] - b[1]
    );

    // Get the mode from the frequencyArray
   const mode =  frequencyArray[frequencyArray.length-1][1]===1? 'N0 MODE' : frequencyArray[frequencyArray.length - 1][0];

    

    

    return mode;
  }
  return (
    <div>
      <table>
        <tr>
          <th>Measures</th>
          {classNames.map((className, index) => (
            <th key={index}>Class{className}</th>
          ))}
        </tr>

        {measures.map((measure, index) => (
          <tr key={index}>
            <th>{measure}</th>
            {classNames.map((className, i) => (
              <td key={i}>{result[className][index]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
