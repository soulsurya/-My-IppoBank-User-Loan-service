import constants from "../constants.js";
import MongoConnection from "../mongo_layer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const ApprovedLoanDAO = {};

/**
 * This function is used to get the user loans by customerId
 * @param {string} customerId
 * @returns user loans
 */

ApprovedLoanDAO.getLoansByCustomerId = async (customerId) => {
    try {
        console.info(`In ApprovedLoanDAO.getLoansByCustomerId where customerId = ${customerId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.CUSTOMER_ID]: customerId }
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.APPROVED_LOANS, query);
        return result || [];
    } catch (error) {
        console.error(`In ApprovedLoanDAO.getLoansByCustomerId ERROR : ${error.message} where customerId = ${customerId}`);
        throw error;
    }
}

/**
 * This function is used to get the user loans by branchId
 * @param {string} branchId
 * @returns user loans
 */

ApprovedLoanDAO.getLoansByBranchId = async (branchId) => {
    try {
        console.info(`In ApprovedLoanDAO.getLoansByBranchId where branchId = ${branchId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.BRANCH_ID]: branchId }
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.APPROVED_LOANS, query);
        return result || [];
    } catch (error) {
        console.error(`In ApprovedLoanDAO.getLoansByBranchId ERROR : ${error.message} where branchId = ${branchId}`);
        throw error;
    }
}

/**
 * This function is used to get the user loans by loanId
 * @param {string} loanId
 * @returns user loans
 */

ApprovedLoanDAO.getLoanByLoanId = async (loanId) => {
    try {
        loanId
        console.info(`In ApprovedLoanDAO.getLoanByLoanId where loanId = ${loanId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.LOAN_ID]: loanId }
        let result = await MongoCRUD.get(connectDb, constants.MONGO_COLLECTION.APPROVED_LOANS, query);
        return result || {};
    } catch (error) {
        console.error(`In ApprovedLoanDAO.getLoanByLoanId ERROR : ${error.message} where loanId = ${loanId}`);
        throw error;
    }
}


export default ApprovedLoanDAO;