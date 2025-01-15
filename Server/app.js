import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import authRoutes from "./routes/authRoute.js";
import songRoutes from "./routes/songRoute.js";
import albumRoutes from "./routes/albumRoute.js";
import statsRoutes from "./routes/statsRoute.js";

import { connectDB } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import cron from "node-cron";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"temp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 //10MB maximum filesize
    }
}));

const tempDir = path.join(process.cwd(),"tmp");
//cron jobs
//delete those files in every
cron.schedule("0 * * * *", () => {
    if(fs.existSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if(err) {
                console.log("error", err);
                return;
            }
            for(const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => {});
            }
        })
    }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats", statsRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    });
}

//handling errors
app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV == "production"? "Internal Server Error" : err.message});
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});