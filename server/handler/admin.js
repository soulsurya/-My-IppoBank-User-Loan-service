import constants from "../constants.js";
import lodash from 'lodash'
import LoanApplicationModel from "../model/loanApplication.js";
import ApprovedLoanDAO from "../dataLayer/approvedLoan.js";
import LoanApplicationDAO from "../dataLayer/loanApplication.js";
import AdminLoanHandlerDTO from "./dto/admin.js";
import ApprovedLoanModel from "../model/approvedLoan.js";
import ApprovedLoanPersistence from "../persistence/ApprovedLoan.js";
import LoanApplicationPersistence from "../persistence/loanApplication.js";
import EmiTransactionPersistence from "../persistence/emiTransaction.js";
import EmiTransactionModel from "../model/emiTransaction.js";

const AdminLoanHandler = {}

AdminLoanHandler.getLoansByBranchId = async (branchId) => {
    try {
        console.info(`In AdminLoanHandler.getLoansByBranchId where branchId = ${branchId}`);
        let handlerResponse = AdminLoanHandlerDTO.getBaseResponse();
        let approvedLoans = await ApprovedLoanDAO.getLoansByBranchId(branchId)
        let loanApplications = await LoanApplicationDAO.getLoansByBranchId(branchId)
        handlerResponse.data = { approvedLoans, loanApplications }
        console.log("aa", JSON.stringify(handlerResponse))
        return handlerResponse;
    } catch (error) {
        console.error(`In AdminLoanHandler.getLoansByBranchId where branchId = ${branchId} and error is ${error.message}`);
        throw error;
    }
};

AdminLoanHandler.approveLoan = async (applicationId) => {
    try {
        console.info(`In AdminLoanHandler.approveLoan where applicationId = ${applicationId}`);
        let handlerResponse = AdminLoanHandlerDTO.getBaseResponse();
        let loanDetails = await LoanApplicationDAO.getLoanByApplicationId(applicationId);
        if (lodash.isEmpty(loanDetails)) {
            handlerResponse.success = false;
            AdminLoanHandler.message = constants.CUSTOM_MESSAGES[100]
        } else {
            let loanModel = ApprovedLoanModel.create(loanDetails);
            let approveApplicationModel = LoanApplicationModel.approveLoan(applicationId);
            await ApprovedLoanPersistence.insertOne(loanModel);
            await LoanApplicationPersistence.updateOne(approveApplicationModel);
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In AdminLoanHandler.approveLoan where applicationId = ${applicationId} and error is ${error.message}`);
        throw error;
    }
};

AdminLoanHandler.makeEmiPayment = async (paymentDetails) => {
    try {
        console.info(`In AdminLoanHandler.makeEmiPayment where paymentDetails = ${JSON.stringify(paymentDetails)}`);
        let handlerResponse = AdminLoanHandlerDTO.getBaseResponse();
        let loanDetails = await ApprovedLoanDAO.getLoanByLoanId(paymentDetails.loanId);
        if (lodash.isEmpty(loanDetails)) {
            handlerResponse.success = false;
            handlerResponse.message = constants.CUSTOM_MESSAGES[102]
        } else {
            let payEmiModel = ApprovedLoanModel.makeEmiPayment(loanDetails, paymentDetails);
            let emiTransactionsModel = EmiTransactionModel.create(loanDetails, paymentDetails);
            await EmiTransactionPersistence.insertOne(emiTransactionsModel);
            await ApprovedLoanPersistence.updateEmi(payEmiModel);
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In AdminLoanHandler.makeEmiPayment where paymentDetails = ${JSON.stringify(paymentDetails)} and error is ${error.message}`);
        throw error;
    }
};

export default AdminLoanHandler;