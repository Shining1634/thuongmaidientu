const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');

const uploadRouter = require('./routes/uploadRouter');
const adminRouter = require('./routes/loginAdminRouter');
const categoryRouter = require('./routes/theLoaiRouter');
const hangSXRouter = require('./routes/hangSXRouter');
const productRouter = require('./routes/productRouter');
const khRouter = require('./routes/loginKHRouter');
const voucherRouter = require('./routes/voucherRouter');
const orderRouter = require('./routes/orderRouter');
const commentRouter = require('./routes/commentRouter');
const hopQuaRouter = require('./routes/hopQuaRouter');
const cauHoiRouter = require('./routes/cauHoiRouter');
const cartRouter = require('./routes/cartRouter');
const aiRoutes = require('./routes/aiRoutes');

const connectDB = require('./config/connectDB');

const cors = require('cors');
const path = require('path');

require("dotenv").config();

const app = express();

const port = process.env.PORT || 10000;

// ======================
// Connect MongoDB
// ======================
connectDB();

// ======================
// CORS
// ======================
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3006',
    'http://localhost:3008',
    'http://localhost:3009',
    'http://localhost:3059',
    'https://fontend-thuongmaidientu-zhlt.vercel.app/',
    'https://bandodientu-admin.vercel.app',
    'https://bandodientu-kt-trangchu.vercel.app',
    'https://admin-dodientu.duykhang.site',
    'https://shopbandodientu.duykhang.site',
    'https://backend-bandodientu-node.duykhang.site'
];

app.use(cors({
    origin: function (origin, callback) {

        // cho phép Postman / mobile app / server-to-server
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'upload-type'
    ]
}));

app.options('*', cors());

// ======================
// Body Parser
// ======================
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

// ======================
// Static Upload Folder
// ======================
app.use(
    '/uploads',
    express.static(path.join(__dirname, './public/uploads'))
);

// ======================
// View Engine
// ======================
viewEngine(app);

// ======================
// Routes
// ======================
app.use("/api/accadmin", adminRouter);

app.use("/api/category", categoryRouter);

app.use("/api/hangsx", hangSXRouter);

app.use("/api/product", productRouter);

app.use("/api/acckh", khRouter);

app.use("/api/voucher", voucherRouter);

app.use("/api/order", orderRouter);

app.use("/api/comment", commentRouter);

app.use("/api/hopqua", hopQuaRouter);

app.use("/api/cauhoi", cauHoiRouter);

app.use("/api/cart", cartRouter);

app.use("/api/ai", aiRoutes);

app.use("/api/upload", uploadRouter);

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
    res.send("Backend NodeJS is running...");
});

// ======================
// Handle Errors
// ======================
app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ======================
// Start Server
// ======================
app.listen(port, () => {

    console.log(`====================================`);
    console.log(`Backend NodeJS is running`);
    console.log(`PORT: ${port}`);
    console.log(`====================================`);

});
