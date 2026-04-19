# Full Stack Interview Guide

A comprehensive interview preparation guide built with Next.js, covering Laravel, React, JavaScript, SQL, Git, and more.

## Features

- **Interactive Sidebar Navigation**: Collapsible sections for each technology
- **Code Examples**: Syntax-highlighted code blocks with copy functionality
- **Progress Tracking**: Visual progress bar as you scroll
- **Search Functionality**: Filter navigation items by keyword
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Professional dark theme with syntax highlighting

## Technologies Covered

### Backend
- **Laravel**: Eloquent ORM, Relationships, N+1 Problem, Query Scopes, Service Container, Auth, Queues
- **PHP**: Fundamentals, PHP 8.x Features

### Frontend
- **React**: Hooks, Fundamentals, State Management, Performance
- **Next.js**: App Router, Data Fetching, Optimization

### Database
- **SQL/MySQL**: Fundamentals, Indexing, Joins, Transactions, ACID

### Web Fundamentals
- **HTML/CSS**: Basics, Layout, Responsive Design
- **JavaScript**: Fundamentals, Async, Event Loop, TypeScript

### Version Control
- **Git**: Basics, Branching, Merging, Undo, Collaboration

### Interview Prep
- **Playbook**: Strategies and best practices
- **Question Banks**: Curated resources and practice questions

## Project Structure

```
next-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout with sidebar
│   │   ├── page.tsx             # Home page with hero section
│   │   ├── laravel/
│   │   │   └── page.tsx         # Laravel content
│   │   ├── react/
│   │   │   └── page.tsx         # React content
│   │   └── [other sections]/
│   └── components/              # Reusable components
├── package.json
├── next.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add content following the existing structure
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Development Notes

- The project uses Next.js App Router
- Tailwind CSS for styling
- TypeScript for type safety
- CSS-in-JS for dynamic styles
- No external state management libraries (using React context where needed)

## Adding New Content

To add a new technology section:

1. Create a new directory under `src/app/` (e.g., `src/app/vue/`)
2. Add a `page.tsx` file with your content
3. Update the sidebar navigation in `src/app/layout.tsx`
4. Follow the existing content structure with sections, topics, and code examples

## Performance

- Code splitting with Next.js dynamic imports
- Lazy loading for images
- Optimized CSS with Tailwind purge
- Minimal JavaScript bundle size