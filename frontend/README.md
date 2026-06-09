# File Metadata Uploader

## Overview

A React Native (Expo) application with a Node.js + Express backend that simulates file uploads by storing file metadata only.

## Features

* Select files using a file picker
* Store metadata only (no file content)
* Display uploaded file metadata
* Validate maximum file size (10 MB)
* Show upload timestamps
* List previously uploaded files
* In-memory storage (no database required)

## Tech Stack

Frontend:

* React Native (Expo)
* Axios
* Expo Document Picker

Backend:

* Node.js
* Express.js

## Run Backend

```bash
cd backend
npm install
node server.js
```

## Run Frontend

```bash
cd frontend
npm install
npx expo start
```

## Metadata Stored

* File Name
* File Size
* File Type
* Upload Timestamp

## Storage

Metadata is stored in an in-memory array and will reset when the backend server restarts.
