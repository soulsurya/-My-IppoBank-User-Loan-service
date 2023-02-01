import Joi from 'joi';

const LoanSchema = {}

LoanSchema.createLoan = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    userName: Joi.string().required(),
    loanType: Joi.string().required(),
    dob: Joi.string().required(),
    pincode: Joi.string().required(),
    state: Joi.string().required(),
    monthlyIncome: Joi.string(),
    monthlyExpense: Joi.string(),
    idType: Joi.string().required(),
    idNumber: Joi.string().required(),
    loanTenure: Joi.string().required(),
    loanAmount: Joi.string().required(),
    customerId: Joi.string().optional(),
    isBankCustomer: Joi.boolean(),
    employmentType: Joi.string().required()
});

LoanSchema.getByCustomerId = Joi.object().keys({
    customerId: Joi.string().required()
});

LoanSchema.branchId = Joi.object().keys({
    branchId: Joi.string().required()
});

LoanSchema.checkEligibility = Joi.object().keys({
    loanTenure: Joi.number().required(),
    monthlyExpense: Joi.number().required(),
    monthlyIncome: Joi.number().required(),
    loanAmount: Joi.number().required(),
});

LoanSchema.approve = Joi.object().keys({
    applicationId: Joi.string().required()
});

LoanSchema.payEmi = Joi.object().keys({
    transactionValue: Joi.number().required(),
    paymentMode: Joi.string().required(),
    loanId: Joi.string().required(),
    customerId: Joi.string().optional().allow(null, '')
});


export default LoanSchema;