// import express from 'express';
import express from 'express';
//import cors
import cors from 'cors';
//import file upload
import fileUpload from "express-fileupload"

const app = express();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('World1!');
});

//enable json request
app.use(express.json());
// enable cors all origin
app.use(cors());
//import and enable swagger documentation pages
import docsRouter from './middleware/swagger-doc.js';
app.use(docsRouter)

//import and enable controllers
// Enable file upload support
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))
//import and enable validation middleware
import { validateErrorMiddleware } from './middleware/validator.js';
app.use(validateErrorMiddleware);

import userController from './controllers/users.js';
app.use(userController);

import activityController from './controllers/activities.js';
app.use(activityController);

import blogpostController from './controllers/blogposts.js';
app.use(blogpostController);

import classController from './controllers/classes.js';
app.use(classController);

import bookingController from './controllers/bookings.js';
app.use(bookingController);

import roomController from './controllers/rooms.js';
app.use(roomController);


const dateTime = new Date("2023-05-20T20:00:00.000Z");
const date = dateTime.toISOString().split("T")[0];
const time = dateTime.toTimeString().split(" ")[0].substring(0, 5)
console.log(time)

app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`);
});
