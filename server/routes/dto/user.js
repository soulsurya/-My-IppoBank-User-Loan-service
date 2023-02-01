import constants from "../../constants.js";

const UserLoanRouterDTO = {};

UserLoanRouterDTO.createLoan = (request) => {
    console.info(`Inside UserLoanRouterDTO.createTransaction where request = ${JSON.stringify(request)}`);
    return {
        phoneNumber: request.phoneNumber,
        userName: request.userName,
        loanType: request.loanType,
        dob: request.dob,
        pincode: request.pincode,
        state: request.state,
        monthlyIncome: Number(request.monthlyIncome),
        monthlyExpense: Number(request.monthlyExpense),
        idType: request.idType,
        idNumber: request.idNumber,
        loanTenure: Number(request.loanTenure),
        loanAmount: Number(request.loanAmount),
        isBankCustomer: Number(request.isBankCustomer),
        customerId: request.customerId,
        employmentType: request.employmentType,
        branchId: constants.DEFAULT_BRANCH_DETAILS.BRANCH_ID
    };
}

UserLoanRouterDTO.checkEligibility = (request) => {
    console.info(`Inside UserLoanRouterDTO.getUserTransactions where request = ${JSON.stringify(request)}`);
    return {
        loanTenure: Number(request.loanTenure) || 0,
        loanAmount: Number(request.loanAmount) || 0,
        monthlyExpense: Number(request.monthlyExpense),
        monthlyIncome: Number(request.monthlyIncome),
    }
}

UserLoanRouterDTO.payLoanEmi = (request) => {
    console.info(`Inside UserLoanRouterDTO.payLoanEmi where request = ${JSON.stringify(request)}`);
    return {
        transactionValue: Number(request.transactionValue),
        paymentMode: request.paymentMode,
        loanId: request.loanId,
        customerId: request?.customerId
    }
}

UserLoanRouterDTO.getByCustomerId = (request) => {
    console.info(`Inside UserLoanRouterDTO.getUserTransactions where request = ${JSON.stringify(request)}`);
    return request.customerId
}


export default UserLoanRouterDTO;