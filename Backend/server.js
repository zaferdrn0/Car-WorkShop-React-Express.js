const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const app = express();
const User = require("./models/User");
const Workshop = require("./models/Workshop");
const Marka = require("./models/Car");
const RepairType = require("./models/RepairType");
const port = 4000;
app.use(require("body-parser").json());

//Database and Session Connection

mongoose
  .connect("mongodb://localhost:27017/My-Car-Service")
  .then(() => console.log("Connected!"));
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/My-Car-Service",
  collection: "sessions",
});
app.use(
  session({
    secret: "my-car",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

//Database and Session Connection

//Cors Connection
app.options(
  "*",
  cors({
    credentials: true,
    methods: "*",
    origin: "http://localhost:3000",
  })
); // include before other routes

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
//Cors Connection

//Register
app.post("/register", async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    console.log("calıstım");

    await User.findOne({ email: email })
      .then((result) => {
        if (result) {
          let hataMesaji = JSON.stringify({
            message: "Kullanıcı Mevcut",
            rota: "1",
          });
          return res.send(hataMesaji);
        } else {
          const yeniKullanici = new User({
            username: username,
            email: email,
            password: password,
            phone: phone,
          });
          yeniKullanici.save();
          req.session.user = yeniKullanici;
          let message = JSON.stringify({
            message: ".Basariyla kayit oldunuz.",
            rota: "home",
          });
          return res.send(message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch {}
});
//Register

//Login
app.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  await User.findOne({
    email: email,
  })
    .then((result) => {
      if (result) {
        if (email === result.email && password === result.password) {
          req.session.user = result;
          console.log(req.session);
          let message = JSON.stringify({
            message: ".Basarıyla Giris Yaptınız.",
            yonlendir: "1",
          });
          return res.send(message);
        } else {
          let hataMesaji = JSON.stringify({
            message: ".Sifre yanlis.",
          });
          return res.send(hataMesaji);
        }
      } else {
        let hataMesaji = JSON.stringify({
          message: ".Eposta Adresi Kayıtlı Degil.",
        });
        return res.send(hataMesaji);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
//Login

//Workshop add
app.post("/addWorkshop", async (req, res) => {
  let name = req.body.name;
  let address = req.body.name;
  let image = req.body.image;
  let phone = req.body.phone;
  let description = req.body.description;

  await Workshop.findOne({ address: address }).then((result) => {
    if (result) {
      let message = JSON.stringify({
        message: "Bu adreste kayitli workshop bulunmakta.",
      });
      return res.send(message);
    } else {
      const newWorkshop = new Workshop({
        name: name,
        description: description,
        address: address,
        phone: phone,
        image: image,
      });
      newWorkshop.save();
      let message = JSON.stringify({ message: "Workshop add success" });
      return res.send(message);
    }
  });
});
//Workshop add

app.post("/reqMarka", async (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    //userı kontrol et eger giriş yaptıysa marka secim sayfasına yönlendir.
    console.log("marka");
    return res.status(200).send(JSON.stringify({ rota: "marka" }));
  } else {
    // eger kullanıcı giriş yapmadıysa logine yönlendir.
    console.log("login");
    return res.status(200).send(JSON.stringify({ rota: "login" }));
  }
});

app.post("/addMarka", async (req, res) => {
  let marka = req.body.marka;
  let mrk = await Marka.findOne({ ad: marka });
  if (mrk) {
    return res.send(JSON.stringify({ message: "bu marka kayıtlı" }));
  } else {
    const newMarka = new Marka({
      ad: marka,
    });
    newMarka.save();
    console.log("marka kayıt oldu");
  }
});

app.get("/getMarka", async (req, res) => {
  Marka.find({}, "ad")
    .then((markas) => {
      return res.send(markas);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/postMarka", async (req, res) => {
  let marka = req.body.marka;
  Marka.findOne({ ad: marka }).then((result) => {
    if (result) {
      return res.send(JSON.stringify({ model: result.modeller }));
    } else {
      return res.send(JSON.stringify({ err: "marka bulunamadı" }));
    }
  });
});

app.post("/addModel", async (req, res) => {
  let model = req.body.model;
  let marka = req.body.marka;
  console.log(marka + model);

  Marka.findOne({ ad: marka }).then((result) => {
    result.modeller.push({ ad: model });
    result.save();
    console.log(result);
  });
});

app.get("/getModel", async (req, res) => {
  let marka = req.query.marka;
  Marka.findOne({ ad: marka }).then((result) => {
    if (result) {
      let models = result.modeller.map((mod) => mod);
      console.log(models);
      return res.send(models);
    }
  });
});

app.post("/addRType", async (req, res) => {
  let rType = req.body.rType;
  RepairType.findOne({ ad: rType }).then((result) => {
    if (result) {
      console.log("kayıtlı tur");
    } else {
      const newRepairType = new RepairType({
        ad: rType,
      });
      newRepairType.save();
      console.log(rType + " kayıt oldu");
    }
  });
});

app.get("/getRType", async (req, res) =>{
   RepairType.find({})
   .then((result) =>{
    let types = result.map((mod) => mod.ad);
    return res.send(types)
   })
})

app.listen(port, function () {
  console.log(`Server running at ${port}/`);
});
