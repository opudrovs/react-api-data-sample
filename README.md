# React API Data Sample

## Pre-Populated Tasks

- Tasks with `id < 11` are considered **read-only** and cannot be:
   - Deleted
   - Updated

- The API returns a `readOnly` flag to help the frontend **disable actions** on such tasks.

- Example API Response:
```json
{
    "id": 5,
    "title": "Sample Task",
    "readOnly": true
}
