const functions = require("@google-cloud/functions-framework");
const fetch = require("node-fetch");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent("fetchReviews", async () => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews&place_id=ChIJE9PFtdvT4EcRlMnPa1D4fyU&key=${process.env.GOOGLE_PLACES_KEY}&reviews_no_translations=true`;
  const response = await fetch(url);
  const reviews = (await response.json()).result.reviews;

  if (await collectionExists(firestore, "reviews")) {
    await deleteCollection(firestore, "reviews", 10);
  }

  for (const review of reviews) {
    firestore.collection("reviews").add(review);
  }
});

async function collectionExists(db, collectionPath) {
  const query = await db.collection(collectionPath).limit(1).get();

  return !query.empty;
}

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
