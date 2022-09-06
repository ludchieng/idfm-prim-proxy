import Fastify from "fastify";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

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

fastify.listen({ port: process.env.PORT || 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
