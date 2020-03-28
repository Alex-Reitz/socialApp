const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

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

const firebase = require("firebase");
firebase.initializeApp(config);

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
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
  admin
    .firestore()
    .collection("screams")
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

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };
  //Todo validate data

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      return res
        .status(201)
        .json({ message: `user ${data.user.uid} signed up successfully` });
    })
    .catch(err => {
      console.err(error);
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
