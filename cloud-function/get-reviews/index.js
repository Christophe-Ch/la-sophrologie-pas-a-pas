const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

exports.getReviews = async (_, res) => {
  const reviews = await firestore.collection("reviews").get();
  res.send({
    reviews: reviews.docs.map((d) => d.data()),
  });
};
