// server.js
// Seperated into server and router to facilitate jest + superfast unit tests

const app = require('./app')
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
