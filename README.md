# Data Hub Investment Backend - Zorg

This project provides a lightweight JSON API into a postgresql database
to allow the [datahub investment prototype](https://github.com/uktrade/data-hub-invest-fe)
to store data and search. For more details on the frontend, [go here](https://github.com/uktrade/data-hub-invest-fe)

[You can see the API in action here](https://data-hub-zorg.herokuapp.com/)

## Architecture
The project is a Node/Express js application that uses [Knex JS](http://knexjs.org/) to read
and write data to a Postgresql database and searches for data in an Elastic search index.
As such the application requires node, postgres and elasticsearch.

## Docker/Docker Compose
### API Server Only

If you don't want to install all the various componets you can simple use docker-compose to 
bring up the service and then use a method such as 'docker-compose container exec bash' to 
enter the container and run migrations etc.

To start the backend using docker compose make sure you have docker and  docker compose 
installed and then simply:

```docker-compose up```

This will:
- Start Postgresql
- Start Elastic search
- Install the database scheme
- Insert seed data into Postgresql
- Index companies in Elasticsearch
- Start the API server in develop mode, so changes to code cause a restart

You can now access the API via [http://localhost:3010/](http://localhost:3010/)

*note* If you make changes to the DB migration scheme or seed data files you will either
need to go into the api server container and use knex to apply these or destroy the docker 
compose containers and start it up again.

### Full stack, including frontend
If you wish to bring up the entire stack, including the front end component you should
checkout the frontend project into the same parent folder as the backend and then
start the stack from that folder, using the instructions in the frontend readme

## Native Install
If you have Node installed locally and want to run it that way then you must make sure
you have an elastic search instance running and a Postgresql database.

#### Dependencies

* [Node.js](https://nodejs.org/en/) (>= 6.9.1)

### Installation

1. Clone repository:

  ```
  git clone https://github.com/UKTradeInvestment/data-hub-invest-fe
  ```

2. Install node dependencies:

  ```
  npm install
  ```

Run the server in either production mode or develop mode

  
#### Production
Builds static assets and runs a server using node

```
npm run build
npm start
```


#### Development
Server watches for changes and rebuilds sass or compiles js using webpack as needed. Changes to server side
code will result in the server autorestarting. The server will run with the node debug flag so you can
 debug with Webstorm or Visual Studio Code
```
npm run develop
```

### Configuration
You must provide some basic configation to the server via environment variables. Set the
following variables to tell the server how to connect to the db and index.

| Name | Description |
|:-----|:------------|
| DATABASE_URL | A valid databae url to access the postgresql db, i.e. postgres://user:password@hostname:5432/dbname |
| BONSAI_URL | A url to your Elastic search instance, e.g. http://localhost:9200/ |
| ESINDEX    | The name to use for the index name in elastic search, defaults to 'datahub' if not provided |

### Other Scripts
The package.json file includes a number of useful scripts for other tasks such as

- test: Run BDD tests using Mocha
- lint: Lint both SASS and JS to make sure it conforms to rules

## Making changes
When working on a new feature the convention is to follow 
[Github Flow](https://guides.github.com/introduction/flow/).
Branch from master and work on changes in your branch. Once you are happy the feature is ready then make 
sure you have linted the code and ran the tests. Make sure your commits don't 
contain extranous entries (such as wip) using rebase interactive and create a pull request. The 
pull request title should briefly say what the change is, and the description describe how you did the change 
and why you chose to do it the way you did.

Once a pull request is made it will be tested using [CircleCI](https://circleci.com/) and, if successful, 
deployed to a heroku instance. Links to the Circle build and deployed address will be 
shown in the github pull request.

When a pull request is approved it can be merged to master.

## Deployment
All changes merged to master are auto deployed to Heroku and almost instantly available [here](https://data-hub-zorg.herokuapp.com/).
