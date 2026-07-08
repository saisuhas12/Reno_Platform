# Reno Notice Board

A responsive Notice Board application built as part of the Reno Platforms Web Development Assignment.

The application supports complete CRUD functionality with server-side validation, database persistence using Prisma ORM, and deployment on Vercel using the required technology stack.

## Screenshots

### Home Page
![Home](images/home.png)

### Create Notice
![Create](images/create.png)

### Edit Notice
![Edit](images/edit.png)

## Features

- Create, edit, view and delete notices
- Server-side validation using Prisma API routes
- Database persistence with Prisma ORM
- Urgent notices prioritized at the database query level
- Responsive card layout
- Accessible modal confirmation before deletion
- Optional image support
- Toast notifications

## Assignment Compliance

This project follows all mandatory requirements from the Reno Platforms assignment:

- **Next.js Pages Router** — Using the `pages/` directory instead of App Router
- **Prisma ORM** — Structured schema definition and query client instantiation
- **Hosted Database** — Compatible with hosted MySQL (TiDB Cloud)
- **REST API Routes** — Endpoint actions under `/pages/api/` using appropriate HTTP methods (GET, POST, PUT, DELETE)
- **Server-Side Validation** — Validation logic running within API handlers to protect inputs
- **Database Persistence** — Full CRUD actions syncing back to the cloud database
- **Public Vercel Deployment** — Ready to deploy on Vercel with serverless runtime support
- **Responsive UI** — Accessible layouts adapting to mobile, tablet, and desktop viewports

## Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Framework  | Next.js (Pages Router)      |
| Language   | JavaScript                  |
| Database   | MySQL (TiDB Cloud)          |
| ORM        | Prisma                      |
| Styling    | Tailwind CSS                |
| Toasts     | react-hot-toast             |
| Deployment | Vercel                      |

## Folder Structure

```
├── components/
│   ├── CategoryBadge.js      # Color-coded category label
│   ├── ConfirmModal.js       # Delete confirmation dialog
│   ├── EmptyState.js         # No notices placeholder
│   ├── Layout.js             # App shell with header
│   ├── NoticeCard.js         # Individual notice display
│   ├── NoticeForm.js         # Reusable create/edit form
│   ├── PriorityBadge.js      # Priority indicator
│   ├── SkeletonCard.js       # Loading placeholder
│   └── Spinner.js            # Inline loading spinner
├── lib/
│   ├── prisma.js             # Prisma client singleton
│   └── validation.js         # Shared validation logic
├── pages/
│   ├── api/
│   │   └── notices/
│   │       ├── index.js      # GET (list) & POST (create)
│   │       └── [id].js       # GET (retrieve), PUT (update) & DELETE
│   ├── notices/
│   │   ├── new.js            # Create notice page
│   │   └── [id]/
│   │       └── edit.js       # Edit notice page
│   ├── _app.js               # Custom App wrapper
│   └── index.js              # Home page
├── prisma/
│   └── schema.prisma         # Database schema
├── styles/
│   └── globals.css           # Global styles
└── public/                   # Static assets
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notices | Retrieve all notices (Urgent first, then by publishDate DESC) |
| POST | /api/notices | Create a notice |
| GET | /api/notices/:id | Retrieve a single notice |
| PUT | /api/notices/:id | Update a notice |
| DELETE | /api/notices/:id | Delete a notice |

## Database Schema

### Notice Model

| Field | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Unique primary key identifier |
| title | String | Title of the notice (VarChar 255) |
| body | String | Notice content body text |
| category | EXAM \| EVENT \| GENERAL | Dropdown category selection |
| priority | NORMAL \| URGENT | Urgent announcements rank first |
| publishDate | DateTime | Selected publish date |
| image | String? | Optional URL link to notice image |
| createdAt | DateTime | Automated creation timestamp |
| updatedAt | DateTime | Automated update timestamp |

## Installation

### Prerequisites

- Node.js 18+
- A MySQL-compatible database (TiDB Cloud recommended)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/saisuhas12/Reno_Platform.git
   cd Reno_Platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from the template:

   ```bash
   cp .env.example .env
   ```

4. Add your database connection string to `.env`:

   ```
   DATABASE_URL="mysql://user:password@host:4000/database?sslaccept=strict"
   ```

5. Generate the Prisma client and push the schema to your database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying

### Vercel

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add `DATABASE_URL` to the environment variables in Vercel dashboard
4. Add the build command override: `npx prisma generate && next build`
5. Deploy

The `prisma generate` step ensures the Prisma Client is available at build time on Vercel.

## Verification

The project has been verified by:

- `npm run build`
- `npx prisma generate`
- `npx prisma db push`

The application was tested locally before deployment.

## AI Usage

AI tools were used to assist with:

- Initial project scaffolding
- Boilerplate generation
- General code refactoring suggestions
- README drafting

All generated code was manually reviewed, tested, modified where necessary, and verified against the assignment requirements. The application architecture, debugging, integration, and deployment were completed manually.

