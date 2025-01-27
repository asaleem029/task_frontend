# TASK CRUD

The **TASK CRUD PORTAL** is a powerful management interface for user. This portal allows user to manage tasks, as well as handle various other tasks essential to the system.

## Features

### 1. **Create Task**
   - User can create new Task.

### 2. **Edit Task**
   - User can edit an existing Task.

### 3. **Delete Task**
   - User can delete an existing Task.
   
### 4. **List Task**
   - User can view Task list.
   
## Tech Stack
- **Frontend**: [React.js]
- **Styling**: CSS Modules or Tailwind CSS (customizable as needed).
- **Backend Services**: API integrations with backend services.
  
## Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn package manager
- Environment variables for backend API integrations

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/asaleem029/task_frontend.git/
   ```
2. Navigate to the project directory:
   ```bash
   cd task_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root of the project and configure the necessary environment variables such as API endpoints and authentication tokens.

### Development

To run the project in development mode:

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3005](http://localhost:3005).

### Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

### Folder Structure

```
.
├── components/           # Reusable components (e.g., tables, forms)
├── pages/                # React.js pages and routes
├── services/             # API interaction services
├── styles/               # Global styles and CSS modules
├── utils/                # Helper functions and utilities
├── public/               # Static assets (e.g., images, fonts)
└── README.md             # Project documentation
```

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request.
