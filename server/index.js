const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9000;

const app = express();

app.use(
  cors({
    origin: [
      'https://solosphere-market.web.app',
      'https://solosphere-market.firebaseapp.com',
      'http://localhost:5173',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrua0aj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const jobsCollection = client
      .db('soloSphereConceptualDb')
      .collection('jobs');
    const bidsCollection = client
      .db('soloSphereConceptualDb')
      .collection('bids');
    // Get all jobs data from db
    app.get('/jobs', async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });
    // Get single job data from db
    app.get('/job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });
    // Save bid data in database
    app.post('/bid', async (req, res) => {
      const bidData = req.body;
      console.log(bidData);
      const result = await bidsCollection.insertOne(bidData);
      res.send(result);
    });
    // Save Job in DB
    app.post('/job', async (req, res) => {
      const job = req.body;
      const result = await jobsCollection.insertOne(job);
      res.send(result);
    });
    // Get specific user by email
    app.get('/jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = { 'buyer.email': email };
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });
    // Delete a job
    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });
    // Update a Job in DB
    app.put('/job/:id', async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData, // update full job data
        },
      };
      const result = await jobsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from SoloSphere Server.....');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
