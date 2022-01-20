# tawk

<p align="center">
<img alt="Screenshot of Start page of tawk" src="https://github.com/serinhanw/tawk/blob/main/assets/screenshot.png" width="240" height="485">
<img alt="Screenshot of Start page of tawk" src="https://github.com/serinhanw/tawk/blob/main/assets/screenshot1.png" width="240" height="485">
</p>

![tawk Demo](demo/notflixdb-demo.gif)

# Overview
Tawk is a chat app for mobile devices, developed using React Native. The app provides users with a chat interface and enables users to send text messages, share images, and even their location.

## Key Features
- The user can choose their username
- The user can choose one of the available backgrounds for their chat screen
- The user can exchange texts, images, and even their location in the chat room 
- The user will be able to read the latest, saved messages when offline; however, will not be able to 
- When offline, the user will be able to read the latest, saved messages; however, will not be receiving live updates or be able to send new messages
- When the user is back online, messages that have been exchanged when user was offline will be shown

### Communication Features: Ethical Consideration
This app will ask the user for permission to access photos, camera, and location. 
Tawk will not be able to gain access without the user's consent. 
Only upon the user's consent, will Tawk be able to use and/or send data. 

## Tech Stack
- React Native
- Expo
- Google Firestore Database
- Gifted Chat library
- Android Studio
- JavaScript
- Node.js
- Visual Studio Code

## Installation
### Prerequisite
- To run the app on device or simulator, install Expo `npm install expo-cli --global`

### To install dependencies

- From your terminal, navigate to the root folder of the project
- Then run `npm install`

### To launch the app
- From the root folder of the project run `expo start`
- Then a new browser window will open and will give you options to execute the app on a device or simulator

### How to set up on device
- Download the Expo app on device
- Check the browser window that opened in the previous step and look for a QR code or option to send a link with email
- With your device, scan QR code (Android) or send a link via email (iOS) to connect to Expo
- The app will then start on your device 
