require('dotenv').config();

import mongoose from 'mongoose';
import app from './app';

//* *******CONEXÃO A BASE DE DADOS***************************************************************/
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = 3001;
    app.listen(port, () => {
      console.log();
      console.log(`Escutando na porta ${port}`);
      console.log(`CTRL + Clique em http://localhost:${port}`);
    });
  })
  .catch((e) => console.log(e));
//* *********************************************************************************************/
