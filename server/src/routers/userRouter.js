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

const insertIntoGymOwnerTable = (data) => {
    let sqlQuery1 = "INSERT INTO gymOwner VALUES(?, ?, ?, ?)";
    db.query(sqlQuery1, [data.email, data.password, data.name, data.postalCode], (error, result) => {
        if (error) {
            console.log("Error inserting into gymOwner table", error);
        } else {
            console.log(`${data.name} was successfully added to gymOwner table`);
        }
    });
}

router.post("/signup", (req, res) => {
    const {name, email, password, city, postalCode, province, userType} = req.body;

    if (userType === "owner") {
        pcExists(postalCode).then((result) => {
            if (!result) {
                insertIntoPCTable(postalCode, city, province);   
                return result;
            }
        }).then((result) => {
            insertIntoGymOwnerTable(req.body);
            res.send(req.body);
        })


    } else if (userType === "staff") {
        pcExists(postalCode).then((result) => {
            if (!result) {
                insertIntoPCTable(postalCode, city, province);   
                return result;
            }
        }).then((result) => {
                    let sqlQuery2 = `INSERT INTO Employee (postalCode, salary, 
                                    locationID, employeeName, employeePassword, employeeEmail) 
                                    VALUES ('${postalCode}', ${30000}, ${100}, '${name}', '${password}', '${email}')`;
            
                    db.query(sqlQuery2, (error, result) => {
                        if (error) {
                            console.log("Error inserting into Employee table", error);
                        } else {
                            console.log(`${name} was successfully added to Employee table`);
                            req.body["salary"] = 30000;
                            req.body["locationID"] = 100;
                            res.send(req.body);
                        }
                    });
        })


    } else if (userType === "manager") {
        pcExists(postalCode).then((result) => {
            if (!result) {
                insertIntoPCTable(postalCode, city, province);   
                return result;
            }
        }).then((result) => {
            let sqlQuery2 = `INSERT INTO Employee (postalCode, salary, 
                            locationID, employeeName, employeePassword, employeeEmail) 
                            VALUES ('${postalCode}', ${30000}, ${100}, '${name}', '${password}', '${email}')`;
    
            db.query(sqlQuery2, (error, result) => {
                if (error) {
                    console.log("Error inserting into Employee table", error);
                } else {
                    console.log(`${name} was successfully added to Employee table`);
                }
            });
    
            let sqlQuery3 = `INSERT INTO Manager (bonus, employeeEmail, directReports) VALUES (${0}, '${email}', ${0})`;
            db.query(sqlQuery3, (error, result) => {
                if (error) {
                    console.log("Error inserting into manager table", error);
                } else {
                    console.log(`${name} was successfully added to manager table`);
                    req.body["salary"] = 30000;
                    req.body["locationID"] = 100;
                    req.body["bonus"] = 0;
                    req.body["directReports"] = 0;
                    res.send(req.body);
                }
            })
        })

    } else if (userType === "trainer") {
        pcExists(postalCode).then((result) => {
            if (!result) {
                insertIntoPCTable(postalCode, city, province);   
                return result;
            }
        }).then((result) => {
            let sqlQuery2 = `INSERT INTO Employee (postalCode, salary, 
                            locationID, employeeName, employeePassword, employeeEmail) 
                            VALUES ('${postalCode}', ${30000}, ${100}, '${name}', '${password}', '${email}')`;
    
            db.query(sqlQuery2, (error, result) => {
                if (error) {
                    console.log("Error inserting into Employee table", error);
                } else {
                    console.log(`${name} was successfully added to Employee table`);
                }
            });
    
            let sqlQuery3 = `INSERT INTO Trainers (employeeEmail, reviewScore, hourlyWage) VALUES ('${email}', ${0}, ${15})`;
            db.query(sqlQuery3, (error, result) => {
                if (error) {
                    console.log("Error inserting into trainers table", error);
                } else {
                    console.log(`${name} was successfully added to trainers table`);
                    req.body["salary"] = 30000;
                    req.body["locationID"] = 100;
                    req.body["reviewScore"] = 0;
                    req.body["hourlyWage"] = 15;
                    res.send(req.body);
                }
            })
        })


    } else if (userType === "customer") {
        pcExists(postalCode).then((result) => {
            if (!result) {
                insertIntoPCTable(postalCode, city, province);   
                return result;
            }
        }).then((result) => {
            let sqlQuery2 = `INSERT INTO Customer (postalCode, employeeEmail, streetAddress, locationID, membershipID, customerName, customerEmail, customerPassword)
                            VALUES ('${postalCode}', NULL, NULL, ${100}, ${1}, '${name}', '${email}', '${password}')`
            db.query(sqlQuery2, (error, result) => {
                if (error) {
                    console.log("Error inserting into the customer table", error);
                } else {
                    console.log(`${name} was inserted into the customer table`);
                    req.body["streetAddress"] = null;
                    req.body["locationID"] = 100;
                    req.body["membershipID"] = 1;
                    res.send(req.body);
                }
            })
            
        })
    }
});


