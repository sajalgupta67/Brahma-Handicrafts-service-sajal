const mySql = require('mysql2');
const { Sequelize } = require('sequelize');
const fs = require('fs-extra');
const path = require('path');
const basename = 'index.js';

const dialect = {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  pool: {
      /*
       * Lambda functions process one request at a time but your code may issue multiple queries
       * concurrently. Be wary that `sequelize` has methods that issue 2 queries concurrently
       * (e.g. `Model.findAndCountAll()`). Using a value higher than 1 allows concurrent queries to
       * be executed in parallel rather than serialized. Careful with executing too many queries in
       * parallel per Lambda function execution since that can bring down your database with an
       * excessive number of connections.
       *
       * Ideally you want to choose a `max` number where this holds true:
       * max * EXPECTED_MAX_CONCURRENT_LAMBDA_INVOCATIONS < MAX_ALLOWED_DATABASE_CONNECTIONS * 0.8
       */
      max: 2,
      /*
       * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
       * in the event of a Lambda function timeout.
       */
      min: 0,
      /*
       * Set this value to 0 so connections are eligible for cleanup immediately after they're
       * returned to the pool.
       */
      idle: 0,
      // Choose a small enough value that fails fast if a connection takes too long to be established.
      acquire: 3000,
      /*
       * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
       * function invocation, if the previous invocation timed out.
       */
      evict: 5000
    }
}
var sequelize;
var db = {};

async function loadSequelize() {
sequelize = new Sequelize(process.env.DB_NAME || 'brahma-handicrafts', process.env.DB_USER ||  'root', process.env.DB_PASSWORD || 'Sajal@67', dialect);
  await sequelize.authenticate();

  return sequelize;
}

handler = async function (event, callback) {
  // re-use the sequelize instance across invocations to improve performance
  if (!sequelize) {
    sequelize = await loadSequelize();
    console.log('Database connected successfully', sequelize.getDatabaseName());
  } else {
    // restart connection pool to ensure connections are not re-used across invocations
    sequelize.connectionManager.initPools();
    console.log('Re-using existing database connection', sequelize.getDatabaseName())
    // restore `getConnection()` if it has been overwritten by `close()`
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;
    }
  }
};

handler();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.setModels = function(directory) {
    let models = {};
    if (!db.models) {
        db.models = {};
    }
    if (fs) {
        console.log('Loading models from directory:', directory);
    }
    fs
        .readdirSync(directory)
        .filter(file => {
            console.log('Loading file:', file);
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            console.log('Processing file:', file);
            const model = require(path.join(directory, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
            db.models[model.name] = model;
            models[model.name] = model;
        });
    // return {};
    return models;
}

db.makeAssociations = function() {
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}

module.exports = db;