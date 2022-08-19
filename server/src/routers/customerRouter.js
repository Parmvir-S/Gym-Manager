const express = require("express");
const router = new express.Router();
const db = require("../db/db");


router.get("/customer/:email", (req, res) => {
    let email = req.params.email 
    let customeGetQuery = "SELECT * FROM Customer WHERE customerEmail =" + JSON.stringify(email)

    db.query(customeGetQuery, (error, result) => {
        if (error) {
            console.log("Error getting Customer information, please try again", error);
        } else {
            //console.log(result)
            res.send(result);
        }
    });

})

router.get("/employee/find/:email", (req, res) => {
    let email = req.params.email 

    let customeGetQuery = "SELECT * FROM Employee WHERE employeeEmail =" + JSON.stringify(email)


    db.query(customeGetQuery, (error, result) => {
        if (error) {
            console.log("Error getting Customer information, please try again", error);
        } else {
            console.log(result)
            res.send(result);
        }
    });

})


router.get("/location/:locationId", (req, res) => {
   

    let locationGetQuery = "SELECT locationName, streetAddress FROM Locations WHERE locationID = " + req.params.locationId

    db.query(locationGetQuery, (error, result) => {
        if (error) {
            console.log("Error getting Location information, please try again", error);
        } else {
            //console.log(result)
            res.send(result);
        }
    });

})


router.get("/employee/:locationID/", (req, res) => {
   
    //let getEmployeeFromEmail = "SELECT employeeName from Employee WHERE employeeEmail = "

    //this return the employees for that location
    let locationGetQuery = "SELECT DISTINCT employeeEmail, employeeName FROM Employee JOIN Locations ON Employee.locationID= " + req.params.locationID;
    
    //this returns employees who are trainers --> need to nest these :/ 
    let trainersFromEmployees = "SELECT Employee.employeeEmail FROM Employee INNER JOIN Trainers ON Employee.employeeEmail = Trainers.employeeEmail"

    //swap and and do Select on on employee emails

    let test = locationGetQuery + " WHERE employeeEmail IN ( " + trainersFromEmployees + " )";
    //("SELECT Employee.employeeName, Employee.employeeEmail FROM Employee INNER JOIN Trainers ON Employee.employeeEmail = Trainers.employeeEmail")

    db.query(test, (error, result) => {
        if (error) {
            console.log("Error getting Trainer information, please try again", error);
        } else {
            // rn will only return 1
            // let employeeEmail = result.data[0].employeeEmail

            // db.query((getEmployeeFromEmail + employeeEmail), (error, result2) => {
            //     //console.log("SADF")
            //     console.log(result2)
            //     res.send(result2);

            // })
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            console.log(result)
            res.send(result);
        }
    });

})


router.get("/membership/:membershipID", (req, res) => {
    let membershipGetQuery = "SELECT cost, paySchedule FROM MembershipIdGetsCostPaySchedule WHERE membershipID = "+ req.params.membershipID

    let membershipGetNameQuery = "SELECT membershipName FROM MembershipCostGetsName WHERE cost = "


    let data = {}
    let name = " "

    db.query(membershipGetQuery, (error, result) => {
        if (error) {
            console.log("Error getting Trainer information, please try again", error);
        } else {
            let cost = result[0].cost
            db.query((membershipGetNameQuery + cost), (error, result2) => {
                if (error) {
                    console.log("Error getting Trainer information, please try again", error);
                } else {
                    data["cost"] = result[0].cost
                    data["paySchedule"] = result[0].paySchedule
                    data["name"] = result2[0].membershipName
                    
                    res.send(data);
                }
            });
        }
    });

})

router.post("/membership/:membershipID", (req, res) => {

    let cost = req.body.cost;
    if (cost !== 1040) {
        cost = cost + 50
    } else {
        cost = 1200
    }
    let upgradeMembership = "UPDATE MembershipIDGetsCostPaySchedule SET Cost = " + cost + " WHERE membershipID = " + req.params.membershipID
    
    db.query(upgradeMembership), (error, result) => {
        if (error) {
            console.log("Error getting Trainer information, please try again", error);
        } else {
            //console.log(result)
            res.send(result);
        }
    }
})


