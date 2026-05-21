const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3006",
  "http://localhost:3008",
  "http://localhost:3009",
  "http://localhost:3059",

  "https://fontend-thuongmaidientu.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {

    console.log("Request origin:", origin);

    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, "");

    const isAllowed = allowedOrigins.some(o =>
      o.replace(/\/$/, "") === cleanOrigin
    );

    if (isAllowed) {
      return callback(null, true);
    }

    console.log("❌ Blocked:", origin);

    return callback(null, false);
  },

  credentials: true
}));
