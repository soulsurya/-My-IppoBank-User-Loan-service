import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const EmiTransactionPersistence = {};

EmiTransactionPersistence.insertOne = async (transactionModel) => {
    try {
        console.debug(`In EmiTransactionPersistence.insertOne where transactionModel = ${JSON.stringify(transactionModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.EMI_TRANSACTIONS, transactionModel);
    } catch (error) {
        console.error(`In EmiTransactionPersistence.insertOne throwing an error for transactionModel = ${JSON.stringify(transactionModel)} with message = ${error.message}`);
        throw error;
    }
}


export default EmiTransactionPersistence;