# 2D-plot-data & Regression Testing

Tech stack: ReactJS + MongoDB + JavaScript + Node.js + Express.js

## Instructions on how to run the web app

On your local machine, create an empty directory.

Open your Terminal or cmd and `cd` into that dir.

Make sure `git` and `node` are installed on your computer. Clone this project to your working dir.

`git clone https://github.com/quangtran1203/2D-plot-data.git`

After that, `cd` into the cloned dir. `cd 2D-plot-data`.

There should be 2 folders within this dir: `data-regression` & `backend`.

`data-regression` is the front-end part of this project (ReactJS app).

`backend` is the backend part that handles API call and database manipulations.

`cd` into `data-regression` folder and run `npm install` to add all required dependencies for front-end.

Then, do the same thing for `backend`:

`cd ..` then `cd backend` then `npm install`

## Running the application

It is recommended to have 2 terminal tabs open to run both front-end and backend.

### Run backend processes first

`cd` into `backend` folder then run `node index.js`

This will start the backend processes by setting up an API endpoint and connection to MongoDB

I have configured MongoDB access to global (all IP addresses) so you can connect to it from anywhere.

Once you've seen the log message `Server is live at http://localhost:5000` and `Connected to DB` then it means the backend is working properly.

It's important to keep this running in the background while you interact with the front-end.

### Now run front-end side

In another Terminal tab, `cd` into `data-regression` folder.

Run `npm start` to start the React Dev server. It should take a couple of seconds to start the server and once it's done, you should see a new tab open in your default web browser.

The URL is defaulted to localhost:3000.

You should be able to interact with the UI now.

### Thank you
