// Used as datatype reference for building output json
export interface dataStruct {
  date: string;
  min: number;
  max: number;
  median: number;
  latestDataTimestamp: string;
}

// Used to build min, max and median from the beats per minute data per day
export class CalculateBeatsPerMinute {
  beatsPerMinuteArray = new Array<number>();

  constructor(beatsPerMinuteArray: number[]) {
    this.beatsPerMinuteArray = beatsPerMinuteArray;
    this.beatsPerMinuteArray.sort();
  }

  getMininum(): number {
    return this.beatsPerMinuteArray[0];
  }
  getMaximum(): number {
    return this.beatsPerMinuteArray[this.beatsPerMinuteArray.length - 1];
  }
  getMedian(): number {
    let arrayLength: number = this.beatsPerMinuteArray.length;
    let index: number = Math.floor(arrayLength / 2);
    if (arrayLength % 2 == 0) {
      return (
        (this.beatsPerMinuteArray[index] +
          this.beatsPerMinuteArray[index - 1]) /
        2
      );
    } else {
      return this.beatsPerMinuteArray[index];
    }
  }
}
