function createEmployeeRecord (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employees) {
    return employees.map( employee => createEmployeeRecord(employee))
}

function createTimeInEvent (time) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time.split(' ')[1], 10),
        date: time.split(' ')[0]
    })
    return this
}

function createTimeOutEvent (time) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time.split(' ')[1], 10),
        date: time.split(' ')[0]
    })
    return this
}

function timeIn (record, date) {
    return record.timeInEvents.find ( event => 
        event.date == date && event.type == 'TimeIn' 
        ).hour
}

function timeOut (record, date) {
    return record.timeOutEvents.find ( event => 
        event.date == date && event.type == 'TimeOut' 
        ).hour
}

function hoursWorkedOnDate (record, date) {
    return (timeOut(record, date) - timeIn(record, date)) / 100
}

function wagesEarnedOnDate (record, date) {
    return hoursWorkedOnDate (record, date) * record.payPerHour
}

function dates (record) {
    return record.timeInEvents.map (event => event.date)
}

function wages (record) {
    return dates(record).map (date => wagesEarnedOnDate(record, date))
}

// function allWagesFor (record) {
//     return wages(record).reduce ( (acc, value) => {return acc + value}, 0)
// }

function findEmployeeByFirstName (records, firstName) {
    return records.find ( record => record.firstName == firstName)
}

function calculatePayroll (records) {
    return records.reduce ( (acc, record) => {
        return acc + allWagesFor(record)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}