The previous command to run the project:
"start": "concurrently \"nodemon ./server.js\" \"cd client && start index.html\""

The command that chatGPT suggested:
"start": "npm-run-all --parallel start:server start:client",
"start:server": "nodemon ./server.js",
"start:client": "cd client && start index.html"
