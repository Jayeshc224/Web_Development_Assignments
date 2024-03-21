const { MongoClient } = require('mongodb' )

let dbConnection

let uri = 'mongodb+srv://jayeshc224:test123@cluster0.pgwju8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
connectToDb: (cb) => {
MongoClient.connect(uri)
.then((client) => {
dbConnection = client.db()
return cb()
})
.catch(err => {
console.log(err)
return cb(err)
})
},
getDb: () => dbConnection
}