# OpenWhisk Alerts Demo
An OpenWhisk servleress example for user product alerts that takes a stream of generic product alerts and correlates them to the user's products to enable archive functionality in a highly scalable way. 

In this example, a user has an IBM Storwize storage product. This product is reaching capacity and emits alerts such as `10% storage remaining`. While the product description is shared among many users in an organization, we would like to architect the database to allow each user in the organization to archive a particular product alert so they do not see the alert any more, while other users in the organization should continue seeing the alert. To accomplish this we need to create a cross-reference database that maps users to products and if they're archive state, which is prime opportunity for a serverless fuction that runs on demand. 

### Implementation 
An OpenWhisk function in IBM Cloud Functions listens for Cloudant database udpates writes, which triggers the function to process the data and write to new Cloudant databases that can be used by user dashboard UI showing alerts. 
