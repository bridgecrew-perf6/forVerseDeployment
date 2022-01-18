import {MongoClient} from 'mongodb';

const dbConnectionString= 'mongodb+srv://shashikumar_mango:mtvClustorOlu4135987@cluster0.zmeix.mongodb.net/Database01reactDecember?retryWrites=true&w=majority'

async function handler(req,res){
    if(req.method==='POST') {
        const data = req.body;


        const connection = await MongoClient.connect(dbConnectionString);
        const db = connection.db();
        const meetupsCollection = db.collection('newCollection');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        connection.close();

        res.status(201).json({msg:'data sent successfully'});

    }
}

export default handler;