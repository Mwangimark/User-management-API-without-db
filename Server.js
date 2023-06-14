const users = require('./data')
const express = require('express');

const app = express();
app.use(express.json());

// User routes

//get all user
app.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json({
            success: true,
            message: "All User",
            results: users.map((user)=>({
              id:user.id,
              username:user.username,
              email:user.email
            }))
        });
        
    } else {
        res.status(404).json({
            success: false,
            message: "Users not fetched",
        })
    }

});

// Register a new user
app.post('/api/users/register', (req, res) => {
    const { username, email, password } = req.body

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
    }

    existingUser = users.find((exist) => exist.username === newUser.exist || exist.email === newUser.email)

    if (existingUser) {
        res.status(200).json({
            message: 'The user already exist'
        })
    }
    else {
        res.status(200).json({
            success: "true",
            message: "The user has been added"
        })
        users.push(newUser)
    }
})

//Login User
app.get('/api/users/login', (req, res) => {
    const { password, email } = req.body
    const person = {
        email,
        password
    }

    const existUser = users.find((detail)=> detail.email===person.email && detail.password===person.password)

    if (existUser){
        res.status(200).json({
            success:"true",
            message:"Login Successful"
        })
    }else{
        res.status(404).json({
            success:"false",
            message:"Authentication failed"
        })
    }
})

//Delete User
app.delete('/api/users/delete/:id',(req,res)=>{
    const {id} =req.params
    const deleteIndex = users.findIndex((index)=> index.id === Number(id))

    if(deleteIndex!== -1){
        const userDelete = deleteIndex-1
        const deleteUser = users.splice(userDelete,1)
        res.status(200).json({
            success:"true",
            message:"Deleted",
            results: deleteUser
        })
    }else{
        res.status(404).json({
            success:"false",
            message:"User not deleted",
            })
    }
})

//update a user
app.put('/api/users/update/:id',(req,res)=>{
    const {email,username} = req.body
    const {id} = req.params
    const findUser = users.findIndex((user)=> user.id === Number(id))

    if(findUser!==-1){
        users[findUser]={...users[findUser],email,username}
        res.status(200).json({
            success:'true',
            message:'the user has been updated'
        })
    }else{
        res.status(404).json({
            success:'false',
            message:'Updating failed'
        })
    }
})
//get a single user
app.get('app/users/:id',(req,res)=>{
    const {id} =req.params
    const singleUser = users.find((user)=>user.id = number(id))

    if(singleUser){
        res.status(404).json({
            success:'true',
            message:'Single user',
            result:singleUser
        }) 
    }else{
        res.status(404).json({
            success:'false',
            message:'Single user does not exist'
        })
    }
})

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

