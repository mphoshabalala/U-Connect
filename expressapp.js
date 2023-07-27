//require expres to use express app
const express = require('express');
const { result } = require('lodash');
const morgan = require('morgan');
//require mysql to work with sql
const mysql = require('mysql2');


//create connection

const connection = mysql.createConnection({
    host: 'localhost', // This matches the service name defined in the Docker Compose file
    user: 'root',
    password: 'thabiso.leboko',
    database: 'ulearn_db',
  });
//connect to the db
connection.connect((err) => {
    if(err) console.log(err);
     console.log('connected');
   
});


//creating express app and working with express app
const app = express();
//set ejs view engine and where we gonna get our views
app.set('view engine', 'ejs');  //allow for ejs
app.set('views', 'html'); // place to get ejs is html


//allow for getting only single data from the form
app.use(express.urlencoded({ extended: false }));


//localhost port to listen to
app.listen(5000);

//Middleware and Static files  //allows for using this files
app.use(express.static('styles'));
app.use(express.static('resources'));
app.use(express.static('js'));
// app.use(express.static('app.js'));

app.use(morgan('dev'));


//render the index/ home page
app.get('/', (req, res) => {
    res.render('index');
});


// TUTOR

//render the tutor's register page
app.get('/tutorRegister', (req, res) => {
    res.render('tutorRegister');
});

app.get('/tutorsuccess', (req, res)=> {
    res.render('tutorSuccess');
});


app.get('/tutorlogin', (req, res) => {
    let errorMessage = '';
    res.render('tutorLogin', {errorMessage});
});


let nextTutor = 1;
//get content from the tutor register
app.post('/tutors', (req, res) => {
    const role = 'tutor';
    const {firstname, lastname, country, password, confirm_password, subjects, topics
        ,available, contacts, gmail, about} = req.body;
const tutorID = 1;
    //sql query to insert values into the db
    const sql = `
    INSERT INTO tutor (tutor_id,tutor_name, tutor_surname, tutor_country, tutor_password,
        tutor_confirm_password, tutor_subjects, tutor_topics, tutor_availability, 
        tutor_contacts, tutor_gmail, tutor_about, tutor_role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

     //connecting to the db
     connection.query(sql, 
        [tutorID,
        firstname,
        lastname,
        country,
        password,
        confirm_password,
        subjects,
        topics,
        available,
        contacts,
        gmail,
        about,
        role]
        , (err, result) => {
    if(err){
     console.log(err);
    }
        console.log('Data Inserted');
        // res.send('Form submited');
        res.redirect('tutorSuccess');
    });
});


app.get('/tLogin', (req, res) => {
    res.redirect('tutorLogin');
});


app.post('/tutorLogin', (req, res) => {
    const {gmail, password} = req.body;
    sql = `SELECT * FROM tutor WHERE tutor_gmail = '${gmail}' AND tutor_password = '${password}'`;
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return;
        }

        if(result.length > 0){
            console.log('Match found');
            res.redirect('studentPosts');
        } else {
            console.log('match not found');
            res.render('tutorLogin', {errorMessage: 'Invalid Credentals'});
        }
    });
    console.log(req.body);
});




//render tutor posts
app.get('/tutorPosts', (req, res) => {
    let sql = `SELECT tutor_name, tutor_subjects, tutor_topics, tutor_availability, 
    tutor_contacts, tutor_gmail, tutor_about FROM tutor`;
    connection.query(sql, (err, posts, fields) => {
        if(err){
            console.log(err) }
        // res.send('DB created');
        res.render('tutorPosts', {title: "Tutor-Posts", posts});
        console.log(posts);
    });
});


// STUDENT

//render the student' register page
app.get('/studentRegister', (req, res) => {
    res.render('studentRegister');
});

//student success page render
app.get('/studentsuccess', (req, res) => {
    res.render('studentSuccess');
});



//student login page render
app.get('/studentlogin', (req, res) => {
    let errorMessage = '';
    res.render('studentlogin', {errorMessage});
});

//render student posts
app.get('/studentposts', (req, res) => {


    //select data from the database
    let sql = `SELECT student_name,student_subjects, student_topics, student_availability, 
        student_contacts, student_gmail, student_about FROM student`;
        connection.query(sql, (err, posts, fields) => {
        if(err){
            console.log(err) }
        res.render('studentPosts', {title: "Student-Posts", posts});
        console.log(posts);
    });
   
});


let nextStudent = 1;

// get data from the user to the database using post method
app.post('/student', (req, res) => {
    const studentID = nextStudent++;
    const role = 'student';
    //make sure that the request body occur in this format
    const {firstname, lastname, country, password, confirm_password, subjects, topics
         ,available, contacts, gmail, about} = req.body;
    
    //sql query to insert values into the db
    const sql = `
    INSERT INTO student (student_id,student_name, student_surname, student_country, student_password,
        student_confirm_password, student_subjects, student_topics, student_availability, 
        student_contacts, student_gmail, student_about, student_role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    
    //connecting to the db
    connection.query(sql, [studentID,
                   firstname,
                   lastname,
                   country,
                   password,
                   confirm_password,
                   subjects,
                   topics,
                   available,
                   contacts,
                   gmail,
                   about,
                   role], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log('Data Inserted');
        res.redirect('studentSuccess');
    });
    
   
});

//student-login validation
app.post('/studentLogin', (req, res) => {
    const {gmail, password} = req.body;
    sql = `SELECT * FROM student WHERE student_gmail = '${gmail}' AND student_password = '${password}'`;
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return;
        }

        if(result.length > 0){
            console.log('Match found');
            res.redirect('tutorposts');
        } else {
            console.log('match not found');
            res.render('studentlogin', {errorMessage: 'Invalid Credentals'});
        }
    });
    console.log(req.body);
});


