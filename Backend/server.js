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
const Comment = require("./models/Comment");
const Star = require("./models/Star");
const GasBrand = require("./models/GasBrand");
const GasStation = require("./models/GasStation");
const Fuels = require("./models/Fuels");
const UserFuel = require("./models/UserFuel");
require('dotenv').config();
const port = 4000;
app.use(require("body-parser").json());

//Database and Session Connection

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => console.log("Connected!"));
const store = new MongoDBStore({
  uri: process.env.DATABASE_CONNECTION_STRING,
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

var fs = require("fs");
var google = require("googleapis").google;
const google_cred = JSON.parse(fs.readFileSync("./client_secret_google.json"));

const axios = require("axios");

// Generating google auth url
const oauth2Client = new google.auth.OAuth2(
  google_cred.web.client_id,
  google_cred.web.client_secret,
  google_cred.web.redirect_uris[0]
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

var google_auth_url = oauth2Client.generateAuthUrl({
  scope: scopes,
});

app.get("/googleLoginUrl", async (req, res) => {
  return res.send(JSON.stringify({ message: google_auth_url }));
});
// -- Generating google auth url

app.get("/api/login-via-google", async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    const fetchUrl =
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
      tokens.access_token;
    const response = (await axios.get(fetchUrl)).data;
    const email = response.email;
    const name = response.given_name;

    const userControl = await User.findOne({ email: email });
    if (!userControl) {
      const yeniKullanici = new User({
        username: name,
        email: email,
        password: "",
        phone: "",
      });
      await yeniKullanici.save();
      req.session.user = yeniKullanici;
    } else {
      req.session.user = userControl;
    }
  } catch {}

  return res.redirect("http://localhost:3000/");
});

app.get("/admin", function (req, res) {
  if (req.session.user && req.session.user.isAdmin === "admin") {
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

app.get("/reqUserLogin", async (req, res) => {
  if (req.session.user) {
    //userı kontrol et eger giriş yaptıysa marka secim sayfasına yönlendir.

    return res.status(200).send(JSON.stringify({ rota: "session" }));
  } else {
    // eger kullanıcı giriş yapmadıysa logine yönlendir.

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
  });
});
// add model

// delete model
app.post("/deleteModel", async (req, res) => {
  let marka = req.body.marka;
  let model = req.body.model;

  Marka.findOne({ ad: marka }).then((result) => {
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
  let result = await Marka.findOne({ ad: marka });
  if (result) {
    let models = result.modeller.map((mod) => mod);
    return res.send(models);
  } else return res.status(404).send();
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
  await RepairType.findOneAndDelete({ ad: rType })
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
app.get("/getWorkshops", async (req, res) => {
  Workshop.find({}).then((result) => {
    return res.json(result);
  });
});
// get Workshops
app.get("/getworkshop", async (req, res) => {
  try {
    Workshop.findOne({ _id: req.query.id }).then((result) => {
      return res.json(result);
    });
  } catch {
    console.log("hataaaa");
  }
});
// get  users
app.get("/getUser", async (req, res) => {
  User.find({}).then((result) => {
    if (result) {
      return res.send(result);
    } else {
      return res.send(JSON.stringify({ message: "Kullanıcı Bulunamadı" }));
    }
  });
});
// get  users
app.get("/adminCheck", async (req, res) => {
  let user = req.session.user;
  if (user) {
    if (user.admin === "admin") {
      return res.status(200).send(JSON.stringify({ check: "admin" }));
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
    let il = await City.findOne({ ilAdi: req.query.city });

    if (il !== null) {
      return res.send(il.ilceler);
    } else {
      return res.status(404).send();
    }
  } catch {
    console.log("hata!!!!");
  }
});

app.get("/getFilterWorkshop", async (req, res) => {
  try {
    const filter = {};

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
    let workshops = await Workshop.find(filter).lean();

    const workshopIds = workshops.map((workshop) => workshop._id);
    const ratings = await Star.find({ workshop: workshopIds });

    for (let i = 0; i < workshops.length; i++) {
      workshops[i].ratings = [];
      ratings.forEach((rating) => {
        if (rating.workshop === workshops[i]._id.toString()) {
          workshops[i].ratings.push(rating);
        }
      });
    }

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

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      return res.status(202).json({ message: "Basarıyla Cıkıs Yapıldı" });
    }
  });
});

app.get("/user", (req, res) => {
  try {
    const user = req.session.user;

    if (!user) return res.status(400).send();
    res.json(user);
  } catch {}
});

app.get("/getWorkshopFilterCity", async (req, res) => {
  let city = req.query.city;
  Workshop.find({ "address.city": city }).then((result) => {
    res.send(result);
  });
});

app.post("/userAddWorkshop", async (req, res) => {
  let email = req.body.email;
  let workshopId = req.body.workshopId;
  User.findOneAndUpdate(
    { email: email },
    { workshop: workshopId },
    { new: true }
  )
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/getUserWorkshop", async (req, res) => {
  try {
    workshopId = req.session.user.workshop;
    let workshop = await Workshop.findOne({ _id: workshopId });
    return res.status(200).send(workshop);
  } catch {}
});

app.post("/addComment", async (req, res) => {
  try {
    let userId = req.session.user.username;
    let comment = req.body.comment;
    let workshopId = req.body.workshopId;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    let commentControl = comment.trim();
    if (commentControl.length !== 0) {
      if (comment !== "") {
        const newComment = new Comment({
          workshop: workshopId,
          user: userId,
          comment: comment,
          date: year + "-" + month + "-" + day,
        });
        await newComment.save();
        return res.send({
          comment: newComment,
          message: "Yorumunuz Başarıyla Yazıldı",
        });
      } else {
        return res.send({ message: "Yorum yazınız" });
      }
    } else {
      return res.send({ message: "Yanlış yorum girdiniz" });
    }
  } catch {
    console.log("hata aldım");
  }
});

app.get("/getComment", async (req, res) => {
  let workshopId = req.query.id;
  await Comment.find({ workshop: workshopId })
    .then((result) => {
      if (result.length === 0) {
      } else {
        let reversedArr = [];
        for (let i = result.length - 1; i >= 0; i--) {
          reversedArr.push(result[i]);
        }
        return res.send(reversedArr);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/userUpdateWorkshop", async (req, res) => {
  try {
    const workshopId = req.session.user.workshop;

    Workshop.findByIdAndUpdate(
      workshopId,
      {
        "address.description": req.body.addressDescription,
        phone: req.body.phone,
        description: req.body.description,
        workingHours: {
          start: req.body.worktimeStart,
          end: req.body.worktimeEnd,
        },
        email:req.body.email,
        website:req.body.website,
      },
      { new: true }
    )
      .then((updatedWorkshop) => {})
      .catch((err) => {
        console.error("Hata:", err);
      });
  } catch {}
});

app.post("/addStar", async (req, res) => {
  let workshopId = req.body.id;
  let star = req.body.rating;
  let userId = req.session.user._id.toString();

  try {
    const stars = await Star.find({ workshop: workshopId });
    const userStar = await stars.find((star) => star.user === userId);

    if (!userStar) {
      const newStar = new Star({
        workshop: workshopId,
        user: userId,
        star: star,
      });
      newStar.save();
      return res.send({ message: "basarıyla kayıt oldu", data: "1" });
    } else {
      return res.send({ message: "Tekrar oy kullanamazsınız", data: "1" });
    }

    // Diğer işlemler...
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getStar", async (req, res) => {
  let id = req.query.id;

  const stars = await Star.find({ workshop: id });
  const didVote =
    stars.findIndex((star) => star.user === req.session.user._id.toString()) ===
    -1
      ? false
      : true;
  const starValues = stars.map((star) => parseInt(star.star));
  return res.send(JSON.stringify({ value: starValues, didVote: didVote }));
});

app.post("/addStationBrand", async (req, res) => {
  let brand = req.body.brand;
  try {
    const result = await GasBrand.findOne({ ad: brand });
    if (result) {
      return res.status(400).json({ message: "Bu Marka Kayıtlı" });
    } else {
      const newBrand = new GasBrand({
        ad: brand,
      });
      await newBrand.save();
      return res.status(200).json({ message: "Basarıyla Kayıt Oldu" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Bir şeyler yanlış gitti." });
  }
});
app.get("/getStationBrand", async (req, res) => {
  try {
    let brands = await GasBrand.find({});
    return res.send(brands);
  } catch {
    console.log("error");
  }
});

app.post("/addGasStation", async (req, res) => {
  try {
    let stationBrand = req.body.stationBrand;
    let cityName = req.body.cityName;
    let districtName = req.body.districtName;
    let stationName = req.body.stationName;

    const newGasStation = new GasStation({
      ad: stationName,
      brand: stationBrand,
      address: {
        city: cityName,
        district: districtName,
      },
    });
    await newGasStation.save();
    return res.status(200).send({ message: "Basarıyla kayıt edildi" });
  } catch {
    console.log("error");
  }
});

app.get("/getGasStation", async (req, res) => {
  try {
    let station = await GasStation.find({});

    return res.send(station);
  } catch {
    console.log("error");
  }
});

app.get("/getFilterGasStation", async (req, res) => {
  try {
    let city = req.query.city;
    let brand = req.query.brand;

    const data = await GasStation.find({ "address.city": city, brand: brand });
    if (!data || data.length === 0) {
      res.status(400).send();
    } else {
      res.status(200).json(data);
    }
  } catch {
    console.log("error");
  }
});

app.post("/addFuels", async (req, res) => {
  let fuel = req.body.fuel;
  let data = await Fuels.findOne({ ad: fuel });
  if (data) {
    return res.status(400).send();
  } else {
    const newFuel = new Fuels({
      ad: fuel,
    });
    newFuel.save();
    return res.status(200).send({ message: "basarıyla kayıt yapıldı" });
  }
});

app.get("/getFuels", async (req, res) => {
  let data = await Fuels.find({});
  if (data.length !== 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ message: "Fuel yok" });
  }
});

app.post("/addUserFuel", async (req, res) => {
  try {
    let user = req.session.user._id.toString();
    let fuelStationId = req.body.fuelStationId;
    let fuelType = req.body.fuelType;
    let stationBrand = req.body.stationBrand;
    let distance = req.body.distance;
    let fuelLiter = req.body.fuelliter;
    let fuelPrice = req.body.fuelPrice;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const newFuel = new UserFuel({
      userid: user,
      fuelstationid: fuelStationId,
      fueltype: fuelType,
      stationbrand: stationBrand,
      distance: distance,
      fuelliter: fuelLiter,
      fuelprice: fuelPrice,
      date: year + "-" + month + "-" + day,
    });
    await newFuel.save();
    return res.status(200).send({ message: "Basarıyla kayıt yapıldı" });
  } catch {
    return res.status(404).send();
  }
});

app.get("/getUserFuel", async (req, res) => {
  try {
    let userId = req.query.userid;
    let fuels = await UserFuel.find({ userid: userId });
    return res.status(200).send(fuels);
  } catch {
    return res.status(400).send();
  }
});
app.post("/deleteUserFuel", async (req, res) => {
  let id = req.body.id;
  let fuel = await UserFuel.findOneAndDelete({ _id: id });
  return res.status(200).send();
});

app.post("/workshopImageAdd", async (req, res) => {
  let image = req.body.image;
  let id = req.body.id;
  try {
    const workshop = await Workshop.findById(id); // İlgili workshop'u bul
    workshop.image.push(image); // Yeni veriyi image dizisine ekle
    const updatedWorkshop = await workshop.save(); // Güncellenmiş workshop kaydet
    res.json(updatedWorkshop); // Güncellenmiş workshop'u döndür
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, function () {
  console.log(`Server running at ${port}/`);
});
