const express = require('express');
const { default: mongoose } = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt & updatedAt

// Create model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
