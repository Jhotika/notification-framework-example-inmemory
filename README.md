# Notification Framework Demo

A demo of [Notification Framework](https://github.com/Jhotika/notification-framework) integration to a NodeJS/Express application

## Installation

1. Clone the Git repository:

   ```bash
   git clone https://github.com/Jhotika/notification-framework
   ```

2. Install the dependencies using npm:

   ```bash
   npm install
   ```

   or yarn:

   ```bash
   yarn install
   ```

## Usage

1. Start the express server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Open the browser and navigate to `http://localhost:8000/` to see the application in action.

## API Endpoints

### GET /

Fetches all notifications for a user.

- **Method**: GET
- **Response**: Returns a JSON object containing an array of notification responses.
- **Error Handling**: Returns a 500 status code if fetching notifications fails.

### POST /

Sends a new notification.

- **Method**: POST
- **Action**: Performs an action and sends a notification using YoService.
- **Response**: Returns a JSON object with a success message.
- **Error Handling**: Returns a 500 status code if sending the notification fails.

### POST /markAllAsRead

Marks all notifications as read for the current user.

- **Method**: POST
- **Action**: Marks all notifications as read using the notification service.
- **Response**: Returns a JSON object indicating success.
- **Error Handling**: Returns a 500 status code if marking notifications as read fails.

### POST /:uuid

Marks a specific notification as read.

- **Method**: POST
- **Parameters**: `uuid` - The unique identifier of the notification to mark as read.
- **Action**: Marks the specified notification as read using YoService.
- **Response**: Returns a JSON object with a success message.
- **Error Handling**: Returns a 500 status code if marking the notification as read fails.

## Demo

https://github.com/user-attachments/assets/033b1b58-87e7-441e-b8ff-740c44f5cf7f


