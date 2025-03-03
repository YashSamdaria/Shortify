require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");

const app = express();
const PORT = process.env.PORT || 5000;

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
  shortCode: { type: String, unique: true, required: true }, // Unique index
  createdAt: { type: Date, default: Date.now },
});

// Create the index for fast searching
urlSchema.index({ shortCode: 1 });
const Url = mongoose.model("Url", urlSchema);

// 🔹 POST Route to Shorten a URL with Retry on Duplicate ShortCode
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  // Validate URL
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
      });
    }

    let shortCode;
    let newUrl;

    // Retry insertion until a unique shortCode is generated
    while (true) {
      try {
        shortCode = nanoid(7);
        newUrl = await Url.create({ originalUrl, shortCode });
        break; // If successful, break the loop
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️ Duplicate shortCode found. Retrying...`);
          continue; // Retry with a new shortCode
        }
        throw error; // Stop if another error occurs
      }
    }

    res.json({ shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}` });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 🔹 GET Route to Handle Redirects
app.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Search for the shortCode in the database
      const urlEntry = await Url.findOne({ shortCode: id });
  
      if (urlEntry) {
        return res.redirect(urlEntry.originalUrl); // Redirect to the original URL
      } else {
        return res.status(404).json({ error: "URL not found" }); // Handle invalid shortCode
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  });
  
// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
