// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     } ,
//     description: String,
//     image:
//     {
//         type : String,
//         default :
//     " https://media.istockphoto.com/id/182730617/photo/varkala-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=KOo5jAjXlO-8_YqfmrCgoxuzjqPidd_V9j_HIopbuoM=",

//         set : (v) => v === "" ? " https://media.istockphoto.com/id/182730617/photo/varkala-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=KOo5jAjXlO-8_YqfmrCgoxuzjqPidd_V9j_HIopbuoM= " : v,
//     } ,
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     } ,
//     description: String,
//     image:
//     {
//        filename:String,
//        url:{

//              type : String,
//         default :
//     " https://media.istockphoto.com/id/182730617/photo/varkala-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=KOo5jAjXlO-8_YqfmrCgoxuzjqPidd_V9j_HIopbuoM=",

//         set : (v) => v === "" ? " https://media.istockphoto.com/id/182730617/photo/varkala-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=KOo5jAjXlO-8_YqfmrCgoxuzjqPidd_V9j_HIopbuoM= " : v,
//         }
//     } ,
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
