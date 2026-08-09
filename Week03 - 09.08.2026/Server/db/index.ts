import {MongoClient } from "mongodb"



const uri = "mongodb+srv://baraks_db_user:236TocitlNNQxEuT@cluster0.jajq2gv.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const collection = db.collection('movies');

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);







