const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;
const JSON_FILE = path.join(__dirname, 'votes.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/count', async (req, res) => {
    const data = await fs.readFile(JSON_FILE, 'utf8');
    const votes = JSON.parse(data);
    res.render('count', { votes })
})

app.get('/:choice', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        const votes = JSON.parse(data);
        const vote = req.params.choice
        votes[vote] += 1
        await fs.writeFile(JSON_FILE, JSON.stringify(votes), )
        
        res.render('done', {vote})
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal EVM Error');
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
