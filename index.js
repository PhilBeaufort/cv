const express = require("express");
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');
const puppeteer = require('puppeteer');
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

      // Render the HTML to a string
      const htmlContent = await new Promise((resolve, reject) => {
          res.render('index', {theme: DAISYUI_THEME, ...cv_data}, (err, html) => {
            if (err) reject(err);
            else resolve(html);
          });
      });

      // Set the HTML content in the Puppeteer page
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Save screenshot as an image (PNG)
      const imagePath = path.join(outputDir, "screenshot.png");
      await page.screenshot({ path: imagePath, fullPage: true });

      // Save as a PDF with a custom large size
      const pdfPath = path.join(outputDir, "document.pdf");
      await page.pdf({
          path: pdfPath,
          format: "A2", // Change to desired size
          printBackground: true
      });

      await browser.close();

      res.json({ message: "Files created successfully", imagePath, pdfPath });
  } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF. Please try again later.');
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