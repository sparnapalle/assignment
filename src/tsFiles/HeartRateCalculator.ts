// Main file for parsing the input json and generating the output
import heartRateData from "../testData/heartrate.json";
import * as processBeatsPerMin from "./ProcessBeatsPerMin";
import { DateParser } from "./DateParser";
import * as fs from "fs";

/* Script to parse input data and output to the json file */
// Create output JSON Object
let outputData: any[] = [];

//Initialize DateParser object to utilize its functions
let dateParserObj = new DateParser();

// Get the initial date to compare with the rest
let prevEndTimeStamp: string = heartRateData[0].timestamps.endTime;
let prevDate = new Date(dateParserObj.getDate(prevEndTimeStamp));

let beatsPerMinuteArray: number[] = [heartRateData[0].beatsPerMinute];
let outputJSONArray: processBeatsPerMin.dataStruct[] = [];
let calculateBeatsPerMinuteObj;

for (let data = 1; data < heartRateData.length; data++) {
  let endTimeStamp: string = heartRateData[data].timestamps.endTime;
  let currentDate = new Date(dateParserObj.getDate(endTimeStamp));

  if (currentDate > prevDate) {
    buildOutputData(prevEndTimeStamp, beatsPerMinuteArray);
    beatsPerMinuteArray = [];
    prevDate = currentDate;
  }

  beatsPerMinuteArray.push(heartRateData[data].beatsPerMinute);
  prevEndTimeStamp = endTimeStamp;
  if (data == heartRateData.length - 1) {
    buildOutputData(prevEndTimeStamp, beatsPerMinuteArray);
    printOutputToFile();
  }
}

// Method to build the JSON output after processing the input data
function buildOutputData(
  prevEndTimeStamp: string,
  beatsPerMinuteArray: number[]
) {
  calculateBeatsPerMinuteObj = new processBeatsPerMin.CalculateBeatsPerMinute(
    beatsPerMinuteArray
  );
  outputData.push({
    date: dateParserObj.getDate(prevEndTimeStamp),
    min: calculateBeatsPerMinuteObj.getMininum(),
    max: calculateBeatsPerMinuteObj.getMaximum(),
    median: calculateBeatsPerMinuteObj.getMedian(),
    latestDataTimestamp: prevEndTimeStamp,
  });
}

//Method to print output to file
function printOutputToFile() {
  //console.log(outputData);
  let outputDir = "build/testOutput";
  let fileName = "output.json";
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  } catch (errorMsg) {
    console.error(errorMsg);
  }
  fs.writeFile(
    outputDir + "/" + fileName,
    JSON.stringify(outputData),
    (errorMsg) => {
      if (errorMsg) console.log(errorMsg);
      else {
        console.log("Output processing completed.");
      }
    }
  );
}
