# 🚀 Threadku-API: Elevating My Web Development Journey! 🌐

Welcome to Threadku-API, a dynamic social media-inspired platform designed to master and showcase modern web development technologies.

## Features

- **CRUD Operations**: Robust CRUD operations for Users, Threads, Comments, Likes, and Collections.
- **Security**: Advanced security features including data encryption 🔐, rate limiting 🚫, and input validation 🛡️.

## Tech Stack

- **Node.js** & **Express**: For scalable server-side solutions 🚀
- **TypeScript**: For enhanced codebase reliability 🌟
- **MongoDB**: Flexible and scalable NoSQL database management 🗄️
- **Redis**: Efficient caching and messaging 🔄
- **Docker**: Containerized deployment for seamless scalability 🐳

## Getting Started

### Prerequisites

- Node.js
- Docker (optional, for containerized deployment)
- MongoDB
- Redis

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/zdnemz/threadku-api.git
    cd threadku-api
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Set up environment variables

    Create a `.env` file in the root directory and add your environment variables. Example:

    ```env
    # app config
    NODE_ENV=development
    APP_PORT=5000
    APP_HOST=0.0.0.0

    # cors
    CORS_ORIGIN=http://192.168.100.51:3000

    # jwt
    JWT_SECRET=supersecretjwtkey

    # mongodb
    MONGO_URL=mongodb://username:password@localhost:27017
    MONGO_DB=threadku

    # redis
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=supersecretpassword
    REDIS_DB=0
    ```

4. Run the application
    ```bash
    npm start
    ```

5. For development mode
    ```bash
    npm run dev
    ```

## Usage

Explore the API endpoints to perform CRUD operations on Users, Threads, Comments, Likes, and Collections. Ensure to handle authentication and authorization as per the security guidelines.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

For further inquiries or support, feel free to reach out via the following platforms:

[![GitHub - zdnemz](https://img.shields.io/badge/zdnemz-%23121011.svg?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/zdnemz)
[![LinkedIn - zdnemz](https://img.shields.io/badge/zdnemz-%230077B5.svg?style=flat-square&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/zdnemz/)
[![Twitter - zdanemz](https://img.shields.io/badge/zdnemz-%231DA1F2.svg?style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/zdanemz)
[![Instagram - zdnemz](https://img.shields.io/badge/zdnmez-%23E4405F.svg?style=flat-square&logo=Instagram&logoColor=white)](https://instagram.com/zdnemz)

Let's push the boundaries of web development! 💡✨
