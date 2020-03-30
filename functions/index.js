const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const firebase = require("firebase");
admin.initializeApp();

const config = {
  apiKey: "AIzaSyC-VrHapS8dTe0w_xQQ3m8tD7TC1GwkHXs",
  authDomain: "socialape-8d830.firebaseapp.com",
  databaseURL: "https://socialape-8d830.firebaseio.com",
  projectId: "socialape-8d830",
  storageBucket: "socialape-8d830.appspot.com",
  messagingSenderId: "361999820063",
  appId: "1:361999820063:web:e8d342f531c5e5c440bc2a",
  measurementId: "G-MBC9C14DPW"
};

firebase.initializeApp(config);

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "descending")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(screams);
    })
    .catch(err => console.log(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };
  db.collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
      console.error(err);
    });
});

//Signup Route
let token, userId;
db.doc(`/users${newUser.handle}`)
  .get()
  .then(doc => {
    if (doc.exists) {
      return res.status(400).json({ handle: "This handle is already taken" });
    } else {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
  })
  .then(data => {
    userId = data.user.uid;
    data.user.getIdToken();
  })
  .then(idToken => {
    token = idToken;
    const userCredentials = {
      handle: newUser.handle,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId
    };
    return db.doc(`/users/${newUser.handle}`).set(userCredentials);
  })
  .then(() => {
    return res.status(201).json({ token });
  })
  .catch(err => {
    console.error(err);
    if (err.code === "auth/email-already-in-use") {
      return res.status(400).json({ email: "Email is already in use." });
    } else {
      return res.status(500).json({ error: error.code });
    }
  });

exports.api = functions.https.onRequest(app);
