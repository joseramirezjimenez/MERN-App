const secrets = {
    //The URL that we use to connect to the MongoDB Atlas Cluster
    dbUri: 'mongodb+srv://Jose-Ramirez:Skyblue20016@cluster0-fdxd2.mongodb.net/test?retryWrites=true&w=majority'
};

const getSecret = key => secrets[key];

module.exports = getSecret;