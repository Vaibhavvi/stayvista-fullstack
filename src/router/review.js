const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createReview,
  deleteReview,
} = require("../controllers/review.js");

// Create Review
router.post("/", createReview);

// Delete Review
router.delete("/:reviewId", deleteReview);

module.exports = router;