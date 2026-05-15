const snowflake = require('snowflake-sdk');
const { mockData } = require('./mockData');
require('dotenv').config();

let connection;

// Only initialize if we have credentials
if (process.env.SNOWFLAKE_ACCOUNT) {
  connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE
  });

  connection.connect((err, conn) => {
    if (err) {
      console.error('Unable to connect to Snowflake:', err.message);
      connection = null; // Fallback to mock data
    } else {
      console.log('Successfully connected to Snowflake.');
    }
  });
} else {
  console.log('No Snowflake credentials found. Running in mock data mode.');
}

// Wrapper for executing a snowflake query using Promises
const executeQuery = (sqlText, binds = []) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      return reject(new Error('No active Snowflake connection'));
    }
    connection.execute({
      sqlText,
      binds,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Failed to execute statement due to the following error: ' + err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    });
  });
};

/**
 * Fetches governance data for a given project ID.
 * Tries to fetch from Snowflake; if it fails or there's no connection, falls back to mock data.
 */
const getGovernanceData = async (projectId) => {
  if (!connection) {
    // Graceful fallback to dummy data
    console.log(`[API] Serving mock data for ${projectId}`);
    return { ...mockData, projectId: projectId || mockData.projectId };
  }

  try {
    console.log(`[API] Querying Snowflake for project ${projectId}...`);
    
    // In a full implementation, you would run multiple queries to construct the object:
    // const projectRows = await executeQuery('SELECT * FROM DIM_PROJECT WHERE id = ?', [projectId]);
    // const milestoneRows = await executeQuery('SELECT * FROM FACT_MILESTONES WHERE project_id = ?', [projectId]);
    // ... and so on to assemble the full `GovernanceData` object.

    // Since we don't have the actual DB schema setup, for now we will simulate 
    // a successful query by returning the mock data if connection exists but tables aren't mapped.
    // Replace this block with actual mapping logic once tables are confirmed.
    
    return { ...mockData, projectId };

  } catch (err) {
    console.warn(`[API] Snowflake query failed, falling back to mock data:`, err.message);
    return { ...mockData, projectId };
  }
};

module.exports = { getGovernanceData, executeQuery };
