import Router from 'express-promise-router';
import constants from '../constants.js';
import Utils from '../utils.js'
import LoanSchema from '../joiSchemas/transaction.js';
import UserLoanRouterDTO from './dto/user.js';
import UserLoanHandler from '../handler/user.js';

const router = Router();

router.get("/getByCustomerId", async function (req, res) {
    try {
        let { error } = LoanSchema.getByCustomerId.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let customerId = UserLoanRouterDTO.getByCustomerId(req.query);
        let result = await UserLoanHandler.getLoansByCustomerId(customerId);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/getByCustomerId with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/create", async function (req, res) {
    try {
        let { error } = LoanSchema.createLoan.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = UserLoanRouterDTO.createLoan(req.body);
        let result = await UserLoanHandler.createLoan(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/create with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/checkEligibility", async function (req, res) {
    try {
        let { error } = LoanSchema.checkEligibility.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = UserLoanRouterDTO.checkEligibility(req.body);
        let result = await UserLoanHandler.checkEligibility(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/checkEligibility with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/payLoanEmi", async function (req, res) {
    try {
        console.log(JSON.stringify(req.body))
        let { error } = LoanSchema.payEmi.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = UserLoanRouterDTO.payLoanEmi(req.body);
        let result = await UserLoanHandler.makeEmiPayment(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/payLoanEmi with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

export default router;