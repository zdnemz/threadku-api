# Gunakan image Node.js
FROM node:22-alpine

# Buat direktori kerja
WORKDIR /usr/src/app

# Copy file dan install dependencies
COPY . .
RUN npm install

# Compile TypeScript ke JavaScript
RUN npm run build

# Ekspose port aplikasi
EXPOSE 5000

# Jalankan aplikasi
CMD ["npm", "start"]
