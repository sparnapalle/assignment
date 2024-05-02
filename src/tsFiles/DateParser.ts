// Converts the timestamp to the required format for output json file
export class DateParser {
    getDate(timeStamp: string): string {
      let endTime = new Date(timeStamp);
      return (
        endTime.getFullYear() + "-" + endTime.getMonth() + "-" + endTime.getDate()
      );
    }
  }
  