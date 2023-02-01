import constants from "../constants.js";

const ApprovedLoanModel = {};

ApprovedLoanModel.create = (applicationDetails) => {
    console.info(`Inside ApprovedLoanModel.create where applicationDetails = ${JSON.stringify(applicationDetails)}`);
    let model = {
        [constants.MONGO_COLUMNS.USERNAME]: applicationDetails?.userName,
        [constants.MONGO_COLUMNS.PHONE_NUMBER]: applicationDetails?.phoneNumber,
        [constants.MONGO_COLUMNS.DOB]: applicationDetails.dob,
        [constants.MONGO_COLUMNS.MONTHLY_EXPENSE]: applicationDetails.monthlyExpense,
        [constants.MONGO_COLUMNS.MONTHLY_INCOME]: applicationDetails.monthlyIncome,
        [constants.MONGO_COLUMNS.LOAN_AMOUNT]: applicationDetails.loanAmount,
        [constants.MONGO_COLUMNS.INTEREST_RATE]: applicationDetails.interestRate,
        [constants.MONGO_COLUMNS.LOAN_TYPE]: applicationDetails?.loanType,
        [constants.MONGO_COLUMNS.LOAN_TENURE]: applicationDetails?.loanTenure,
        [constants.MONGO_COLUMNS.BRANCH_ID]: applicationDetails.branchId,
        [constants.MONGO_COLUMNS.LOAN_AMOUNT_DUE]: applicationDetails?.totalLoanAmount,
        [constants.MONGO_COLUMNS.TOTAL_LOAN_AMOUNT]: applicationDetails?.totalLoanAmount,
        [constants.MONGO_COLUMNS.APPLICATION_ID]: applicationDetails.applicationId,
        [constants.MONGO_COLUMNS.ADDRESS]: applicationDetails.address,
        [constants.MONGO_COLUMNS.DOCUMENT_DETAILS]: applicationDetails.documentDetails,
        [constants.MONGO_COLUMNS.STATUS]: constants.LOAN_STATUSES.ONGOING,
        ...(applicationDetails.customerId && { [constants.MONGO_COLUMNS.CUSTOMER_ID]: applicationDetails.customerId }),
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
        // Currently using Date.now() to create unique ids 
        //TODO: create mechanism to generate unique loan Id
        [constants.MONGO_COLUMNS.LOAN_ID]: (Date.now())?.toString(),
    }
    return model;
}

ApprovedLoanModel.makeEmiPayment = (loanDetails, paymentDetails) => {
    console.info(`Inside ApprovedLoanModel.makeEmiPayment where paymentDetails = ${JSON.stringify(paymentDetails)} and loanDetails = ${JSON.stringify(loanDetails)}`);
    let model = {
        idField: { [constants.MONGO_COLUMNS.LOAN_ID]: paymentDetails.loanId },
        docToUpdate: {
            $inc: {
                [constants.MONGO_COLUMNS.LOAN_AMOUNT_DUE]: Number(paymentDetails.transactionValue) * -1
            },
            $set: { [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(), ...(Number(loanDetails.loanAmountDue) - Number(paymentDetails.transactionValue) <= 0 && { [constants.MONGO_COLUMNS.STATUS]: constants.LOAN_STATUSES.COMPLETED }) }
        },
    }
    return model;
}

export default ApprovedLoanModel;