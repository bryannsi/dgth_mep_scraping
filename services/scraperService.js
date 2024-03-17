import puppeteer from "puppeteer";
import ora from "ora";

const scraper = async (url) => {
  // Launch a loading spinner with an appropriate message on the terminal
  // It provides a good user experience as the scraping process takes a bit of time
  const date = Date.now();
  const spinner = ora({
    text: "Launcing puppeteer",
    color: "blue",
    hideCursor: false
  }).start();
  let browser;

  try {
    browser = await puppeteer.launch();
    spinner.text = "Launching headless browser page";
    const page = await browser.newPage();
    spinner.text = `Navigating to ${url}`;
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    // Change the message on the terminal as we start scraping the page
    spinner.text = "Scraping page DGTH MEP";

    // Esperar hasta que se carguen las figuras
    await page.waitForSelector(".wp-block-table");

    // Obtener todas las figuras que contienen tablas
    const tablesData = await page.evaluate(() => {
      const figures = Array.from(document.querySelectorAll(".wp-block-table"));
      const validTablesData = [];

      figures.forEach((figure) => {
        const tables = Array.from(figure.querySelectorAll("table"));

        tables.forEach((table) => {
          const rows = Array.from(table.querySelectorAll("tr"));

          const tableData = {};

          rows.forEach((row) => {
            const [propertyNameCell, propertyValueCell] =
              row.querySelectorAll("td");
            const propertyName = propertyNameCell.textContent.trim();
            const propertyValue = propertyValueCell.querySelector("a")
              ? propertyValueCell.querySelector("a").href
              : propertyValueCell.textContent.trim();

            // Verificar si la propiedad "Especialidad" contiene al inicio la palabra "INFORMATICA"
            if (
              propertyName === "Especialidad" &&
              (propertyValue.toUpperCase().startsWith("INFORMATICA") ||
                propertyValue.toUpperCase().includes("RED"))
            ) {
              // Si la condición es verdadera, agregar tableData al array validTablesData
              validTablesData.push(tableData);
            }
            // Asignar la propiedad y el valor al objeto tableData
            tableData[propertyName] = propertyValue;
          });
        });
      });

      return validTablesData;
    });

    return tablesData;
  } catch (err) {
    // Print failed on the terminal if scraping is unsuccessful
    spinner.fail({ text: "Scraping failed" });
    // Remove the spinner from the terminal
    spinner.clear();
  } finally {
    spinner.text = "Closing headless browser";
    await browser.close();
    spinner.succeed(`Page scraping successfull after ${Date.now() - date}ms`);
    spinner.clear();
  }
};

export { scraper };
