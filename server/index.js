import express from "express";
import cors from "cors";
const app = express();

const port = 9090;

app.use(cors());
app.use(express.json());

app.post("/api/registration", (req, res) => {
    if (Math.random() > 0.5) {
        res.statusCode = 400;

        setTimeout(() => {
            res.send({
                status: "error",
                message: "Bad request",
            });
        }, Math.random() * 1000);

        return;
    }

    setTimeout(() => {
        res.statusCode = 200;
        res.send({
            status: "success",
            message: "You are registered",
        });
    }, Math.random() * 1000);
});


app.post("/api/feedback", (req, res) => {
    const errors = {};

    if (!req.body.name || req.body.name.trim() === '') {
        errors.name = 'Передано пустое значение';
    }
    if (!req.body.email || !req.body.email.trim() === '') {
        errors.email = 'Передано пустое значение';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        errors.email = 'Некорректный email';
    }
    if (!req.body.phone || req.body.phone.trim() === '') {
        errors.phone = 'Передано пустое значение';
    }
    if (!req.body.message || req.body.message.trim() === '') {
        errors.message = 'Передано пустое значение';
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            status: "error",
            fields: errors
        });
    } else {
        res.status(200).json({
            status: "success",
            msg: "Ваша заявка успешно отправлена"
        });
    }
});


app.get("/api/ping", (req, res) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});