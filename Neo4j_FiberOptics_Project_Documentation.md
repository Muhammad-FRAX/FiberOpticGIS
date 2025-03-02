# Neo4j Fiber Optics Project Documentation

## Introduction

This documentation provides a step-by-step guide to setting up and managing a Neo4j database for the Fiber Optics project. The project involves creating a database to represent fiber optic routes between points, with each route containing various properties such as Site ID, Site Name, State, etc. The points represent locations with latitude and longitude coordinates.

## Prerequisites

- Neo4j Desktop installed on your machine.
- A CSV file (`fiber_network.csv`) containing the fiber optics data.
- Basic knowledge of Cypher query language.

## Setup Instructions

### Step 1: Create a New Database

1. Open Neo4j Desktop.
2. In your `FiberOptics` project, click on "Add Database".
3. Choose "Local DBMS" and give it a name, such as `fiber_network_db`.
4. Set a password for the database.
5. Click "Create".
6. Once the database is created, click "Start" to launch the database.

### Step 2: Access Neo4j Browser

1. With the database running, click on "Open Neo4j Browser" to access the query interface.

### Step 3: Prepare the CSV File

1. Ensure your CSV file (`fiber_network.csv`) is properly formatted and saved.
2. Move your CSV file to the Neo4j import directory:
   - Windows: `C:\Users\<YourUsername>\.Neo4jDesktop\relate-data\dbmss\<dbms-id>\import\`
   - macOS/Linux: `~/Library/Application Support/Neo4j Desktop/Application/relate-data/dbmss/<dbms-id>/import/`
   Replace `<YourUsername>` and `<dbms-id>` with your actual username and the folder name of your database instance.

### Step 4: Define Data Model in Neo4j

#### Clear Existing Data

Run the following query to clear existing nodes and relationships:

```cypher
MATCH (n)
DETACH DELETE n;
```

#### Create Constraints

Create constraints to ensure uniqueness for points based on their latitude and longitude:

```cypher
CREATE CONSTRAINT ON (p:Point) ASSERT (p.latitude, p.longitude) IS UNIQUE;
```

### Step 5: Import Data from CSV

#### Load CSV Data and Create Nodes for Points

Use the following Cypher queries to load data from the CSV file and create nodes for points:

```cypher
// Load CSV Data and Create Point Nodes for Point A
LOAD CSV WITH HEADERS FROM 'file:///fiber_network.csv' AS row
MERGE (p:Point {
  latitude: toFloat(row.LatitudeA),
  longitude: toFloat(row.LongitudeA)
});

// Load CSV Data and Create Point Nodes for Point B
LOAD CSV WITH HEADERS FROM 'file:///fiber_network.csv' AS row
MERGE (p:Point {
  latitude: toFloat(row.`Latitude B`),
  longitude: toFloat(row.` Longitude B`)
});
```

#### Create Relationships for Routes

Create relationships between points representing routes with additional properties, accounting for null values:

```cypher
// Create Route Relationships Between Points
LOAD CSV WITH HEADERS FROM 'file:///fiber_network.csv' AS row
MATCH (p1:Point { latitude: toFloat(row.LatitudeA), longitude: toFloat(row.LongitudeA) })
MATCH (p2:Point { latitude: toFloat(row.`Latitude B`), longitude: toFloat(row.` Longitude B`) })
MERGE (p1)-[r:ROUTE_TO {
  siteID: COALESCE(row.`Site ID*`, 'Unknown Site ID'),
  siteName: COALESCE(row.`Site Name*`, 'Unknown Site Name'),
  state: COALESCE(row.State, 'Unknown State'),
  zone: COALESCE(row.Zone, 'Unknown Zone'),
  fmOffice: COALESCE(row.`FM Office`, 'Unknown FM Office'),
  cluster: COALESCE(row.Cluster, 'Unknown Cluster'),
  siteStage: COALESCE(row.`Site Stage*`, 'Unknown Site Stage'),
  siteType: COALESCE(row.`Site Type`, 'Unknown Site Type'),
  vendor: COALESCE(row.Vendor, 'Unknown Vendor'),
  contractor: COALESCE(row.Contractor, 'Unknown Contractor'),
  sitePriority: COALESCE(row.`Site Priority *`, 'Unknown Priority'),
  isHub: COALESCE(row.`Is Hub`, 'No') = 'Yes',
  isVIP: COALESCE(row.`Is VIP`, 'No') = 'Yes',
  powerType: COALESCE(row.`Power Type`, 'Unknown Power Type'),
  owner: COALESCE(row.Owner, 'Unknown Owner'),
  otnTechnology: COALESCE(row.`OTN Technology`, 'Unknown Technology'),
  routeName: COALESCE(row.`Route Name`, 'Unknown Route'),
  status: 'unknown' // Default status
}]->(p2);
```

### Step 6: Verify the Data

Use these queries to ensure that your data has been imported correctly and the relationships are established:

```cypher
// Verify Points
MATCH (p:Point) RETURN p LIMIT 10;

// Verify Routes
MATCH (p1:Point)-[r:ROUTE_TO]->(p2:Point) RETURN p1, r, p2 LIMIT 10;
```

## Summary

1. **Create a new local database in Neo4j Desktop.**
2. **Start the database and open Neo4j Browser.**
3. **Move your CSV file to the Neo4j import directory.**
4. **Clear existing data.**
5. **Create constraints for points.**
6. **Load data and create nodes for points.**
7. **Create relationships between points representing routes, accounting for null values.**
8. **Verify the data.**

By following these steps, you will have a Neo4j database set up for the Fiber Optics project, with all the necessary data imported and relationships established.

## Contact

For any issues or further assistance, please contact the project maintainer at [email@example.com].