const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        //making connection with database
        MongoClient.connect('mongodb://127.0.0.1:27017')
            .then((client) => {
                // connection test
                dbConnection = client.db()
                // returning
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection,
    findUser: (cb) => {
        //Making Connection with Database
        MongoClient.connect('mongodb://127.0.0.1:27017')
            .then(async (client) => {
                
                try {
                    // Fouding a Database
                    const database = client.db("users");
                    // declareted of collection in "users" database
                    const movies = database.collection("users");
                    // Query for a user that has the name 'Ervin Howell'
                    const query = { name: 'Ervin Howell' };
                    const user = await movies.findOne(query);
                    // since this method returns the matched document, not a cursor, print it directly
                    console.log(user.email);
                  } finally {
                    // Closing the connection
                    await client.close();
                  }

            })
            .catch(err => {
                // if have error, push to console
                console.log(err);
            })
    },}