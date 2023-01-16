const express = require('express')
const app =express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.post('/resgister',(req,res)=>{
  res.send(req.body);
})

app.get('/',(req,res)=>{
  res.send("Homepage")
})

app.get('/dogs',(req,res)=>{
  console.log("You Asked For /DOGS!")
  console.log(req)
  res.send("<h1>Woof Woof</h1>")
}) 



app.get('/chickens',(req,res)=>{
  res.send("bock! bock!")
})

app.post('/chickens',(req,res)=>[
res.send("You created a new chicken(not really)")
])

const greetings={
  en:"hello",
  fr:"bonjour",
  ic:"hallo",
  js:"konnichiwa"
}
app.get("/greet/:language/",(req,res)=>{
  const lang=req.params.language
  const greeting =greetings[lang]
  if (!greeting) return  res.send("INVALID LANGUAGE")
   return res.send(greeting.toUpperCase())
})

app.get('/search',(req,res)=>{
  const{term='piggie',sort='hot'}=req.query;
  return res.send(`SEARCH PAGE!! TERM is :${term},sort is :${sort}`)
})

app.get('/show-me-header',(req,res)=>{
  console.log(req.rawHeaders)
  console.log(req.headers)
  res.send(req.headers)
})
app.get('/show-language',(req,res)=>{
  const lang=req.headers['accept-language']
res.send(`your language preference is:${lang}`)
})



app.listen(3000,()=>{
  console.log('App on port 3000')
})