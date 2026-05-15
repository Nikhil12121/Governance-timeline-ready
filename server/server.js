const express = require('express');
const cors = require('cors');
const { getGovernanceData } = require('./snowflakeDb');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/governance-data/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const data = await getGovernanceData(projectId);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch governance data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
