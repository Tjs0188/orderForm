document.addEventListener("DOMContentLoaded", () => {
  const pkgSelect = document.querySelector('#addPackageSelect')
  const frgSelect = document.querySelector('#addFridgeSelect')
  const wdSelect = document.querySelector('#addWDSelect')

  pkgSelect.addEventListener('change', async (e) => {
    const selectedOption = pkgSelect[pkgSelect.selectedIndex]
    const packageItems = await axios.get("/orderform/packageItems", {params: {packageId: selectedOption.value}})
    const packageTable = document.querySelector("#packageTable")
    const existingPackageItems = packageTable.querySelectorAll(".packageItem")

    existingPackageItems.forEach(pkgItems => {
      pkgItems.parentNode.removeChild(pkgItems);
    })

    Object.entries(packageItems.data.packageItems).forEach(pkgItem => {
      const item = pkgItem[1].item
      const tableBody = document.createElement("tbody")
      const tableRow = document.createElement("tr")
      const category = document.createElement("td")
      const productNumber = document.createElement("td")
      const description = document.createElement("td")

      tableBody.classList.add("packageItems")
      tableRow.classList.add("packageItem")

      category.innerHTML = item.category
      productNumber.innerHTML = item.product_number
      description.innerHTML = item.description

      tableRow.appendChild(category)
      tableRow.appendChild(productNumber)
      tableRow.appendChild(description)

      tableBody.appendChild(tableRow)

      packageTable.appendChild(tableBody)
    });
  })

  frgSelect.addEventListener('change', async (e) => {
    const selectedOption = frgSelect[frgSelect.selectedIndex]
    const packageItems = await axios.get("/orderform/packageItems", {params: {packageId: selectedOption.value}})
    const packageTable = document.querySelector("#packageTable")
    const existingPackageItems = packageTable.querySelectorAll(".frgItem")

    existingPackageItems.forEach(pkgItem => {
      pkgItem.parentNode.removeChild(pkgItem);
    })

    Object.entries(packageItems.data.packageItems).forEach(pkgItem => {
      const item = pkgItem[1].item
      const tableRow = document.createElement("tr")
      const category = document.createElement("td")
      const productNumber = document.createElement("td")
      const description = document.createElement("td")

      tableRow.classList.add("frgItem")

      category.innerHTML = item.category
      productNumber.innerHTML = item.product_number
      description.innerHTML = item.description

      tableRow.appendChild(category)
      tableRow.appendChild(productNumber)
      tableRow.appendChild(description)

      packageTable.appendChild(tableRow)
    });
  })

  wdSelect.addEventListener('change', async (e) => {
    const selectedOption = wdSelect[wdSelect.selectedIndex]
    const packageItems = await axios.get("/orderform/packageItems", {params: {packageId: selectedOption.value}})
    const packageTable = document.querySelector("#packageTable")
    const existingPackageItems = packageTable.querySelectorAll(".wdItem")

    existingPackageItems.forEach(pkgItem => {
      pkgItem.parentNode.removeChild(pkgItem);
    })

    Object.entries(packageItems.data.packageItems).forEach(pkgItem => {
      const item = pkgItem[1].item
      const tableRow = document.createElement("tr")
      const category = document.createElement("td")
      const productNumber = document.createElement("td")
      const description = document.createElement("td")

      tableRow.classList.add("wdItem")

      category.innerHTML = item.category
      productNumber.innerHTML = item.product_number
      description.innerHTML = item.description

      tableRow.appendChild(category)
      tableRow.appendChild(productNumber)
      tableRow.appendChild(description)

      packageTable.appendChild(tableRow)
    });
  })
})