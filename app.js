import Fastify from "fastify";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from '@fastify/cors'

dotenv.config();

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, { 
  origin: true
})


fastify.get("/stop-monitoring", async function (req, res) {
  console.log(req.url)
  const data = await fetch(
    process.env.PRIM_IDFM_API_URL + req.url,
    {
      headers: {
        apiKey: process.env.PRIM_IDFM_API_KEY,
      },
    }
  );
  res.send(await data.json());
});

fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
