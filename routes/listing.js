const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//index route and create
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post( 
        isLoggedin,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
 
// new route
router.get("/new",isLoggedin,listingController.renderNewForm);

//show,update,delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedin,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedin,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

//edit route
router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;