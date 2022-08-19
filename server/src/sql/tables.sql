
create database gym;

use gym;

CREATE TABLE PostalCodeGetsCityProvince (
                                            postalCode CHAR(20) PRIMARY KEY,
                                            city CHAR(50),
                                            province Char(50)
);


CREATE TABLE gymOwner (
                          ownerEmail CHAR(50) PRIMARY KEY,
                          ownerPassword CHAR(50),
                          ownerName CHAR(50),
                          postalCode CHAR(50),
                          FOREIGN KEY (postalCode) REFERENCES PostalCodeGetsCityProvince(postalCode)
);

CREATE TABLE Locations (
                           locationID INT PRIMARY KEY,
                           locationName CHAR(50),
                           streetAddress char(50),
                           postalCode char(20),
                           revenue INT,
                           ownerEmail CHAR(50),
                           FOREIGN KEY (ownerEmail) REFERENCES gymOwner(ownerEmail),
                           FOREIGN KEY(postalCode) REFERENCES PostalCodeGetsCityProvince(postalCode)
);

CREATE TABLE NameGetsMachineType(
                                    machineName char(50) PRIMARY KEY,
                                    exerciseType CHAR(50)
);

CREATE TABLE Machine(
                        machineID CHAR(50) PRIMARY KEY,
                        machineName CHAR(50),
                        locationID INT,
                        FOREIGN KEY(machineName) REFERENCES NameGetsMachineType(machineName),
                        FOREIGN KEY(locationID) REFERENCES Locations(locationID) ON DELETE SET NULL
);

CREATE TABLE SetRepDurationIntensity (
                                         exerciseSets INT,
                                         reps INT,
                                         duration INT,
                                         intensity INT,
                                         PRIMARY KEY(exerciseSets, reps)
);

CREATE TABLE Exercise (
                          exerciseName CHAR(50) PRIMARY KEY,
                          exerciseSets INT,
                          reps INT,
                          exerciseWeight INT,
                          FOREIGN KEY(exerciseSets, reps) REFERENCES SetRepDurationIntensity(exerciseSets, reps)
);

CREATE TABLE ExerciseUsesMachine(
                                    machineID CHAR(50),
                                    exerciseName char(50),
                                    PRIMARY KEY(machineID, exerciseName),
                                    FOREIGN KEY(machineID) REFERENCES Machine(machineID),
                                    FOREIGN KEY(exerciseName) REFERENCES Exercise(exerciseName)
);

CREATE TABLE Employee(
                         postalCode char(20),
                         salary INT DEFAULT 30000,
                         locationID INT DEFAULT 100,
                         employeeName CHAR(50),
                         employeePassword CHAR(50),
                         employeeEmail CHAR(50) NOT NULL,
                         PRIMARY KEY(employeeEmail),
                         FOREIGN KEY (locationID) REFERENCES Locations(locationID) ON DELETE CASCADE,
                         FOREIGN KEY (postalCode) REFERENCES PostalCodeGetsCityProvince(postalCode)
);


CREATE TABLE HourlyWageGetsYearsOfExperience (
                                                 hourlyWage INT PRIMARY KEY,
                                                 yearsOfExperience INT
);

CREATE TABLE ReviewScoreGetsBonus (
                                      reviewScore INT PRIMARY KEY,
                                      bonusPay INT
);

CREATE TABLE Trainers (
                          employeeEmail CHAR(50) PRIMARY KEY,
                          reviewScore INT DEFAULT 0,
                          hourlyWage INT DEFAULT 15,
                          FOREIGN KEY(employeeEmail) REFERENCES Employee(employeeEmail) ON DELETE CASCADE,
                          FOREIGN KEY(reviewScore) REFERENCES ReviewScoreGetsBonus(reviewScore),
                          FOREIGN KEY(hourlyWage) REFERENCES HourlyWageGetsYearsOfExperience(hourlyWage)
);

CREATE TABLE BonusGetsYearsOfExperience(
                                           bonus INT PRIMARY KEY,
                                           yearsOfExperience INT
);

CREATE TABLE Manager(
                        bonus INT DEFAULT 0,
                        employeeEmail CHAR(50) PRIMARY KEY,
                        directReports INT,
                        FOREIGN KEY(bonus) REFERENCES BonusGetsYearsOfExperience(bonus),
                        FOREIGN KEY(employeeEmail) REFERENCES Employee(employeeEmail) ON DELETE CASCADE
);

CREATE TABLE FitnessClassRoomCapacityGetsMaxParticipants(
                                                            roomCapacity INT PRIMARY KEY,
                                                            maxParticipants INT
);

