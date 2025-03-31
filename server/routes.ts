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
      const doc = new PDFDocument({
        margins: {
          top: 50,
          bottom: 50,
          left: 60,
          right: 60
        }
      });
      
      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=will-and-testament.pdf"
      );

      // Pipe the PDF to the response
      doc.pipe(res);

      // Add header
      doc.fontSize(24).font("Helvetica-Bold").text("LAST WILL AND TESTAMENT", {
        align: "center"
      });
      
      // Add subtitle
      doc.moveDown(0.5);
      doc.fontSize(14).font("Helvetica-Bold").text("DIGITAL ASSETS AND ACCOUNTS", {
        align: "center"
      });
      
      // Add date
      doc.moveDown(0.5);
      doc.fontSize(10).font("Helvetica").text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "center"
      });
      
      // Add horizontal line
      doc.moveDown(1);
      doc.moveTo(60, doc.y)
         .lineTo(doc.page.width - 60, doc.y)
         .stroke();
      
      // Add content
      doc.moveDown(1.5);
      doc.fontSize(11).font("Helvetica").text(content, {
        align: "left",
        lineGap: 3
      });
      
      // Add footer
      doc.fontSize(10).font("Helvetica-Italic");
      doc.text("This document represents my wishes regarding my digital assets and accounts.", {
        align: "center"
      });
      doc.moveDown(0.5);
      doc.text("I understand that digital property laws vary by jurisdiction, and I have consulted with legal professionals as necessary.", {
        align: "center"
      });
      
      // Add signature line
      doc.moveDown(2);
      doc.fontSize(11).font("Helvetica");
      doc.text("Signature: ________________________________", {
        align: "left"
      });
      doc.moveDown(0.5);
      doc.text("Date: ________________________________", {
        align: "left"
      });
      doc.moveDown(0.5);
      doc.text("Name (printed): ________________________________", {
        align: "left"
      });
      
      // Finalize PDF
      doc.end();
    } catch (error) {
      res.status(400).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
