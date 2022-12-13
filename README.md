# Gym Manager
![facebook_cover_photo_1](https://user-images.githubusercontent.com/70659748/207230259-96c638c0-4b47-4997-8293-ce39acc9135d.png)
This is a gym management application that helps gym owners, staff, trainers, managers and customers. It allows gym owners to add locations, add machines to those locations, update location revenues, view employees that work at those locations and fire them if they are spending too much on salaries. It allows customers to select their preferred gym location, upgrade their membership plan, view all the trainers they have access to and find available fitness class times.

## Motivation
The main driving force behind this project was to learn how to design and implement a good database system. This project is a culmination of the knowledge attained after completing a relational databases course. The database design portion of this project included brainstorming ideas, mapping those ideas to an Entity-Relationship diagram, creating a relational model from that diagram, creating tables, finding functional dependencies, normalizing the tables to 3NF or BCNF, and creating the actual SQL files. 

## Tech Stack
MySQL, Express, Node, React

## Challenges
I personally had some challenges with queries that required changing multiple tables in the database at the same time. At the time of implementing an insert query for users, I did not have the syntactical knowledge that I have now resulting in me writing some chained queries. This makes the code less readible and harder to extend in the future. This is a part of the code that I can revisit later and refactor.

Furthermore, this project came with the difficulties that typically arise in group projects such as coordingating meeting times. For one, different people may have conflicting schedules due to work or personal commitments. Additionally, coordinating across different time zones can be difficult, as not everyone may be available at the same time. 

## Accomplishments
With a condensed summer course timeline, my group members and I were able to evenly split the work and produce a nice polished final product. We went above and beyond the requirements and implemented a fully functional user authentication system. Furthermore, we included cool features like auto-generated user icons based on usernames using an external API called dicebear.

## Future Improvements
In the future, some of the queries can be cleaned up and refactored. We can also store the user passwords in an encrypted format instead of plain strings. Storing an encrypted password rather than a plain text string is a simple way to increase the security of an authentication system. Encrypting a password means that it is transformed into a scrambled, unreadable form that cannot be easily accessed by unauthorized users. This makes it much more difficult for someone to gain access to the password, even if they are able to access the database where it is stored. As a result, using encrypted passwords can help to protect user accounts and prevent unauthorized access to sensitive information.

## Created By
Miles, Olivia and Parmvir
