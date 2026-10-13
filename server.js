
const express = require("express")
const mongoose = require("mongoose")

const PC = require("./models/PC")

const PORT = 5000;

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/PC").then(()=>{

    console.log("Успешное подключение к БД");
    
}).catch((error)=>{

    console.log("Ошибка при подключение к БД" + error);
    
});

app.get("/PC" , async (req , res) => {
    try {

      const products = await PC.find();

      res.json(products);
    } catch(error) {

     res.send("Ошибка при получение Компьютера!");
    }
})

app.get("/PC/:id" , async (req , res) => {
    try {
      const {id} = req.params
      const PC = await PC.find(id);s
      res.json(PC);
    } catch(error) {
     res.send("Ошибка при получение Компьютера!");
    }
})

app.post('/addPC' , async (req , res)=>{

    const {title , description , price} = req.body
    try{

        const newPC = await PC.create({
            title , 
            description , 
            price
        })

        await newPC.save()

     res.send("Компьютера добавлен успешно!")
    }catch(error){

     console.log("Ошибка при добавление Компьютера! " + error);

     res.send("Ошибка придобавление Компьютера!")
    }
});

app.put("/PC/:id" , async(req, res)=>{
    try{
    const {id} = req.params

    const { title,
          description,
          price } = req.body
    console.log(id);
    

    const updatePC = await PC.findByIdAndUpdate(id, {
        title, 
        description, 
        price,
    }, {new: true});

    if(!updatePC){
        res.json("Такого Компьютера не существует!")
    }

    res.json(updatePC , "Компьютера обнавлен успешно");
}catch (error) {
    console.log("Ошибка при обновление Компьютера: " + error);
    
}
    
});

app.patch("/PC/:id" , async (req , res)=>{
    try{
        const {id} = req.params

        const PCUpdate = await PC.findByIdAndUpdate(id , {$set: req.body} , {new: true})
        res.json(PCUpdate)
    }catch(error){

    }
})

app.delete("/PC/:id" , async (req , res)=>{
    try{

    const {id} = req.params

    const PC = await PC.findByIdAndDelete(id)

    if (!PC) {
        res.send("Такого компьютера не существует!")
    }
        res.send("Компьютер успешно удален!")
       } catch (error) {
        console.log("Ошибка при добавлении Компьютера!");
       res.send("Ошибка при удалении Компьютера:" + error) 
       }
})
app.listen(PORT , ()=>{
    console.log("Успешное поключение к серверу порт: " + PORT);
    
})