import express from "express";
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `img-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Store posts in memory
const posts = [];

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/create-post-form", (req, res) => {
  res.render("create-post");
});


// Handle form submission
app.post('/create-post', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  let imageUrl = '';
  if (req.file) {
    imageUrl = '/images/' + req.file.filename;
  }
  posts.push({
    id: posts.length + 1,
    title,
    description,
    imageUrl
  });
  res.redirect('/');
});

// Clear images folder before starting the server
const imagesFolder = path.join(process.cwd(), 'public/images');
function clearImagesFolder() {
  if (fs.existsSync(imagesFolder)) {
    const files = fs.readdirSync(imagesFolder);
    for (const file of files) {
      const filePath = path.join(imagesFolder, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
    console.log('Images folder cleared!');
  } else {
    // Create folder if doesn't exist
    fs.mkdirSync(imagesFolder, { recursive: true });
  }
}

clearImagesFolder();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