CREATE TABLE FitnessClassLocationGetsRoomCapacity(
                                                     classLocation CHAR(80) PRIMARY KEY,
                                                     roomCapacity INT,
                                                     FOREIGN KEY (roomCapacity) REFERENCES FitnessClassRoomCapacityGetsMaxParticipants(roomCapacity)
);

CREATE TABLE FitnessClassTimeslotGetsDuration(
                                                 timeslot INT PRIMARY KEY,
                                                 duration INT
);

CREATE TABLE MembershipPayScheduleGetsDuration(
                                                  paySchedule CHAR(50) PRIMARY KEY,
                                                  duration INT
);

CREATE TABLE MembershipCostGetsName (
                                        cost INT PRIMARY KEY,
                                        membershipName CHAR(50)
);

CREATE TABLE PremiumClassesAttendedGetsRemainingClassesMaxClasses(
                                                                     classesAttended INT PRIMARY KEY ,
                                                                     remainingClasses INT,
                                                                     maxClasses INT
);

CREATE TABLE PremiumIDGetsClassesAttendedRemainingClasses(
                                                             premiumID INT PRIMARY KEY,
                                                             classesAttended INT,
                                                             remainingClasses INT,
                                                             FOREIGN KEY (classesAttended) REFERENCES PremiumClassesAttendedGetsRemainingClassesMaxClasses(classesAttended)
);

CREATE TABLE GetsEmployeeIdNumParticipants (
                                               className CHAR(80),
                                               classLocation CHAR(80),
                                               timeslot INT,
                                               employeeEmail CHAR(50),
                                               numberOfParticipants INT,
                                               PRIMARY KEY (className, classLocation, timeslot),
                                               FOREIGN KEY (employeeEmail) REFERENCES Employee(employeeEmail) ON DELETE CASCADE,
                                               FOREIGN KEY (classLocation) REFERENCES FitnessClassLocationGetsRoomCapacity(classLocation),
                                               FOREIGN KEY (timeslot) REFERENCES FitnessClassTimeslotGetsDuration(timeslot)
);

CREATE TABLE MembershipIDGetsCostPaySchedule(
                                                membershipID INT PRIMARY KEY,
                                                cost INT,
                                                paySchedule CHAR(50),
                                                FOREIGN KEY (cost) REFERENCES MembershipCostGetsName(cost),
                                                FOREIGN KEY (paySchedule) REFERENCES MembershipPayScheduleGetsDuration(paySchedule)
);

CREATE TABLE Customer(
                         postalCode char(20),
                         employeeEmail CHAR(50),
                         streetAddress char(50),
                         locationID INT NOT NULL,
                         membershipID INT NOT NULL,
                         customerName CHAR(50),
                         customerEmail CHAR(50) PRIMARY KEY,
                         customerPassword CHAR(50),
                         FOREIGN KEY(employeeEmail) REFERENCES Trainers(employeeEmail),
                         FOREIGN KEY (membershipID) REFERENCES MembershipIDGetsCostPaySchedule(membershipID),
                         FOREIGN KEY(postalCode) REFERENCES PostalCodeGetsCityProvince(postalCode),
                         FOREIGN KEY(locationID) REFERENCES Locations(locationID) ON DELETE CASCADE
);

INSERT INTO PostalCodeGetsCityProvince VALUES("V8B0A5", "Squamish", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8B0A6", "Vancouver", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8B0A7", "Whistler", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8B0A8", "Pemberton", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8B0A9", "Richmond", "BC");

INSERT INTO PostalCodeGetsCityProvince VALUES("V8C0A1", "Delta", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8C0A2", "Toronto", "ON");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8C0A3", "Calgary", "AB");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8C0A4", "Langley", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8C0A5", "Nanaimo", "BC");

INSERT INTO PostalCodeGetsCityProvince VALUES("V8D0A1", "Delta", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8D0A2", "Toronto", "ON");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8D0A3", "Calgary", "AB");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8D0A4", "Langley", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("V8D0A5", "Nanaimo", "BC");
INSERT INTO PostalCodeGetsCityProvince VALUES("000000", "CITY", "00");


INSERT INTO gymOwner VALUES("a@gmail.com", "abc123", "Lionel Messi", "V8D0A1");
INSERT INTO gymOwner VALUES("b@gmail.com", "abc321", "Cristiano Ronaldo", "V8D0A2");
INSERT INTO gymOwner VALUES("c@gmail.com", "cba123", "Mesut Ozil", "V8D0A3");
INSERT INTO gymOwner VALUES("d@gmail.com", "cba321", "Andres Iniesta", "V8D0A4");
INSERT INTO gymOwner VALUES("e@gmail.com", "a1b2c3", "Xavi Hernandez", "V8D0A5");


