module.exports = {
        "development": {
        "datastore": {
            "username": "staging_user",
            "password": "Nuvertos@Staging7531",
            "host": "db.staging.nuvertos.com",
            "port": "3306",
            database: 'billing',
            // logging: false,
            "dialect": "mysql",
            "timezone": "+05:30",
            "dialectOptions": {
                "multipleStatements": true
            },
            "define": {
                "underscored": true,
                "timestamps": true,
                "freezeTableName": true
            }
        },
        "username": "staging_user",
        "password": "Nuvertos@Staging7531",
        "host": "db.staging.nuvertos.com",
        "port": "3306",
        database: 'billing',
        "dialect": "mysql",
        "reset_password_base": "http://localhost:4200/",
        "patient_uri_base": "https://patient.staging.nuvertos.com/",
        "lab_request_uri": "http://localhost:3000/",
        "radio_request_uri": "http://localhost:1401/"
    },

    "production": {
        "datastore": {
            "username": process.env.db_user,
            "password": process.env.db_pass,
            "host": process.env.db_host,
            "port": "3306",
            "dialect": "mysql",
            "database": process.env.db,
            logging: false,
            dialectOptions: {
                useUTC: false, //for reading from database
                dateStrings: true,
                typeCast: true,
                multipleStatements: true
            },
            timezone: '+05:30', // for writing to database
            "define": {
                "underscored": true,
                "timestamps": true,
                "freezeTableName": true
            },
            pool: {
                max: 50,
                min: 4,
                idle: 10000
            },
            "dialectOptions": {
                "multipleStatements": true
            }
        },
        "username": process.env.db_user,
        "password": process.env.db_pass,
        "host": process.env.db_host,
        "port": "3306",
        "dialect": "mysql",
        "database": process.env.db,
        "reset_password_base": process.env.pwd_reset,
        "patient_uri_base": process.env.patient_uri_base,
        "lab_request_uri": process.env.lab_request_uri,
        "radio_request_uri": process.env.radio_request_uri
    }
}