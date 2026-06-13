const fs = require("fs");
const path = require("path");

// Mock fetch for environments where it's not available (jsdom)
if (typeof globalThis.fetch === "undefined") {
  globalThis.fetch = async () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            ok: true,
            json: async () => ({ rates: {} }),
          }),
        0,
      ),
    );
}

// Create minimal DOM elements required by script.js at load time
document.body.innerHTML = `
  <input type="text" id="result" placeholder="0" disabled />
  <div id="word-result"></div>
  <div id="word-area"></div>
  <span id="copy-icon"></span>
  <div id="memoryIndicator"></div>
  <button id="speak-btn" disabled></button>
  <button id="theme-toggle"></button>
  <button id="redoBtn"></button>
  <div id="answer-preview"></div>
  <div id="history-list"></div>
  <div id="history-column"></div>
  <template id="history-empty-template"></template>
  <template id="history-item-template">
    <div class="history-item">
      <div class="history-item-expression"></div>
      <div class="history-item-words"></div>
      <div class="history-item-time"></div>
      <div class="remark-text"></div>
      <div class="remark-box"><input /><button class="btn-primary"></button><button class="btn-outline-secondary"></button></div>
      <button class="btn-delete"></button>
      <button class="btn-remark"></button>
    </div>
  </template>
  <button id="sin-btn"></button>
  <button id="cos-btn"></button>
  <button id="tan-btn"></button>
  <button id="sinh-btn"></button>
  <div id="age-calc-result"></div>
  <div id="length-result"></div>
  <div id="weight-result"></div>
  <div id="temp-result"></div>
  <div id="currency-result"></div>
  <div id="area-result"></div>
  <div id="data-result"></div>
  <div id="currency-timestamp"></div>
  <div id="example-result"></div>
  <div id="example-add"></div>
  <select id="from-length"><option value="km">km</option></select>
  <select id="to-length"><option value="mile">miles</option></select>
  <input type="number" id="length-value" value="1" />
  <select id="from-weight"><option value="kg">kg</option></select>
  <select id="to-weight"><option value="lb">pounds</option></select>
  <input type="number" id="weight-value" value="1" />
  <select id="from-temp"><option value="C">C</option></select>
  <select id="to-temp"><option value="F">F</option></select>
  <input type="number" id="temp-value" value="0" />
  <select id="from-currency"><option value="USD">USD</option></select>
  <select id="to-currency"><option value="EUR">EUR</option></select>
  <input type="number" id="currency-value" value="1" />
  <select id="from-area"><option value="sqm">m²</option></select>
  <select id="to-area"><option value="sqmile">mi²</option></select>
  <input type="number" id="area-value" value="1" />
  <select id="from-data"><option value="bit">bit</option></select>
  <select id="to-data"><option value="B">B</option></select>
  <input type="number" id="data-value" value="1" />
`;

// Read and execute the script so all global functions become available
const scriptPath = path.resolve(__dirname, "../assets/js/script.js");
const scriptContent = fs.readFileSync(scriptPath, "utf-8");
const scriptEl = document.createElement("script");
scriptEl.textContent = scriptContent;
document.body.appendChild(scriptEl);
