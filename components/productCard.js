export function renderProduct(product, query = "") {
  const highlight = (text) =>
    query && text.toLowerCase().includes(query.toLowerCase())
      ? text.replace(
          new RegExp(`(${query})`, "gi"),
          (match) => `<mark>${match}</mark>`
        )
      : text;

  return `
    <tr>
      <td data-label="Drug Code">${highlight(String(product["DrugCode"]))}</td>
      <td data-label="Generic Name">${highlight(product["GenericName"])}</td>
      <td data-label="Jan Ausadhi Price">₹${product.MRP} for ${product["UnitSize"]}</td>
      <td data-label="Group">${product["GroupName"]}</td>
      <td data-label="Industry Price">${product["comparePrice"]} for ${product["compareQuant"]}</td>
    </tr>
  `;
}
