# Code Playground

## About
Code Playground is a online application for testing and showcasing user-created and collaborational HTML, CSS and JavaScript code snippets.

## Features
- It allows the user to share their Html, CSS and JavaScript code in **real-time** with multiple people.
- The user can **create** custom rooms, and share its **room-id** to invite new members to the room.
- The application contains a built-in **console feed**, which shows the javaScript output on the fly.
- The user can also use the **smart code suggestion** tool while writing in the JavaScript and CSS coding window, using `Ctrl + Space` .
- The user can also keep track of the **number of users** in the room using the handy icon on the top-right corner of the screen.
- The user is also able to stop or start the sharing of the code, whenever they wish to.

### Lighthouse Report
![Foo](https://i.ibb.co/6B4ykJv/lighthouse.jpg)
### GTmetrix Report
![alt text](https://i.ibb.co/N6gh2g6/GTmetrix-report.jpg)

## Technologies Used 
- **ReactJS** - Javascript library for easy and reliable web interface
- **Tailwind** - CSS library for simple and rapid styling
- **ExpressJS** - It is a back end web application framework for Node.js
- **Socket.io** - Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers

## How to Share some Code?
- Open the application on a browser
- Start a Playground by clicking the 'Start a Playground' Button.
- Once the IDE is loaded, click the 'Start Sharing' button to Start a custom room.
- An RoomID will be displayed, as well as the number of room members on the top-right corner
- Share that RoomID to other people, which they can use to join your Room By choosing 'Join a Playground' when they open the application.
- Once someone enters in your room, you will get a popup, describing the same.
- Now you can share your code with them in real-time using the Html, CSS and JavaScript windows respectively.

## How to run the code?
Clone the project in your Local Machine.
Then in the project directory, you can run:

### To run the client
In the /client folder directory, run the following command

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### To run the server
In the /server folder directory, run the following command

`npm run dev`

Runs the server in the development mode.\
The server will serve at [http://localhost:4000](http://localhost:4000).
