const express = require("express");
const router = new express.Router();
const db = require("../db/db");

const pcExists = (postalCode) => {
    return new Promise(function(resolve, reject) {
        let sqlQuery1 = `SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${postalCode}'`;
        returnVal = db.query(sqlQuery1, (error, result) => {
            if (error) {
                console.log("failed to get results from PostalCodeGetsCityProvince")
                reject(new Error("Error getting pc data"));
            } else {
                if (result.length > 0) {
                    resolve(true);
                }
                resolve(false);
            }
        })
        
    })
}


const insertIntoPCTable = (postalCode, city, province) => {
    let sqlQuery2 = "INSERT INTO PostalCodeGetsCityProvince VALUES(?, ?, ?)";
    db.query(sqlQuery2, [postalCode, city, province], (error, result) => {
        if (error) {
            console.log("Error inserting into PostalCodeGetsCityProvince table", error);
        } else {
            console.log(`${postalCode} was successfully added to PostalCodeGetsCityProvince`);
        }
    });
}

router.post("/createGym", (req, res) => {
    const {locationID, locationName, streetAddress, postalCode, city, province, revenue, ownerEmail} = req.body;
    pcExists(postalCode).then((result) => {
        if (!result) {
            insertIntoPCTable(postalCode, city, province);   
            return result;
        }
    }).then((result) => {
        let sqlQuery = `INSERT INTO locations (locationID, locationName, streetAddress, postalCode, revenue, ownerEmail) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sqlQuery, [locationID, locationName, streetAddress, postalCode, revenue, ownerEmail], (error, result) => {
            if (error) {
                console.log("failed to insert into locations");
            } else {
                res.send({"message": "Location Added Successfully"});
            }
        })
    })

})

router.get("/getGyms", (req, res) => {
    const ownerEmail = req.query.ownerEmail;

    let sqlQuery1 = `SELECT * FROM locations WHERE ownerEmail = '${ownerEmail}'`;
    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data from locations");
        } else {
            res.send(result);
        }
    })
})

router.get("/getMaxSortedGyms", (req, res) => {
    const ownerEmail = req.query.ownerEmail;
    let sqlQuery1 = `SELECT locationID, locationName, streetAddress, postalCode, revenue FROM locations WHERE ownerEmail = '${ownerEmail}' GROUP BY locationID ORDER BY MAX(revenue) DESC`;

    db.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log("Could not get data from locations");
        } else {
            res.send(result);
        }
    })
})

const machineExists = (machineName) => {
    return new Promise(function(resolve, reject) {
        let sqlQuery1 = `SELECT * FROM namegetsmachinetype WHERE machineName = '${machineName}'`;
        db.query(sqlQuery1, (error, result) => {
            if (error) {
                console.log("failed to get results from namegetsmachinetype")
                reject(new Error("Error getting machine data"));
            } else {
                if (result.length > 0) {
                    resolve(true);
                }
                resolve(false);
            }
        })
        
    })
}

const insertIntoNameGetsMachineType = (machineName, exerciseType) => {
    const sqlQuery = `INSERT INTO namegetsmachinetype (machineName, exerciseType) VALUES (?, ?)`;
    db.query(sqlQuery, [machineName, exerciseType], (error, result) => {
        if (error) {
            console.log("failed to add machine to namegetsmachinetype", error);
        } else {
            console.log(`${machineName} was added to namegetsmachinetype`);
        }
    })
}

router.post("/addMachine", (req, res) => {
    const {machineName, exerciseType, machineID, locationID} = req.body;
    
    machineExists(machineName).then((result) => {
        if (!result) {
            insertIntoNameGetsMachineType(machineName, exerciseType);
            return result;
        }
    }).then((result) => {
        const sqlQuery = `INSERT INTO machine (machineID, machineName, locationID) VALUES (?, ?, ?)`;
        db.query(sqlQuery, [machineID, machineName, locationID], (error, result) => {
            if (error) {
                console.log("failed to add machine", error);
            } else {
                console.log(`${machineName} was added to machine`);
                res.send({"message": `${machineName} was added to machine`});
            }
        })
    })
})

router.get("/getMachines", (req, res) => {
    const locationID = req.query.locationID;
    let sqlQuery = `SELECT namegetsmachinetype.machineName, namegetsmachinetype.exerciseType, machine.locationID
                    FROM machine
                    INNER JOIN namegetsmachinetype ON machine.machineName=namegetsmachinetype.machineName and machine.locationID = '${locationID}'`
    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log("couldnt get machine info", error);
        } else {
            res.send(result)
        }
    })
})

router.get("/getMachinesFiltered", (req, res) => {
    const locationID = req.query.locationID;
    const exerciseType = req.query.exerciseType;
    let sqlQuery = `SELECT namegetsmachinetype.machineName, namegetsmachinetype.exerciseType, machine.locationID
                    FROM machine
                    INNER JOIN namegetsmachinetype ON machine.machineName=namegetsmachinetype.machineName and machine.locationID = '${locationID}' WHERE namegetsmachinetype.exerciseType = '${exerciseType}'`
    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log("couldnt get machine info", error);
        } else {
            res.send(result)
        }
    })
})


router.get("/getMachineCountForType", (req, res) => {
    const locationID = req.query.locationID;
    let sqlQuery = `SELECT exerciseType, Count(*) as NumberOfMachines
                    FROM (SELECT namegetsmachinetype.machineName, namegetsmachinetype.exerciseType, machine.locationID
                          FROM machine
                          INNER JOIN namegetsmachinetype ON machine.machineName=namegetsmachinetype.machineName and machine.locationID = '${locationID}') 
                          AS gymMachineTable
                    GROUP BY exerciseType`;
    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log("couldnt get machine info", error);
        } else {
            res.send(result)
        }
    })
})

router.patch("/updateRevenue", (req, res) => {
    const {locationID, revenue} = req.body;
    let sqlQuery = `UPDATE locations SET revenue = '${revenue}' WHERE locationID = '${locationID}'`;
    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log(`Error when updating revenue for location ${locationID}`);
        } else {
            console.log("revenue updated successfully");
            res.send({message: `Location ${locationID}'s revenue was updated`})
        }
    })
})

