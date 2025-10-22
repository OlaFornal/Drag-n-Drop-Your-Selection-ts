# Drag-n-Drop User Selection (TypeScript)

A modern, interactive drag-and-drop application built with React, TypeScript, and @dnd-kit. Select users by dragging them between two lists, save your selection layout, and export it as JSON.

## Features

- **Drag and Drop Interface**: Intuitive drag-and-drop functionality powered by @dnd-kit
- **Two-Panel Layout**: Move users between "Available Users" and "Selected Users"
- **Visual Feedback**: Smooth animations and visual cues during drag operations
- **Save Layout**: Export your selected users as a JSON configuration
- **Reset Functionality**: Quickly clear all selections and start over
- **Fully Typed**: Built with TypeScript for type safety and better developer experience
- **Responsive Design**: Styled with Tailwind CSS for a modern, mobile-friendly interface

## Tech Stack

- **React 19** - UI framework
- **TypeScript 4.9** - Type-safe development
- **@dnd-kit/core** - Drag and drop functionality
- **@dnd-kit/sortable** - Keyboard navigation support
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **JSONPlaceholder API** - Sample user data

## Project Structure

```
src/
├── components/
│   ├── DragDropContainer.tsx  # Main container with drag logic
│   ├── DroppableArea.tsx      # Droppable zone component
│   └── UserCard.tsx           # Draggable user card
├── types/
│   └── User.ts                # Shared TypeScript interfaces
└── App.tsx                    # Root component
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dnd-ts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode. The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified.

## How to Use

1. **Drag Users**: Click and drag any user card from the "Available Users" panel
2. **Drop to Select**: Drop the card into the "Selected Users" panel to add them to your selection
3. **Move Back**: Drag users from "Selected Users" back to "Available Users" to deselect them
4. **Save Layout**: Click the "Save Layout" button to generate a JSON export of your selected users
5. **Reset**: Click "Reset" to move all users back to the "Available Users" panel

## TypeScript Interfaces

### User Interface
```typescript
interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
}
```

## Customization

### Styling

The project uses Tailwind CSS. Modify the styles in component files or update the `tailwind.config.js` for global theme changes.

### Data Source

Currently fetches users from JSONPlaceholder API. To use your own data source, modify the `useEffect` hook in `DragDropContainer.tsx`:

```typescript
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users: User[]) => {
      setAvailableUsers(users);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      setLoading(false);
    });
}, []);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Drag and drop powered by [@dnd-kit](https://dndkit.com/)
- Sample data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
