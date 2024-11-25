# OrderForm
This repository contains the code for the OrderForm application, which is designed to handle order forms efficiently using modern web technologies.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Scripts](#scripts)
* [Dependencies](#dependencies)
* [Contributing](#contributing)
* [License](#license)
  
## Installation
To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Tjs0188/orderForm.git
cd orderForm
```

2. Install the dependencies:

```bash
yarn
```

## Usage

To run the application in development mode:

```bash
yarn dev
```

This will start the development server and watch for changes in your styles.

To start the application in production mode:

```bash
yarn start
```

## Scripts

The project includes the following yarn scripts:

* `start`: Start the application
* `dev`: Run both the Tailwind CSS watcher and Nodemon for development
* `tailwind:css`: Compile Tailwind CSS
* `nodemon`: Start the application with Nodemon
* `build`: Build the project assets using webpack
* `deploy`: Deploy the application to Fly.io
  
## Dependencies

The project relies on several key dependencies:

* `express`: Web framework for Node.js
* `prisma`: Database toolkit
* `pug`: Template engine
* `puppeteer`: Headless browser for automation of pdf generation
* `tailwindcss`: CSS framework
  
For a complete list of dependencies, refer to the [package.json](package.json) file.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
   
## License

This project is licensed under the MIT License.

