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
const City = require("./models/Cities");
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

app.get("/admin", function (req, res) {
  if (req.session.user && req.session.user.isAdmin === "1") {
    // Yetkili kullanıcı, admin sayfalarını görebilir.
  } else {
    // Yetkisiz erişim
    res.redirect("/");
  }
});

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

// Add admin user
app.post("/addAdminUser", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let admin = req.body.admin;

  User.findOne({ email: email }).then((response) => {
    if (response) {
      return res.send({ message: "kayitli kullanici" });
    } else {
      const yeniKullanici = new User({
        username: username,
        email: email,
        password: password,
        phone: phone,
        admin: admin,
      });
      yeniKullanici.save();
      return res.send({ message: "basarıyla kayıt oldu" });
    }
  });
});

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
  let address = req.body.address;
  let city = req.body.city;
  let distict = req.body.distict;
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
        address: { city: city, distict: distict, address: address },
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

app.post("/addWorkshopProps", async (req, res) => {
  let id = req.body.id;
  let brand = req.body.brand;
  let maintenance = req.body.maintenance;

  Workshop.findOne({ _id: id }).then((result) => {
    if (brand.trim() !== "") {
      let index = result.brand.findIndex((item) => item.brand === brand);
      if (index === -1) {
        result.brand.push({ brand: brand });
        console.log("marka girdim");
      } else {
        console.log("marka kayıtlı");
      }
    }
    if (maintenance.trim() !== "") {
      let index = result.maintenance.findIndex(
        (item) => item.ad === maintenance
      );
      if (index === -1) {
        result.maintenance.push({ ad: maintenance });
        console.log("tur girdim");
      } else {
        console.log("tur kayıtlı");
      }
    }

    result.save();
  });
});

app.post("/reqMarka", async (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    //userı kontrol et eger giriş yaptıysa marka secim sayfasına yönlendir.

    return res.status(200).send(JSON.stringify({ rota: "marka" }));
  } else {
    // eger kullanıcı giriş yapmadıysa logine yönlendir.
    console.log("login");
    return res.status(200).send(JSON.stringify({ rota: "login" }));
  }
});
// marka ekle
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
// marka ekle
app.get("/getMarka", async (req, res) => {
  Marka.find({}, "ad")
    .then((markas) => {
      return res.send(markas);
    })
    .catch((err) => {
      throw err;
    });
});

// add model
app.post("/addModel", async (req, res) => {
  let model = req.body.model;
  let marka = req.body.marka;

  Marka.findOne({ ad: marka }).then((result) => {
    result.modeller.push({ ad: model });
    result.save();
    console.log(result);
  });
});
// add model

// delete model
app.post("/deleteModel", async (req, res) => {
  let marka = req.body.marka;
  let model = req.body.model;

  Marka.findOne({ ad: marka }).then((result) => {
    console.log("yenisi" + result);
    const index = result.modeller.findIndex((opt) => opt.ad === model);

    if (index !== -1) {
      result.modeller.splice(index, 1);
      result.save();
      console.log("Model silindi.");
    } else {
      console.log("Silinecek model bulunamadı.");
    }
  });
});

// list model
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
// list model

// add Repair type
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
// add Repair type
// get Repair type
app.get("/getRType", async (req, res) => {
  RepairType.find({}).then((result) => {
    let types = result.map((mod) => mod.ad);
    return res.send(types);
  });
});
// get Repair type

// delete repair type
app.post("/deleteRType", async (req, res) => {
  let rType = req.body.rType;
  RepairType.findOneAndDelete({ ad: rType })
    .then((result) => {
      if (result) {
        console.log(`Successfully deleted document with  ${rType}.`);
      } else {
        console.log(`No document found with _id: ${rType}.`);
      }
    })
    .catch((err) => console.error(`Failed to delete document: ${err}`));
});

// get Workshops
app.get("/getWorkshop", async (req, res) => {
  Workshop.find({}).then((result) => {
    return res.json(result);
  });
});
// get Workshops

// get admin users
app.get("/getAdminUser", async (req, res) => {
  User.find({ admin: "1" }).then((result) => {
    if (result) {
      return res.send(result);
    } else {
      return res.send(
        JSON.stringify({ message: "admin kullanıcısı bulunamadı" })
      );
    }
  });
});
// get admin users
app.get("/adminCheck", async (req, res) => {
  let user = req.session.user;
  if (user) {
    if (user.admin === "1") {
      return res.status(200).send(JSON.stringify({ check: "1" }));
    } else {
      return res.status(401).send(JSON.stringify({ check: "0" }));
    }
  } else {
    return res.status(404).send(JSON.stringify({ check: "2" }));
  }
});

// delete users
app.post("/deleteUser", async (req, res) => {
  User.findOneAndDelete({ email: req.body.email })
    .then((response) => {
      if (response) {
        console.log(
          `Successfully deleted document with _id: ${req.body.email}.`
        );
      } else {
        console.log(`No document found with _id: ${req.body.email}.`);
      }
    })
    .catch((err) => console.error(`Failed to delete document: ${err}`));
});
// delete users

// delete brand
app.post("/deleteBrand", async (req, res) => {
  Marka.findOneAndDelete({ ad: req.body.brand })
    .then((response) => {
      if (response) {
        console.log(`Successfully deleted document with  ${req.body.brand}.`);
      } else {
        console.log(`No document found with  ${req.body.brand}.`);
      }
    })
    .catch((err) => console.error(`Failed to delete document: ${err}`));
});

app.get("/getCity", async (req, res) => {
  City.find({}, "ilAdi")
    .then((il) => {
      return res.send(il);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/getDistrict", async (req, res) => {
  try {
    City.findOne({ ilAdi: req.query.city })
      .then((il) => {
        if (il === null) {
        } else {
          return res.send(il.ilceler);
        }
      })
      .catch((err) => {
        throw err;
      });
  } catch {}
});

app.get("/getFilterWorkshop", async (req, res) => {
  try {
    const filter = {};
    console.log("-- buradayim");
    console.log(req.query);

    // City ve district filtresi
    if (req.query.city && req.query.district) {
      filter["address.city"] = req.query.city;
      filter["address.distict"] = req.query.district;
    } else if (req.query.city) {
      filter["address.city"] = req.query.city;
    }

    // Marka filtresi
    if (req.query.brand) {
      filter["brand.brand"] = req.query.brand;
    }

    // Maintenance filtresi
    if (req.query.rtype) {
      filter["maintenance.ad"] = req.query.rtype;
    }

    // Veritabanından kayıtları filtreleyin
    const workshops = await Workshop.find(filter);

    res.json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
});

app.post("/deleteWorkshop", async (req, res) => {
  try {
    Workshop.findOneAndDelete({ _id: req.body.id }).then((result) => {
      if (result) {
        res.send(JSON.stringify({ message: "basarıyla silindi" }));
      } else {
        res.send(JSON.stringify({ message: "bir hata olustu" }));
      }
    });
  } catch {}
});

app.listen(port, function () {
  console.log(`Server running at ${port}/`);
});
