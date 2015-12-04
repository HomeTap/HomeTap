#HomeTap
##About HomeTap
###Overview
This is an application designed for use by a brewing company to manage deliveries of beers to 
customers. The app has two different views 1) an administrator portion and 2) a user view. Each view has features: a home page and an access portal to a library of beers.

There is no special login for administrators. The system will automatically redirect you to the appropriate view depending on your login credentials. For details on what actions are available in each view please read the following sections for more details. 

To view a working version of this app please go to: https://hometap.herokuapp.com/

####The Administrator view
On the administrators home page is a list of all the users who are expecting orders. Once the order is prepared, the admin may push the send button to update the user's queue, and remove the order from the current list.

As with the user view, all of the beers currently in the database are available in their current categories. Additionally, the admin has the ability to delete individual beers from the library, and at the bottom of the page there is a widget to add beer to the library. 

######Future Features:
- Add new categories of beer as needed
- Update existing beer listings
- Manage actual user accounts
- Elevate user credentials to admin level

####The User View
The user home when you first load the page shows the queue of beers the user has selected to receive for the coming weeks. The item at the top of the page is the item that will be shipped by the admin when fulfilling orders. In addition to the user queue, user's have access to a list of favorite beers. Both lists have the ability to remove any given item from their current list.

To select beers for both the favorites and next beer queues the user should browse over to the beer library. For each beer listed in the library, there are two corresponding buttons. One button allows a specific beer to be favorited/unfavorited. The other button allows a user to add/remove a beer from their queue. 

#####Future Features:
- Add reviews and stars to Beers
- Rearrange queue items
- Change Screen Names
- Delete the accounts`

##Setup Instructions and Code Details
###Build
To build this application you will need to clone this repository and then 

Then run the ```npm install``` command to add all of the package dependencies. 


If you are the first user to log into a database you will be created as an admin. All subsequent users will be created as generic users. 

##Deploying using Heroku and MongoLab:
Create an .env file in the root directory of the clone. The .env file should contain the following lines of code:

```
MONGOLAB_URI=mongodb://database
PORT=3000
```

Where 'database' is the authentication and database as specified by MongoLab. This will overwrite the default setting 

####Test
Tests where created using mocha and chai/chai-http. All tests are contained in the test directory inside of the root directory. To run a test use the mocha command in the terminal along with the name of the test file.

####Run
To run the program locally you should use the debug command given in the package.json file. ```npm run debug```

###Application Structure

The repo has the following file structure. Not all files are shown in the individual directories. The linting/style files have also been omitted. 

```
HomeTap
+-- public
|   +-- stylesheets
|   +-- images
|   +-- javascript
|
+-- routes
+-- views
+-- models
+-- test
+--package.json
+--app.js
+--config.js
+--README.md
```
##Coding standards
We used both jshint and jscs to provide style and linting for our code. The rules that we checked against are located in the root directory.

The code was developed using Travis CI and Gulp. The travis.yml file is located in the root directory of the repository along with the gulpfile that it executes. 
