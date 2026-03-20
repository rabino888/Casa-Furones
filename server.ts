import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Booking
  app.post("/api/book", async (req, res) => {
    const { name, email, checkIn, checkOut, guests, message } = req.body;

    if (!name || !email || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Configure Nodemailer
    // Note: User needs to provide EMAIL_USER and EMAIL_PASS in environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or any other service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nueva Reserva: ${name}`,
      text: `
        Nueva solicitud de reserva recibida:
        
        Nombre: ${name}
        Email: ${email}
        Entrada: ${checkIn}
        Salida: ${checkOut}
        Huéspedes: ${guests}
        Mensaje: ${message || "Sin peticiones especiales"}
      `,
      html: `
        <h2>Nueva solicitud de reserva</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Entrada:</strong> ${checkIn}</p>
        <p><strong>Salida:</strong> ${checkOut}</p>
        <p><strong>Huéspedes:</strong> ${guests}</p>
        <p><strong>Mensaje:</strong> ${message || "Sin peticiones especiales"}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email enviado correctamente" });
    } catch (error) {
      console.error("Error enviando email:", error);
      res.status(500).json({ error: "Error al enviar el email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
