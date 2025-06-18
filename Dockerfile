FROM cypress/included:14.5.0

WORKDIR /e2e

COPY package*.json ./
RUN npm install

COPY . .