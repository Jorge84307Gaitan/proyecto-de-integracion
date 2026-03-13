import PDFDocument from "pdfkit";

export function buildIncidentsPdf({ incidents, start, end, title }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", (err) => reject(err));

    doc.fontSize(18).text(title, { align: "center" });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(`Periodo: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`);
    doc.moveDown();

    incidents.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${item.tipo}`);
      doc.fontSize(10).text(`Descripcion: ${item.descripcion}`);
      doc.text(`Fecha: ${new Date(item.createdAt).toLocaleString()}`);
      doc.moveDown(0.5);
    });

    doc.end();
  });
}
