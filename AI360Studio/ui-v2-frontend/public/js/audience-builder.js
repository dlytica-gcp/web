const chooseOneSelect = document.getElementById("choose-one");
const segmentBuilder = document.querySelector(".segment-builder");

chooseOneSelect.addEventListener("change", () => {
    const selectedAttribute = chooseOneSelect.value;
    const newFilterRow = createFilterRow(selectedAttribute);
    segmentBuilder.appendChild(newFilterRow);
});

function createFilterRow(attribute) {
    const filterRow = document.createElement("div");
    filterRow.className = "segment-row";

    if (attribute === "customer_type") {
        filterRow.innerHTML = `
            <div class="filter-label">
                <label for="customer-type-operator">Customer Type:</label>
                <select id="customer-type-operator"class="select-choose-option-top">
                    <option value="equals">Equals</option>
                 
                </select>
            </div>
           
            <div class="filter-input">
                <select id="customer-type-value">
                   <option value="" disabled selected>Select Customer Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Legal">Legal</option>
                </select>
                   <button class="remove-filter">  <i class="fas fa-trash-alt"></i></button>
            </div>
                
        `;
    } else if (attribute === "gender") {
        filterRow.innerHTML = `
            <div class="filter-label">
                <label for="gender-operator">Gender:</label>
                <select id="gender-operator"class="select-choose-option-top">
                    <option value="equals">Equals</option>
                
                </select>
            </div>
            <div class="filter-input">
                <select id="gender-value">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                   <button class="remove-filter">  <i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    } else if (attribute === "customer_rating") {
        filterRow.innerHTML = `
            <div class="filter-label">
                <label for="customer-rating-operator">Customer Risk Rating:</label>
                <select id="customer-rating-operator"class="select-choose-option-top">
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not Equals</option>
                    <option value="greater_than">Greater Than</option>
                    <option value="less_than">Less Than</option>
                </select>
            </div>
            <div class="filter-input">
                 <select id="customer-rating-value">
                   <option value="" disabled selected>Select Customer Type</option>
                    <option value="Individual">Low</option>
                    <option value="Legal">Medium</option>
                    <option value="Legal">High</option>
                </select>
                 <button class="remove-filter"> <i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    } else if (attribute === "customer_status") {
        filterRow.innerHTML = `
            <div class="filter-label">
                <label for="customer-status-operator">Status:</label>
                <select id="customer-status-operator" class="select-choose-option-top">
                    <option value="equals">Equals</option>
                  
                </select>
            </div>
            <div class="filter-input">
                <select id="customer-status-value">
                    <option value=""disabled selected>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Dormant</option>
                </select>
                  <button class="remove-filter">  <i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    } else if (attribute === "customer_deposit") {
        filterRow.innerHTML = `
            <div class="filter-label">
                <label for="customer-deposit-operator">Average Deposit:</label>
                <select id="customer-deposit-operator" class="select-choose-option-top">
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not Equals</option>
                    <option value="greater_than">Greater Than</option>
                    <option value="less_than">Less Than</option>
                </select>
            </div>
            <div class="filter-input">
                <input type="number" id="customer-deposit-value" placeholder="Enter Average Deposit">
                    <button class="remove-filter">  <i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    }

    const removeButton = filterRow.querySelector(".remove-filter");
    removeButton.addEventListener("click", () => {
        filterRow.remove();
    });

    // Add logical operator select element after the first filter row
    if (segmentBuilder.childElementCount > 1) {
        const logicalOperatorSelect = document.createElement("select");
        logicalOperatorSelect.id = "logical-operator";
        logicalOperatorSelect.innerHTML = `
            <option value="and">And</option>
            <option value="or">Or</option>
        `;
        filterRow.insertBefore(logicalOperatorSelect, filterRow.firstChild);
    }

    return filterRow;
}