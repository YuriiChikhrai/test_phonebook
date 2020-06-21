const { Router } = require("express");
const router = Router();

const { getCategories } = require("./categories.controller");

/**
 * @api {get} /api/categories Get categories list
 * @apiName getCategories
 * @apiGroup Categories
 * @apiVersion 0.0.1
 *
 * @apiSuccess {Object} data Response data
 * @apiSuccess {ObjectId{24}} data._id Unique category id
 * @apiSuccessExample {json} Success-Response
 *  {
 *      "data":
 *          [
 *              {
 *                "_id": "5ed39c5c7ccfcf371fef8c10",
 *                "title": "Work"
 *              }
 *          ]
 *  }
 */
router.get("/", getCategories);

// TODO: add categories

module.exports = router;
