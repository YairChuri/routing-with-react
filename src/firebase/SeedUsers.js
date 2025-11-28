import admin from "firebase-admin";
import usersSeed from "./usersSeed.js";
import fs from "fs";

// Make sure you have your service account JSON
const serviceAccountKey = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const auth = admin.auth();

async function seedUsers() {
  for (const user of usersSeed) {
    try {
      // Check if user already exists
      await auth.getUserByEmail(user.email);
      console.log(`User ${user.email} already exists`);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        const newUser = await auth.createUser({
          uid: user.id,
          email: user.email,
          password: user.password,
          displayName: user.name,
        });
        console.log(`Created user: ${newUser.email}`);
      } else {
        console.error(err);
      }
    }
  }
}

seedUsers().then(() => console.log("Seeding done!"));