router.post("/customer/:email/:employeeEmail", (req, res) => {
    let email = req.params.email
    let employeeEmail = req.params.employeeEmail
    let updateCustomerTrainerQuery = "UPDATE Customer SET employeeEmail = " + JSON.stringify(employeeEmail) + " WHERE customerEmail = " + JSON.stringify(email) 

    db.query(updateCustomerTrainerQuery, (error, result) => {
        if (error) {
            console.log("Error getting Customer information, please try again", error);
        } else {
           // console.log(result)
            res.send(result);
        }
    });

})

router.post("/setUserLocation", (req, res) => {
    const {locationID, email} = req.body;
    let sqlQuery1 = "UPDATE Customer SET locationID = " + locationID + " WHERE customerEmail = " + JSON.stringify(email)
    console.log(sqlQuery1);
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            //console.log(error);
            console.log("Could not get data from locations");
            //console.log(req.body);
        } else {
            res.send(result);
        }
    })
})


router.get("/getAllGyms", (req, res) => {
    let sqlQuery1 = `SELECT * FROM locations`;
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data from locations");
        } else {
            res.send(result);
        }
    })
})

router.get("/getEquippedGyms", (req, res) => {
    let sqlQuery1 = `Select * from gym.locations as L
                     WHERE NOT EXISTS(
                             select T.exerciseType
                             from gym.namegetsmachinetype T
                             WHERE NOT EXISTS     (SELECT M.locationID
                                                   FROM gym.machine M
                                                   WHERE T.machineName=M.machineName
                                                     AND M.locationID = L.locationID)
                         )`;
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data from locations");
        } else {
            res.send(result);
        }
    })
})

router.get("/getClasses/:start", (req, res) => {
    
    let sqlQuery1 = `SELECT className, classLocation, employeeName, timeslot FROM GetsEmployeeIdNumParticipants INNER JOIN Employee ON GetsEmployeeIdNumParticipants.employeeEmail=Employee.employeeEmail WHERE GetsEmployeeIdNumParticipants.timeslot > ` + req.params.start;
    console.log(sqlQuery1)
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data about classes");
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

router.get("/getMachinesHaving", (req, res) => {
    let locationID = req.query.locationID;
    let sqlQuery =  `SELECT N.exerciseType, COUNT(*) as NumberOfEquipment
                    FROM gym.machine M, gym.namegetsmachinetype N 
                    WHERE M.machineName = N.machineName AND M.locationID = '${locationID}'
                    GROUP BY N.exerciseType
                    HAVING COUNT(*) >= 3`
    db.query(sqlQuery, (error, result) => {
                        if (error) {
                            console.log("Could not get data from locations");
                        } else {
                            res.send(result);
                        }
                    })
})


router.get("/getClasses/teacher/:email", (req, res) => {
    
    let sqlQuery1 = `SELECT className, classLocation, timeslot, numberOfParticipants FROM GetsEmployeeIdNumParticipants INNER JOIN Employee ON GetsEmployeeIdNumParticipants.employeeEmail=Employee.employeeEmail WHERE GetsEmployeeIdNumParticipants.employeeEmail = ` + JSON.stringify(req.params.email);
    console.log(sqlQuery1)
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data about classes");
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

router.delete("/getClasses/:name/:location/:timeslot", (req, res) => {
    
    let sqlQuery1 = `DELETE * FROM GetsEmployeeIdNumParticipants INNER JOIN Employee ON GetsEmployeeIdNumParticipants.employeeEmail=Employee.employeeEmail WHERE GetsEmployeeIdNumParticipants.employeeEmail = ` + JSON.stringify(req.params.email);
    console.log(sqlQuery1)
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data about classes");
        } else {
            console.log(result)
            res.send(result)
        }
    })
})






module.exports = router;