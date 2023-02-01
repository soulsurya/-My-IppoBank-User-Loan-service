import lodash from 'lodash';
import constants from "../constants.js";
import UserAccountPersistence from "../persistence/loanApplication.js";
import UserLoanHandlerDTO from "./dto/user.js";
import LoanApplicationModel, { getTotalLoanAmount } from "../model/loanApplication.js";
import ApprovedLoanDAO from "../dataLayer/approvedLoan.js";
import LoanApplicationDAO from "../dataLayer/loanApplication.js";
import ApprovedLoanModel from "../model/approvedLoan.js";
import EmiTransactionModel from "../model/emiTransaction.js";
import EmiTransactionPersistence from "../persistence/emiTransaction.js";
import ApprovedLoanPersistence from "../persistence/ApprovedLoan.js";

const UserLoanHandler = {}

UserLoanHandler.getLoansByCustomerId = async (customerId) => {
    try {
        console.info(`In UserLoanHandler.getLoansByCustomerId where customerId = ${customerId}`);
        let handlerResponse = UserLoanHandlerDTO.getBaseResponse();
        let approvedLoans = await ApprovedLoanDAO.getLoansByCustomerId(customerId)
        let loanApplications = await LoanApplicationDAO.getLoansByCustomerId(customerId)
        handlerResponse.data = { approvedLoans, loanApplications }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserLoanHandler.getLoansByCustomerId where customerId = ${customerId} and error is ${error.message}`);
        throw error;
    }
};

UserLoanHandler.createLoan = async (loanDetails) => {
    try {
        console.info(`In UserLoanHandler.createLoan where loanDetails = ${JSON.stringify(loanDetails)}`);
        let handlerResponse = UserLoanHandlerDTO.getBaseResponse();
        let loanApplicationModel = LoanApplicationModel.create(loanDetails);
        handlerResponse.data = await UserAccountPersistence.insertOne(loanApplicationModel);
        return handlerResponse;
    } catch (error) {
        console.error(`In UserLoanHandler.createLoan where loanDetails = ${JSON.stringify(loanDetails)} and error is ${error.message}`);
        throw error;
    }
};

UserLoanHandler.makeEmiPayment = async (paymentDetails) => {
    try {
        console.info(`In UserLoanHandler.makeEmiPayment where paymentDetails = ${JSON.stringify(paymentDetails)}`);
        let handlerResponse = UserLoanHandlerDTO.getBaseResponse();
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
        console.error(`In UserLoanHandler.makeEmiPayment where paymentDetails = ${JSON.stringify(paymentDetails)} and error is ${error.message}`);
        throw error;
    }
};

UserLoanHandler.checkEligibility = async (loanDetails) => {
    try {
        console.info(`In UserLoanHandler.checkEligibility where loanDetails = ${JSON.stringify(loanDetails)}`);
        let handlerResponse = UserLoanHandlerDTO.getBaseResponse();
        let loanEligibility = checkEligibility(loanDetails);
        if (loanEligibility.isEligible) {
            handlerResponse.data = Math.round(Number(loanEligibility.monthlyEmi))
        } else {
            handlerResponse.success = false;
            handlerResponse.message = loanEligibility.message
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserLoanHandler.checkEligibility where loanDetails = ${JSON.stringify(loanDetails)} and error is ${error.message}`);
        throw error;
    }
};

const checkEligibility = (loanDetails) => {
    try {
        console.info(`Inside checkEligibility where loanDetails = ${JSON.stringify(loanDetails)}`);
        let { loanTenure, loanAmount, monthlyExpense, monthlyIncome } = loanDetails;
        let eligibility = { isEligible: true, monthlyEmi: 0, message: '' };
        if ((monthlyExpense / monthlyIncome) > constants.DEFAULT_LOAN_DETAILS.THRESHOLD_EXPENSE_INCOME_RATIO) {
            eligibility.isEligible = false;
            eligibility.message = "Sorry, you don't fulfill our eligibility criteria!";
        } else if (loanAmount > getMaxLoanAmount(monthlyExpense, monthlyIncome, constants.DEFAULT_LOAN_DETAILS.THRESHOLD_EXPENSE_INCOME_RATIO, loanTenure)) {
            eligibility.isEligible = false;
            eligibility.message = `Sorry, You can get loan only upto ${getMaxLoanAmount(monthlyExpense, monthlyIncome, constants.DEFAULT_LOAN_DETAILS.THRESHOLD_EXPENSE_INCOME_RATIO, loanTenure)} for ${loanTenure} years!`
        } else {
            eligibility.monthlyEmi = getTotalLoanAmount(loanAmount, loanTenure, constants.DEFAULT_LOAN_DETAILS.INTEREST_RATE) / (loanTenure * 12)
        }
        return eligibility;
    } catch (error) {
        console.error(`In checkEligibility where loanDetails = ${JSON.stringify(loanDetails)} and error is ${error.message}`);
        throw error;
    }
}

const getMaxLoanAmount = (monthlyExpense, monthlyIncome, thresholdExpenseIncomeRatio, tenure) => {
    return Number((thresholdExpenseIncomeRatio - (monthlyExpense / monthlyIncome)) * monthlyIncome * tenure * 12) || 0
}

export default UserLoanHandler;