import json2html from "node-json2html";

const createHtmlTable = (jsonData) => {
  let tableHtml = null;
  try {
    // Obtener todas las propiedades únicas de los objetos
    const allProperties = new Set();
    jsonData.forEach((obj) => {
      Object.keys(obj).forEach((prop) => {
        allProperties.add(prop);
      });
    });

    // Define una plantilla para el encabezado
    const headerTemplate = {
      "<>": "tr",
      html: Array.from(allProperties).map((prop) => {
        return { "<>": "th", html: prop };
      })
    };

    // Define una plantilla para el cuerpo
    const bodyTemplate = {
      "<>": "tr",
      html: Array.from(allProperties).map((prop) => {
        return { "<>": "td", html: "${" + prop + "}" };
      })
    };

    // Crea el encabezado y el cuerpo de la tabla
    tableHtml = `
      <table>
        <thead>${json2html.render([{}], headerTemplate)}</thead>
        <tbody>${json2html.render(jsonData, bodyTemplate)}</tbody>
      </table>
    `;
  } catch (error) {
    console.error(error);
  }
  return tableHtml;
};
export { createHtmlTable };