INSERT INTO Locations VALUES(1, "Mountain Fitness", "123 Road St.", "V8B0A5", 1000000, "a@gmail.com");
INSERT INTO Locations VALUES(2, "Club Flex", "456 Road St.", "V8B0A6", 2000000, "b@gmail.com");
INSERT INTO Locations VALUES(3, "Birdcoop", "789 Road St.", "V8B0A7", 3000000, "c@gmail.com");
INSERT INTO Locations VALUES(4, "Golds Gym", "321 Road St.", "V8B0A8", 4000000, "d@gmail.com");
INSERT INTO Locations VALUES(5, "ARC Gym", "654 Road St.", "V8B0A9", 5000000, "e@gmail.com");
INSERT INTO Locations VALUES(100, "WAREHOUSE", "HOME", "000000", 0, "a@gmail.com");

INSERT INTO NameGetsMachineType VALUES("StairMachine", "Cardio");
INSERT INTO NameGetsMachineType VALUES("Treadmill", "Cardio");
INSERT INTO NameGetsMachineType VALUES("BenchPress", "Strength");
INSERT INTO NameGetsMachineType VALUES("RockWall", "Strength");
INSERT INTO NameGetsMachineType VALUES("Dumbbell", "Strength");

INSERT INTO Machine VALUES ("StairMachine1", "StairMachine", 1);
INSERT INTO Machine VALUES ("Treadmill1", "Treadmill", 1);
INSERT INTO Machine VALUES ("BenchPress1", "BenchPress", 1);
INSERT INTO Machine VALUES ("RockWall1", "RockWall", 1);
INSERT INTO Machine VALUES ("Dumbbell1", "Dumbbell", 1);

INSERT INTO Machine VALUES ("Treadmill2", "Treadmill", 2);
INSERT INTO Machine VALUES ("BenchPress3", "BenchPress", 3);
INSERT INTO Machine VALUES ("RockWall4", "RockWall", 4);
INSERT INTO Machine VALUES ("Dumbbell5", "Dumbbell", 5);

INSERT INTO SetRepDurationIntensity VALUES(5, 5, 25, 5);
INSERT INTO SetRepDurationIntensity VALUES(0, 0, 0, 0);
INSERT INTO SetRepDurationIntensity VALUES(1, 1, 1, 1);
INSERT INTO SetRepDurationIntensity VALUES(10, 10, 30, 8);
INSERT INTO SetRepDurationIntensity VALUES(7, 7, 27, 6);

INSERT INTO Exercise VALUES("Bench Press", 5, 5, 225);
INSERT INTO Exercise VALUES("Squat", 5, 5, 315);
INSERT INTO Exercise VALUES("Deadlift", 5, 5, 405);
INSERT INTO Exercise VALUES("Shoulder Press", 5, 5, 135);
INSERT INTO Exercise VALUES("Jogging", 0, 0, NULL);

INSERT INTO ExerciseUsesMachine VALUES("BenchPress3", "Bench Press");
INSERT INTO ExerciseUsesMachine VALUES("Dumbbell5", "Squat");
INSERT INTO ExerciseUsesMachine VALUES("Dumbbell5", "Deadlift");
INSERT INTO ExerciseUsesMachine VALUES("Dumbbell5", "Shoulder Press");
INSERT INTO ExerciseUsesMachine VALUES("Treadmill2", "Jogging");

INSERT INTO Employee Values("V8D0A1", 30000, 1, "Kyle Lowry", "def123", "f@gmail.com");
INSERT INTO Employee Values("V8D0A2", 40000, 2, "Pascal Siakam", "def456", "g@gmail.com");
INSERT INTO Employee Values("V8D0A3", 50000, 3, "Fred Vanvleet", "def789", "h@gmail.com");
INSERT INTO Employee Values("V8D0A4", 60000, 4, "Chris Boucher", "ghi123", "i@gmail.com");
INSERT INTO Employee Values("V8D0A5", 130000, 5, "Gary Trent Jr.", "ghi456", "j@gmail.com");
INSERT INTO Employee Values("V8D0A1", 130000, 1, "Nick Nurse", "ghi789", "k@gmail.com");
INSERT INTO Employee Values("V8D0A2", 130000, 2, "Scottie Barnes", "jkl123", "l@gmail.com");
INSERT INTO Employee Values("V8D0A3", 130000, 3, "Thadeus Young", "jkl456", "m@gmail.com");
INSERT INTO Employee Values("V8D0A4", 130000, 4, "Malachie Flynn", "jkl789", "n@gmail.com");
INSERT INTO Employee Values("V8D0A5", 130000, 5, "Yute Watanabe", "mno123", "o@gmail.com");
INSERT INTO Employee Values("V8D0A1", 130000, 1, "Demar Derozan", "mno456", "p@gmail.com");
INSERT INTO Employee Values("V8D0A2", 130000, 2, "Aaron Baynes", "mno789", "q@gmail.com");
INSERT INTO Employee Values("V8D0A3", 130000, 3, "Kyrie Irving", "pqr123", "r@gmail.com");
INSERT INTO Employee Values("V8D0A4", 130000, 4, "Kevin Durant", "pqr456", "3@gmail.com");
INSERT INTO Employee Values("V8D0A5", 130000, 5, "James Harden", "pqr789", "t@gmail.com");

