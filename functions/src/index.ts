/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { log } from "firebase-functions/logger";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

exports.addmessage = onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await getFirestore().collection("messages").add({
    original: original,
  });
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  const original = event.data?.data().original;

  log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();

  return event.data?.ref.set({ uppercase }, { merge: true });
});
