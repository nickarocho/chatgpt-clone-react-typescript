const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/completions", async (req, res) => {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    res.send(data);
  } catch (err) {}
});

app.listen(PORT, () =>
  console.log(`🚀 server is up'n runnin' on PORT ${PORT}`)
);