INSERT INTO HourlyWageGetsYearsOfExperience VALUES(15, 1);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(16, 2);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(17, 3);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(18, 4);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(19, 5);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(20, 6);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(21, 7);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(22, 8);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(23, 9);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(24, 10);
INSERT INTO HourlyWageGetsYearsOfExperience VALUES(25, 11);


INSERT INTO ReviewScoreGetsBonus VALUES(0, 25);
INSERT INTO ReviewScoreGetsBonus VALUES(1, 50);
INSERT INTO ReviewScoreGetsBonus VALUES(2, 75);
INSERT INTO ReviewScoreGetsBonus VALUES(3, 100);
INSERT INTO ReviewScoreGetsBonus VALUES(4, 200);
INSERT INTO ReviewScoreGetsBonus VALUES(5, 300);
INSERT INTO ReviewScoreGetsBonus VALUES(6, 400);
INSERT INTO ReviewScoreGetsBonus VALUES(7, 500);
INSERT INTO ReviewScoreGetsBonus VALUES(8, 600);
INSERT INTO ReviewScoreGetsBonus VALUES(9, 700);
INSERT INTO ReviewScoreGetsBonus VALUES(10, 1000);


INSERT INTO Trainers VALUES("t@gmail.com", 5, 15);
INSERT INTO Trainers VALUES("3@gmail.com", 5, 17);
INSERT INTO Trainers VALUES("q@gmail.com", 7, 19);
INSERT INTO Trainers VALUES("o@gmail.com", 7, 21);
INSERT INTO Trainers VALUES("p@gmail.com", 9, 23);

INSERT INTO BonusGetsYearsOfExperience VALUES(500, 5);
INSERT INTO BonusGetsYearsOfExperience VALUES(400, 4);
INSERT INTO BonusGetsYearsOfExperience VALUES(300, 3);
INSERT INTO BonusGetsYearsOfExperience VALUES(200, 2);
INSERT INTO BonusGetsYearsOfExperience VALUES(100, 1);
INSERT INTO BonusGetsYearsOfExperience VALUES(0, 0);

INSERT INTO Manager VALUES(500, "f@gmail.com", 2);
INSERT INTO Manager VALUES(100, "g@gmail.com", 2);
INSERT INTO Manager VALUES(100, "h@gmail.com", 2);
INSERT INTO Manager VALUES(300, "i@gmail.com", 2);
INSERT INTO Manager VALUES(200, "j@gmail.com", 2);


INSERT INTO MembershipPayScheduleGetsDuration VALUES ("monthly", 12);
INSERT INTO MembershipPayScheduleGetsDuration VALUES ("yearly", 1);
INSERT INTO MembershipPayScheduleGetsDuration VALUES ("weekly", 52);
INSERT INTO MembershipPayScheduleGetsDuration VALUES ("daily", 365);
INSERT INTO MembershipPayScheduleGetsDuration VALUES ("quarterly", 4);

INSERT INTO MembershipCostGetsName Values (850, "premium");
INSERT INTO MembershipCostGetsName Values (800, "standard");
INSERT INTO MembershipCostGetsName Values (150, "premium");
INSERT INTO MembershipCostGetsName Values (100, "standard");
INSERT INTO MembershipCostGetsName Values (1200, "premium");
INSERT INTO MembershipCostGetsName Values (1040, "standard");

INSERT INTO MembershipIDGetsCostPaySchedule VALUES (1, 100, "monthly");
INSERT INTO MembershipIDGetsCostPaySchedule VALUES (2, 1040, "weekly");
INSERT INTO MembershipIDGetsCostPaySchedule VALUES (3, 800, "yearly");
INSERT INTO MembershipIDGetsCostPaySchedule VALUES (4, 150, "monthly");
INSERT INTO MembershipIDGetsCostPaySchedule VALUES (5, 850, "yearly");


