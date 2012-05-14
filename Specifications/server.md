# iCY Server

The server component for iCY acts as a central repository and reporting source for data collected by the client component. There are two major components required, logging data and reporting.

The server will be implemented in Ruby on Rails using Postgres as the database component to allow the Apps Factory to use Heroku as our "production" environment. 

## Logging Data

Logging data should be handled as a Create endpoint of the Rails application. The data structure should be as simple as possible, and ideally will simply be one Model. Normalization is not important for this functionality.

To ensure that only legitimate clients can log data to the system the endpoint must be protected by a shared secret: This is a string known to both the server and client, used to salt a hash which is passed as a parameter in all requests, similar in nature to a checksum.

For example, if the endpoint is: 

PUT http://example.com/data

And the data includes the following data:
* date: 1 May 2012
* glasses: true
* fontSize: 18pt

(there will be more in the real data) 

And the shared secret is "AppsFactoryiCY" 
The body must contain the following parameters as standard HTTP key/value pairs: 
* All data being posted to the server, ordered alphabetically by key name
* Timestamp of request
* MD5 Hash of "AppsFactoryiCY" concatenated with all other parameters

So you would generate a hash of the following string: 
"AppsFactoryiCYdate=1 May 2012&fontSize=18pt&glasses=true&timestamp=1337007810"

and it itself would be the final parameter, so the body of the request would be: 

date=1 May 2012&fontSize=18pt&glasses=true&timestamp=1337007810&hash=de5f78b1e14f4e65aed027e3419c4993

When the server receives this request, it performs the same operation and compares the hash received from the client to the one it generates. If they match, the data gets saved. Note that the shared secret is never passed as a parameter. 

## Users

We will need to implement user authentication. There are gems that do this, but because our needs are very simple the mechanism as implemented in the rails tutorial will suffice. There will only be one type of user, and all users will have administrative rights over all other users, as well as the ability to generate a report. 

## Reporting

Users may generate a report of the data by loading the appropriate page, entering the start and end dates. Reports are generated as Comma-Separated Value files which the user can download directly to their computer.

Report dates are inclusive, so any data entered on or after 12:00am on the start date and on or before 11:59:59pm on the end date is in the report.
