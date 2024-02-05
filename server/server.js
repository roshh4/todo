const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002;
const  cors = require('cors');

const uri = 'mongodb://localhost:27017/new'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}));

const connectToDB = async () => {
    await client.connect();
    console.log('Connected to MongoDB');
};

const db = client.db();
app.get('/three', async (req, res) => {
  const collection = db.collection('notesApp');
    const employees = await collection.find().sort({ updatedAt: -1 }).toArray();;
    res.json(employees);
});

app.get('/all', async (req, res) => {
  const collection = db.collection('notesApp');
  const todos = await collection.find().sort({ updatedAt: -1 }).toArray();
  res.json(todos);
});

app.get('/api/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;

  try {
    const noteDetails = await db.collection('notesApp').findOne({ _id: new ObjectId(noteId) });

    if (noteDetails) {
      res.json(noteDetails);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error fetching note details', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/notes', async (req, res) => {

      const { title, content } = req.body;
      const now = new Date();
  
      const result = await db.collection('notesApp').insertOne({
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
    });

    app.put('/update/:noteId', async (req, res) => {
      try {
        const noteId = req.params.noteId;
        const { title, content } = req.body;
    
        const result = await db.collection('notesApp').updateOne(
          { _id: new ObjectId(noteId) },
          { $set: { title, content, updatedAt: new Date() } }
        );
    
        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: 'Note not found' });
        }
    
        const updatedNote = await db.collection('notesApp').findOne({ _id: new ObjectId(noteId) });
        res.json(updatedNote);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.delete('/delete/:noteId', async (req, res) => {
        const noteId = req.params.noteId;
        console.log(noteId);
      const deletedNote = await db.collection('notesApp').findOneAndDelete({ _id: new ObjectId(noteId) });
    
        if (deletedNote.value) {
          res.json({ message: 'Note deleted successfully' });
        } else {
          res.status(404).json({ error: 'Note not found' });
        }
      // } catch (error) {
      //   console.error(error);
      //   res.status(500).json({ error: 'Internal Server Error' });
      // }
    });

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});