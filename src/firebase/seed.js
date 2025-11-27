import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Read the JSON key manually
const serviceAccountKey = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

//import dataSeed from "./vansSeed.js";
import dataSeed from "./usersSeed.js";
const collectioName = "user"; //"vans"

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const db = getFirestore(app);

// Seed function
async function seed() {
  try {
    for (let item of dataSeed) {
      await db.collection(collectioName).doc(item.id).set(item);
      console.log(`Seeded van: ${item.name}`);
    }
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

// Run seed
seed();
