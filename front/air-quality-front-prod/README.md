# Air Quality Frontend Prod
Production ready version of the front end React web app. In charge of:
- Serving `/build` directory as static files (this directory contains the production ready files from the react web app).
- Proxy: Redirecting all calls with the `/api/*` form to the microservice API Gatweway.

When deploying the app. This is the project that needs to be used and not the other one. As the other is built for development only.
## Project Structure
`server.js` is the entrypoint for the project. It makes sure to send the `build/index.html` file to any request that does not start with the `/api` prefix. The `index.html` itself is the entrypoint to the react web app, so any calls to this server will yield the user interface.

## Logic
The first step to make this work is going to the [Air Quality Frontend](../air-quality-front) and build the app using the following command: `npm run build`.
Once the `build` directory is created, copy it to the root of this project.

The `server.js` will take care of everything else, including the logic of calling the microservices API gateway, leveragin the `http-proxy-middleware` package.

## Available scripts

### `npm start`
Runs the app in the production mode.\
Run on the port specified as an environment variable (`PORT`) or uses port 3000 as default.
