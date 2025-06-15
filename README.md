# Todo List Web App

A simple web-based Todo List application with note management features, built using React for the frontend.

## Features

- View, create, edit, and delete notes
- Modal confirmation for deleting and updating notes
- Responsive and user-friendly interface

## Tech Stack

- **Frontend:** React (JavaScript)
- **Backend:** (Assumed Node.js/Express, update if different)
- **API:** RESTful endpoints for notes

## Getting Started

### Prerequisites

- Node.js and npm installed
- (If backend is separate, ensure it is running on `localhost:3002`)

### Installation

1. Clone the repository:
   ```bash
  [ git clone <your-repo-url>](https://github.com/roshh4/todo)
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

4. (If backend is separate, start the backend as well.)

### Usage

- Visit `http://localhost:3000` in your browser.
- Use the interface to add, edit, or delete notes.

## Project Structure

```
client/
  src/
    NoteDetailPage.js
    ...
  public/
  package.json
  ...
```

## API Endpoints

- `GET /api/notes/:noteId` - Get note details
- `PUT /update/:noteId` - Update a note
- `DELETE /delete/:noteId` - Delete a note

## License

MIT (or your preferred license) 
