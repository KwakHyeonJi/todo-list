const app = require('../server');
const PORT = process.env.PORT_SERVER || 9998;

app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