router.post("/login", (req, res) => {
    const {email, password, userType} = req.body;
    let resToSend = {};
    if (userType === "owner") {
        db.query(`SELECT * FROM gymOwner WHERE ownerEmail = '${email}' and ownerPassword = '${password}'`, (error, result) => {
            if (error) {
                console.log("Error retrieving from gymOwner");
            } else {
                if (result.length === 0) {
                    res.send({"message": "User Not Found"})
                    return;
                }
                resToSend["email"] = result[0].ownerEmail;
                resToSend["password"] = result[0].ownerPassword;
                resToSend["name"] = result[0].ownerName;
                resToSend["postalCode"] = result[0].postalCode;
    
                db.query(`SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${result[0].postalCode}'`, (error, result) => {
                    if (error) {
                        console.log("Error retrieving from PostalCodeGetsCityProvince");
                    } else {
                        resToSend["city"] = result[0].city;
                        resToSend["province"] = result[0].province;
                        resToSend["userType"] = userType;
                        res.send(resToSend);
                    }
                })
            }
        })
    } else if (userType === "staff") {
        db.query(`SELECT * FROM employee WHERE employeeEmail = '${email}' and employeePassword = '${password}'`, (error, result) => {
            if (error) {
                console.log("Error retrieving from employee");
            } else {
                if (result.length === 0) {
                    res.send({"message": "User Not Found"})
                    return;
                }
                resToSend["email"] = result[0].employeeEmail;
                resToSend["password"] = result[0].employeePassword;
                resToSend["name"] = result[0].employeeName;
                resToSend["postalCode"] = result[0].postalCode;
                resToSend["salary"] = result[0].salary;
                resToSend["locationID"] = result[0].locationID;

                db.query(`SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${result[0].postalCode}'`, (error, result) => {
                    if (error) {
                        console.log("Error retrieving from PostalCodeGetsCityProvince");
                    } else {
                        resToSend["city"] = result[0].city;
                        resToSend["province"] = result[0].province;
                        resToSend["userType"] = userType;
                        res.send(resToSend);
                    }
                })
            }
        })
    } else if (userType === "manager") {
        db.query(`SELECT * FROM employee WHERE employeeEmail = '${email}' and employeePassword = '${password}'`, (error, result) => {
            if (error) {
                console.log("Error retrieving from employee");
            } else {
                if (result.length === 0) {
                    res.send({"message": "User Not Found"})
                    return;
                }
                resToSend["email"] = result[0].employeeEmail;
                resToSend["password"] = result[0].employeePassword;
                resToSend["name"] = result[0].employeeName;
                resToSend["postalCode"] = result[0].postalCode;
                resToSend["salary"] = result[0].salary;
                resToSend["locationID"] = result[0].locationID;

                db.query(`SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${result[0].postalCode}'`, (error, result) => {
                    if (error) {
                        console.log("Error retrieving from PostalCodeGetsCityProvince");
                    } else {
                        resToSend["city"] = result[0].city;
                        resToSend["province"] = result[0].province;
                        resToSend["userType"] = userType;

                        db.query(`SELECT * FROM manager WHERE employeeEmail = '${email}'`, (error, result) => {
                            if (error) {
                                console.log("Error retrieving from manager");
                            } else {
                                resToSend["bonus"] = result[0].bonus;
                                resToSend["directReports"] = result[0].directReports;
                                res.send(resToSend);
                            }
                        })
                    }
                })
            }
        })
    } else if (userType === "trainer") {
        db.query(`SELECT * FROM employee WHERE employeeEmail = '${email}' and employeePassword = '${password}'`, (error, result) => {
            if (error) {
                console.log("Error retrieving from employee");
            } else {
                if (result.length === 0) {
                    res.send({"message": "User Not Found"})
                    return;
                }
                resToSend["email"] = result[0].employeeEmail;
                resToSend["password"] = result[0].employeePassword;
                resToSend["name"] = result[0].employeeName;
                resToSend["postalCode"] = result[0].postalCode;
                resToSend["salary"] = result[0].salary;
                resToSend["locationID"] = result[0].locationID;

                db.query(`SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${result[0].postalCode}'`, (error, result) => {
                    if (error) {
                        console.log("Error retrieving from PostalCodeGetsCityProvince");
                    } else {
                        resToSend["city"] = result[0].city;
                        resToSend["province"] = result[0].province;
                        resToSend["userType"] = userType;

                        db.query(`SELECT * FROM trainers WHERE employeeEmail = '${email}'`, (error, result) => {
                            if (error) {
                                console.log("Error retrieving from manager");
                            } else {
                                resToSend["reviewScore"] = result[0].reviewScore;
                                resToSend["hourlyWage"] = result[0].hourlyWage;
                                res.send(resToSend);
                            }
                        })
                    }
                })
            }
        })
    } else if (userType === "customer") {
        db.query(`SELECT * FROM customer WHERE customerEmail = '${email}' and customerPassword = '${password}'`, (error, result) => {
            if (error) {
                console.log("Error retrieving from customer");
            } else {
                if (result.length === 0) {
                    res.send({"message": "User Not Found"})
                    return;
                }
                resToSend["email"] = result[0].customerEmail;
                resToSend["password"] = result[0].customerPassword;
                resToSend["name"] = result[0].customerName;
                resToSend["postalCode"] = result[0].postalCode;
                resToSend["locationID"] = result[0].locationID;
                resToSend["streetAddress"] = result[0].streetAddress;
                resToSend["membershipID"] = result[0].membershipID;
                resToSend["employeeEmail"] = result[0].employeeEmail;
    
                db.query(`SELECT * FROM PostalCodeGetsCityProvince WHERE postalCode = '${result[0].postalCode}'`, (error, result) => {
                    if (error) {
                        console.log("Error retrieving from PostalCodeGetsCityProvince");
                    } else {
                        resToSend["city"] = result[0].city;
                        resToSend["province"] = result[0].province;
                        resToSend["userType"] = userType;
                        res.send(resToSend);
                    }
                })
            }
        })
    }

});

module.exports = router;