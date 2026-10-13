const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpessError.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

// ADD LISTING - GET
module.exports.renderNewForm = (req, res) => {
  res.render("listings/addListing");
};

// ADD LISTING - POST
module.exports.createListing = wrapAsync(async (req, res) => {
  const { title, description, price, location, country, image } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: {
      url: image && image.trim() !== "" ? image : undefined,
    },
    owner: req.user._id,
  });

  await newListing.save();

  req.flash("success", "New listing added successfully!");
  res.redirect("/listings");
});

// READ ALL LISTINGS
module.exports.index = wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});

  res.render("listings/index.ejs", {
    title: "StayVista | All Listings",
    listings: allListings,
  });
});

// READ SINGLE LISTING
module.exports.showListing = wrapAsync(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }

  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    CurrentUser: req.user,
  });
});

// EDIT LISTING - GET
module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
});

// UPDATE LISTING - PUT
module.exports.updateListing = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, image } = req.body;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      location,
      country,
      image: { url: image || "" },
    },
    { new: true, runValidators: true }
  );

  if (!updatedListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
});

// DELETE LISTING
module.exports.deleteListing = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
});