const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//post route
router.post(
    "/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.postReview));

//Delete route
router.delete(
    "/:reviewId",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;