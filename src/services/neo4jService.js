// src/services/neo4jService.js

import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.REACT_APP_NEO4J_URI,
  neo4j.auth.basic(process.env.REACT_APP_NEO4J_USER, process.env.REACT_APP_NEO4J_PASSWORD)
);

export const fetchSitesAndLinks = async () => {
  const session = driver.session();
  try {
    // Test connection to Neo4j
    const testResult = await session.run('RETURN 1');
    if (testResult.records.length === 0) {
      throw new Error('Failed to connect to Neo4j');
    }
    console.log('Successfully connected to Neo4j');

    const result = await session.run(`
      MATCH (s:Site)
      OPTIONAL MATCH (d:Device)-[:LOCATED_IN]->(s)
      OPTIONAL MATCH (d)-[r:LINKED_WITH]->(d2:Device)-[:LOCATED_IN]->(s2:Site)
      RETURN s, collect(DISTINCT d) as devices, collect({site: s2, link: r}) as linkedSites
    `);

    const sites = result.records.map(record => ({
      site: record.get('s').properties,
      devices: record.get('devices').map(device => device.properties),
      linkedSites: record.get('linkedSites').filter(linkedSite => linkedSite.site).map(linkedSite => ({
        site: linkedSite.site.properties,
        link: linkedSite.link.properties
      }))
    }));

    return sites;
  } finally {
    await session.close();
  }
};