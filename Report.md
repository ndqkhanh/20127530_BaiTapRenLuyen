# INTRODUCTION TO SOFTWARE ENGINEERING
Course `CSC13002`: INTRODUCTION TO SOFTWARE ENGINEERING
Class 20CLC11 Term III / 2022-2023

StudentID: `20127530`
FullName: `Nguyễn Đinh Quang Khánh`
Role code: `Backend developer`
Framework: `Express`
Tutorial link: [`Node.js Crash Course Tutorial`](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)

## PROJECT
#### SIGN UP API

In this project my team will use `Express` which is a minimal and flexible `Node.js` web application framework that provides a robust set of features for web and mobile applications.

```js
const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

// Sign up route
router.post('/signup', validate(authValidation.register), authController.register);

module.exports = router;
```



