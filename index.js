class Employee {
    constructor(firstName, familyName, title, payPerHour) {
      this.firstName = firstName
      this.familyName = familyName
      this.title = title
      this.payPerHour = payPerHour
      this.timeInEvents = []
      this.timeOutEvents = []
    }
  
    addTimeInEvent(date, hour) {
      this.timeInEvents.push({ type: "TimeIn", date, hour })
      return this
    }
  
    addTimeOutEvent(date, hour) {
      this.timeOutEvents.push({ type: "TimeOut", date, hour })
      return this
    }
  
    hoursWorkedOnDate(date) {
      const timeInEvent = this.timeInEvents.find((event) => event.date === date)
      const timeOutEvent = this.timeOutEvents.find((event) => event.date === date)
  
      if (timeInEvent && timeOutEvent) {
        const timeIn = parseInt(timeInEvent.hour, 10)
        const timeOut = parseInt(timeOutEvent.hour, 10)
        return (timeOut - timeIn) / 100
      }
  
      return 0
    }
  
    wagesEarnedOnDate(date) {
      const hoursWorked = this.hoursWorkedOnDate(date)
      return hoursWorked * this.payPerHour
    }
}
  
function createEmployeeRecord(data) {
    const [firstName, familyName, title, payPerHour] = data
    return new Employee(firstName, familyName, title, payPerHour)
}
  
function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord)
}
  
function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ")
    employee.addTimeInEvent(date, parseInt(hour, 10))
    return employee
}
  
function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ")
    employee.addTimeOutEvent(date, parseInt(hour, 10))
    return employee
}
  
function hoursWorkedOnDate(employee, date) {
    return employee.hoursWorkedOnDate(date)
}
  
function wagesEarnedOnDate(employee, date) {
    return employee.wagesEarnedOnDate(date)
}
  
function allWagesFor(employee) {
    let totalWages = 0
    for (const timeInEvent of employee.timeInEvents) {
      const date = timeInEvent.date
      totalWages += employee.wagesEarnedOnDate(date)
    }
    return totalWages
}
  
function calculatePayroll(employeeRecords) {
    let totalPayroll = 0
    for (const employee of employeeRecords) {
      totalPayroll += allWagesFor(employee)
    }
    return totalPayroll
}
  
  