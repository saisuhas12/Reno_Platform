# Notice Board

A clean, modern notice board application for managing announcements, exam notices, and event updates. Built with Next.js, Prisma, and Tailwind CSS.

## Features

- **Full CRUD** — Create, read, update, and delete notices
- **Priority ordering** — Urgent notices surface first, sorted by publish date within each priority
- **Server-side validation** — All inputs validated in API routes with meaningful error messages
- **Category badges** — Color-coded labels for Exam, Event, and General notices
- **Priority indicators** — Clearly visible red badges for urgent notices
- **Responsive layout** — 3-column grid on desktop, 2 on tablet, 1 on mobile
- **Loading states** — Skeleton loaders while fetching, spinners while submitting
- **Toast notifications** — Clean feedback for all user actions
- **Delete confirmation** — Modal dialog before irreversible actions
- **Optional image support** — Display images via URL when provided
- **Empty state** — Friendly prompt when no notices exist
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, focus states

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
│   │       └── [id].js       # PUT (update) & DELETE
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

## Environment Variables

| Variable       | Description                              | Required |
| -------------- | ---------------------------------------- | -------- |
| `DATABASE_URL` | MySQL connection string (TiDB Cloud)     | Yes      |

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

## AI Usage

This project was developed with the assistance of an AI coding agent (Gemini/Claude) for:

- Scaffolding the initial project structure
- Generating boilerplate code for components, API routes, and configuration
- Writing this README

All code was reviewed and refined to meet production quality standards. The architecture, design decisions, and implementation details reflect real-world engineering practices.

## Future Improvements

- Individual notice detail page
- Image upload via file (e.g., Cloudinary integration)
- Filter notices by category or priority
- Rich text editor for notice body
- Email notifications for urgent notices
- Role-based access control
- Pagination for large datasets
- Dark mode toggle
