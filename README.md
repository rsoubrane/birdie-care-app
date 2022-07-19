# Birdie Developer Test

The API is hosted on Heroku and is available [here](https://birdie-care-app-backend.herokuapp.com/api).\
The APP is hosted on Vercel and is available [here](https://birdie-care-app.vercel.app/).


*Note: The API becomes inactive after 30m. Therefore, it may take a few seconds for the initial call.*


## Context

At Birdie, our app allows care givers to record observations of older adults receiving care, we name them **care recipients**.

These could be anything from the recording of their mood (happy, sad, bored, confused) to what they drank today (1 pint of water).

Each of these observations are recorded as events in our database. Here's an example of a mood observation recorded
in this event format:

``` json
{  
   "id":"decaa026-2ce5-49cb-aff9-92326b85a98c",
   "event_type":"mood_observation",
   "visit_id":"39b94aab-cc35-4874-807f-c23472aec663",
   "timestamp":"2019-04-23T10:53:13+01:00",
   "caregiver_id":"4786d616-259e-4d52-80f7-8cf7dc6d881a",
   "care_recipient_id":"03f3306d-a4a3-4179-ab88-81af66df8b7c",
   "mood":"okay",
},
```

Here's a quick explanation of the base properties:

- `id`: Uniquely identifies the observation.
- `event_type`: Title we use to categorise our events.
- `visit_id`: Observations are traditionally observed during a visit between the caregiver (carer) and care recipient. This ID identifies that visit.
- `caregiver_id`: Identifies who the caregiver (carer) was that made this observation.
- `care_recipient_id`: Identifies the care recipient this observation is for.

On top of that, there can be **additional properties** based on the `event_type`:

- `mood` describes the mood of the care recipient as reported by the caregiver

The database (we should have sent you credentials) contains some of these observation events, within the `events` table.

## Challenge

*Display the information to a family member*

#### Your challenge is to clone this repository and create a small web application to visualize these observations, so that looking at it is valuable to a family member of this care recipient

This could mean presenting it in the following forms:

- A table
- A graph
- A timeline

 Or any other way/combination of those. We are test driven here at Birdie so please make sure you write tests to validate your work.


## Technical stack

Here's the technical stack this test was realised with

### Front end

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ViteJS](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/v4/)
- [ApexCharts](https://apexcharts.com/)

### Back end

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)

### Tests

- [Jest](https://jestjs.io/fr/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Hosting services

- [Heroku](https://www.heroku.com/)
- [Vercel](https://vercel.com/)

## Usage

1. Start the API. (Run the following commands within the `backend` folder)

   a. Install the dependencies

   ```bash
   yarn
   ```

   b. Run the HTTP server (will start on port `8000`)

   ```bash
   yarn start
   ```

2. Start the React app  (Run the following commands within the `frontend` folder)

    a. Install the dependencies

   ```bash
   yarn
   ```

   b. Run the application (will start on port `3000`)

   ```bash
   yarn start
   ```
