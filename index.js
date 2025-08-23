const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // to serve static files like your HTML/CSS

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, concern } = req.body;

    const newEntry = {
        name,
        email,
        concern,
        timestamp: new Date().toISOString()
    };

    // Save to JSON file
    fs.readFile('contacts.json', 'utf8', (err, data) => {
        let contacts = [];
        if (!err && data) {
            contacts = JSON.parse(data);
        }
        contacts.push(newEntry);

        fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error('Error saving contact:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Contact information saved successfully.');
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
