# Campus School ERP System

A modern, high-fidelity Enterprise Resource Planning (ERP) platform built with React, Next.js 15, Redux Toolkit, TypeScript, and Material UI (MUI).

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn

### Installation
Install project dependencies:
```bash
npm install
```

### Running the Development Server
Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production
To compile and optimize the production bundle:
```bash
npm run build
```
To run the production build locally:
```bash
npm start
```

---

## 🏛️ Scalable Architecture

The project adheres to a clean, scalable, feature-based architecture (aligned with Feature-Sliced Design principles):

- **App Layer (`src/app`)**: Main entry points, global layout, routing definitions, global style rules, and Redux store configurations.
- **Widgets Layer (`src/widgets`)**: Composite UI modules that combine multiple entities and features into structural sections (e.g., Layout Sidebar, Dashboard panels).
- **Features Layer (`src/features`)**: Isolated user-interaction modules that implement specific business capabilities (e.g., `manage-teachers`, `assignments`).
- **Entities Layer (`src/entities`)**: Domain concepts, business models, and helper logic related to core objects (e.g., `student`, `permission`).
- **Shared Layer (`src/shared`)**: Reusable UI elements, global hooks, utility modules, base theme styling, and core api clients.
- **Store Layer (`src/store`)**: Modular Redux slices and thunks managing domain-specific state.

---

## 📋 Cloud Clipboard Feature

The **SyncFlow Cloud Clipboard** is a newly introduced feature providing a secure space to save code snippets, text fragments, and notes with instant system clipboard copying capabilities.

### Architecture Flow:
`UI Page (clipboard/page.tsx) ──> Redux Thunk (clipboard.thunk.ts) ──> Service Layer (clipboard.service.ts) ──> API Endpoints (route.ts) ──> Persistent JSON Mock (clipboard.json)`

### Key Components:
1. **Mock Database (`src/mock/clipboard.json`)**: Persistently stores mock clipboard objects:
   ```json
   {
     "id": "1",
     "title": "Project Notes",
     "content": "Sample content...",
     "createdAt": "2026-05-20"
   }
   ```
2. **API Client (`src/store/clipboard/api-client.ts`)**: A reusable Fetch API wrapper featuring typed responses and centralized error catching.
3. **Service Layer (`src/store/clipboard/clipboard.service.ts`)**:
   - Performs GET, POST, PUT, and DELETE actions.
   - **Automated Fallback**: If the backend server fails or is unreachable, it automatically falls back to in-memory session-based mock database mutations, keeping the application fully functional.
4. **Redux Slice (`src/store/clipboard/clipboard.slice.ts`)**:
   - Implements async thunks for loading, creation, updates, and deletion.
   - **Optimistic Updates**: Deletions immediately update the UI state. If the deletion requests fail on the server, state is reverted to the backup, avoiding laggy UI response times.
5. **REST API Endpoints**:
   - `GET /api/clipboard` (All items)
   - `GET /api/clipboard/[id]` (Single item)
   - `POST /api/clipboard` (Create item)
   - `PUT /api/clipboard/[id]` (Update item)
   - `DELETE /api/clipboard/[id]` (Delete item)
6. **UI Interface (`src/app/(pages)/clipboard/page.tsx`)**:
   - Features responsive grid cards with monospace styled preview blocks.
   - Action dialogs for creating and editing.
   - One-click copy with micro-animations and validation alerts.
