# Exercise Tracker

Exercise tracker web app and API.

## Description

API endpoints:

- Create a new user:

  `POST /api/exercise/new-user`

  Input:

  - username

- Add exercises:

  `POST /api/exercise/add`

  Input:

  - User ID
  - Exercise description
  - Exercise duration (minutes)
  - Date (yyyy-mm-dd)

- Get list of all users:

  `GET /api/exercise/users`

- Get users's exercise log:

  `GET /api/exercise/log?{userId}[&from][&to][&limit]`

  Input:

  - userId (required)
  - from, to (optional, yyyy-mm-dd)
  - limit (optional, number)

## Contributing

All contributions are welcome, particularly feedback on code quality, bug reports, tips and ideas for improvement.

## License

All code dedicated to the world-wide public domain under a [Creative Commons Zero v1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/)
