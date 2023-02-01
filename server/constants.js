let constants = {
    DEFINED_ERRORS: {
        401: "Unauthorized to access the URL",
        701: "OOPS!! We are working on it",
        500: "Internal Server Error",
        200: "Success"
    },
    CUSTOM_MESSAGES: {
        100: "Error while approving loan, loan not found!",
        102: "Loan not found!",
        400: "Page doesn't exist",
        401: 'This user is not authorized',
    },
    TYPE: {
        CONTENT_TYPE: "content-type",
        APPLICATION_URL_ENCODED: "application/x-www-xform-urlencoded",
        APPLICATION_JSON: "application/json",
        AUTHORIZATION: 'Authorization',
    },
    MONGO_COLUMNS: {
        CUSTOMER_ID: "customerId",
        PHONE_NUMBER: "phoneNumber",
        CREATED_AT: "createdAt",
        UPDATED_AT: "updatedAt",
        ADDRESS: "address",
        PINCODE: "pincode",
        STATE: "state",
        DOB: 'dob',
        DOCUMENT_DETAILS: "documentDetails",
        USERNAME: "userName",
        DOCUMENT_NUMBER: "documentNumber",
        DOCUMENT_TYPE: "documentType",
        PAYMENT_ID: "paymentId",
        BRANCH_ID: 'branchId',
        APPLICATION_ID: "applicationId",
        APPROVAL_STATUS: "approvalStatus",
        INTEREST_RATE: "interestRate",
        LOAN_AMOUNT: "loanAmount",
        TOTAL_LOAN_AMOUNT: "totalLoanAmount",
        LOAN_TENURE: "loanTenure",
        LOAN_TYPE: "loanType",
        EMPLOYMENT_TYPE: "employmentType",
        MONTHLY_EXPENSE: "monthlyExpense",
        MONTHLY_INCOME: "monthlyIncome",
        LOAN_AMOUNT_DUE: "loanAmountDue",
        LOAN_ID: "loanId",
        STATUS: "status",
        TRANSACTION_VALUE: "transactionValue",
        TRANSACTION_MODE: "transactionMode",
        IS_SUCCESSFUL: 'isSuccessful'
    },
    MONGO_COLLECTION: {
        LOAN_APPLICATIONS: "LoanApplications",
        APPROVED_LOANS: "ApprovedLoans",
        EMI_TRANSACTIONS: "EmiTransactions"
    },
    /**
     * Came up with this simple definition all 
     * we need to do is define all of them here 
     * Mongo crud will take care of the rest
     */
    MONGO_INDEXES: {
        LoanApplications: {
            INDEXES: [
                {
                    "applicationId": 1
                }, {
                    "customerId": 1
                }, {
                    "branchId": 1
                }
            ]
        },
        ApprovedLoans: {
            INDEXES: [
                {
                    "customerId": 1
                }, {
                    "loanId": 1
                }, {
                    "applicationId": 1
                }, {
                    "branchId": 1
                }
            ]
        },
        EmiTransactions: {
            INDEXES: [
                {
                    "loanId": 1
                }
            ]
        },
    },
    DEFAULT_BRANCH_DETAILS: {
        IFSC: 'BROBOMANIA',
        BRANCH_NAME: "Ahmedabad",
        BRANCH_ID: "63d8c9b5a1c039f2dfa8fa0a"
    },
    LOAN_APPROVAL_STATUSES: {
        PENDING: 'PENDING',
        APPROVED: "APPROVED",
        REJECTED: "REJECTED"
    },
    LOAN_STATUSES: {
        ONGOING: 'ONGOING',
        COMPLETED: "COMPLETED",
    },
    DEFAULT_LOAN_DETAILS: {
        INTEREST_RATE: 8,
        THRESHOLD_EXPENSE_INCOME_RATIO: 0.36
    }
}

export default constants;