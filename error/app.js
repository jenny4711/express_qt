const express =require('express');
const ExpressError = require('./expressError')
const app = express();

// app.use(express.json());
// app.use((req,res,next)=>{
//   console.log('the server got a request!!!')
//   next();
// })

// app.use((req,res,next)=>{
//   console.log('hellow dont mind me')
//   next();
// })

function attemptToSaveToDB(){
  throw "Connection Error!"
}

const USERS=[
  {username:"StacysMom",city:"Reno"},
  {username:"Rosalia",city:"R"},
]

app.get("/users/:username",(req,res,next)=>{
  try{
  const user = USERS.find(u=>u.username === req.params.username);
  if (!user) throw new ExpressError("invalid username", 404)
  return res.send({user})
}catch(e){
  next(e)
}
 

})

app.get("/secret",(req,res,next)=>{
  try{
    if(req.query.password != 'popcorn'){
       new ExpressError("invalid password",403)
    }
    return res.send("CONGRATS YOU KNOW THE PASSWORD")

  }catch(e){
    next(e)
  }
 
  
})

app.get('/savetodb',(req,res,next)=>{
  try{
    attemptToSaveToDB()
    return res.send("SAVED TO DB!")
  }catch(e){
    return next(new ExpressError("Database Error"))
  }
 
  
})

app.use((req,res,next)=>{
  const e = new ExpressError("page Not Found",404)
  next()
})


app.use((error,req,res,next)=>{
  
  let status =error.status || 500;
  let message =error.message;
  return res.status(status).json({
    error:{ message,status }
  })
})

app.listen(3000,()=>{
  console.log('App on port 3000')
})