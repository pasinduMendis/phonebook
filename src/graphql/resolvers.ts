const Phonebook =require('../schema/phoneBookSchema')
const resolvers = {
    Query:{
        getAll:async()=>{
            const contacts = await Phonebook.find({
            })
            return contacts
        }
    },
    Mutation:{
        createNewContact:async(params: any,args: any,contex: any,info: any)=>{
            const {first_name,last_name,phone_number}=args.contact
            const newContact = new Phonebook({first_name,last_name,phone_number})
    newContact.save()
    return newContact
        },

        deleteContact:async(params: any,args: any,contex: any,info: any)=>{
            const {id}=args.contact
            const iscontact = await Phonebook.findOne({
                _id:id,
            })
        if(!iscontact){
            return("no user found")
        }
        await Phonebook.deleteMany({
            _id:id,
          });
          return("deleted")
        },
        updateContact:async(params: any,args: any,contex: any,info: any)=>{
            const {id}=args
            const {first_name,last_name,phone_number}=args.contact
            const iscontact = await Phonebook.findOne({
                _id:id,
            })
        if(!iscontact){
            return("no user found")
        }
        await Phonebook.findOneAndUpdate({
            _id: id,
          },{
              first_name:first_name,
              last_name:last_name,
              phone_number:phone_number,
          })
          return("successfully updated")
        }
        
    }
};

module.exports=resolvers