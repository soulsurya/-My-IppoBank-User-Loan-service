import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const ApprovedLoanPersistence = {};


ApprovedLoanPersistence.updateEmi = async (updateModel) => {
    try {
        console.debug(`In LoanApplicationPersistence.updateEmi where updateModel = ${JSON.stringify(updateModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let idField = updateModel?.idField;
        let docToUpdate = updateModel.docToUpdate
        return await MongoCRUD.update(connectDb, constants.MONGO_COLLECTION.APPROVED_LOANS, idField, docToUpdate);
    } catch (error) {
        console.error(`In LoanApplicationPersistence.updateEmi throwing an error for updateModel = ${JSON.stringify(updateModel)} with message = ${error.message}`);
        throw error;
    }
}

ApprovedLoanPersistence.insertOne = async (loanModel) => {
    try {
        console.debug(`In LoanApplicationPersistence.insertOne where loanModel = ${JSON.stringify(loanModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.APPROVED_LOANS, loanModel);
    } catch (error) {
        console.error(`In LoanApplicationPersistence.insertOne throwing an error for loanModel = ${JSON.stringify(loanModel)} with message = ${error.message}`);
        throw error;
    }
}


export default ApprovedLoanPersistence;