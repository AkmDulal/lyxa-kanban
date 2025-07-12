# React + TypeScript + Vite

A responsive Kanban board built with React, TypeScript, and DnD Kit featuring task management, drag-and-drop functionality, and local storage persistence.

## Features

- 🗂️ Three-column workflow (New, Ongoing, Done)
- 👆 Drag-and-drop task management
- ✏️ Task creation and editing
- ⏱️ Due date tracking with overdue alerts
- 🏷️ Priority levels (Low, Medium, High, Urgent)
- 👥 Team assignment with avatars
- 💾 Local storage persistence
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Drag-and-Drop**: [@dnd-kit](https://dndkit.com/)
- **UI**: Tailwind CSS
- **Date Handling**: react-datepicker
- **Icons**: react-icons
- **State Management**: React hooks, redux-toolkit

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AkmDulal/lyxa-kanban.git
   cd react-kanban-board
2. **Install dependencies**:   
   -npm install OR yarn 
3. **Run the development server**:   
   - npm run dev OR yarn dev

### Project Structure

 - src/
 - ├── App.tsx               
 - ├── App.css               
 - ├── components/
 - │   ├── Column.tsx        
 - │   ├── TaskCard.tsx      
 - │   ├── ContextMenu.tsx      
 - │   └── TaskFormModal.tsx 
 - ├── hooks/
 - │   └── useLocalStorage.ts 
 - ├── types/
 - │   └── types.ts          
 - └── redux/
 -     ├── features
 -         └── task 
 -     └── store
 - └── utils/
 -     └── helpers.ts        
 - public/
 - ├── images/    


```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
