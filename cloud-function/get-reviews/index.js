const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

exports.getReviews = async (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const reviews = await firestore.collection("reviews").get();
  res.send({
    reviews: reviews.docs.map((d) => d.data()),
  });
};
