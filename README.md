# Confundus 🧙‍♂️


## 🌀 Disclaimer
> This dashboard performs clean, linear arithmetic to make your project timeline look gorgeous on a slide. In reality, AI projects are chaotic cycles of prompt drift, hallucinated dependencies, API rate-limit tantrums, and midnight refactoring spirals. **If this estimate clashes with what the actual developers at your company are telling you... please listen to your devs.** They have to actually build the system, whereas this calculator is just a Confundus projection to keep stakeholders happy.

Learn more about the origin of the name [Confundus](https://harrypotter.fandom.com/wiki/Confundus_Charm).

---


### AI Project Cost & Time Estimator 

**Confundus** is a corporate-grade Project Feasibility & ROI Governance Dashboard designed for managers and engineering leads. It models developer review times, background AI generations, and API token constraints to predict the true cost, calendar duration, and team constraints of generative AI development pipelines.

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://rvigneshw.github.io/confundus/)

---

## 🔮 Core Features

*   **Prompt Caching Cost Modeling**: Supports modern API pricing features (assuming $85\%$ of iteration input tokens match the cached prefix for an $80\%$ discount on read volume), lowering total input bills to $32\%$ of standard rates.
*   **Hierarchical Preset Architectures**:
    *   **Scope & Complexity**: Dynamic presets (Low, Medium, High) that bind target Lines of Code (LOC), tokens per line, and revision cycles.
    *   **Model & API Profile**: Standard configurations for Claude 3 Opus, Claude 3.5 Sonnet, Claude 3.5 Haiku, GPT-4o, and GPT-4o Mini.
    *   **Resource & PM Benchmarks**: Standard profiles (Solo Developer, Standard Dev Team, Enterprise Agency) setting daily hours, allocation percentages, workweek days, and hourly rates.
*   **Dual Schedule & Timeline Simulations**:
    *   **Schedule Log**: Chronological breakdown detailing dev review, QA check blocks, and background AI runtime.
    *   **Interactive Gantt Calendar**: Visual workweek grid representing developer review hours vs overnight background AI runs.
*   **Governance & Risk Registry**: Adversarial auditing indicators checking feasibility boundaries like Context Window Limits, Revision Spirals, Rate Limit Throttling, and QA Safety Guards.
*   **What-If Scenario Matrix**: Side-by-side model comparison detailing how the active scope behaves across different LLM APIs.
*   **Shareable Configurations**: All inputs, toggles, accordions, and timeline views are fully serialized in the URL query string for instant link-sharing.

---



## 🛠️ Static Installation & Development
The project is built entirely as a static client-side web application with zero server-side dependencies.

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rvigneshw/confundus.git
   cd confundus
   ```
2. Open `index.html` directly in any web browser, or serve it locally:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

---

## ⚙️ Adding Presets & Custom Configuration

To make it easy for anyone to extend the estimator, all preset configurations have been decoupled from the application logic and placed in [presets.js](file:///c:/Projects/AIProjectCostEstimator/presets.js).

If you want to add new LLM models, custom project scope profiles, or team/resource presets to the repository, you can do so by modifying `presets.js`:

### Adding a Model Preset
Add a new key under `models` inside `presets.js`:
```javascript
models: {
    'your-new-model-key': {
        name: 'Model Display Name',
        tps: 80,             // Tokens Per Second
        inputPrice: 1.50,    // Price per 1 Million Input Tokens
        outputPrice: 6.00,   // Price per 1 Million Output Tokens
        contextSize: 20000   // Max Context Window Size
    },
    // ...
}
```

### Adding a Project Profile Preset
Add a new key under `projects` inside `presets.js`:
```javascript
projects: {
    'new-profile-key': {
        name: 'New Profile Display Name',
        loc: 25000,          // Target Lines of Code
        revisions: 10,       // Estimated revisions / iteration loops
        reviewTime: 20,      // Developer review time per revision (minutes)
        qaTime: 15,          // QA check block time (minutes)
        traditionalSpeed: 15 // Traditional developer velocity (LOC/hour)
    },
    // ...
}
```

### Adding a Resource Preset
Add a new key under `resources` inside `presets.js`:
```javascript
resources: {
    'new-resource-key': {
        name: 'Resource Profile Display Name',
        devRate: 85,          // Developer hourly billing rate ($)
        devHours: 8,          // Hours in a developer workday
        devAllocation: 50,    // Team allocation percentage (e.g. 50 = half time)
        workDays: 5,          // Work days per week (e.g. 5 = Mon-Fri)
        traditionalSpeed: 20, // Baseline developer speed (LOC/hour)
        bufferPercent: 15,    // Contingency buffer percentage (0-100)
        reviewTime: 15,       // Default review time per loop (minutes)
        qaTime: 10,           // Default QA check time per loop (minutes)
        asyncAi: true         // If true, AI background runs can happen overnight/weekends
    },
    // ...
}
```
All select dropdowns on the dashboard are populated dynamically from this config file, so your new preset will show up automatically across the UI.

