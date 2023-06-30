import React from "react";
import { wineData } from "../Data.js";
import "./style.css";

export default function FlavanoidsStatistics() {
  // Array to store the measures
  const measures = ["flavanoidsMean", "flavanoidsMedian", "flavanoidsMode"];

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
    const classData = wineData
      .filter((item) => item.Alcohol === i + 1)
      .map((x) => parseFloat(x.Flavanoids))
      .sort((a, b) => a - b);

    //  console.log(classData)
    // Calculate the flavanoidsMean
    const flavanoidsMean = (
      classData.reduce((sum, value) => sum + value) / classData.length
    ).toFixed(3);
    // Calculate the flavanoidsMedian
    const mid = (classData.length + 1) / 2;
    const flavanoidsMedian =
      classData.length % 2 !== 0
        ? classData[mid - 1].toFixed(3)
        : (classData[mid - 1.5] + classData[mid - 0.5]) / 2;

    // Calculate the flavanoidsMode using modeData function
    const flavanoidsMode = modeData(classData);

    // Store the calculated values in the result object
    result[className] = [flavanoidsMean, flavanoidsMedian, flavanoidsMode];
  }

  // Function to calculate the mode data
  function modeData(flavanoids) {
    const frequencies = {};

    // Initialize frequencies array with zeros
    for (const x of flavanoids) {
      frequencies[x] = 0;
    }

    // Count the frequency of each value in flavanoids array
    for (const x of flavanoids) {
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

  // Render the table with the calculated values
  return (
    <div>
      <table>
        <tr>
          <th>Measures</th>

          {/* Render classNames as table headers */}
          {classNames.map((className, index) => (
            <th key={index}>Class{className}</th>
          ))}
        </tr>

        {/* Iterate over the measures */}
        {measures.map((measure, index) => (
          <tr key={index}>
            <th>{measure}</th>

            {/* Iterate over classNames to display the values */}
            {classNames.map((className, i) => (
              <td key={i}>{result[className][index]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