router.patch("/updateOwner", (req, res) => {
    const {ownerEmail, ownerName, ownerPassword} = req.body;
    let sqlQuery = ``;
    if (ownerName === "") {
        sqlQuery = `UPDATE gymowner SET ownerPassword = '${ownerPassword}' WHERE ownerEmail = '${ownerEmail}'`;
    } else if (ownerPassword === "") {
        sqlQuery = `UPDATE gymowner SET ownerName = '${ownerName}' WHERE ownerEmail = '${ownerEmail}'`;
    } else if (ownerName !== "" && ownerPassword !== ""){
        sqlQuery = `UPDATE gymowner SET ownerName = '${ownerName}', ownerPassword = '${ownerPassword}' WHERE ownerEmail = '${ownerEmail}'`;
    }

    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log("Owner info could not be updated", error);
        } else {
            console.log(`${ownerName}'s information has been updated`);
            res.send({message: `users information has been updated`});
        }
    })
})

router.delete("/employee/:email", (req, res) => {
   

    let fireTrainerQuery = "DELETE FROM Employee WHERE Employee.employeeEmail = " + JSON.stringify(req.params.email)
    console.log(fireTrainerQuery)

    db.query(fireTrainerQuery, (error, result) => {
        if (error) {
            console.log("Error firing employee, please check with HR", error);
        } else {
            console.log(result)
            res.send(result);
        }
    });

})

router.get("/averageSalary", (req, res) => {

    let sqlQuery = "SELECT L.locationName, AVG(E.salary) as avg FROM Employee E, Locations L WHERE L.locationID = E.locationID GROUP BY E.locationID HAVING avg(E.salary) > ( SELECT AVG(E2.salary) FROM Employee E2)"
    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.log("couldnt get average salary by location info", error);
        } else {
            res.send(result)
        }
    })
})


module.exports = router;