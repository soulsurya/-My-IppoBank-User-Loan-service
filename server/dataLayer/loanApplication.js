import constants from "../constants.js";
import MongoConnection from "../mongo_layer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const LoanApplicationDAO = {};

/**
 * This function is used to get the user loans by customerId
 * @param {string} customerId
 * @returns user loans
 */

LoanApplicationDAO.getLoansByCustomerId = async (customerId) => {
    try {
        console.info(`In ApprovedLoanDAO.getLoansByCustomerId where customerId = ${customerId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.CUSTOMER_ID]: customerId, [constants.MONGO_COLUMNS.APPROVAL_STATUS]: { $ne: constants.LOAN_APPROVAL_STATUSES.ACCEPTED } }
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.LOAN_APPLICATIONS, query);
        return result || [];
    } catch (error) {
        console.error(`In LoanApplicationDAO.getLoansByCustomerId ERROR : ${error.message} where customerId = ${customerId}`);
        throw error;
    }
}

/**
 * This function is used to get the user loans by branchId
 * @param {string} branchId
 * @returns user loans
 */

LoanApplicationDAO.getLoansByBranchId = async (branchId) => {
    try {
        console.info(`In ApprovedLoanDAO.getLoansByBranchId where branchId = ${branchId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.BRANCH_ID]: branchId, [constants.MONGO_COLUMNS.APPROVAL_STATUS]: { $ne: constants.LOAN_APPROVAL_STATUSES.APPROVED } }
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.LOAN_APPLICATIONS, query);
        return result || [];
    } catch (error) {
        console.error(`In LoanApplicationDAO.getLoansByBranchId ERROR : ${error.message} where branchId = ${branchId}`);
        throw error;
    }
}

/**
 * This function is used to get the user loan by applicationId
 * @param {string} applicationId
 * @returns user loans
 */

LoanApplicationDAO.getLoanByApplicationId = async (applicationId) => {
    try {
        console.info(`In ApprovedLoanDAO.getLoanByApplicationId where applicationId = ${applicationId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.APPLICATION_ID]: applicationId, [constants.MONGO_COLUMNS.APPROVAL_STATUS]: { $ne: constants.LOAN_APPROVAL_STATUSES.ACCEPTED } }
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.LOAN_APPLICATIONS, query);
        return result[0] || {};
    } catch (error) {
        console.error(`In LoanApplicationDAO.getLoanByApplicationId ERROR : ${error.message} where applicationId = ${applicationId}`);
        throw error;
    }
}

export default LoanApplicationDAO;