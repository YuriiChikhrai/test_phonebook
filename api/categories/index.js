const { Router } = require("express");
const router = Router();

const { getCategories } = require("./categories.controller");

/**
 * @api {get} /api/categories Get categories list
 * @apiName getCategories
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} data Response data
 * @apiSuccess {ObjectId{24}} data._id Unique category id
 * @apiSuccess {String} data.title Category title
 * @apiSuccess {ObjectId{24}} [data.user] Category creator
 * @apiSuccess {Date} [data.createdAt] Category creation date
 * @apiSuccess {Date} [data.updatedAt] Category last update date
 * @apiSuccessExample {json} Success-Response
 *  {
 *      "data":
 *          [
 *              {
 *                "_id": "5ed39c5c7ccfcf371fef8c10",
 *                "title": "Work"
 *              },
 *              {
 *                  "_id": "5ed3a4b9da41724c773b510f",
 *                  "title": "Cвоя категория",
 *                  "user": "5eca596168668808be0f6023",
 *              }
 *          ]
 *  }
 */
router.get("/", getCategories);

// TODO: add categories

module.exports = router;
