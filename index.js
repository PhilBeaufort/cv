const express = require("express");
const { PDFDocument } = require('pdf-lib');
const puppeteer = require('puppeteer');
const path = require('path');
const stream = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const pipeline = promisify(stream.pipeline);

const cv_data = require('./data.json'); // Import the JSON file

const port = 8080;

const app = express();
app.use(express.json());

// Set Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));


// Middleware to handle async errors (to avoid try-catch in every route)
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const DAISYUI_THEME = "corporate";

app.get('/', asyncHandler( async (_req, res) => {
    res.render('index', {theme: DAISYUI_THEME, ...cv_data});
}));

app.get('/generate', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: true, // Ensure it's running in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // This helps in environments like Docker or certain OS configurations
        });
        const page = await browser.newPage();

        // Set viewport to simulate high resolution
        await page.setViewport({
            width: 640,
            height: 480,
            deviceScaleFactor: 3 // Higher scale factor improves image quality
        });

        // Render the HTML to a string
        const htmlContent = await new Promise((resolve, reject) => {
            res.render('index', {theme: DAISYUI_THEME, ...cv_data}, (err, html) => {
            if (err) reject(err);
            else resolve(html);
            });
        });

        // Set the HTML content in the Puppeteer page
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Hide the "Generate PDF" button using page.evaluate (this runs in the page context)
        await page.evaluate(() => {
            const generateButton = document.querySelector('#generate');
            if (generateButton) {
                generateButton.style.display = 'none'; // Hide the button
            }
        });

        // Capture the screenshot as a stream
        const imageBuffer = await page.screenshot({ fullPage: true, encoding : 'binary' });

        // Convert image to PDF
        const pdfDoc = await PDFDocument.create();


        // Embed the image (use embedJpg for JPG images, or embedPng for PNG images)
        const image = await pdfDoc.embedPng(imageBuffer); // Use embedPng for PNG images
        const { width, height } = image.scale(1); // Scale to fit the page
        const page1 = pdfDoc.addPage([width, height]);

        // Draw the image on the page
        page1.drawImage(image, { x: 0, y: 0, width, height });

        // Save the PDF into memory (stream)
        const pdfBytes = await pdfDoc.save();
        await browser.close();

        const pdfPath = 'cv.pdf';

        // Set headers to indicate it's a PDF file download
        res.setHeader('Content-Disposition', `attachment; filename="${pdfPath}"`);
        res.setHeader('Content-Type', 'application/pdf');

        // Save the PDF to the filesystem and send it as a download
        
        fs.writeFileSync(pdfPath, pdfBytes);
        res.download(pdfPath, pdfPath, () => {
            // Optionally, remove the file after download to avoid leaving it on the server
            fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        console.error('Error generating:', error);
        res.status(500).send('Error generating. Please try again later.');
    }
});

// Global Error Handling Middleware
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message || 'Something went wrong!'
    });
});
  

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});