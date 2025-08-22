const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
var methodOverride = require("method-override");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // file not found error
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/service', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'services.html'));

//   res.sendFile(path.join(__dirname, 'views', 'service.html'));
});
app.get('/guidance', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'crop-guidance.html'));

//   res.sendFile(path.join(__dirname, 'views', 'service.html'));
});

app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'news.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Contact form submitted:', req.body);

  // TODO: Handle the data (e.g., send email, store in DB)
  
  res.sendFile(path.join(__dirname, 'views', 'submitted.html'));
});

app.get('/about-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.listen(port, () => {
    console.log("server is listening at port 3000");
});
