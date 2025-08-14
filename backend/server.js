const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const globalConfigs = require('./routes/globalConfigs');
const users = require('./routes/user');
const posts = require('./routes/post');
const comments = require('./routes/comments');
const awards = require('./routes/awards');
const workouts = require("./routes/workouts");
const goals = require("./routes/goals");
// const mainRoute = require('./routes/index');

const app = express();

// Разрешённые источники берём из ENV, иначе по умолчанию только локалхост
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

const corsOptions = {
  origin(origin, callback) {
    // Разрешаем запросы без Origin (например, curl/health-check) и из списка allowlist
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
// (опционально) чтобы preflight OPTIONS тоже обрабатывался теми же правилами:
app.options('*', cors(corsOptions));



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/configs', globalConfigs);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/awards', awards);
app.use(
  "/api/workouts",
  passport.authenticate("jwt", { session: false }),
  workouts
);
app.use(
  "/api/goals",                                          
  passport.authenticate("jwt", { session: false }),      
  goals                                                  
);
// app.use('/', mainRoute);

// Server static assets if in production
app.get('/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
