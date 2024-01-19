# Cinema App

This is a project made for a Ionic/Angular technical test.

## Firebase Hosting

You can use the following link to access a fully functional remote version of the web page:

https://cinema-app-bc00a.web.app/

## How to install locally

In order to install the project locally, you'll need Node v20.10.0 (any 20 version should be fine). You'll also need to setup a Firebase web application with Authentication and Firestore activated.

1. Clone the repository locally and install the dependencies:

```
git clone https://github.com/fefu-marquez/cinema-app.git
npm install
```

2. Configure firebase:

First you'll need to create the app (analitycs are optional):

![imagen](https://github.com/fefu-marquez/cinema-app/assets/17768182/f39f1b22-8d75-441c-ad78-7cc82e6c691b)

Go to the configuration of your project and create a new web application:

![imagen](https://github.com/fefu-marquez/cinema-app/assets/17768182/936dba06-2e5a-4ee9-a6f9-2c03f64ee22c)

Once you registered the app, copy the Firebase SDK into the `src/environments/environment.ts`:

![asd](https://github.com/fefu-marquez/cinema-app/assets/17768182/c2701568-fd46-48fc-ac5d-6118e2d651c7)

Copy the data and replace it in the file:

![imagen](https://github.com/fefu-marquez/cinema-app/assets/17768182/8a6d2d40-5701-441a-a9ee-efa4b78708d9)

After this, you need to activate the Authentication and Firestore modules from the Firebase console. They are on the menu on the left on the "Compilation" section:

![imagen](https://github.com/fefu-marquez/cinema-app/assets/17768182/696f49f9-a8f9-45be-aca0-114e3f40c198)

You'll also want to activate user authentication via e-mail and password on the authentication section. 

3. Run the project. You can use either `npm start` or `ionic serve`. 

