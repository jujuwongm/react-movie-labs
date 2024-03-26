use('tour')
db.createCollection("customer")
db.createCollection("merch")
db.createCollection("shows")


use('customers')
db.customers.insertMany([
    {
      "Customer_ID": "C003",
      "Customer_Name": "Sophia de la Cruz",
      "Customer_Email": "sophia.delacruz@example.com",
      "Customer_Country": "United States"
    },
    {
      "Customer_ID": "C004",
      "Customer_Name": "Daniel Müller-Schmidt",
      "Customer_Email": "daniel.mueller.schmidt@example.com",
      "Customer_Country": "Germany"
    },
    {
      "Customer_ID": "C005",
      "Customer_Name": "Isabella Rossi",
      "Customer_Email": "isabella.rossi@example.com",
      "Customer_Country": "Italy"
    },
    {
      "Customer_ID": "C006",
      "Customer_Name": "Hiroki Tanaka",
      "Customer_Email": "hiroki.tanaka@example.com",
      "Customer_Country": "Japan"
    }
  ]);
  
  

use('customer')
db.customer.insertOne( {
"Customer_Name": "Emily Anderrson",
"Customer_Email": "emily@exaample.com",
"Customer_Country": "USA" } )

use ('tour')
db.merch.insertMany([
  {
      "Merchandise_ID": "M007",
      "Merchandise_Name": "Taylor Swift Album - Lover",
      "Merchandise_Price": 12.99
  },
  {
      "Merchandise_ID": "M008",
      "Merchandise_Name": "Taylor Swift Album - Folklore",
      "Merchandise_Price": 14.99
  },
  {
      "Merchandise_ID": "M009",
      "Merchandise_Name": "Taylor Swift Album - Evermore",
      "Merchandise_Price": 14.99
  }
]);

use ('tour')
db.costumer.updateOne(
    { "Customer_ID": "C003" }, // Filter for the specific customer you want to update
    {
      $push: { "Tickets": {
          $each: [
             { "Ticket_ID": "T006", "Show_ID": "S006" }
          ]
      }}
    }
 )
 



 
 db.customer.find()
use ('tour')
db.customer.find()
db.customer.updateOne(
    { "Customer_ID": "C004" }, // Filter for the specific customer you want to update
    {
      $push: { "Tickets": {
          $each: [
             { "Ticket_ID": "T004", "Show_ID": "S002" },
             { "Ticket_ID": "T005", "Show_ID": "S005" }
          ]
      }}
    }
 )
 
 use ('tour')
 db.customer.updateOne(
    { "Customer_ID": "C005" }, // Filter for the specific customer you want to update
    {
      $push: { "Tickets": {
          $each: [
             { "Ticket_ID": "T007", "Show_ID": "S007" },
             { "Ticket_ID": "T008", "Show_ID": "S008" }
          ]
      }}
    }
 )
 