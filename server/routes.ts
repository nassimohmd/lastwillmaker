import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertAnswerSchema } from "@shared/schema";
import PDFDocument from "pdfkit";

export function registerRoutes(app: Express) {
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const { responses, content } = req.body;
      const validatedData = insertAnswerSchema.parse({
        responses,
        generatedContent: content
      });

      // Store the answers
      await storage.createAnswer(validatedData);

      // Generate PDF
      const doc = new PDFDocument();
      
      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=will-and-testament.pdf"
      );

      // Pipe the PDF to the response
      doc.pipe(res);

      // Add content to PDF
      doc.fontSize(16).font("Helvetica-Bold").text("LAST WILL AND TESTAMENT", {
        align: "center"
      });
      
      doc.moveDown();
      doc.fontSize(12).font("Helvetica").text(content);
      
      // Finalize PDF
      doc.end();
    } catch (error) {
      res.status(400).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
