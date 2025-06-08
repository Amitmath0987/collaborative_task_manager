# Collaborative Task Manager

A modern task management application with drag-and-drop functionality, built with Next.js, TypeScript, and React.

## 🚀 Quick Start (Run Locally in 2 Minutes)

### Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **Git** ([Download here](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd collaborative-task-manager
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### Step 3: Start the Development Server

```bash
npm run dev
```

### Step 4: Open Your Browser

Navigate to **http://localhost:3000**

🎉 **You should see the Task Manager application running!**

---

## ✅ What You Should See

### Main Features Working:

1. **Task Board**: Three columns (To Do, In Progress, Done) with sample tasks
2. **Create Tasks**: Click "New Task" button to add new tasks
3. **Drag & Drop**: Drag tasks between columns
4. **Search & Filter**: Use the search bar and filter dropdown
5. **Recipe Page**: Click "Recipes" in header to browse recipes

### Sample Data:

The app comes with pre-loaded sample tasks so you can immediately test all features.

---

## 🛠 Available Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (run build first)
npm run start

# Run TypeScript type checking
npm run type-check

# Run ESLint
npm run lint
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions:

#### ❌ "Port 3000 is already in use"

```bash
# Solution 1: Kill process on port 3000
npx kill-port 3000

# Solution 2: Use different port
npm run dev -- -p 3001
# Then visit http://localhost:3001
```

#### ❌ "Node version not supported"

```bash
# Check your Node version
node --version

# Must be 18.0.0 or higher
# Download latest from https://nodejs.org/
```

#### ❌ "Command not found: npm"

- Install Node.js from [nodejs.org](https://nodejs.org/) (includes npm)
- Or install using package manager:

  ```bash
  # macOS with Homebrew
  brew install node

  # Ubuntu/Debian
  sudo apt install nodejs npm

  # Windows with Chocolatey
  choco install nodejs
  ```

#### ❌ "npm install fails"

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### ❌ "TypeScript errors"

```bash
# Check for errors
npm run type-check

# Most errors will auto-resolve, but you can still run the app
npm run dev
```

---

## 🌐 Alternative Package Managers

### Using Yarn:

```bash
yarn install
yarn dev
```

### Using pnpm:

```bash
pnpm install
pnpm dev
```

---

## 📱 Testing the Application

### 1. Task Management

- ✅ Create a new task (click "New Task")
- ✅ Fill in title, description, priority, etc.
- ✅ Drag tasks between columns
- ✅ Edit existing tasks (click ⋮ menu)
- ✅ Delete tasks (with confirmation)
- ✅ Use search and filters

### 2. Recipe Feature

- ✅ Click "Recipes" in the header
- ✅ Browse recipe list
- ✅ Search for specific recipes
- ✅ Click eye icon to view recipe details
- ✅ View ingredients and instructions

### 3. Responsive Design

- ✅ Resize browser window
- ✅ Test on mobile device
- ✅ Verify all features work on small screens

---

## 🎯 Production Build

To test the production build locally:

```bash
# Build the application
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

---

## 📂 Project Structure (For Reference)

```
collaborative-task-manager/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx           # Main task board page
│   │   ├── recipes/page.tsx   # Recipe collection page
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── task/              # Task management components
│   │   └── recipe/            # Recipe components
│   ├── lib/                   # Types, validations, utilities
│   ├── hooks/                 # Custom React hooks
│   └── store/                 # Zustand state management
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

---

## 🔍 Key Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Drag & Drop**: @dnd-kit

---

## 🆘 Need Help?

### Check if everything is working:

1. **Node.js**: `node --version` (should be 18+)
2. **Dependencies**: `npm list` (should show installed packages)
3. **Build**: `npm run build` (should complete without errors)
4. **TypeScript**: `npm run type-check` (should pass)

### Still having issues?

1. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
2. Make sure you're in the project directory
3. Check that your internet connection is stable (for installing dependencies)
4. Try using a different terminal/command prompt

---

## 🎉 Success!

If you can see the task board with sample tasks and can drag them between columns, you're all set!

The application includes:

- ✅ Full CRUD operations for tasks
- ✅ Drag and drop functionality
- ✅ Search and filtering
- ✅ Form validation
- ✅ Recipe browsing (bonus feature)
- ✅ Responsive design
- ✅ TypeScript throughout

**Happy task managing! 🚀**
