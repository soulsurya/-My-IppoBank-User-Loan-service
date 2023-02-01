import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const LoanApplicationPersistence = {};


LoanApplicationPersistence.updateOne = async (applicationDetails) => {
    try {
        console.debug(`In LoanApplicationPersistence.approveApplication where applicationDetails = ${JSON.stringify(applicationDetails)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let idField = applicationDetails?.idField;
        let docToUpdate = { $set: applicationDetails.docToUpdate }
        return await MongoCRUD.update(connectDb, constants.MONGO_COLLECTION.LOAN_APPLICATIONS, idField, docToUpdate);
    } catch (error) {
        console.error(`In LoanApplicationPersistence.approveApplication throwing an error for applicationDetails = ${JSON.stringify(applicationDetails)} with message = ${error.message}`);
        throw error;
    }
}

LoanApplicationPersistence.insertOne = async (applicationModel) => {
    try {
        console.debug(`In LoanApplicationPersistence.insertOne where applicationModel = ${JSON.stringify(applicationModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.LOAN_APPLICATIONS, applicationModel);
    } catch (error) {
        console.error(`In LoanApplicationPersistence.insertOne throwing an error for applicationModel = ${JSON.stringify(applicationModel)} with message = ${error.message}`);
        throw error;
    }
}


export default LoanApplicationPersistence;