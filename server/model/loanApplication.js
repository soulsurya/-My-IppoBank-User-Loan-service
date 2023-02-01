import constants from "../constants.js";

const LoanApplicationModel = {};

LoanApplicationModel.create = (applicationDetails) => {
    console.info(`Inside LoanApplicationModel.create where applicationDetails = ${JSON.stringify(applicationDetails)}`);
    let model = {
        [constants.MONGO_COLUMNS.USERNAME]: applicationDetails?.userName,
        [constants.MONGO_COLUMNS.PHONE_NUMBER]: applicationDetails?.phoneNumber,
        [constants.MONGO_COLUMNS.DOB]: applicationDetails.dob,
        [constants.MONGO_COLUMNS.MONTHLY_EXPENSE]: applicationDetails.monthlyExpense,
        [constants.MONGO_COLUMNS.MONTHLY_INCOME]: applicationDetails.monthlyIncome,
        [constants.MONGO_COLUMNS.LOAN_AMOUNT]: applicationDetails.loanAmount,
        [constants.MONGO_COLUMNS.INTEREST_RATE]: constants.DEFAULT_LOAN_DETAILS.INTEREST_RATE,
        [constants.MONGO_COLUMNS.LOAN_TYPE]: applicationDetails?.loanType,
        [constants.MONGO_COLUMNS.LOAN_TENURE]: applicationDetails?.loanTenure,
        [constants.MONGO_COLUMNS.APPROVAL_STATUS]: constants.LOAN_APPROVAL_STATUSES.PENDING,
        [constants.MONGO_COLUMNS.BRANCH_ID]: applicationDetails.branchId,
        [constants.MONGO_COLUMNS.ADDRESS]: {
            [constants.MONGO_COLUMNS.PINCODE]: applicationDetails.pincode,
            [constants.MONGO_COLUMNS.STATE]: applicationDetails.state,
        },
        [constants.MONGO_COLUMNS.DOCUMENT_DETAILS]: {
            [constants.MONGO_COLUMNS.DOCUMENT_TYPE]: applicationDetails.idType,
            [constants.MONGO_COLUMNS.DOCUMENT_NUMBER]: applicationDetails.idNumber
        },
        [constants.MONGO_COLUMNS.TOTAL_LOAN_AMOUNT]: getTotalLoanAmount(applicationDetails.loanAmount, applicationDetails.loanTenure, constants.DEFAULT_LOAN_DETAILS.INTEREST_RATE),
        ...(applicationDetails.customerId && { [constants.MONGO_COLUMNS.CUSTOMER_ID]: applicationDetails.customerId, }),
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
        // Currently using Date.now() to create unique ids 
        //TODO: create mechanism to generate unique application Id
        [constants.MONGO_COLUMNS.APPLICATION_ID]: Date.now(),
    }
    return model;
}

LoanApplicationModel.approveLoan = (applicationId) => {
    console.info(`Inside LoanApplicationModel.approveLoan where applicationId = ${applicationId}`);
    let model = {
        idField: {
            [constants.MONGO_COLUMNS.APPLICATION_ID]: applicationId,
        },
        docToUpdate: {
            [constants.MONGO_COLUMNS.APPROVAL_STATUS]: constants.LOAN_APPROVAL_STATUSES.APPROVED,
            [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now()
        },
    }
    return model;
}

export const getTotalLoanAmount = (loanAmount, tenure, interestRate) => {
    /**
     * formula for EMi calculation is E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 )
     * where E is EMI, P is Principal Loan Amount, r is monthly rate of interest 
     * n is loan duration in number of months.
     * r can be calculated using r = annualInterestRate/ 12 /100  
     */
    let n = Number(tenure) * 12;
    let r = interestRate / 12 / 100;
    let P = Number(loanAmount)
    let EMI = P * r * (1 + r) * n / ((1 + r) * n - 1)
    let totalLoanAmount = EMI * n;
    return totalLoanAmount
}

export default LoanApplicationModel;