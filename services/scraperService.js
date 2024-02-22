import puppeteer from "puppeteer";

const scraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  try {
    await page.goto(url);

    // Esperar hasta que se carguen las figuras
    await page.waitForSelector(".wp-block-table");

    // Obtener todas las figuras que contienen tablas
    const tablesData = await page.evaluate(() => {
      const figures = Array.from(document.querySelectorAll('.wp-block-table'));
      const validTablesData = [];

      figures.forEach(figure => {
        const tables = Array.from(figure.querySelectorAll('table'));

        tables.forEach(table => {
          const rows = Array.from(table.querySelectorAll('tr'));

          const tableData = {};

          rows.forEach(row => {
            const [propertyNameCell, propertyValueCell] = row.querySelectorAll('td');
            const propertyName = propertyNameCell.textContent.trim();
            const propertyValue = propertyValueCell.querySelector('a') ? propertyValueCell.querySelector('a').href : propertyValueCell.textContent.trim();

            // Verificar si la propiedad "Especialidad" contiene al inicio la palabra "INFORMATICA"
            if (propertyName === "Especialidad" &&
              (propertyValue.toUpperCase().startsWith("INFORMATICA") || propertyValue.toUpperCase().includes("RED"))
            )
            {
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
  } finally {
    await browser.close();
  }
};

export { scraper };
