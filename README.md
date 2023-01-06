# RADS
An Online Learning System web application through which individuals can attend pre-recorded courses online, This application is implemented using the MERN stack technique.


<!-- ![](https://github.com/Advanced-Computer-Lab-2022/RADS/blob/main/Demo.gif) -->

<img src="https://github.com/Advanced-Computer-Lab-2022/RADS/blob/main/Demo.gif" width="100%" height = "100%">

# Motivation
This project was created for The GUC `CSEN704 Advanced Computer lab` The lab is a project-based course that aims to teach students

-   Scrum and Agile methodologies
-   Software development best practices
-   Software development tools and techniques
-   Software development process
-   Software Testing
-   latest backend and frontend technologies

Web Development is a crucial part in anything in our era. Thus, this course created the perfect opportunity for us to explore node JS, React, CSS and JavaScript all in one. It also pushed us to challenge ourselves. Our goal is to 
provide the user with the ultimate online experience.

# Badges


![ alt text ](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ alt text ](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JSON Web Tokens Badge](https://img.shields.io/badge/JWT-000?logo=jsonwebtokens&logoColor=fff&style=for-the-badge)
![ alt text ](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![ alt text ](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=Express)
![ alt text ](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white)
![ alt text ](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![ alt text ](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![ alt text ](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![ alt text ](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)



# Build Status
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
  
  * All requirements are filled, more testing is required to ensure the best service and UX.
  * This project is currently in development.
  * Unit tests will be added.
  * Feedback and error handling for better UI/UX.
  

# Code Style
We used the standard Javascript Coding style to improve readability and maintainability of our code. Moreover, this gives a uniform appearance to the code and makes it as clean and easy to read as possible. A semicolon is present after each statement. All functions are declared above the code that uses them. We also used a naming conventions for local variables. We named the local variables using camel case lettering starting with small letter.

# Screen shots

  1. Login page:

  ![login](https://user-images.githubusercontent.com/105018459/210191665-441fd574-2933-4a4a-8858-fe0b415fa4a6.PNG)

  2. Signup page:

  ![signup](https://user-images.githubusercontent.com/105018459/210191686-2bdec74b-7240-419b-bda0-73fb94164874.PNG)

  3. About page:

  ![about](https://user-images.githubusercontent.com/105018459/210191709-f7397949-30d9-4a9c-b7c1-be5389e9ed1e.PNG)

  4. Home page:

  ![Home](https://user-images.githubusercontent.com/105018459/210191828-d47f02c9-8b7c-44f7-a8a7-5f008f8eab93.PNG)

  5. Instructor Lobby:

  ![home2](https://user-images.githubusercontent.com/105018459/210191854-beb720fe-c051-4825-8964-e3f0d1bb6b5e.PNG)

  6. Add course:

  ![addourse](https://user-images.githubusercontent.com/105018459/210191860-bd726d21-3f35-45e1-9593-201f43b79dd9.PNG)


# Tech/Framework used

1. In Back-end
    * NodeJS
    * Nodemailer
    * MongoDB
    * Mongoose
    * Express
    * Bcrypt
    * Body-parser
    * Cors
    * Dotenv
    * Fs
    * Html-pdf
    * Https
    * Jsonwebtoken
    * Nodejs-nodemailer-outlook
    * Nodemon
    * Passport
    * Passport-jwt
    * Randomstring
    * Validator

2. In Front-end:
    * ReactJS
    * Material UI
    * Axios
    * Bcrypt
    * Dateformat
    * File-saver
    * Jsonwebtoken
    * Http
    * Jspdf
    * Jwt-decode
     

# Features

The system serves different type of users (Admin, Instructor , Individual Trainee, Corporate Trainee)

1- As a guest, you can 
  * view all courses, search and filter courses by price, rating or subject and view their description.


2- As a Trainee, you can
  * view all courses
  * search and filter courses by price, rating or subject and view their description
  * purchase courses
  * view course videos
  * solve exercises
  * request refund for course
  * solve exam exercises
  * report a problem whether it is technical, financial or other.
  * rate a courses and instructors
  * view their balance
  * add/remove credit cards 
  * write course notes and download them
  * view all report and their status follow up on unresolved problem
  * edit his email or password


3- As a Corporate Trainee, you can
  * view all courses
  * search and filter courses by rating or subject and view their description
  * request to access a course
  * view course videos
  * solve exercises
  * solve exam exercises
  * report a problem whether it is technical, financial or other.
  * rate a courses and instructors
  * write course notes and download them
  * view all report and their status follow up on unresolved problem
  * edit his email or password


4- As an Instructor, you can 
  * create a new course and add all it's information
  * set promotion for a specific course
  * view all his ratings and reviews
  * report a problem whether it is technical, financial or other
  * view all report and their status follow up on unresolved problem
  * edit his biography or email or password
  * search and filter courses by price, rating or subject and view their description
  * search and filter his courses by price, rating or subject and view their description


5- As an Admin, you can
  * Add corporate trainees and set their usernames and passwords
  * Add instructors and set their usernames and passwords
  * view reported problems and can add comments and set report status
  * grant access to refund requests by trainees
  * grant access to course requests by corporate trainees
  * set promotion for one or more than one course
  * Add another admin and set their usernames and passwords


# Code Examples

```javascript
const updateCertificateState = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.receivedCertificate': true } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

```


```javascript
const sendPDF = (toEmail, body) => {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Certificate of completion',
        text: body,
        attachments: [{
            filename: 'certificate.pdf',
            path: '../backend/Controllers/Documents/certificate.pdf',
            contentType: 'application/pdf'
        }],
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
};
```

```javascript
export const AddProfile = (form, setShow, setMessage) => dispatch => {
    axios
        .post("/api/profiles", form)
        .then(res => {
            setShow(true)
            setMessage("User added with success")
            dispatch({
                type: ERRORS,
                payload: {}
            })
            setTimeout(() => {
                setShow(false)
            }, 4000);
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}


```

```javascript
  const handlePromotion = (e) => {
    var updatedCourseList = [...checkedCourses];
    let current = courses.filter((item) =>
      newKeys.some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
    );
    if (e.target.checked) {
      updatedCourseList = [...checkedCourses].concat(current);
    } else {
      console.log(updatedCourseList.length);
      for (let i = 0; i < updatedCourseList.length; i++) {
        if (updatedCourseList[i]["_id"] === e.target.value) {
          console.log(updatedCourseList[i]["_id"] + " at " + i);
          updatedCourseList.splice(i, 1);
          i--;
        }
      }
    }
    setCheckedCourses(updatedCourseList);
  };
```


```javascript
 const handleSubmit = (e) => {
    console.log(checkedCard);
    e.preventDefault(); //prevent form submission
    if (checkedCard === null) {
      setNoCreditCard("You need to enter select a payment method.");
    } else if (checkedCard === "balance" && !purchased) {
      if (trainee.balance >= course.price) {
        registerCourse();
        let finalPrice = course.price * -1;
        updateBalance(finalPrice);
        updateInstructorBalance(-1 * finalPrice);
        setPurchased(true);
      } else {
        setHtml2(`You dont have enought money in the balance!`);
      }
    } else if (
      checkedCard !== "balance" &&
      checkedCard !== null &&
      !purchased
    ) {
      checkExpiryDate(checkedCard);
    } else {
      setHtml("You already bought the course");
    }
  };

```


```javascript
  const postComment = async () => {
    const body = { instructorComment };
    const response = await fetch(`/report/instructorpostcomment/${reportId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      window.location.reload();
    }
  };

```

```javascript
const performIntersection = (arr1, arr2, arr3, arr4) => {
    const intersectionResult1 = arr1.filter((x) => arr2.indexOf(x) !== -1);
    const intersectionResult2 = intersectionResult1.filter(
      (x) => arr3.indexOf(x) !== -1
    );
    const intersectionResult3 = intersectionResult2.filter(
      (x) => arr4.indexOf(x) !== -1
    );
    if (arr4.length === 0) {
      return intersectionResult2;
    } else {
      return intersectionResult3;
    }
  };
```

# Installation
  * Open two separate terminals.
  * In the first terminal, go to Back-end folder and install all packages in the Backend folder:
      ```bash
      cd backend && npm i
      ```
  * In the second terminal, go to the Front-end folder and type the command: npm i
      ```bash
      cd frontend && npm i
      ```


 
   

# Tests

The testing is done using `jest`. To run the tests, run the following command

```bash
> npm run test
```

Also, the tests can be done using Postman on any route

# How to use?

To run backend 
```bash
cd backend && node App.js
```
To run frontend
```bash
cd frontend && npm run start
```
the backend server and frontend will be running on the specified ports on your env files.


# Contribute
Any contributions to our code is welcomed. You can always improve the frontend for a better UX.

# Credits
 * Our team "RADS" did tremendous work in order to fullfill this project. Special thanks to our Scrum Master - Ahmed Khaled [@Ahmed Khaled](https://www.github.com/ahmillect) for being always there for support and for managing our team smoothly:
    - Khaled Ayman [@Khaled Ayman](https://www.github.com/Khaledayman9)
    - Ali Elserafy [@Ali Serafy](https://www.github.com/AliSerafy)
    - Hassan Haridy [@Hassan Haridy](https://www.github.com/1hassanharidy)
    - Misk Mohamed [@Misk Abdullah](https://www.github.com/miskmabdalla)
 * Links that helped us alot: 
    - https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
    - https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
    - https://www.youtube.com/watch?v=x7niho285qs&list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1&index=15&t=1337s
    - https://youtu.be/XtS14dXwvwE?list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1

# License

MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) [2023] [Ahmed Khaled]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



# API reference
   

  
  1. Admin route: 
      - GET all admins.
      - Description: returns all admins in the database.
      - URL: ``` /admin ```
      - Parameters: None
      - Body: None
      - Response: Model.Admins
         
      - GET a specific admin with id.
      - Description: returns a specific admin in the database.
      - URL: ``` /admin/:id ```
      - Parameters: Admin's id "id"
      - Body: None
      - Response: Model.Admins
 
      - PATCH a specific admin with id.
      - Description: updates a specific admin in the database.
      - URL:    ``` /admin/editadmin/:id ```
      - Parameters: Admin's id "id",
      - Body: { userName, password } 
      - Response: Model.Admins
      
    
 
   


  2. Trainee route: 

      * GET routes: /trainee, /trainee/:id , /trainee/getcourses/:id,

      * POST routes: /trainee/register/:id  -  /trainee/findgrade/:id  - /trainee/findtestgrade/:id  - /trainee/forgot/:id  - /trainee/addcredit/:id   -    /trainee/checkregister/:id   -  /trainee/updatebalance/:id    -   /trainee/updateprogress/:id  -  /trainee/courseprogress/:id   -  /trainee/updateexamstatus/:id  -  /trainee/updateexamgrade/:id   -  /trainee/updateexercisesgrade/:id  -  /trainee/updateexercisesstatus/:id  -  /trainee/refund/:id  -  /trainee/checkexstatus/:id  -   /trainee/findcreditcard/:id  -   /trainee/deletecard/:id  -   /trainee/postnote/:id   -   /trainee/getnotes/:id   -   /trainee/emailpdf/:id   -   /trainee/checkcertstate/:id   -   /trainee/updatecertstate/:id   -   /trainee/createpdf

      * PATCH routes:  /trainee/password/:id

  3. Instructor route :

      * GET routes: /instructor  -  /instructor/:id   - /instructor/add

      * POST routes: /instructor/review/:id  -  /instructor/forgot/:id  - /instructor/updatebalance/:id

      * PATCH routes: /instructor/changeInfo/:id  - /instructor/password/:id  

      * DELETE routes: /instructor/:id

  4. Course route: 

      * GET routes: /course -  /course/:id  - /course/find/:id  -  /course/rating/:id  -  /course/highest/views  -  /course/get/coursesubjects  -   /course/getinstructor/coursesubjects/:id

      * POST routes: /course/add  -  /course/:id  -   /course/review/:id   -   /course/rating/:id   -  /course/promo/:id   -  /course/max  -  /course/subset  -   /course/coursespostpromotion

      * DELETE routes: /course/:id   -   /course/updatepromo/:id   -   /course/updateview/:id

      * PATCH routes: /course/:id

  5. CorpTrainee route:

      * GET routes:/corptrainee   -  /corptrainee/:id   -   /corptrainee/getcourses/:id   -   /corptrainee/cert/getpdf

      * PATCH routes: /corptrainee/password/:id

      * POST routes: /corptrainee/register/:id   -   /corptrainee/checkaccess/:id   -   /corptrainee/courseprogress/:id   -   /corptrainee/findgrade/:id  -   /corptrainee/findtestgrade/:id  -   /corptrainee/checkexstatus/:id  -   /corptrainee/checkstatus/:id  -   /corptrainee/updateexamgrade/:id  -   /corptrainee/updateexercisesgrade/:id  -   /corptrainee/updateexercisesstatus/:id  -   /corptrainee/updateprogress/:id   -   /corptrainee/updateexamstatus/:id  -   /corptrainee/postnote/:id  -   /corptrainee/getnotes/:id  -   /corptrainee/checkcertstate/:id   -  /corptrainee/updatecertstate/:id  -   /corptrainee/createpdf  -   /corptrainee/emailpdf/:id

  6. Currency route:

      * GET routes: /currency

      * POST routes: /currency


  7. Guest route:

      * POST routes: /guest/signup  -  /guest/login  -   /guest/create/admin  -  /guest/create/instructor  -  /guest/create/corptrainee  -  /guest/forgotpassword  -   /guest/changepassword

  8. Report route:

      * GET route: /request/:id  -  /requests/refund  -  /requests/access -   /request/getcoursereportscorp/:id   -  /request/getcoursereportsinst/:id   -   /request/getcoursereportstrainee/:id   -   /request/getcorptraineeunresolved/:id  -   /request/getcorptraineeresolved/:id   -  /request/gettraineeunresolved/:id -  -  /request/gettraineeresolved/:id  -   /requests/allproblems

      * PATCH route: /request/updaterequest/:id  -  /request/updaterequest/:id

      * POST route: /request/postrequest  -  /request/traineepostcomment/:id  -  /request/corptraineepostcomment/:id   - /request/instructorpostcomment/:id
