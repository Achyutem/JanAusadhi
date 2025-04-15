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
      <td>${highlight(String(product["DrugCode"]))}</td>
      <td>${highlight(product["GenericName"])}</td>
      <td>₹${product.MRP} for ${product["UnitSize"]}</td>
      <td>${product["GroupName"]}</td>
      <td>${product["comparePrice"]}  for ${product["compareQuant"]} </td>
    </tr>
  `;
}
