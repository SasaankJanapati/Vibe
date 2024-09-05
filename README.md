# Vibe - A Messaging Service Prototype Web App

Vibe is a web-based chat application designed to connect users. It is a messaging service prototype featuring user authentication, real-time messaging, group chat, and optional features such as AI-powered chatbots and video/audio calls.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [System Design](#system-design)
- [Optional Features](#optional-features)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- *User Registration & Authentication*: Secure user sign-up and login.
- *Text Messaging*: Real-time messaging between users.
- *Group Chat*: Create and join group conversations.
- *Real-time Updates*: Instant message delivery and notifications.
- *AI-Powered Chatbot*: An AI chatbot for user interaction.
- *Video/Audio Calling*: Real-time video and audio calls.

## Technology Stack

### Frontend

- *Framework*: [Next.js](https://nextjs.org/) - A React framework for server-side rendering and static site generation.
- *UI Libraries and Components*:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for custom designs.
  - [React Spinners](https://www.npmjs.com/package/react-spinners) - Loading spinner components.
  - [React Hook Form](https://react-hook-form.com/) - Managing form state and validation.
- *Chatbot Integration*:
  - [Botpress Webchat](https://botpress.com/) - Integrating Botpress chatbots.
- *Real-time Communication*:
  - [ZEGOCLOUD UIKit](https://www.zegocloud.com/) - Prebuilt UI components for video and audio calling.
- *Utilities*:
  - [Date-fns](https://date-fns.org/) - Date manipulation.
  - [CLSx](https://www.npmjs.com/package/clsx) - Utility for class names.
  - [Sonner](https://www.npmjs.com/package/sonner) - Notification library.

### Backend

- **MongoDB**: NoSQL database designed for flexible and scalable data management.
  - **Flexible Model**: Supports diverse data structures and types.
  - **Scalable**: Easily handles increasing data volumes and user loads.

- **Prisma**: ORM tool that simplifies database access and schema management.
  - **Type-Safe Queries**: Provides auto-completion and type safety.
  - **Schema Management**: Facilitates smooth migrations and updates.

- **Pusher**: Service for real-time communication and live updates.
  - **Real-Time Notifications**: Delivers instant updates and alerts.
  - **Interactive Features**: Enables real-time chat and collaborative interactions.

- **NextAuth**: Authentication solution for Next.js applications.
  - **Flexible Authentication**: Supports various sign-in methods and providers.
  - **Secure Sessions**: Manages user sessions and authentication securely.




## Installation

1. *Clone the Repository:*

    ```bash
    git clone https://github.com/SasaankJanapati/vibe
    cd vibe
    ```

2. *Install Dependencies:*

    (Note: Ensure you have Node.js version v20.14.0 & NPM version 10.7.0 installed)

    ```bash
    npm install
    ```

## Usage

1. *Setup environment variables:*

    For security purposes, the env file couldn't be pushed through git.
    Navigate to the project directory `vibe` and run the below command to create a `.env` file.
    ```bash
    touch .env
    ```
    (Note: It is strongly encouraged to use your own variables for security purposes)

    Paste the following environment variables and save the file
    ```bash
    DATABASE_URL="mongodb+srv://sasaankwork:sasaankVibe@cluster0.u5np4.mongodb.net/test"
    NEXTAUTH_SECRET="NEXTAUTH_SECRET"
    GITHUB_ID=Ov23liWvMFIVi0VYqk70
    GITHUB_SECRET=f635d48c85621b6fa4148945f7a288ac7d6eb129
    GOOGLE_CLIENT_ID=573046340062-e65b6ubu0mmg719kisbp4cr8lq50kjaq.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=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
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dathh1p4o
    NEXT_PUBLIC_PUSHER_APP_KEY=43bd3bb0324fdba01d20
    NEXT_PUBLIC_CLOUDINARY_PRESET=mb17wnn8
    PUSHER_APP_ID=1860677
    PUSHER_SECRET=91d3cdcd82f1c52abe79
    NEXT_PUBLIC_ZEGOCLOUD_SECRET=2b3ca1c1a75645f07627f2b65c634a04
    NEXT_PUBLIC_ZEGOCLOUD_APP_ID=1153670989
    ```

2. *Start the App:*

    ```bash
    npm run dev
    ```

3. *Open the Application:*
   After running npm run dev, a link will be displayed in the terminal. 
   Copy and paste this link into your browser to access the application or simply press `ctrl` and click it.

4. *Login or Sign Up:*
   To use the application, you need to create an account. You can sign up using either:
   - Google account
   - Github account
   - Email and password

   ![alt text](/screenshots/image.png)

5. *Navigation Bar:*
   The navigation bar on the left side lets you switch between Users, Conversations, Profile Settings, and Logout options.

   ![alt text](/screenshots/image-1.png)

8. *Conversations:*
   View all friends and groups. Notifications for unread messages are indicated. Clicking on notifications takes you to the chat window.
    ![alt text](/screenshots/image-2.png)

9. *Group Creation:*
   Create a new group by clicking the symbol in the top right corner of the Conversations page. Enter the necessary details and click "Create."
   ![alt text](/screenshots/image-3.png)

10. *Chat and Image Sharing Option:*
    Click on a person or group to open the chat window. You can view all messages with timestamps. Use the top bar for calling and settings options.
    ![alt text](/screenshots/image-8.png)
    ![alt text](/screenshots/image-5.png)
    ![alt text](/screenshots/image-6.png)


11. *Chatbot:*
    Access the AI-powered chatbot by clicking the message symbol on the leftmost corner of the page. The chatbot can answer general questions.
    ![alt text](/screenshots/image-9.png)

12. *Calling Feature:*
    Use the call option in the menu to initiate a call. Note that there is no notification system for incoming calls; both users need to manually join the call.
    ![alt text](/screenshots/image-7.png)

## System Design

A comprehensive system design document is available in the [System Design](docs/SystemDesign.md). It includes architecture diagrams, component descriptions, and data flow.

## Optional Features

### AI-Powered Chatbot Integration
Integrated a ChatGPT-based bot from Botpress Webchat through APIs for general interaction.

### Video/Audio Calling
Integrated ZEGOCLOUD UIKit for video and audio calling. Note that the integration is limited to a certain amount of call time.

## Deployment

If deployed, the project can be accessed at [your-deployment-url.com](http://your-deployment-url.com). Deployment is managed on [AWS](https://aws.amazon.com/) or [Heroku](https://www.heroku.com/).

## Contributing

To contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature.
3. Make your changes and commit: git commit -am 'Add new feature'.
4. Push to the branch: git push origin feature/your-feature.
5. Create a pull request.
