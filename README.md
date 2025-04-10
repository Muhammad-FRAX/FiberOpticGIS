# Network Monitoring Dashboard

A modern web application for monitoring network devices and alarms, built with React and Neo4j.

## Project Structure

```
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── assets/            # Static assets (icons, images)
│   ├── components/        # Reusable React components
│   │   ├── Alarms/       # Alarm-related components
│   │   ├── Layout/       # Layout components (Sidebar, etc.)
│   │   └── Map/          # Map visualization components
│   ├── pages/            # Page components
│   ├── services/         # API and service integrations
│   ├── styles/           # CSS stylesheets
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
└── backend/
    ├── server.js         # Express server
    ├── package.json      # Backend dependencies
    └── .env              # Environment variables
```

## Key Components

### ActiveAlarms Component
Located in `src/components/Alarms/ActiveAlarms.js`

Displays a list of active alarms with the following features:
- Real-time updates every 5 seconds
- Scrollable list of alarms
- Visual indicators for alarm severity
- Device information and triggering relationships
- User menu with logout functionality

#### Styling
- Modern, clean design with subtle red background
- Custom scrollbar
- Hover effects and transitions
- Responsive layout

### MapView Component
Located in `src/components/Map/MapView.js`

Interactive map visualization with:
- Device markers with status indicators
- Network links between devices
- Click interactions for device details
- Real-time updates
- Custom panes for proper z-index management

### Sidebar Component
Located in `src/components/Layout/Sidebar.js`

Navigation sidebar with:
- Dashboard link
- Alarms page link
- Active alarms panel
- User menu

## Backend API

The backend server (`backend/server.js`) provides the following endpoints:

### Neo4j Integration
- `/api/neo4j/query`: Executes Cypher queries
- `/api/neo4j/down-count`: Gets count of down devices
- `/api/neo4j/device-details`: Gets detailed device information

### Authentication
- `/api/auth/login`: User authentication
- `/api/auth/check`: Session validation

## Styling System

The application uses a consistent styling system with:

### Color Palette
- Primary: #1D1D1F
- Secondary: #8E8E93
- Background: #F5F5F7
- Error: #FF3B30
- Warning: #FF9500
- Info: #007AFF

### Typography
- Font Family: 'Albert Sans'
- Font Sizes: 13px - 18px
- Font Weights: 400, 500, 600

### Components
- Border Radius: 8px, 12px
- Shadows: Subtle box-shadows for depth
- Transitions: Smooth animations (0.2s ease)

## Features

### Real-time Monitoring
- Automatic updates every 3-5 seconds
- Live status indicators
- Dynamic data visualization

### Alarm Management
- Active alarm display
- Severity-based styling
- Device relationship tracking
- Timestamp formatting

### User Interface
- Responsive design
- Modern, clean aesthetics
- Intuitive navigation
- Interactive elements

## Getting Started

1. Install dependencies:
```bash
npm install
cd backend
npm install
```

2. Configure environment variables:
Create a `.env` file in the backend directory with:
```
NEO4J_URI=your_neo4j_uri
NEO4J_USER=your_neo4j_user
NEO4J_PASSWORD=your_neo4j_password
```

3. Start the development servers:
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend
cd backend
npm start
```

## Dependencies

### Frontend
- React
- Leaflet (for map visualization)
- React Router
- Axios

### Backend
- Express
- Neo4j Driver
- CORS
- dotenv

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.



####################
# Network Monitoring Dashboard

A modern web application for monitoring network devices and alarms, built with React and Neo4j.

## Project Structure

```
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── assets/            # Static assets (icons, images)
│   ├── components/        # Reusable React components
│   │   ├── Alarms/       # Alarm-related components
│   │   ├── Layout/       # Layout components (Sidebar, etc.)
│   │   └── Map/          # Map visualization components
│   ├── pages/            # Page components
│   ├── services/         # API and service integrations
│   ├── styles/           # CSS stylesheets
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
└── backend/
    ├── server.js         # Express server
    ├── package.json      # Backend dependencies
    └── .env              # Environment variables
```

## Key Components

### ActiveAlarms Component
Located in `src/components/Alarms/ActiveAlarms.js`

Displays a list of active alarms with the following features:
- Real-time updates every 5 seconds
- Scrollable list of alarms
- Visual indicators for alarm severity
- Device information and triggering relationships
- User menu with logout functionality

#### Styling
- Modern, clean design with subtle red background
- Custom scrollbar
- Hover effects and transitions
- Responsive layout

### MapView Component
Located in `src/components/Map/MapView.js`

Interactive map visualization with:
- Device markers with status indicators
- Network links between devices
- Click interactions for device details
- Real-time updates
- Custom panes for proper z-index management

### Sidebar Component
Located in `src/components/Layout/Sidebar.js`

Navigation sidebar with:
- Dashboard link
- Alarms page link
- Active alarms panel
- User menu

## Backend API

The backend server (`backend/server.js`) provides the following endpoints:

### Neo4j Integration
- `/api/neo4j/query`: Executes Cypher queries
- `/api/neo4j/down-count`: Gets count of down devices
- `/api/neo4j/device-details`: Gets detailed device information

### Authentication
- `/api/auth/login`: User authentication
- `/api/auth/check`: Session validation

## Styling System

The application uses a consistent styling system with:

### Color Palette
- Primary: #1D1D1F
- Secondary: #8E8E93
- Background: #F5F5F7
- Error: #FF3B30
- Warning: #FF9500
- Info: #007AFF

### Typography
- Font Family: 'Albert Sans'
- Font Sizes: 13px - 18px
- Font Weights: 400, 500, 600

### Components
- Border Radius: 8px, 12px
- Shadows: Subtle box-shadows for depth
- Transitions: Smooth animations (0.2s ease)

## Features

### Real-time Monitoring
- Automatic updates every 3-5 seconds
- Live status indicators
- Dynamic data visualization

### Alarm Management
- Active alarm display
- Severity-based styling
- Device relationship tracking
- Timestamp formatting

### User Interface
- Responsive design
- Modern, clean aesthetics
- Intuitive navigation
- Interactive elements

## Getting Started

1. Install dependencies:
```bash
npm install
cd backend
npm install
```

2. Configure environment variables:
Create a `.env` file in the backend directory with:
```
NEO4J_URI=your_neo4j_uri
NEO4J_USER=your_neo4j_user
NEO4J_PASSWORD=your_neo4j_password
```

3. Start the development servers:
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend
cd backend
npm start
```

## Dependencies

### Frontend
- React
- Leaflet (for map visualization)
- React Router
- Axios

### Backend
- Express
- Neo4j Driver
- CORS
- dotenv

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.