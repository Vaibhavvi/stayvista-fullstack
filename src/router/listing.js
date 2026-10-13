const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middlewares/middleware.js");

const listingController = require("../controllers/listing.js");

// CREATE
router.get("/addListing", isLoggedIn, listingController.renderNewForm);

router.post(
  "/addListing",
  isLoggedIn,
  wrapAsync(listingController.createListing)
);

// READ ALL
router.get("/", wrapAsync(listingController.index));

// READ ONE
router.get("/:id", wrapAsync(listingController.showListing));

// UPDATE - SHOW EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// UPDATE - SAVE CHANGES
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListing)
);

// DELETE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;