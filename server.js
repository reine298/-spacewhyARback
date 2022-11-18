const express = require('express');
const mysql = require('mysql');

const app = express();

//parse json to object
app.use(express.json());

//connect mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root', // when using mamp
    database: 'spacewhy',
    port: '8889' // port in perference mamp
})

connection.connect((err) => {
    if(err){
        console.log('Error connecting to MySQL database =', err)
        return;
    }
    console.log('MySQL successfully connected!');
})


//create routes
// // add question --------------> finished 
app.post('/addquestion', async (req,res)=>{
    const {question_no,question,c1,c2,c3,c4,ans} = req.body;
    try{
        //console.log(req.body);
        connection.query(
            "INSERT INTO spacewhy_quiz(question_no,question,c1,c2,c3,c4,ans) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [question_no,question,c1,c2,c3,c4,ans], //array input
            (err, results, fields) =>{ // parameters
                if(err){
                    console.log('Error while adding new question', err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: 'New question created!'});
            } 
        )
    } catch(err){
        console.log('Error while adding new question',err);
        return res.status(500).send();
    }
})

// // add user --------> update user and user's ans รับ,ส่ง
app.post('/adduser', async (req,res)=>{ // ส่ง
    const {user_id,ans1,ans2,ans3,ans4,ans5,ans6,ans7,ans8,ans9,ans10,user_point} = req.body;
    try{
        //console.log(req.body);
        connection.query(
            "INSERT INTO users(user_id,ans1,ans2,ans3,ans4,ans5,ans6,ans7,ans8,ans9,ans10,user_point) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
            [user_id,ans1,ans2,ans3,ans4,ans5,ans6,ans7,ans8,ans9,ans10,user_point], //array input
            (err, results, fields) =>{ // parameters
                if(err){
                    console.log('Error while adding new user', err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: 'New user_id created!'});
            } 
        )
    } catch(err){
        console.log('Error while adding new user_id',err);
        return res.status(500).send();
    }
})

// // add questionnaire ans   get,เพิ่ม,เก็บ
app.get('/getquestionnaire', async (req,res)=>{   // get questionnaire.json
    try{
        connection.query("SELECT * FROM questionnaire", (err,results, fields)=>{
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})

app.post('/addquestionnaire', async (req,res)=>{  //  เพิ่ม questionnaire --------------> finished
    const {qn1,qn2,qn3,qn4,qn5,qn6} = req.body;
    try{
        //console.log(req.body);
        connection.query(
            "INSERT INTO questionnaire(qn1,qn2,qn3,qn4,qn5,qn6) VALUES(?, ?, ?, ?, ?, ?)",
            [qn1,qn2,qn3,qn4,qn5,qn6], //array input
            (err, results, fields) =>{ // parameters
                if(err){
                    console.log('Error while adding new questionnaire', err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: 'New questionnaire created!'});
            } 
        )
    } catch(err){
        console.log('Error while adding new questionnaire',err);
        return res.status(500).send();
    }
})

// {
//     "qn1":"ข้อมูลใน Spacewhy มีประโยชน์ต่อการนำไปใช้",
//     "qn2":"ความรู้ที่ได้รับจาก Spacewhy",
//     "qn3": "Spacewhy สร้างความน่าสนใจให้กับท้องฟ้าจำลอง",
//     "qn4": "Spacewhy ทำให้เห็นภาพของดาวเคราะห์ชัดเจนขึ้น",
//     "qn5": "Spacewhy สร้างความสนุกในหารชมนิทรรศการ",
//     "qn6": "ข้อเสนอแนะเพิ่มเติม"
// }

app.post('/addquestionnaireans', async (req,res)=>{  // เก็บ ans
    const {qn1,qn2,qn3,qn4,qn5,qn6} = req.body;
    try{
        //console.log(req.body);
        connection.query(
            "INSERT INTO questionnaireans(qn1,qn2,qn3,qn4,qn5,qn6) VALUES(?, ?, ?, ?, ?, ?)",
            [qn1,qn2,qn3,qn4,qn5,qn6], //array input
            (err, results, fields) =>{ // parameters
                if(err){
                    console.log('Error while adding new questionnaire', err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: 'New questionnaire created!'});
            } 
        )
    } catch(err){
        console.log('Error while adding new questionnaire',err);
        return res.status(500).send();
    }
})



app.listen(3000, ()=> console.log('Server is running'));