INSERT INTO Customer VALUES("V8C0A1", NULL, "9934 Raptors St.", 1, 1, "Giannis Ant.", "abc@gmail.com", "xyz123");
INSERT INTO Customer VALUES("V8C0A2", NULL, "9934 Warriors St.", 2, 2, "Jrue Holiday", "def@gmail.com", "xzy123");
INSERT INTO Customer VALUES("V8C0A3", NULL, "9934 Lakers St.", 3, 3, "Khris Middleton", "ghi@gmail.com", "zxy123");
INSERT INTO Customer VALUES("V8C0A4", NULL, "9934 Grizzlies St.", 4, 4, "Bobby Portis", "jkl@gmail.com", "zyx123");
INSERT INTO Customer VALUES("V8C0A5", NULL, "9934 Trailblazers St.", 5, 5, "Brooke Lopez", "mno@gmail.com", "x1y2z3");

INSERT INTO FitnessClassRoomCapacityGetsMaxParticipants VALUES (50, 45);
INSERT INTO FitnessClassRoomCapacityGetsMaxParticipants VALUES (400, 250);
INSERT INTO FitnessClassRoomCapacityGetsMaxParticipants VALUES (30, 20);
INSERT INTO FitnessClassRoomCapacityGetsMaxParticipants VALUES (80, 75);
INSERT INTO FitnessClassRoomCapacityGetsMaxParticipants VALUES (100, 85);

INSERT INTO FitnessClassLocationGetsRoomCapacity VALUES ("Mountain Fitness", 50);
INSERT INTO FitnessClassLocationGetsRoomCapacity VALUES ("Birdcoop", 400);
INSERT INTO FitnessClassLocationGetsRoomCapacity VALUES ("ARC Gym", 30);
INSERT INTO FitnessClassLocationGetsRoomCapacity VALUES ("Club Flex", 80);
INSERT INTO FitnessClassLocationGetsRoomCapacity VALUES ("Gold Gym", 100);

INSERT INTO FitnessClassTimeslotGetsDuration VALUES (9, 60);
INSERT INTO FitnessClassTimeslotGetsDuration VALUES (15, 45);
INSERT INTO FitnessClassTimeslotGetsDuration VALUES (6, 90);
INSERT INTO FitnessClassTimeslotGetsDuration VALUES (12, 60);
INSERT INTO FitnessClassTimeslotGetsDuration VALUES (17, 60);

INSERT INTO PremiumClassesAttendedGetsRemainingClassesMaxClasses VALUES(5, 5, 10);
INSERT INTO PremiumClassesAttendedGetsRemainingClassesMaxClasses VALUES(6, 4, 10);
INSERT INTO PremiumClassesAttendedGetsRemainingClassesMaxClasses VALUES(7, 3, 10);
INSERT INTO PremiumClassesAttendedGetsRemainingClassesMaxClasses VALUES(8, 2, 10);
INSERT INTO PremiumClassesAttendedGetsRemainingClassesMaxClasses VALUES(9, 1, 10);

INSERT INTO PremiumIDGetsClassesAttendedRemainingClasses VALUES(1, 5, 5);
INSERT INTO PremiumIDGetsClassesAttendedRemainingClasses VALUES(2, 6, 4);
INSERT INTO PremiumIDGetsClassesAttendedRemainingClasses VALUES(3, 7, 3);
INSERT INTO PremiumIDGetsClassesAttendedRemainingClasses VALUES(4, 8, 2);
INSERT INTO PremiumIDGetsClassesAttendedRemainingClasses VALUES(5, 9, 1);

INSERT INTO GetsEmployeeIdNumParticipants VALUES ("Spin Class Intermediate", "Mountain Fitness", 9, "k@gmail.com", 40);
INSERT INTO GetsEmployeeIdNumParticipants VALUES ("HIIT Boxing", "Birdcoop", 15, "l@gmail.com", 20);
INSERT INTO GetsEmployeeIdNumParticipants VALUES ("Yoga", "ARC Gym", 6, "m@gmail.com", 15);
INSERT INTO GetsEmployeeIdNumParticipants VALUES ("Strength Training", "Club Flex", 12, "n@gmail.com", 50);
INSERT INTO GetsEmployeeIdNumParticipants VALUES ("Cardio Step", "Gold Gym", 17, "o@gmail.com", 10);









