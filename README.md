# Couchbase Full Stack NativeScript App

A sample mobile application using Telerik NativeScript that will connect to the sample server APIs found [here](https://github.com/couchbaselabs/comply).  The purpose here is to demonstrate the development of full stack applications spanning beyond a mobile device or web browser.

## Installation

Download or clone the GitHub repository.  Using the Command Prompt (Windows) or Terminal (Mac and Linux) execute the following:

```
npm install
```

The above command will install all NativeScript dependencies.  With the dependencies installed, add the Android and iOS platforms to the project:

```
tns platform add android
tns platform add ios
```

It is important to note that if you're not using a Mac you cannot add and build for the iOS platform.

## Configuration

Throughout the application there are API endpoints that connect to the server side full stack application found [here](https://github.com/couchbaselabs/comply).  You must be running this server side application for the mobile application to function.

With the server side application running, determine the host address or IP and change all URLs within the NativeScript application.  These URLs will be found in the various JavaScript files.

## Resources

Telerik NatieScript - [https://www.nativescript.org](https://www.nativescript.org)

Couchbase - [http://www.couchbase.com](http://www.couchbase.com)
