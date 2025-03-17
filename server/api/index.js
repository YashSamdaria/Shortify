require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the index for fast searching
urlSchema.index({ shortCode: 1 });
const Url = mongoose.model("Url", urlSchema);

// POST Route to Shorten a URL
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}` });
    }

    let shortCode;
    let newUrl;
    while (true) {
      try {
        shortCode = nanoid(7);
        newUrl = await Url.create({ originalUrl, shortCode });
        break;
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️ Duplicate shortCode found. Retrying...`);
          continue;
        }
        throw error;
      }
    }

    res.json({ shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}` });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET Route to Handle Redirects
app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode: id });

    if (urlEntry) {
      return res.redirect(urlEntry.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = app;
