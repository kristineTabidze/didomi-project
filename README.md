# Didomi code challenge

In some specific cases, companies need to collect consent from consumers before using their data. For instance, website visitors might need to explicitly consent to receive email newsletters through a form before a company can send emails to those visitors.

The goal of this challenge is to build the simplest possible consent collection and management application where a user can enter its information and agree to a list of data processing. It's not very user-friendly but that'll do the trick for this time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- Consent Form: A form that allows a user to enter her name, email address and to select data processes that she agrees to.
  When the user fills out the form and clicks on the "Give consent" button, the consent gets added to the list of consents that appears on the second view.
- Collected Consents: A list of consents that were given by users. This view simply displays items from a list with client-side pagination.

## Technologies Used

This project is built with:

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Typed JavaScript for better code quality and readability.
- **Zustand**: State management for handling user consents.
- **Material-UI**: UI components for faster and easier web development.
- **Tailwind CSS**: Utility-first CSS framework.
- **Formik**: Form management library with validation support.
- **MSW (Mock Service Worker)**: Mocking API requests for testing.
- **Vitest and React Testing Library**: Testing framework used for unit and component testing.
- **Web Vitals**: Set of metrics to measure quality of web app

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/kristineTabidze/didomi-project
cd didomi-project
npm install
```

## Usage

To run the application locally:

```bash
npm run start
```

Open your browser and navigate to `http://localhost:3000/give-consent` to see the app in action.

## Testing

This project uses **Vitest** for testing. To run the tests, use:

```bash
npm run test
```

### Mocking API Requests

The application uses Mock Service Worker (MSW) to mock API requests. MSW is set up to handle the following:

- GET requests to fetch user consents.
- POST requests to add new consents.

## Folder Structure

Here's a brief overview of the folder structure:

```
didomi-project/
├── public/ # Public assets
├── src/
│ ├── components/ # Reusable components
│ ├── fixtures/ # Fixed values
│ ├── mocks/ # MSW set up
│ ├── pages/ # Application pages
│ ├── store/ # Zustand stores
│ ├── types/ # Reusable types
│ ├── App.tsx # Main app component
│ ├── index.tsx # Entry point
│ └── ...
├── package.json # Project configuration
└── README.md # This file
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your message here'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Contact

For any questions or feedback, please reach out to:

- Author: [Kristine Tabidze](mailto:qristinatabidze@gmail.com)
- GitHub: [kristineTabidze](https://github.com/kristineTabidze)

---
