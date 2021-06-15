# Restuarant Review App

This is an technical interview coding challenge. submitted by [Mukhtar Mahamed](https://github.com/janogale)

## Technogogies Used

`Next JS` is used to develop this Full stack App, the `Next JS API` is used to communicate to the `Firebase Database`

### **Folder Structrue**

- **restaurant-review** # this is the root directory
  - **controllers**
    - this folder contains route controllers
  - **middlewares**
    - this folder contains middleware functions for the API
  - **lib**
    - contains firebase config files
  - **public**
    - used store public files
  - **src/commonents**
    - contains all react components for the Frontend UI
  - **src/pages/api/restuarants**
    - contains restuarants API routes
  - **src/pages/api/restuarants/reviews**
    - contains reviews API routes
  - **src/pages/api/restuarants/replies**
    - contains replies API routes
  - **src/pages/api/auth**
    - contains authentication API routes
  - **src/pages/api/users**
    - contains users management API routes

### **Frontend Packages/Libraries used**

Frontend Library and packages used.

- react js
- next js
- chakra-ui # React Component Library for build UIs
- swr # used to fetch data with caching capabilities
- axios # used to call APIs for data manipulation
- react-hook-form # used to manage forms data
- react-icons # for displaying beautiful icons
- eslint # to maintain code readibility and follow standard guidances while in development
- prettier # to format code while in development

### Getting Started

To install the necessary packages for the frontend, go to root folder:
the App uses port **3000** by default, the App uses `yarn` as package manager.

```bash
cd restaurant-review
yarn install
```

to start the app, run the following command

- Run `yarn dev` go to [localhost:3000](http:localhost:3000)

### Deployed on `Vercel`

Please Click this link to see the deployed App [Restuarant Review App](https://restuarantreview.vercel.app/)

#### demo users

admin user `admin@gmail.con` password `123456`

owner user `sara@gmail.con` password `123456`

regular user `daskar@gmail.con` password `123456`
