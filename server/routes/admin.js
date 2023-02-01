import Router from 'express-promise-router';
import constants from '../constants.js';
import Utils from '../utils.js'
import LoanSchema from '../joiSchemas/transaction.js';
import AdminLoanRouterDTO from './dto/admin.js';
import AdminLoanHandler from '../handler/admin.js';

const router = Router();

router.get("/getByBranchId", async function (req, res) {
    try {
        let { error } = LoanSchema.branchId.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let branchId = AdminLoanRouterDTO.getByBranchId(req.query);
        let result = await AdminLoanHandler.getLoansByBranchId(branchId);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in admin/getByBranchId with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/approve", async function (req, res) {
    try {
        let { error } = LoanSchema.approve.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = AdminLoanRouterDTO.approve(req.body);
        let result = await AdminLoanHandler.approveLoan(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in admin/approve with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/payEmi", async function (req, res) {
    try {
        let { error } = LoanSchema.payEmi.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = AdminLoanRouterDTO.payLoanEmi(req.body);
        let result = await AdminLoanHandler.makeEmiPayment(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in admin/payEmi with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

export default router;