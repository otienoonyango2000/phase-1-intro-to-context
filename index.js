// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
  }
  function createTimeInEvent(bpRecordObj, dateStamp) {
    let obj = {
      type: "TimeIn",
      hour: parseInt(dateStamp.slice(-4)),
      date: dateStamp.slice(0, 10),
    };
    bpRecordObj.timeInEvents.push(obj);
    return bpRecordObj;
  }
  function createTimeOutEvent(bpRecordObj, dateStamp) {
    let obj = {
      type: "TimeOut",
      hour: parseInt(dateStamp.slice(-4)),
      date: dateStamp.slice(0, 10),
    };
    bpRecordObj.timeOutEvents.push(obj);
    return bpRecordObj;
  }
  function hoursWorkedOnDate(bpRecordObj, date) {
    let hours;
    for (let i = 0; i < bpRecordObj.timeInEvents.length; i++) {
      if (bpRecordObj.timeInEvents[i].date === date) {
        if (bpRecordObj.timeOutEvents[i].date === date) {
          hours =
            bpRecordObj.timeOutEvents[i].hour - bpRecordObj.timeInEvents[i].hour;
        }
      }
    }
    return hours / 100;
  }
  function wagesEarnedOnDate(bpRecordObj, date) {
    return hoursWorkedOnDate(bpRecordObj, date) * bpRecordObj.payPerHour;
  }
  function allWagesFor(bpRecordObj) {
    let allPay = [];
    let allDates = [];
    for (let i = 0; i < bpRecordObj.timeInEvents.length; i++) {
      allDates.push(bpRecordObj.timeInEvents[i].date);
    }
    allDates.forEach((date) => {
      allPay.push(wagesEarnedOnDate(bpRecordObj, date));
    });
    return allPay.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }
  function calculatePayroll(updatedBpRecord) {
    let payroll = [];
    updatedBpRecord.forEach((employee) => {
      payroll.push(allWagesFor(employee));
    });
    return payroll.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }
  
  
  
  
  
  
  
  
  