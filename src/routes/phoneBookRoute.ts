import express,{Application,Request,Response} from 'express';
const phonebookRoutes = express.Router()
const Phonebook =require('../schema/phoneBookSchema')

phonebookRoutes.post('/add', async (req:Request, res:Response) => {
    //console.log(req)
    const newContact = new Phonebook(req.body)
    newContact.save()
      res.json('successfully added')
    }
  )
  
  phonebookRoutes.get('/', async (req:Request, res:Response) => {
    const contacts = await Phonebook.find({
    })
    
    res.send(contacts)
  })

  phonebookRoutes.get('/:lastName', async (req:Request, res:Response) => {
    const contacts = await Phonebook.find({
        last_name:req.params.lastName,
    })
    res.send(contacts)
  })
  
  phonebookRoutes.put('/:id', async (req:Request, res:Response) => {
    const contact = await Phonebook.findOne({
        _id:req.params.id,
    })
if(!contact){
    res.send("no user found")
}
     await Phonebook.findOneAndUpdate({
      _id: req.params.id,
    },{
        first_name:req.body.first_name?req.body.first_name:contact.first_name,
        last_name:req.body.last_name?req.body.last_name:contact.last_name,
        phone_number:req.body.phone_number?req.body.phone_number:contact.phone_number,
    })
    res.send("successfully updated")
    
  })

  phonebookRoutes.delete('/:id', async (req:Request, res:Response) => {
    const contact = await Phonebook.findOne({
        _id:req.params.id,
    })
if(!contact){
    res.send("no user found")
}
await Phonebook.deleteMany({
    _id:req.params.id,
  });
    res.send("successfully deleted")
  })

  module.exports = phonebookRoutes