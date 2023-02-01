const AdminLoanRouterDTO = {};

AdminLoanRouterDTO.approve = (request) => {
    console.info(`Inside AdminLoanRouterDTO.approve where request = ${JSON.stringify(request)}`);
    return request.applicationId
}

AdminLoanRouterDTO.payLoanEmi = (request) => {
    console.info(`Inside AdminLoanRouterDTO.getUserTransactions where request = ${JSON.stringify(request)}`);
    return {
        transactionValue: Number(request.transactionValue),
        paymentMode: request.paymentMode,
        loanId: request.loanId,
    }
}

AdminLoanRouterDTO.getByBranchId = (request) => {
    console.info(`Inside AdminLoanRouterDTO.getByBranchId where request = ${JSON.stringify(request)}`);
    return request.branchId
}

export default AdminLoanRouterDTO;