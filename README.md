# CivilDefenseApp

## Index of content.<a name="index"></a>

- [Index of content](#index)
- [Section 1 - What is this?](#section1)
    - [Introduction.](#introduction)
    - [General idea of the solution.](#solution)
- [Section 2 - Technoligies to use.](#section2)
- [Section 3 - Specific documentation.](#section3)

***
## Section 1 - What is this?<a name="section1"></a>

### Introduction.<a name="introduction"></a>

This is a software developed in the environment of the University. The objetive is to give Civil Defense a software to manage all the events of the city, as well as see the diferents entities that exists. All the info is going to be centralized in a map, that is going to be the main object in the system.

### General idea of the solution.<a name="solution"></a>

To solve this we thought about split the system in two differents Front End.

The first one, is going to work as an administrative system. Is going to handle the Credentials of the users, the Entities and the Events, and also is going to show stats of the three main parts recently named.

The second one, is going to be the real app. It will show the map where we are going to centralize all the Entities an the Events. And, here we have the main function, that is to create a new Event but, to can create one, the user must be logged with an account created by the Adminstrator in the other system.

## Section 2 - Technoligies to use.<a name="section2"></a>

**NodeJS.**

Runtime environment that lets us execute Javascript code on the server side of the project.

[Node.js](https://www.nodejs.org)

**Express.**

Backend framework.

[Express - Node.js web application framework](https://www.expressjs.com)

**Typescript.**

Programming languaje that we are going to use in the whole app.

[JavaScript With Syntax For Types.](https://www.typescriptlang.org/)

**MongoDB.**

As a database we are going to use MongoDB.

[La base de datos líder del mercado para aplicaciones modernas](https://www.mongodb.com/es)

**Mongoose.**

ORM that is going to let us to connect our Back End with de database(MongoDB).

[Mongoose](https://mongoosejs.com/)

**Socket.io.**

Library to generate the socket to handle the notifications when an event is created.

[Socket.IO](https://socket.io/)

**ReactJS.**

Front End Framework.

[React - A JavaScript library for building user interfaces](https://reactjs.org/)

**Redux.**

To handle the state of the Reacts apps.

[Redux - A predictable state container for JavaScript apps. | Redux](https://redux.js.org/)

**Redux Persist.**

Library that works with Redux to persiste the state in the localstorage.

[GitHub - rt2zz/redux-persist: persist and rehydrate a redux store](https://github.com/rt2zz/redux-persist)

**React Google Charts.**

Library to generate graphics from differents stats.

[Getting Started](https://react-google-charts.com/)

**Sweetalert.**

Library to generate the differents alert of the system.

[SweetAlert2](https://sweetalert2.github.io/)

**Leaftlet.**

Library that is going to let as show the map in the app.

[Leaflet - an open-source JavaScript library for interactive maps](https://leafletjs.com/)

**Formik.**

Library to handle React forms.

[Formik](https://formik.org/)

**Yup.**

Library to validate React forms.

[GitHub - jquense/yup: Dead simple Object schema validation](https://github.com/jquense/yup)

**Bootstrap.**

Framework to develop the design of the application giving us multiple classes to use.

[Bootstrap](https://www.getbootstrap.com)

**Postman.**

Plataform to API's development.

[Postman | The Collaboration Platform for API Development](https://www.postman.com)

**Cryptob.**

Plugin to encrypt the password of the users.

[kelektiv/node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

**JSON Web Token.**

To give token to the users to control the access to data.

[auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

**Axios.**

To make requests from Vue to the API.

[axios/axios](https://github.com/axios/axios)

***

## Section 3 - Specific documentation.<a name="section3"></a>

- [API](./api/README.md)
- [ADMIN](./admin/README.md)
- [APP](./app/README.md)