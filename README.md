# HomeTap
Application for users to browse a library of beers, add them to a queue, and receive deliveries from local breweries.

###Install instructions
To install this application you will need to create an environment file with credentials for the mongolab database which you are connecting to the application. 

The environment 

```javascript
MONGOLAB_URI=mongodb://database
PORT=3000
```

###Directory Structure

The directory structure of the repo is shown  

```
HomeTap
+-- public
|   +-- stylesheets
|   +-- images
|   +-- javascript
|
+-- routes
|   +--index.js
|      
|   +--users.js
|   +--admin.js
|
+-- views
+-- models
+-- test
|   +-- test.js
|
+--package.json
+--app.js
+--gulpfile.js
+--.gitignore
```
