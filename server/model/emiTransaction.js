import constants from "../constants.js";

const EmiTransactionModel = {};

EmiTransactionModel.create = (loanDetails, paymentDetails) => {
    console.info(`Inside EmiTransactionModel.create where loanDetails = ${JSON.stringify(loanDetails)} and paymentDetails = ${JSON.stringify(paymentDetails)}`);
    let model = {
        [constants.MONGO_COLUMNS.TRANSACTION_VALUE]: paymentDetails.transactionValue,
        [constants.MONGO_COLUMNS.IS_SUCCESSFUL]: true,
        [constants.MONGO_COLUMNS.LOAN_ID]: paymentDetails.loanId,
        [constants.MONGO_COLUMNS.TRANSACTION_MODE]: paymentDetails.paymentMode,
        [constants.MONGO_COLUMNS.LOAN_AMOUNT_DUE]: Number(loanDetails.loanAmountDue) - Number(paymentDetails.transactionValue),
        ...(loanDetails.customerId && { [constants.MONGO_COLUMNS.CUSTOMER_ID]: loanDetails.customerId }),
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
        // Currently using Date.now() to create unique ids 
        //TODO: create mechanism to generate unique payment Id
        [constants.MONGO_COLUMNS.PAYMENT_ID]: Date.now(),
    }
    return model;
}

export default EmiTransactionModel;