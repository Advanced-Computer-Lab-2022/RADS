# RADS
An Online Learning System web application through which individuals can attend pre-recorded courses online, This application is implemented using the MERN stack technique.

# Motivation
Web Development is a crucial part in anything in our era. Thus, this course created the perfect opportunity for us to explore node JS, React, CSS and JavaScript all in one. It also pushed us to challenge ourselves. We had a bad experience booking online last year so we tried to make ours as easy to use as possible. Our goal is to 
provide the user with the ultimate online experience.

# Badges
![ alt text ](https://img.shields.io/badge/Node.js-8BC0D0?style=for-the-badge.svg&logo=Node.js)
![ alt text ](https://img.shields.io/badge/React.js-DD4B39?style=for-the-badge.svg&logo=React)
![ alt text ](https://img.shields.io/badge/JWT-ECD53F?style=for-the-badge.svg&logo=JWT)
![ alt text ](https://img.shields.io/badge/MongoDB-00205B?style=for-the-badge.svg&logo=MongoDB)
![ alt text ](https://img.shields.io/badge/Express.js-000000?style=for-the-badge.svg&logo=Express)
![ alt text ](https://img.shields.io/badge/MUI-FF9900?style=for-the-badge.svg&logo=MUI)
![ alt text ](https://img.shields.io/badge/Git.js-7FE719?style=for-the-badge.svg&logo=Git)
![ alt text ](https://img.shields.io/badge/GitHub-9999FF?style=for-the-badge.svg&logo=GitHub)


# Build Status
* Build status: success

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
  2. In Back-end
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
   
  1. In Front-end:
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
Our main aim was to make our website simple and easy to navigate through. We made a direct User interface. We made sure that everything was authenticated and secured. The website gives feedback on every action done to make the user knows exactly what is happening without any confusion and make him satisfied.

# Code Examples
Our Project is not applicable for code examples as it is a big web application.

# Installation
* First go to Back-end folder and type the command: npm i
* Second go to the Front-end folder and type the command: npm i

# API reference
1. Admin route:
  
  * GET routes: /admin, /admin/:id
  
  * POST routes: /admin/addadmin, /admin/addctrainee, /admin/addinstructor
  
  * PATCH routes: /admin/editadmin/:id
2. Trainee route: 
  
  * GET routes: /trainee, /trainee/:id , /trainee/getcourses/:id,
  
  * POST routes: /trainee/register/:id, /trainee/findgrade/:id, /trainee/findtestgrade/:id, /trainee/forgot/:id, /trainee/addcredit/:id, /trainee/checkregister/:id, /trainee/updatebalance/:id, /trainee/updateprogress/:id, /trainee/courseprogress/:id, /trainee/updateexamstatus/:id, /trainee/updateexamgrade/:id, /trainee/updateexercisesgrade/:id, /trainee/updateexercisesstatus/:id, /trainee/refund/:id, /trainee/checkexstatus/:id, /trainee/findcreditcard/:id, /trainee/deletecard/:id, /trainee/postnote/:id, /trainee/getnotes/:id, /trainee/emailpdf/:id, /trainee/checkcertstate/:id, /trainee/updatecertstate/:id, /trainee/createpdf
  
  * PATCH routes:  /trainee/password/:id

3. Instructor route :
  
  * GET routes: /instructor, /instructor/:id, /instructor/add
  
  * POST routes: /instructor/review/:id, /instructor/forgot/:id , /instructor/updatebalance/:id
  
  * PATCH routes: /instructor/changeInfo/:id, /instructor/password/:id, 
  
  * DELETE routes: /instructor/:id

4. Course route: 
  
  * GET routes: /course, /course/:id, /course/find/:id, /course/rating/:id, /course/highest/views, /course/get/coursesubjects, /course/getinstructor/coursesubjects/:id, 
  
  * POST routes: /course/add, /course/:id, /course/review/:id, /course/rating/:id, /course/promo/:id, /course/max, /course/subset, /course/coursespostpromotion
  
  * DELETE routes: /course/:id, /course/updatepromo/:id, /course/updateview/:id
  
  * PATCH routes: /course/:id

5. CorpTrainee route:
  
  * GET routes:/corptrainee, /corptrainee/:id, /corptrainee/getcourses/:id, /corptrainee/cert/getpdf
  
  * PATCH routes: /corptrainee/password/:id
  
  * POST routes: /corptrainee/register/:id, /corptrainee/checkaccess/:id, /corptrainee/courseprogress/:id, /corptrainee/findgrade/:id, /corptrainee/findtestgrade/:id, /corptrainee/checkexstatus/:id, /corptrainee/checkstatus/:id, /corptrainee/updateexamgrade/:id, /corptrainee/updateexercisesgrade/:id,, /corptrainee/updateexercisesstatus/:id, /corptrainee/updateprogress/:id, /corptrainee/updateexamstatus/:id, /corptrainee/postnote/:id, /corptrainee/getnotes/:id, /corptrainee/checkcertstate/:id,/corptrainee/updatecertstate/:id, /corptrainee/createpdf, /corptrainee/emailpdf/:id

6. Currency route:
  
  * GET routes: /currency
  
  * POST routes: /currency


7. Guest route:
  
  * POST routes: /guest/signup, /guest/login , /guest/create/admin, /guest/create/instructor, /guest/create/corptrainee, /guest/forgotpassword, /guest/changepassword

8. Report route:
  
  * GET route: /request/:id, /requests/refund, /requests/access, /request/getcoursereportscorp/:id,/request/getcoursereportsinst/:id, /request/getcoursereportstrainee/:id, /request/getcorptraineeunresolved/:id, /request/getcorptraineeresolved/:id,/request/gettraineeunresolved/:id,/request/gettraineeresolved/:id, /requests/allproblems

  * PATCH route: /request/updaterequest/:id, /request/updaterequest/:id

  * POST route: /request/postrequest, /request/traineepostcomment/:id, /request/corptraineepostcomment/:id, /request/instructorpostcomment/:id

  

# Tests
- When a trainee purchases a course, he is registered in it.
- Trainee can refund only below 50% progress.
- corptrainee cannot send access request to already enrolled courses.
- instructor cannot create an empty course
- users cannot put invalid informations such as usernames and emails.
- admins can follow up on reports

# How to use?

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

# Contribute
Any contributions to our code is welcomed. You can always improve the frontend for a better UX.

# Credits
Our team "RADS" did tremendous work in order to fullfill this project. Special thanks to our Scrum Master - Ahmed Khaled for being always there for support and for managing our team smoothly. Khaled Ayman , Ali Elserafy , Hassan Haridy , Misk Mohamed also have all worked really hard to perfect this website.
Links that helped us alot: https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE, https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE, https://www.youtube.com/watch?v=x7niho285qs&list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1&index=15&t=1337s
,https://youtu.be/XtS14dXwvwE?list=PLs8AFNosNo41M5IvL5TdewlCzyOUrhDc1

# License

MIT License

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
