const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let servers = [];

// Enregistrer un nouveau serveur
app.post('/servers', (req, res) => {
    console.log('Requête reçue pour enregistrer un serveur:', req.body);
    const { name, ip, port } = req.body;
    console.log(`Nom: ${name}, IP: ${ip}, Port: ${port}`);
    if (!name || !ip || !port) {
        console.log('Données manquantes:', { name, ip, port });
        return res.status(400).json({ error: 'Nom, IP et port sont requis' });
    }
    const newServer = { id: Date.now().toString(), name, ip, port };
    servers.push(newServer);
    res.status(201).json(newServer);
});

// Obtenir la liste des serveurs
app.get('/servers', (req, res) => {
    res.json(servers);
});

// Mettre à jour un serveur
app.put('/servers/:id', (req, res) => {
    const { id } = req.params;
    const { name, ip, port } = req.body;
    const serverIndex = servers.findIndex(s => s.id === id);
    if (serverIndex === -1) {
        return res.status(404).json({ error: 'Serveur non trouvé' });
    }
    servers[serverIndex] = { ...servers[serverIndex], name, ip, port };
    res.json(servers[serverIndex]);
});

// Supprimer un serveur
app.delete('/servers/:id', (req, res) => {
    const { id } = req.params;
    const serverIndex = servers.findIndex(s => s.id === id);
    if (serverIndex === -1) {
        return res.status(404).json({ error: 'Serveur non trouvé' });
    }
    servers.splice(serverIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API de liste de serveurs en cours d'exécution sur le port ${port}`);
});
