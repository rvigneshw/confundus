// State and Elements
const state = {
    loc: 10000,
    tokensPerLine: 20,
    tps: 50,
    codeRatio: 20, // percentage
    revisions: 10,
    reviewTime: 15, // minutes per revision
    inputPrice: 15.00, // per 1M tokens
    outputPrice: 75.00, // per 1M tokens
    contextSize: 10000, // base context per revision
    devHours: 6,
    devAllocation: 100, // percentage
    workDays: 5,
    asyncAi: true,
    currentPreset: 'opus',
    currentChart: 'tokens', // 'tokens' or 'costs'
    
    // Project Management & ROI Params
    devRate: 65,
    traditionalSpeed: 20,
    bufferPercent: 20,
    qaTime: 10,
    
    // Caching & Presets Params
    projectPreset: 'custom',
    promptCaching: true,
    timelineView: 'list',
    complexityLevel: 'medium',
    resourcePreset: 'solo',
    detailedPanelOpen: false,
    charmActive: false
};

// Model Preset Database
const presets = {
    opus: {
        name: 'Claude 3 Opus',
        tps: 50,
        inputPrice: 15.00,
        outputPrice: 75.00,
        contextSize: 10000
    },
    sonnet35: {
        name: 'Claude 3.5 Sonnet',
        tps: 85,
        inputPrice: 3.00,
        outputPrice: 15.00,
        contextSize: 15000
    },
    gpt4o: {
        name: 'GPT-4o',
        tps: 90,
        inputPrice: 5.00,
        outputPrice: 15.00,
        contextSize: 12000
    },
    'gemini-pro': {
        name: 'Gemini 1.5 Pro',
        tps: 60,
        inputPrice: 1.25,
        outputPrice: 5.00,
        contextSize: 20000
    },
    'gemini-flash': {
        name: 'Gemini 1.5 Flash',
        tps: 160,
        inputPrice: 0.075,
        outputPrice: 0.30,
        contextSize: 15000
    }
};

// DOM Elements
const elements = {
    presetSelect: document.getElementById('preset-select'),
    
    // LOC
    inputLoc: document.getElementById('input-loc'),
    numLoc: document.getElementById('num-loc'),
    
    // Tokens per Line
    inputTokensLine: document.getElementById('input-tokens-line'),
    numTokensLine: document.getElementById('num-tokens-line'),
    
    // Speed
    inputTps: document.getElementById('input-tps'),
    numTps: document.getElementById('num-tps'),
    
    // Code Ratio
    inputCodeRatio: document.getElementById('input-code-ratio'),
    numCodeRatio: document.getElementById('num-code-ratio'),
    
    // Complexity Revisions
    complexityGroup: document.getElementById('complexity-group'),
    customRevisionsWrapper: document.getElementById('custom-revisions-wrapper'),
    inputRevisions: document.getElementById('input-revisions'),
    numRevisions: document.getElementById('num-revisions'),
    
    // Review and Costs
    inputReviewTime: document.getElementById('input-review-time'),
    numReviewTime: document.getElementById('num-review-time'),
    numInputPrice: document.getElementById('num-input-price'),
    numOutputPrice: document.getElementById('num-output-price'),
    inputContextSize: document.getElementById('input-context-size'),
    numContextSize: document.getElementById('num-context-size'),
    
    // Human constraints
    inputDevHours: document.getElementById('input-dev-hours'),
    numDevHours: document.getElementById('num-dev-hours'),
    inputDevAllocation: document.getElementById('input-dev-allocation'),
    numDevAllocation: document.getElementById('num-dev-allocation'),
    inputWorkDays: document.getElementById('input-work-days'),
    numWorkDays: document.getElementById('num-work-days'),
    inputAsyncAi: document.getElementById('input-async-ai'),

    // Displays
    displayEta: document.getElementById('display-eta'),
    detailActiveTime: document.getElementById('detail-active-time'),
    detailGenerationTime: document.getElementById('detail-generation-time'),
    detailReviewTime: document.getElementById('detail-review-time'),
    
    displayCost: document.getElementById('display-cost'),
    detailInputCost: document.getElementById('detail-input-cost'),
    detailOutputCost: document.getElementById('detail-output-cost'),
    
    displayTokens: document.getElementById('display-tokens'),
    detailCodeTokens: document.getElementById('detail-code-tokens'),
    detailOverheadTokens: document.getElementById('detail-overhead-tokens'),
    
    // Charts and tabs
    btnChartTokens: document.getElementById('btn-chart-tokens'),
    btnChartCosts: document.getElementById('btn-chart-costs'),
    chartTokensContainer: document.getElementById('chart-tokens-container'),
    chartCostsContainer: document.getElementById('chart-costs-container'),
    svgTokenChart: document.getElementById('svg-token-chart'),
    svgCostChart: document.getElementById('svg-cost-chart'),
    
    // Pipeline elements
    pipeLoc: document.querySelector('.pipe-loc'),
    pipeCodeTokens: document.querySelector('.pipe-code-tokens'),
    pipeTotalTokens: document.querySelector('.pipe-total-tokens'),
    pipeGrandTokens: document.querySelector('.pipe-grand-tokens'),
    pipeEta: document.querySelector('.pipe-eta'),
    
    // Table
    comparisonTableBody: document.querySelector('#comparison-table tbody'),
    simulationTimeline: document.getElementById('simulation-timeline'),
    
    // Project Management Inputs
    inputDevRate: document.getElementById('input-dev-rate'),
    numDevRate: document.getElementById('num-dev-rate'),
    inputTraditionalSpeed: document.getElementById('input-traditional-speed'),
    numTraditionalSpeed: document.getElementById('num-traditional-speed'),
    inputBuffer: document.getElementById('input-buffer'),
    numBuffer: document.getElementById('num-buffer'),
    inputQaTime: document.getElementById('input-qa-time'),
    numQaTime: document.getElementById('num-qa-time'),
    
    // ROI Elements
    roiSavingsPercent: document.getElementById('roi-savings-percent'),
    roiTraditionalHours: document.getElementById('roi-traditional-hours'),
    roiTraditionalWeeks: document.getElementById('roi-traditional-weeks'),
    roiTraditionalCost: document.getElementById('roi-traditional-cost'),
    roiAiHours: document.getElementById('roi-ai-hours'),
    roiAiCalendar: document.getElementById('roi-ai-calendar'),
    roiAiCost: document.getElementById('roi-ai-cost'),
    roiAiDevCost: document.getElementById('roi-ai-dev-cost'),
    roiAiApiCost: document.getElementById('roi-ai-api-cost'),
    roiNetSavingsCost: document.getElementById('roi-net-savings-cost'),
    roiNetSavingsTime: document.getElementById('roi-net-savings-time'),
    
    // Risk Registry Elements
    riskBadgeContext: document.getElementById('risk-badge-context'),
    riskDescContext: document.getElementById('risk-desc-context'),
    riskBadgeSpiral: document.getElementById('risk-badge-spiral'),
    riskDescSpiral: document.getElementById('risk-desc-spiral'),
    riskBadgeThrottling: document.getElementById('risk-badge-throttling'),
    riskDescThrottling: document.getElementById('risk-desc-throttling'),
    riskBadgeQa: document.getElementById('risk-badge-qa'),
    riskDescQa: document.getElementById('risk-desc-qa'),
    
    // Project Presets & Caching Inputs
    projectPresetSelect: document.getElementById('project-preset-select'),
    inputPromptCaching: document.getElementById('input-prompt-caching'),
    
    // Timeline view tabs and Gantt container
    btnViewTimelineList: document.getElementById('btn-view-timeline-list'),
    btnViewTimelineGantt: document.getElementById('btn-view-timeline-gantt'),
    ganttChartContainer: document.getElementById('gantt-chart-container'),
    ganttGrid: document.getElementById('gantt-grid'),
    
    // Complexity & Accordion Elements
    complexityPresetGroup: document.getElementById('complexity-preset-group'),
    advancedToggle: document.getElementById('advanced-toggle'),
    advancedScaleContent: document.getElementById('advanced-scale-content'),
    
    // Model Accordion Elements
    modelToggle: document.getElementById('model-toggle'),
    advancedModelContent: document.getElementById('advanced-model-content'),
    
    // Resource Accordion & Preset select Elements
    resourcePresetSelect: document.getElementById('resource-preset-select'),
    resourceToggle: document.getElementById('resource-toggle'),
    advancedResourceContent: document.getElementById('advanced-resource-content'),
    
    // Bottom Detailed Audits toggle
    auditsToggle: document.getElementById('audits-toggle'),
    detailedAuditsPanel: document.getElementById('detailed-audits-panel'),
    
    // Buttons
    btnCopy: document.getElementById('btn-copy'),
    btnExport: document.getElementById('btn-export'),
    btnCopyLink: document.getElementById('btn-copy-link'),
    btnPrint: document.getElementById('btn-print'),
    btnCastCharm: document.getElementById('btn-cast-charm')
};

// Initialize Application
function init() {
    setupEventListeners();
    loadStateFromUrl();
    syncInputsFromState();
    
    // Apply charm mode UI if active from state
    if (state.charmActive) {
        document.body.classList.add('charm-overdrive');
    }
    
    calculate();
}

// Bind Inputs & Sliders
function setupEventListeners() {
    // Bi-directional bindings (slider <-> numeric input)
    setupBiDirectionalBinding(elements.inputLoc, elements.numLoc, 'loc', () => markCustomProjectPreset());
    setupBiDirectionalBinding(elements.inputTokensLine, elements.numTokensLine, 'tokensPerLine');
    setupBiDirectionalBinding(elements.inputTps, elements.numTps, 'tps', () => markCustomPreset());
    setupBiDirectionalBinding(elements.inputCodeRatio, elements.numCodeRatio, 'codeRatio', () => markCustomPreset());
    setupBiDirectionalBinding(elements.inputRevisions, elements.numRevisions, 'revisions', () => markCustomProjectPreset());
    setupBiDirectionalBinding(elements.inputReviewTime, elements.numReviewTime, 'reviewTime', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputContextSize, elements.numContextSize, 'contextSize', () => markCustomPreset());
    
    setupBiDirectionalBinding(elements.inputDevHours, elements.numDevHours, 'devHours', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputDevAllocation, elements.numDevAllocation, 'devAllocation', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputWorkDays, elements.numWorkDays, 'workDays', () => markCustomResourcePreset());
    
    setupBiDirectionalBinding(elements.inputDevRate, elements.numDevRate, 'devRate', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputTraditionalSpeed, elements.numTraditionalSpeed, 'traditionalSpeed', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputBuffer, elements.numBuffer, 'bufferPercent', () => markCustomResourcePreset());
    setupBiDirectionalBinding(elements.inputQaTime, elements.numQaTime, 'qaTime', () => markCustomResourcePreset());
    
    elements.inputAsyncAi.addEventListener('change', (e) => {
        state.asyncAi = e.target.checked;
        markCustomResourcePreset();
        calculate();
    });

    // Price fields (numeric only)
    elements.numInputPrice.addEventListener('input', (e) => {
        state.inputPrice = parseFloat(e.target.value) || 0;
        markCustomPreset();
        calculate();
    });
    
    elements.numOutputPrice.addEventListener('input', (e) => {
        state.outputPrice = parseFloat(e.target.value) || 0;
        markCustomPreset();
        calculate();
    });

    // Preset selection
    elements.presetSelect.addEventListener('change', (e) => {
        applyPreset(e.target.value);
        calculate();
    });

    // Accordion Toggle for Scale
    elements.advancedToggle.addEventListener('click', () => {
        const isVisible = elements.advancedScaleContent.style.display === 'flex' || elements.advancedScaleContent.style.display === 'block';
        if (isVisible) {
            elements.advancedScaleContent.style.display = 'none';
            elements.advancedToggle.classList.remove('active');
        } else {
            elements.advancedScaleContent.style.display = 'flex';
            elements.advancedToggle.classList.add('active');
        }
    });

    // Model Accordion Toggle
    elements.modelToggle.addEventListener('click', () => {
        const isVisible = elements.advancedModelContent.style.display === 'flex' || elements.advancedModelContent.style.display === 'block';
        if (isVisible) {
            elements.advancedModelContent.style.display = 'none';
            elements.modelToggle.classList.remove('active');
        } else {
            elements.advancedModelContent.style.display = 'flex';
            elements.modelToggle.classList.add('active');
        }
    });

    // Resource Accordion Toggle
    elements.resourceToggle.addEventListener('click', () => {
        const isVisible = elements.advancedResourceContent.style.display === 'flex' || elements.advancedResourceContent.style.display === 'block';
        if (isVisible) {
            elements.advancedResourceContent.style.display = 'none';
            elements.resourceToggle.classList.remove('active');
        } else {
            elements.advancedResourceContent.style.display = 'flex';
            elements.resourceToggle.classList.add('active');
        }
    });

    // Resource Preset Selector
    elements.resourcePresetSelect.addEventListener('change', (e) => {
        applyResourcePreset(e.target.value);
        calculate();
    });

    // Complexity Preset Buttons
    const compButtons = elements.complexityPresetGroup.querySelectorAll('button');
    compButtons.forEach(button => {
        button.addEventListener('click', () => {
            const complexity = button.getAttribute('data-complexity');
            applyComplexityPreset(complexity);
            calculate();
        });
    });

    // Chart Tabs
    elements.btnChartTokens.addEventListener('click', () => {
        elements.btnChartTokens.classList.add('active');
        elements.btnChartCosts.classList.remove('active');
        elements.chartTokensContainer.style.display = 'flex';
        elements.chartCostsContainer.style.display = 'none';
        state.currentChart = 'tokens';
        calculate();
    });

    elements.btnChartCosts.addEventListener('click', () => {
        elements.btnChartCosts.classList.add('active');
        elements.btnChartTokens.classList.remove('active');
        elements.chartCostsContainer.style.display = 'flex';
        elements.chartTokensContainer.style.display = 'none';
        state.currentChart = 'costs';
        calculate();
    });

    // Export Buttons
    elements.btnCopy.addEventListener('click', copySummaryReport);
    elements.btnExport.addEventListener('click', downloadCSV);
    if (elements.btnCopyLink) {
        elements.btnCopyLink.addEventListener('click', copyShareLink);
    }
    
    // Project Preset selector
    elements.projectPresetSelect.addEventListener('change', (e) => {
        applyProjectPreset(e.target.value);
        calculate();
    });
    
    // Prompt caching toggle
    elements.inputPromptCaching.addEventListener('change', (e) => {
        state.promptCaching = e.target.checked;
        markCustomPreset();
        calculate();
    });
    
    // Timeline Tabs event listeners
    elements.btnViewTimelineList.addEventListener('click', () => {
        elements.btnViewTimelineList.classList.add('active');
        elements.btnViewTimelineGantt.classList.remove('active');
        elements.simulationTimeline.style.display = 'block';
        elements.ganttChartContainer.style.display = 'none';
        state.timelineView = 'list';
        syncStateToUrl();
    });
    
    elements.btnViewTimelineGantt.addEventListener('click', () => {
        elements.btnViewTimelineGantt.classList.add('active');
        elements.btnViewTimelineList.classList.remove('active');
        elements.simulationTimeline.style.display = 'none';
        elements.ganttChartContainer.style.display = 'block';
        state.timelineView = 'gantt';
        syncStateToUrl();
    });

    // Bottom Detailed Audits toggler
    elements.auditsToggle.addEventListener('click', () => {
        state.detailedPanelOpen = !state.detailedPanelOpen;
        if (state.detailedPanelOpen) {
            elements.detailedAuditsPanel.style.display = 'flex';
            elements.auditsToggle.classList.add('active');
        } else {
            elements.detailedAuditsPanel.style.display = 'none';
            elements.auditsToggle.classList.remove('active');
        }
        syncStateToUrl();
    });

    // Print Report
    if (elements.btnPrint) {
        elements.btnPrint.addEventListener('click', () => {
            window.print();
        });
    }

    // Charm Mode Easter Egg
    if (elements.btnCastCharm) {
        elements.btnCastCharm.addEventListener('click', () => {
            state.charmActive = !state.charmActive;
            if (state.charmActive) {
                document.body.classList.add('charm-overdrive');
                showToast("✨ Confundus Charm Cast! Estimates padded by 15% to confuse stakeholders.");
            } else {
                document.body.classList.remove('charm-overdrive');
                showToast("Charm removed. Estimates back to normal.");
            }
            calculate();
        });
    }
}

// Utility to link range sliders with numeric inputs
function setupBiDirectionalBinding(slider, numField, stateKey, customCallback = null) {
    const update = (value) => {
        let val = parseFloat(value);
        if (isNaN(val)) return;
        
        // Boundaries checks
        const min = parseFloat(numField.min);
        const max = parseFloat(numField.max);
        if (val < min) val = min;
        if (val > max) val = max;
        
        state[stateKey] = val;
        slider.value = val;
        numField.value = val;
        
        if (customCallback) customCallback();
        calculate();
    };

    slider.addEventListener('input', (e) => update(e.target.value));
    numField.addEventListener('change', (e) => update(e.target.value));
}

// Apply Selected Model Preset
function applyPreset(presetKey) {
    if (presetKey === 'custom') return;
    
    const preset = presets[presetKey];
    if (!preset) return;
    
    state.currentPreset = presetKey;
    state.tps = preset.tps;
    state.inputPrice = preset.inputPrice;
    state.outputPrice = preset.outputPrice;
    state.contextSize = preset.contextSize;
    
    // Update inputs
    elements.inputTps.value = preset.tps;
    elements.numTps.value = preset.tps;
    
    elements.numInputPrice.value = preset.inputPrice.toFixed(2);
    elements.numOutputPrice.value = preset.outputPrice.toFixed(2);
    
    elements.inputContextSize.value = preset.contextSize;
    elements.numContextSize.value = preset.contextSize;
    
    elements.presetSelect.value = presetKey;
}

// Apply Selected Project Type Preset
function applyProjectPreset(key) {
    if (key === 'custom') return;
    
    const projectPresets = {
        script: { loc: 1000, revisions: 2, reviewTime: 10, qaTime: 5, traditionalSpeed: 35 },
        feature: { loc: 5000, revisions: 5, reviewTime: 15, qaTime: 10, traditionalSpeed: 25 },
        service: { loc: 15000, revisions: 8, reviewTime: 20, qaTime: 15, traditionalSpeed: 18 },
        dashboard: { loc: 30000, revisions: 12, reviewTime: 25, qaTime: 20, traditionalSpeed: 12 },
        monolith: { loc: 80000, revisions: 18, reviewTime: 30, qaTime: 25, traditionalSpeed: 6 }
    };
    
    const spec = projectPresets[key];
    if (!spec) return;
    
    state.projectPreset = key;
    state.loc = spec.loc;
    state.revisions = spec.revisions;
    state.reviewTime = spec.reviewTime;
    state.qaTime = spec.qaTime;
    state.traditionalSpeed = spec.traditionalSpeed;
    
    // Automatically set the complexity level to match this preset config size
    if (spec.loc <= 1000) state.complexityLevel = 'low';
    else if (spec.loc <= 15000) state.complexityLevel = 'medium';
    else state.complexityLevel = 'high';
    
    syncInputsFromState();
}

function applyComplexityPreset(level) {
    state.complexityLevel = level;
    
    if (level === 'custom') {
        elements.advancedScaleContent.style.display = 'flex';
        elements.advancedToggle.classList.add('active');
        return;
    }
    
    const levels = {
        low: { loc: 1000, tokensPerLine: 15, revisions: 2 },
        medium: { loc: 10000, tokensPerLine: 20, revisions: 5 },
        high: { loc: 50000, tokensPerLine: 20, revisions: 12 }
    };
    
    const spec = levels[level];
    if (!spec) return;
    
    state.loc = spec.loc;
    state.tokensPerLine = spec.tokensPerLine;
    state.revisions = spec.revisions;
    
    syncInputsFromState();
}

function markCustomProjectPreset() {
    state.projectPreset = 'custom';
    elements.projectPresetSelect.value = 'custom';
    state.complexityLevel = 'custom';
    
    elements.advancedScaleContent.style.display = 'flex';
    elements.advancedToggle.classList.add('active');
}

// Switch Preset status to 'Custom' if user modifies static preset parameters
function markCustomPreset() {
    state.currentPreset = 'custom';
    elements.presetSelect.value = 'custom';
    
    elements.advancedModelContent.style.display = 'flex';
    elements.modelToggle.classList.add('active');
}

function markCustomResourcePreset() {
    state.resourcePreset = 'custom';
    elements.resourcePresetSelect.value = 'custom';
    
    elements.advancedResourceContent.style.display = 'flex';
    elements.resourceToggle.classList.add('active');
}

// Apply Selected Resource Profile Preset
function applyResourcePreset(key) {
    if (key === 'custom') return;
    
    const resourcePresets = {
        solo: { devRate: 65, devHours: 6, devAllocation: 100, workDays: 5, traditionalSpeed: 20, bufferPercent: 20, reviewTime: 15, qaTime: 10, asyncAi: true },
        team: { devRate: 90, devHours: 8, devAllocation: 50, workDays: 5, traditionalSpeed: 25, bufferPercent: 15, reviewTime: 20, qaTime: 15, asyncAi: true },
        agency: { devRate: 125, devHours: 8, devAllocation: 25, workDays: 5, traditionalSpeed: 15, bufferPercent: 25, reviewTime: 30, qaTime: 20, asyncAi: true }
    };
    
    const spec = resourcePresets[key];
    if (!spec) return;
    
    state.resourcePreset = key;
    state.devRate = spec.devRate;
    state.devHours = spec.devHours;
    state.devAllocation = spec.devAllocation;
    state.workDays = spec.workDays;
    state.traditionalSpeed = spec.traditionalSpeed;
    state.bufferPercent = spec.bufferPercent;
    state.reviewTime = spec.reviewTime;
    state.qaTime = spec.qaTime;
    state.asyncAi = spec.asyncAi;
    
    syncInputsFromState();
}

// Timeline Simulation Algorithm
function simulateCalendarDays(revisions, reviewTimeMins, outputTokensPerRev, tps, devHours, devAllocation, asyncAi) {
    const projectHoursPerDay = devHours * (devAllocation / 100);
    const reviewHours = reviewTimeMins / 60;
    const genHours = outputTokensPerRev / (tps * 3600);
    
    let currentDay = 0;
    let currentHourInDay = 0; // Hours since start of workday
    
    const timeline = [];
    
    for (let r = 0; r < revisions; r++) {
        const step = {
            revision: r + 1,
            devStartDay: currentDay,
            devStartHour: currentHourInDay,
            devEndDay: currentDay,
            devEndHour: currentHourInDay,
            aiStartDay: currentDay,
            aiStartHour: currentHourInDay,
            aiEndDay: currentDay,
            aiEndHour: currentHourInDay,
            runsOvernight: false
        };
        
        if (asyncAi) {
            // Dev review starts (must be inside working hours)
            if (currentHourInDay >= projectHoursPerDay) {
                currentDay++;
                currentHourInDay = 0;
            }
            
            step.devStartDay = currentDay;
            step.devStartHour = currentHourInDay;
            
            currentHourInDay += reviewHours;
            if (currentHourInDay > projectHoursPerDay) {
                currentDay += Math.floor(currentHourInDay / projectHoursPerDay);
                currentHourInDay = currentHourInDay % projectHoursPerDay;
            }
            
            step.devEndDay = currentDay;
            step.devEndHour = currentHourInDay;
            
            // AI generation starts (runs 24/7 in the background)
            step.aiStartDay = currentDay;
            step.aiStartHour = currentHourInDay;
            
            currentHourInDay += genHours;
            if (currentHourInDay > projectHoursPerDay) {
                step.runsOvernight = true;
            }
            
            if (currentHourInDay >= 24) {
                currentDay += Math.floor(currentHourInDay / 24);
                currentHourInDay = currentHourInDay % 24;
            }
            
            step.aiEndDay = currentDay;
            step.aiEndHour = currentHourInDay;
            
            // If the generation completes after the developer's work hours,
            // the developer cannot review it until the next day's workday starts.
            if (currentHourInDay >= projectHoursPerDay) {
                currentDay++;
                currentHourInDay = 0;
            }
        } else {
            // AI runs only during developer's project hours (blocks working hours)
            step.devStartDay = currentDay;
            step.devStartHour = currentHourInDay;
            
            currentHourInDay += reviewHours;
            if (currentHourInDay > projectHoursPerDay) {
                currentDay += Math.floor(currentHourInDay / projectHoursPerDay);
                currentHourInDay = currentHourInDay % projectHoursPerDay;
            }
            step.devEndDay = currentDay;
            step.devEndHour = currentHourInDay;
            
            step.aiStartDay = currentDay;
            step.aiStartHour = currentHourInDay;
            
            currentHourInDay += genHours;
            if (currentHourInDay > projectHoursPerDay) {
                currentDay += Math.floor(currentHourInDay / projectHoursPerDay);
                currentHourInDay = currentHourInDay % projectHoursPerDay;
            }
            step.aiEndDay = currentDay;
            step.aiEndHour = currentHourInDay;
        }
        
        timeline.push(step);
    }
    
    const totalDays = currentDay + (currentHourInDay / projectHoursPerDay);
    return {
        totalDays: Math.max(0.1, totalDays),
        timeline: timeline
    };
}

// Calculations Engine
function calculate() {
    // 1. Output Token Calculations
    const targetCodeTokens = state.loc * state.tokensPerLine;
    const outputTokensPerRevision = targetCodeTokens / (state.codeRatio / 100);
    const totalOutputTokens = outputTokensPerRevision * state.revisions;
    
    // 2. Input Token Calculations (Modeling context code accumulation per revision)
    // Formula: Sum(r=0 to revs-1) of (contextSize + r * targetCodeTokens)
    // Resulting closed form: revisions * contextSize + (revisions * (revisions - 1) / 2) * targetCodeTokens
    const totalInputTokens = (state.revisions * state.contextSize) + 
                             ((state.revisions * (state.revisions - 1)) / 2) * targetCodeTokens;
    
    // 3. Time Calculations & Buffer
    let bufferMultiplier = 1 + (state.bufferPercent / 100);
    if (state.charmActive) {
        bufferMultiplier += 0.15; // 15% extra padding for the charm
    }
    const reviewTimeSeconds = state.revisions * (state.reviewTime + state.qaTime) * 60 * bufferMultiplier;
    const generationTimeSeconds = (totalOutputTokens / state.tps) * bufferMultiplier;
    const totalTimeSeconds = generationTimeSeconds + reviewTimeSeconds;
    
    // 4. Calendar Timeline Simulation
    const simResult = simulateCalendarDays(
        state.revisions, 
        state.reviewTime + state.qaTime, 
        outputTokensPerRevision, 
        state.tps, 
        state.devHours, 
        state.devAllocation, 
        state.asyncAi
    );
    const calendarDays = simResult.totalDays * bufferMultiplier;
    const weeks = calendarDays / state.workDays;
    
    // 5. Cost Calculations (including Prompt Caching logic)
    let inputCost;
    if (state.promptCaching) {
        const cachedInputTokens = totalInputTokens * 0.85;
        const nonCachedInputTokens = totalInputTokens * 0.15;
        const cachedCost = (cachedInputTokens / 1000000) * (state.inputPrice * 0.20);
        const nonCachedCost = (nonCachedInputTokens / 1000000) * state.inputPrice;
        inputCost = cachedCost + nonCachedCost;
    } else {
        inputCost = (totalInputTokens / 1000000) * state.inputPrice;
    }
    const outputCost = (totalOutputTokens / 1000000) * state.outputPrice;
    const totalCost = inputCost + outputCost;

    // 6. Update Metrics Displays with Animation
    animateValue(elements.displayEta, parseFloat(elements.displayEta.innerText) || 0, calendarDays, 600, val => `${val.toFixed(1)} Days`);
    elements.detailActiveTime.innerText = formatDuration(totalTimeSeconds);
    elements.detailGenerationTime.innerText = formatDuration(generationTimeSeconds);
    elements.detailReviewTime.innerText = formatDuration(reviewTimeSeconds);
    
    animateValue(elements.displayCost, parseFloat((elements.displayCost.innerText || '').replace(/[^0-9.-]+/g, "")) || 0, totalCost, 600, val => formatCurrency(val));
    elements.detailInputCost.innerText = formatCurrency(inputCost);
    elements.detailOutputCost.innerText = formatCurrency(outputCost);
    
    // Parse M or k for token animations if possible, fallback to re-rendering
    animateValue(elements.displayTokens, 0, totalOutputTokens, 600, val => formatTokens(val));
    elements.detailCodeTokens.innerText = formatTokens(targetCodeTokens * state.revisions);
    elements.detailOverheadTokens.innerText = formatTokens(totalOutputTokens - (targetCodeTokens * state.revisions));

    // 7. ROI & Cost-Benefit Calculations
    const traditionalHours = state.loc / state.traditionalSpeed;
    const traditionalCost = traditionalHours * state.devRate;
    
    // AI Developer effort: Review + QA times + prompt overhead with buffer
    const aiDevHours = (state.revisions * (state.reviewTime + state.qaTime) / 60) * bufferMultiplier;
    const aiDevCost = aiDevHours * state.devRate;
    const totalAiAssistedCost = aiDevCost + totalCost;
    
    const costSavings = traditionalCost - totalAiAssistedCost;
    const timeSavings = traditionalHours - aiDevHours;
    const savingsPercent = Math.max(0, Math.min(99, (costSavings / traditionalCost) * 100));

    // Update ROI card
    elements.roiSavingsPercent.innerText = `Saves ${Math.round(savingsPercent)}%`;
    elements.roiTraditionalHours.innerText = `${Math.round(traditionalHours)} Hours`;
    elements.roiTraditionalWeeks.innerText = `${(traditionalHours / 40).toFixed(1)} Weeks (40h/wk)`;
    elements.roiTraditionalCost.innerText = formatCurrency(traditionalCost);
    
    elements.roiAiHours.innerText = `${aiDevHours.toFixed(1)} Hours`;
    elements.roiAiCalendar.innerText = `${calendarDays.toFixed(1)} Days (with buffer)`;
    elements.roiAiCost.innerText = formatCurrency(totalAiAssistedCost);
    elements.roiAiDevCost.innerText = formatCurrency(aiDevCost);
    elements.roiAiApiCost.innerText = formatCurrency(totalCost);
    
    elements.roiNetSavingsCost.innerText = formatCurrency(costSavings);
    elements.roiNetSavingsTime.innerText = `${timeSavings.toFixed(1)} Hours (${(timeSavings / 8).toFixed(1)} Dev Days)`;

    // 8. Update Risk & Feasibility Registry
    // 8.1 Context Limit Risk
    const maxRevisionCodeTokens = (state.revisions - 1) * targetCodeTokens;
    const maxContextRead = state.contextSize + maxRevisionCodeTokens;
    let contextRiskBadge = "Low Risk";
    let contextRiskClass = "badge-green";
    let contextRiskDesc = "Code base size fits comfortably within the model's active window.";
    
    if (maxContextRead > 200000) {
        contextRiskBadge = "High Risk";
        contextRiskClass = "badge-red";
        contextRiskDesc = `Base codebase of ${formatTokens(maxContextRead)} exceeds 200k. High risk of model forgetting structure or failing compile loops.`;
    } else if (maxContextRead > 80000) {
        contextRiskBadge = "Medium Risk";
        contextRiskClass = "badge-yellow";
        contextRiskDesc = `Base codebase of ${formatTokens(maxContextRead)} is substantial. May cause prompt dilution or higher API latency.`;
    }
    
    elements.riskBadgeContext.innerText = contextRiskBadge;
    elements.riskBadgeContext.className = `risk-badge ${contextRiskClass}`;
    elements.riskDescContext.innerText = contextRiskDesc;
    
    // 8.2 Revision Spiral Risk
    let spiralRiskBadge = "Low Risk";
    let spiralRiskClass = "badge-green";
    let spiralRiskDesc = "Iterative revisions are a natural byproduct of building complex systems. Low cycle count minimizes prompt drift risk.";
    
    if (state.revisions >= 12 && state.codeRatio <= 15) {
        spiralRiskBadge = "High Risk";
        spiralRiskClass = "badge-red";
        spiralRiskDesc = `Iterative loops (${state.revisions} revs) are a natural byproduct of complex systems that AI cannot oneshot. However, low code ratio (${state.codeRatio}%) significantly elevates prompt drift and regression risks.`;
    } else if (state.revisions >= 8) {
        spiralRiskBadge = "Medium Risk";
        spiralRiskClass = "badge-yellow";
        spiralRiskDesc = `Multiple revisions (${state.revisions}) are expected when building complex systems that AI cannot oneshot. Establish a clear baseline checklist to prevent regression.`;
    }
    
    elements.riskBadgeSpiral.innerText = spiralRiskBadge;
    elements.riskBadgeSpiral.className = `risk-badge ${spiralRiskClass}`;
    elements.riskDescSpiral.innerText = spiralRiskDesc;
    
    // 8.3 Rate Limit Throttling Risk
    let throttlingRiskBadge = "Low Risk";
    let throttlingRiskClass = "badge-green";
    let throttlingRiskDesc = "Model speed (TPS) and request frequency are well within typical API tier limits.";
    
    if (state.tps >= 100 || totalOutputTokens > 4000000) {
        throttlingRiskBadge = "High Risk";
        throttlingRiskClass = "badge-red";
        throttlingRiskDesc = `Very high throughput demand (${state.tps} TPS / ${formatTokens(totalOutputTokens)} total). Subject to API tokens-per-minute (TPM) limits.`;
    } else if (state.tps >= 65 || totalOutputTokens > 1500000) {
        throttlingRiskBadge = "Medium Risk";
        throttlingRiskClass = "badge-yellow";
        throttlingRiskDesc = `Moderate volume demands. Standard developers account tier might hit temporary rate limits during peak usage.`;
    }
    
    elements.riskBadgeThrottling.innerText = throttlingRiskBadge;
    elements.riskBadgeThrottling.className = `risk-badge ${throttlingRiskClass}`;
    elements.riskDescThrottling.innerText = throttlingRiskDesc;
    
    // 8.4 QA & Integrity Guard Risk
    let qaRiskBadge = "Safe Guard";
    let qaRiskClass = "badge-green";
    let qaRiskDesc = "Dedicated QA testing time per revision ensures early bug catching and robust compilation loops.";
    
    if (state.qaTime === 0) {
        qaRiskBadge = "No Guard";
        qaRiskClass = "badge-red";
        qaRiskDesc = "QA verification time is set to 0. High probability of buggy code merges and regression cycles.";
    } else if (state.qaTime < 10) {
        qaRiskBadge = "Light Guard";
        qaRiskClass = "badge-yellow";
        qaRiskDesc = "Brief testing checks allocated. Minor logic bugs or edge-cases might slip past validation.";
    }
    
    elements.riskBadgeQa.innerText = qaRiskBadge;
    elements.riskBadgeQa.className = `risk-badge ${qaRiskClass}`;
    elements.riskDescQa.innerText = qaRiskDesc;

    // 9. Update Pipeline Displays
    elements.pipeLoc.innerText = state.loc.toLocaleString();
    elements.pipeCodeTokens.innerText = formatTokens(targetCodeTokens);
    elements.pipeTotalTokens.innerText = formatTokens(outputTokensPerRevision) + "/rev";
    elements.pipeGrandTokens.innerText = formatTokens(totalOutputTokens);
    elements.pipeEta.innerText = `${calendarDays.toFixed(1)} Days`;

    // 10. Render Charts
    renderCharts(targetCodeTokens * state.revisions, totalOutputTokens, inputCost, outputCost);
    
    // 11. Render Table
    renderComparisonTable(totalCost, totalTimeSeconds);
    
    // 12. Render Simulation Timeline list
    renderTimelineList(simResult.timeline, targetCodeTokens, outputTokensPerRevision, state.inputPrice, state.outputPrice);
    
    // 12.1 Render Gantt Chart Calendar
    renderGanttGrid(simResult.timeline, state.devHours * (state.devAllocation / 100));
    
    // 13. Sync State to URL
    syncStateToUrl();
}

// Format Helpers
function formatDuration(seconds) {
    if (seconds === 0) return '0m';
    
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.round((seconds % 3600) / 60);
    
    let parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0 || d > 0) parts.push(`${h}h`);
    parts.push(`${m}m`);
    
    return parts.join(' ');
}

function formatCurrency(val) {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTokens(val) {
    if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
    } else if (val >= 1000) {
        return (val / 1000).toFixed(0) + 'k';
    }
    return val.toString();
}

// Chart Rendering Engine (Vanilla SVG)
function renderCharts(codeTokens, totalOutputTokens, inputCost, outputCost) {
    if (state.currentChart === 'tokens') {
        const svg = elements.svgTokenChart;
        svg.innerHTML = '';
        
        const overheadTokens = totalOutputTokens - codeTokens;
        const total = totalOutputTokens;
        
        const codePercent = total > 0 ? (codeTokens / total) * 100 : 0;
        const overheadPercent = total > 0 ? (overheadTokens / total) * 100 : 0;
        
        // Donut parameters
        const cx = 140;
        const cy = 120;
        const r = 70;
        const circumference = 2 * Math.PI * r;
        
        // Code Arc
        const strokeDashCode = (codePercent / 100) * circumference;
        // Overhead Arc
        const strokeDashOverhead = (overheadPercent / 100) * circumference;
        
        // Create SVGs
        const codeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        codeCircle.setAttribute('cx', cx);
        codeCircle.setAttribute('cy', cy);
        codeCircle.setAttribute('r', r);
        codeCircle.setAttribute('fill', 'transparent');
        codeCircle.setAttribute('stroke', 'var(--accent-emerald)');
        codeCircle.setAttribute('stroke-width', '18');
        codeCircle.setAttribute('stroke-dasharray', `${strokeDashCode} ${circumference}`);
        codeCircle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
        codeCircle.setAttribute('stroke-linecap', 'round');
        
        const codeTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        codeTitle.textContent = `Code Generation: ${formatTokens(codeTokens)}`;
        codeCircle.appendChild(codeTitle);
        
        const overheadCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        overheadCircle.setAttribute('cx', cx);
        overheadCircle.setAttribute('cy', cy);
        overheadCircle.setAttribute('r', r);
        overheadCircle.setAttribute('fill', 'transparent');
        overheadCircle.setAttribute('stroke', 'var(--accent-purple)');
        overheadCircle.setAttribute('stroke-width', '18');
        overheadCircle.setAttribute('stroke-dasharray', `${strokeDashOverhead} ${circumference}`);
        // Offset rotation to align right after code circle
        const angleOffset = (codePercent / 100) * 360 - 90;
        overheadCircle.setAttribute('transform', `rotate(${angleOffset} ${cx} ${cy})`);
        overheadCircle.setAttribute('stroke-linecap', 'round');
        
        const overheadTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        overheadTitle.textContent = `Overhead/Drafts: ${formatTokens(overheadTokens)}`;
        overheadCircle.appendChild(overheadTitle);

        // Text inside donut
        const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText.setAttribute('x', cx);
        centerText.setAttribute('y', cy + 5);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.setAttribute('fill', '#fff');
        centerText.setAttribute('font-size', '14');
        centerText.setAttribute('font-weight', '700');
        centerText.textContent = `${Math.round(codePercent)}% Code`;
        
        // Legends
        const legendX = 260;
        const drawLegendItem = (y, color, label, amount) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', legendX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', '12');
            rect.setAttribute('height', '12');
            rect.setAttribute('rx', '2');
            rect.setAttribute('fill', color);
            
            const textLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textLabel.setAttribute('x', legendX + 20);
            textLabel.setAttribute('y', y + 10);
            textLabel.setAttribute('fill', 'var(--text-secondary)');
            textLabel.setAttribute('font-size', '11');
            textLabel.textContent = label;
            
            const textAmount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textAmount.setAttribute('x', legendX + 20);
            textAmount.setAttribute('y', y + 25);
            textAmount.setAttribute('fill', '#fff');
            textAmount.setAttribute('font-size', '12');
            textAmount.setAttribute('font-weight', '600');
            textAmount.textContent = amount;
            
            svg.appendChild(rect);
            svg.appendChild(textLabel);
            svg.appendChild(textAmount);
        };
        
        svg.appendChild(codeCircle);
        svg.appendChild(overheadCircle);
        svg.appendChild(centerText);
        
        drawLegendItem(70, 'var(--accent-emerald)', 'Code Tokens', formatTokens(codeTokens));
        drawLegendItem(130, 'var(--accent-purple)', 'AI Overhead', formatTokens(overheadTokens));
        
    } else {
        // Cost Breakdown Stacked Chart
        const svg = elements.svgCostChart;
        svg.innerHTML = '';
        
        const total = inputCost + outputCost;
        const inputPercent = total > 0 ? (inputCost / total) * 100 : 0;
        const outputPercent = total > 0 ? (outputCost / total) * 100 : 0;
        
        const cx = 140;
        const cy = 120;
        const r = 70;
        const circumference = 2 * Math.PI * r;
        
        const strokeDashIn = (inputPercent / 100) * circumference;
        const strokeDashOut = (outputPercent / 100) * circumference;
        
        const inputCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        inputCircle.setAttribute('cx', cx);
        inputCircle.setAttribute('cy', cy);
        inputCircle.setAttribute('r', r);
        inputCircle.setAttribute('fill', 'transparent');
        inputCircle.setAttribute('stroke', 'var(--accent-cyan)');
        inputCircle.setAttribute('stroke-width', '18');
        inputCircle.setAttribute('stroke-dasharray', `${strokeDashIn} ${circumference}`);
        inputCircle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
        inputCircle.setAttribute('stroke-linecap', 'round');
        
        const inputTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        inputTitle.textContent = `Input API Cost: ${formatCurrency(inputCost)}`;
        inputCircle.appendChild(inputTitle);
        
        const outputCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outputCircle.setAttribute('cx', cx);
        outputCircle.setAttribute('cy', cy);
        outputCircle.setAttribute('r', r);
        outputCircle.setAttribute('fill', 'transparent');
        outputCircle.setAttribute('stroke', 'var(--accent-purple)');
        outputCircle.setAttribute('stroke-width', '18');
        outputCircle.setAttribute('stroke-dasharray', `${strokeDashOut} ${circumference}`);
        const angleOffset = (inputPercent / 100) * 360 - 90;
        outputCircle.setAttribute('transform', `rotate(${angleOffset} ${cx} ${cy})`);
        outputCircle.setAttribute('stroke-linecap', 'round');
        
        const outputTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        outputTitle.textContent = `Output API Cost: ${formatCurrency(outputCost)}`;
        outputCircle.appendChild(outputTitle);
        
        const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText.setAttribute('x', cx);
        centerText.setAttribute('y', cy + 5);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.setAttribute('fill', '#fff');
        centerText.setAttribute('font-size', '14');
        centerText.setAttribute('font-weight', '700');
        centerText.textContent = `${Math.round(outputPercent)}% Out`;
        
        const legendX = 260;
        const drawLegendItem = (y, color, label, amount) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', legendX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', '12');
            rect.setAttribute('height', '12');
            rect.setAttribute('rx', '2');
            rect.setAttribute('fill', color);
            
            const textLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textLabel.setAttribute('x', legendX + 20);
            textLabel.setAttribute('y', y + 10);
            textLabel.setAttribute('fill', 'var(--text-secondary)');
            textLabel.setAttribute('font-size', '11');
            textLabel.textContent = label;
            
            const textAmount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textAmount.setAttribute('x', legendX + 20);
            textAmount.setAttribute('y', y + 25);
            textAmount.setAttribute('fill', '#fff');
            textAmount.setAttribute('font-size', '12');
            textAmount.setAttribute('font-weight', '600');
            textAmount.textContent = amount;
            
            svg.appendChild(rect);
            svg.appendChild(textLabel);
            svg.appendChild(textAmount);
        };
        
        svg.appendChild(inputCircle);
        svg.appendChild(outputCircle);
        svg.appendChild(centerText);
        
        drawLegendItem(70, 'var(--accent-cyan)', 'Input API Cost', formatCurrency(inputCost));
        drawLegendItem(130, 'var(--accent-purple)', 'Output API Cost', formatCurrency(outputCost));
    }
}

// Render Comparison Table
function renderComparisonTable(currentCustomCost, currentCustomTime) {
    const tbody = elements.comparisonTableBody;
    tbody.innerHTML = '';
    
    // Dynamic generation parameters
    const targetCodeTokens = state.loc * state.tokensPerLine;
    const outputTokensPerRevision = targetCodeTokens / (state.codeRatio / 100);
    const totalOutputTokens = outputTokensPerRevision * state.revisions;
    const totalInputTokens = (state.revisions * state.contextSize) + 
                             ((state.revisions * (state.revisions - 1)) / 2) * targetCodeTokens;
    
    // Add current Custom config to the presets lists for visual comparison
    const extendedPresets = { ...presets };
    
    // Build rows
    Object.keys(extendedPresets).forEach(key => {
        const model = extendedPresets[key];
        const isCurrentActive = state.currentPreset === key;
        
        // Calculations for this model
        let modelInputCost;
        if (state.promptCaching) {
            const cachedInput = totalInputTokens * 0.85;
            const nonCachedInput = totalInputTokens * 0.15;
            modelInputCost = (cachedInput / 1000000) * (model.inputPrice * 0.20) + 
                             (nonCachedInput / 1000000) * model.inputPrice;
        } else {
            modelInputCost = (totalInputTokens / 1000000) * model.inputPrice;
        }
        const modelOutputCost = (totalOutputTokens / 1000000) * model.outputPrice;
        const modelTotalCost = modelInputCost + modelOutputCost;
        
        const modelCalendarDays = simulateCalendarDays(
            state.revisions,
            state.reviewTime + state.qaTime,
            outputTokensPerRevision,
            model.tps,
            state.devHours,
            state.devAllocation,
            state.asyncAi
        ).totalDays * (1 + (state.bufferPercent / 100));
        
        const row = document.createElement('tr');
        
        // Highlight active model
        const nameColumn = isCurrentActive 
            ? `<td><span class="model-pill model-current">Active</span><strong>${model.name}</strong></td>`
            : `<td><strong>${model.name}</strong></td>`;
            
        // Delta comparisons
        let costDiffText = '';
        if (!isCurrentActive) {
            const diff = currentCustomCost - modelTotalCost;
            if (diff > 0) {
                costDiffText = `<div class="diff-saving">Saves ${formatCurrency(diff)}</div>`;
            } else if (diff < 0) {
                costDiffText = `<div class="diff-costlier">+${formatCurrency(Math.abs(diff))}</div>`;
            }
        }
        
        row.innerHTML = `
            ${nameColumn}
            <td>${model.tps} tps</td>
            <td>$${model.inputPrice.toFixed(2)} / $${model.outputPrice.toFixed(2)}</td>
            <td>${modelCalendarDays.toFixed(1)} Days</td>
            <td>
                <strong>${formatCurrency(modelTotalCost)}</strong>
                ${costDiffText}
            </td>
            <td>
                ${isCurrentActive ? '—' : `<button class="btn-mini" onclick="applyPresetAndCalculate('${key}')">Apply Preset</button>`}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Global hook for apply buttons in the table
window.applyPresetAndCalculate = function(presetKey) {
    applyPreset(presetKey);
    calculate();
};

// Summary report generation
function generateReportMarkdown() {
    const targetCodeTokens = state.loc * state.tokensPerLine;
    const outputTokensPerRevision = targetCodeTokens / (state.codeRatio / 100);
    const totalOutputTokens = outputTokensPerRevision * state.revisions;
    const totalInputTokens = (state.revisions * state.contextSize) + 
                             ((state.revisions * (state.revisions - 1)) / 2) * targetCodeTokens;
    const bufferMultiplier = 1 + (state.bufferPercent / 100);
    const reviewTimeSeconds = state.revisions * (state.reviewTime + state.qaTime) * 60 * bufferMultiplier;
    const generationTimeSeconds = (totalOutputTokens / state.tps) * bufferMultiplier;
    const totalTimeSeconds = generationTimeSeconds + reviewTimeSeconds;
    
    let inputCost;
    if (state.promptCaching) {
        const cachedInput = totalInputTokens * 0.85;
        const nonCachedInput = totalInputTokens * 0.15;
        inputCost = (cachedInput / 1000000) * (state.inputPrice * 0.20) + 
                    (nonCachedInput / 1000000) * state.inputPrice;
    } else {
        inputCost = (totalInputTokens / 1000000) * state.inputPrice;
    }
    const outputCost = (totalOutputTokens / 1000000) * state.outputPrice;
    const totalCost = inputCost + outputCost;
    
    const calendarDays = simulateCalendarDays(
        state.revisions,
        state.reviewTime + state.qaTime,
        outputTokensPerRevision,
        state.tps,
        state.devHours,
        state.devAllocation,
        state.asyncAi
    ).totalDays * bufferMultiplier;
    const weeks = calendarDays / state.workDays;
    
    // ROI numbers for report
    const traditionalHours = state.loc / state.traditionalSpeed;
    const traditionalCost = traditionalHours * state.devRate;
    const aiDevHours = (state.revisions * (state.reviewTime + state.qaTime) / 60) * bufferMultiplier;
    const aiDevCost = aiDevHours * state.devRate;
    const totalAiAssistedCost = aiDevCost + totalCost;
    const costSavings = traditionalCost - totalAiAssistedCost;
    const timeSavings = traditionalHours - aiDevHours;
    const savingsPercent = Math.max(0, Math.min(99, (costSavings / traditionalCost) * 100));
    
    const activeModelName = state.currentPreset === 'custom' ? 'Custom Configuration' : presets[state.currentPreset].name;

    // Get active risk levels
    const maxRevisionCodeTokens = (state.revisions - 1) * targetCodeTokens;
    const maxContextRead = state.contextSize + maxRevisionCodeTokens;
    const contextRiskBadge = maxContextRead > 200000 ? "High Risk" : (maxContextRead > 80000 ? "Medium Risk" : "Low Risk");
    const spiralRiskBadge = (state.revisions >= 12 && state.codeRatio <= 15) ? "High Risk" : (state.revisions >= 8 ? "Medium Risk" : "Low Risk");
    const throttlingRiskBadge = (state.tps >= 100 || totalOutputTokens > 4000000) ? "High Risk" : ((state.tps >= 65 || totalOutputTokens > 1500000) ? "Medium Risk" : "Low Risk");
    const qaRiskBadge = state.qaTime === 0 ? "No Guard (High Risk)" : (state.qaTime < 10 ? "Light Guard (Medium Risk)" : "Safe Guard (Low Risk)");

    return `# Confundus AI Project Estimate Report
Generated on: ${new Date().toLocaleDateString()}

## Input Parameters
- **Project Profile Preset**: ${state.projectPreset !== 'custom' ? state.projectPreset.toUpperCase() : 'Custom Scope'}
- **Model Preset**: ${activeModelName}
- **Scale**: ${state.loc.toLocaleString()} LOC @ ${state.tokensPerLine} tokens/line (${formatTokens(targetCodeTokens)} Target Code Volume)
- **Model Parameters**: ${state.tps} TPS @ ${state.codeRatio}% Code Output Ratio
- **Complexity**: ${state.revisions} Revisions
- **Review Overhead**: ${state.reviewTime} mins / rev
- **QA Verification Overhead**: ${state.qaTime} mins / rev
- **Context Size**: ${state.contextSize.toLocaleString()} base tokens / rev
- **API Cost**: In: $${state.inputPrice.toFixed(2)}/1M | Out: $${state.outputPrice.toFixed(2)}/1M
- **Prompt Caching**: ${state.promptCaching ? 'Enabled (80% read discount)' : 'Disabled'}

## Project Management & ROI
- **Dev Hourly Rate**: $${state.devRate}/hr
- **Traditional Velocity**: ${state.traditionalSpeed} LOC/hr
- **Contingency Buffer**: ${state.bufferPercent}% (applied to duration and dev times)
- **Traditional Human Dev Cost**: $${traditionalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${Math.round(traditionalHours)} hours)
- **AI-Assisted Dev Cost**: $${totalAiAssistedCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${aiDevHours.toFixed(1)} developer hours + API cost)
- **Net Cost Savings**: $${costSavings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (Saves ${Math.round(savingsPercent)}%)
- **Net Time Saved**: ${timeSavings.toFixed(1)} developer hours

## Human Constraints & Allocation
- **Dev Workday**: ${state.devHours} hours/day
- **Project Allocation**: ${state.devAllocation}% (${(state.devHours * state.devAllocation / 100).toFixed(1)} hours/day dedicated)
- **Work Week**: ${state.workDays} days/week
- **AI Run Mode**: ${state.asyncAi ? 'Asynchronous (Runs overnight)' : 'Synchronous (Blocks working hours)'}

## Feasibility & Risk Log
- **Context Limit Risk**: ${contextRiskBadge} (Peak Context size: ${formatTokens(maxContextRead)})
- **Revision Spiral Risk**: ${spiralRiskBadge} (Loops: ${state.revisions} revs)
- **Throttling Rate Limit Risk**: ${throttlingRiskBadge} (Throughput: ${state.tps} TPS)
- **QA Integrity Guard**: ${qaRiskBadge} (${state.qaTime} mins/rev testing)

## Estimation Outputs
- **Project Calendar ETA**: ${calendarDays.toFixed(1)} Working Days (${weeks.toFixed(1)} Weeks)
- **Active Effort Time**: ${formatDuration(totalTimeSeconds)}
- **Total API Cost**: ${formatCurrency(totalCost)}
  - Input Context Cost: ${formatCurrency(inputCost)}
  - Output Generation Cost: ${formatCurrency(outputCost)}
- **Total Tokens**:
  - Input Context Volume: ${formatTokens(totalInputTokens)}
  - Output Generated Volume: ${formatTokens(totalOutputTokens)} (Code: ${formatTokens(targetCodeTokens * state.revisions)} | Reasoning: ${formatTokens(totalOutputTokens - (targetCodeTokens * state.revisions))})
`;
}

// Copy Summary report to clipboard
function copySummaryReport() {
    const reportText = generateReportMarkdown();
    navigator.clipboard.writeText(reportText).then(() => {
        showToast('Report copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Copy failed, check console.');
    });
}

// Download CSV of revision details
function downloadCSV() {
    const targetCodeTokens = state.loc * state.tokensPerLine;
    const outputTokensPerRev = targetCodeTokens / (state.codeRatio / 100);
    
    let csvRows = [
        ['Revision #', 'Base Input Context', 'Accumulated Code Input', 'Total Input Tokens', 'Input Cost', 'Output Tokens', 'Code Tokens Output', 'Reasoning Tokens Output', 'Output Cost', 'Gen Time (sec)', 'Review Time (sec)', 'Total Cost']
    ];
    
    let cumulativeInputTokens = 0;
    let cumulativeOutputTokens = 0;
    let cumulativeCost = 0;
    let cumulativeTime = 0;
    
    for (let r = 0; r < state.revisions; r++) {
        const baseContext = state.contextSize;
        const accumulatedCode = r * targetCodeTokens;
        const totalInput = baseContext + accumulatedCode;
        const inputCost = (totalInput / 1000000) * state.inputPrice;
        
        const outputTokens = outputTokensPerRev;
        const codeTokens = targetCodeTokens;
        const reasoningTokens = outputTokens - codeTokens;
        const outputCost = (outputTokens / 1000000) * state.outputPrice;
        
        const genTime = outputTokens / state.tps;
        const revTime = state.reviewTime * 60;
        
        const revisionCost = inputCost + outputCost;
        
        csvRows.push([
            r + 1,
            baseContext,
            accumulatedCode,
            totalInput,
            inputCost.toFixed(4),
            outputTokens.toFixed(0),
            codeTokens.toFixed(0),
            reasoningTokens.toFixed(0),
            outputCost.toFixed(4),
            genTime.toFixed(1),
            revTime,
            revisionCost.toFixed(4)
        ]);
        
        cumulativeInputTokens += totalInput;
        cumulativeOutputTokens += outputTokens;
        cumulativeCost += revisionCost;
        cumulativeTime += (genTime + revTime);
    }
    
    // Add Total Row
    csvRows.push([]);
    csvRows.push([
        'TOTALS',
        '',
        '',
        cumulativeInputTokens,
        ((cumulativeInputTokens / 1000000) * state.inputPrice).toFixed(4),
        cumulativeOutputTokens.toFixed(0),
        (targetCodeTokens * state.revisions).toFixed(0),
        (cumulativeOutputTokens - (targetCodeTokens * state.revisions)).toFixed(0),
        ((cumulativeOutputTokens / 1000000) * state.outputPrice).toFixed(4),
        (cumulativeOutputTokens / state.tps).toFixed(1),
        state.revisions * state.reviewTime * 60,
        cumulativeCost.toFixed(4)
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + csvRows.map(e => e.join(",")).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `confundus_estimate_${state.loc}_loc.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV downloaded successfully!');
}

// Toast notification helper
function showToast(message) {
    // Remove existing toast if visible
    let oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger layout
    toast.offsetHeight;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// URL Share & State Loader Helpers
function syncStateToUrl() {
    const params = new URLSearchParams({
        loc: state.loc,
        tokensPerLine: state.tokensPerLine,
        tps: state.tps,
        codeRatio: state.codeRatio,
        revisions: state.revisions,
        reviewTime: state.reviewTime,
        inputPrice: state.inputPrice,
        outputPrice: state.outputPrice,
        contextSize: state.contextSize,
        devHours: state.devHours,
        devAllocation: state.devAllocation,
        workDays: state.workDays,
        asyncAi: state.asyncAi,
        preset: state.currentPreset,
        // PM Parameters
        devRate: state.devRate,
        traditionalSpeed: state.traditionalSpeed,
        bufferPercent: state.bufferPercent,
        qaTime: state.qaTime,
        // Caching & Presets
        projectPreset: state.projectPreset,
        promptCaching: state.promptCaching,
        timelineView: state.timelineView,
        complexityLevel: state.complexityLevel,
        resourcePreset: state.resourcePreset,
        detailedPanelOpen: state.detailedPanelOpen,
        charmActive: state.charmActive
    });
    const urlString = `?${params.toString()}`;
    window.history.replaceState({}, '', `${window.location.pathname}${urlString}`);
    
    // Save to localStorage
    try {
        localStorage.setItem('confundusState', JSON.stringify(state));
    } catch (e) {
        console.warn('LocalStorage is not available.');
    }
}

function loadStateFromUrl() {
    let params = new URLSearchParams(window.location.search);
    
    // Fallback to localStorage if no params in URL
    if (params.toString() === '') {
        try {
            const saved = localStorage.getItem('confundusState');
            if (saved) {
                const parsedState = JSON.parse(saved);
                Object.assign(state, parsedState);
                return;
            }
        } catch(e) {
            console.warn('LocalStorage read failed.');
        }
        return;
    }
    
    const floatParams = ['inputPrice', 'outputPrice'];
    const intParams = [
        'loc', 'tokensPerLine', 'tps', 'codeRatio', 'revisions', 'reviewTime', 'contextSize', 
        'devHours', 'devAllocation', 'workDays', 'devRate', 'traditionalSpeed', 'bufferPercent', 'qaTime'
    ];
    const boolParams = ['asyncAi', 'promptCaching'];
    
    intParams.forEach(key => {
        if (params.has(key)) {
            const parsed = parseInt(params.get(key), 10);
            if (!isNaN(parsed)) state[key] = parsed;
        }
    });
    
    floatParams.forEach(key => {
        if (params.has(key)) {
            const parsed = parseFloat(params.get(key));
            if (!isNaN(parsed)) state[key] = parsed;
        }
    });
    
    boolParams.forEach(key => {
        if (params.has(key)) {
            state[key] = params.get(key) === 'true';
        }
    });
    
    if (params.has('preset')) {
        state.currentPreset = params.get('preset');
    }
    if (params.has('projectPreset')) {
        state.projectPreset = params.get('projectPreset');
    }
    if (params.has('timelineView')) {
        state.timelineView = params.get('timelineView');
    }
    if (params.has('complexityLevel')) {
        state.complexityLevel = params.get('complexityLevel');
    }
    if (params.has('resourcePreset')) {
        state.resourcePreset = params.get('resourcePreset');
    }
    if (params.has('detailedPanelOpen')) {
        state.detailedPanelOpen = params.get('detailedPanelOpen') === 'true';
    }
    if (params.has('charmActive')) {
        state.charmActive = params.get('charmActive') === 'true';
    }
}

// Animation Helper
function animateValue(obj, start, end, duration, formatter) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing (easeOutQuad)
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = start + (end - start) * easeProgress;
        
        obj.innerText = formatter(currentVal);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerText = formatter(end);
        }
    };
    window.requestAnimationFrame(step);
}

function syncInputsFromState() {
    elements.presetSelect.value = state.currentPreset;
    elements.projectPresetSelect.value = state.projectPreset;
    elements.resourcePresetSelect.value = state.resourcePreset;
    elements.inputPromptCaching.checked = state.promptCaching;
    
    // Toggle active timeline view in UI tabs
    if (state.timelineView === 'gantt') {
        elements.btnViewTimelineGantt.classList.add('active');
        elements.btnViewTimelineList.classList.remove('active');
        elements.simulationTimeline.style.display = 'none';
        elements.ganttChartContainer.style.display = 'block';
    } else {
        elements.btnViewTimelineList.classList.add('active');
        elements.btnViewTimelineGantt.classList.remove('active');
        elements.simulationTimeline.style.display = 'block';
        elements.ganttChartContainer.style.display = 'none';
    }
    
    // Sync Complexity Level Preset buttons
    const compButtons = elements.complexityPresetGroup.querySelectorAll('button');
    compButtons.forEach(btn => {
        if (btn.getAttribute('data-complexity') === state.complexityLevel) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (state.complexityLevel === 'custom') {
        elements.advancedScaleContent.style.display = 'flex';
        elements.advancedToggle.classList.add('active');
    }
    if (state.currentPreset === 'custom') {
        elements.advancedModelContent.style.display = 'flex';
        elements.modelToggle.classList.add('active');
    }
    if (state.resourcePreset === 'custom') {
        elements.advancedResourceContent.style.display = 'flex';
        elements.resourceToggle.classList.add('active');
    }
    
    // Sync bottom detailed audits panel
    if (state.detailedPanelOpen) {
        elements.detailedAuditsPanel.style.display = 'flex';
        elements.auditsToggle.classList.add('active');
    } else {
        elements.detailedAuditsPanel.style.display = 'none';
        elements.auditsToggle.classList.remove('active');
    }
    
    const syncField = (input, num, val) => {
        if (input) input.value = val;
        if (num) num.value = val;
    };
    
    syncField(elements.inputLoc, elements.numLoc, state.loc);
    syncField(elements.inputTokensLine, elements.numTokensLine, state.tokensPerLine);
    syncField(elements.inputTps, elements.numTps, state.tps);
    syncField(elements.inputCodeRatio, elements.numCodeRatio, state.codeRatio);
    syncField(elements.inputRevisions, elements.numRevisions, state.revisions);
    syncField(elements.inputReviewTime, elements.numReviewTime, state.reviewTime);
    syncField(elements.inputContextSize, elements.numContextSize, state.contextSize);
    syncField(elements.inputDevHours, elements.numDevHours, state.devHours);
    syncField(elements.inputDevAllocation, elements.numDevAllocation, state.devAllocation);
    syncField(elements.inputWorkDays, elements.numWorkDays, state.workDays);
    
    syncField(elements.inputDevRate, elements.numDevRate, state.devRate);
    syncField(elements.inputTraditionalSpeed, elements.numTraditionalSpeed, state.traditionalSpeed);
    syncField(elements.inputBuffer, elements.numBuffer, state.bufferPercent);
    syncField(elements.inputQaTime, elements.numQaTime, state.qaTime);
    
    elements.numInputPrice.value = state.inputPrice.toFixed(2);
    elements.numOutputPrice.value = state.outputPrice.toFixed(2);
    elements.inputAsyncAi.checked = state.asyncAi;
}

function copyShareLink() {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Shareable URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy share link: ', err);
        showToast('Copy failed, check console.');
    });
}

// Detailed Timeline Stepper Exporter
function renderTimelineList(timeline, targetCodeTokens, outputTokensPerRev, inputPrice, outputPrice) {
    const container = elements.simulationTimeline;
    if (!container) return;
    container.innerHTML = '';
    
    timeline.forEach(step => {
        const accumCodeTokens = (step.revision - 1) * targetCodeTokens;
        const stepInputTokens = state.contextSize + accumCodeTokens;
        const stepInputCost = (stepInputTokens / 1000000) * inputPrice;
        const stepOutputCost = (outputTokensPerRev / 1000000) * outputPrice;
        const stepCost = stepInputCost + stepOutputCost;
        
        const devStartStr = formatDayAndTime(step.devStartDay, step.devStartHour);
        const devEndStr = formatDayAndTime(step.devEndDay, step.devEndHour);
        const aiStartStr = formatDayAndTime(step.aiStartDay, step.aiStartHour);
        const aiEndStr = formatDayAndTime(step.aiEndDay, step.aiEndHour);
        
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const runsAsync = step.runsOvernight && state.asyncAi;
        const badgeClass = runsAsync ? 'status-overnight' : 'status-active';
        const badgeText = runsAsync ? 'Background Run' : 'Active Workday';
        
        item.innerHTML = `
            <div class="timeline-badge">${step.revision}</div>
            <div class="timeline-content">
                <div class="timeline-row">
                    <span class="timeline-title">👨‍💻 Dev Code Review & Prompting</span>
                    <span class="timeline-time">${devStartStr} ➔ ${devEndStr}</span>
                </div>
                <div class="timeline-row">
                    <span class="timeline-title">🤖 AI Code Generation Cycle</span>
                    <span class="timeline-time">
                        ${aiStartStr} ➔ ${aiEndStr}
                        ${runsAsync ? '<span class="badge-overnight">Async Background Run</span>' : ''}
                    </span>
                </div>
                <div class="timeline-stats-row">
                    <span>Context Read: <strong>${formatTokens(stepInputTokens)}</strong></span>
                    <span>AI Output: <strong>${formatTokens(outputTokensPerRev)}</strong></span>
                    <span>API Cost: <strong>${formatCurrency(stepCost)}</strong></span>
                    <span class="status-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function formatDayAndTime(startDay, hourOffset) {
    const absoluteHour = 9 + hourOffset;
    const extraDays = Math.floor(absoluteHour / 24);
    const wrappedHour = absoluteHour % 24;
    
    const dayNum = startDay + extraDays + 1;
    const hour = Math.floor(wrappedHour);
    const minutes = Math.floor((wrappedHour % 1) * 60);
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    
    return `Day ${dayNum}, ${displayHour}:${displayMinutes} ${ampm}`;
}

function renderGanttGrid(timeline, projectHoursPerDay) {
    const container = elements.ganttGrid;
    if (!container) return;
    container.innerHTML = '';
    
    const daySummary = {};
    timeline.forEach(step => {
        // Dev review hours in that day
        const devDay = step.devStartDay;
        if (!daySummary[devDay]) daySummary[devDay] = { dev: 0, ai: 0 };
        const devHrs = step.devEndHour - step.devStartHour;
        daySummary[devDay].dev += Math.max(0, devHrs);
        
        // AI generation hours
        let currentDay = step.aiStartDay;
        if (step.aiEndDay === step.aiStartDay) {
            let remainingGen = step.aiEndHour - step.aiStartHour;
            if (!daySummary[currentDay]) daySummary[currentDay] = { dev: 0, ai: 0 };
            daySummary[currentDay].ai += Math.max(0, remainingGen);
        } else {
            // First day
            if (!daySummary[currentDay]) daySummary[currentDay] = { dev: 0, ai: 0 };
            daySummary[currentDay].ai += Math.max(0, 24 - step.aiStartHour);
            
            // Intermediate days
            for (let d = currentDay + 1; d < step.aiEndDay; d++) {
                if (!daySummary[d]) daySummary[d] = { dev: 0, ai: 0 };
                daySummary[d].ai += 24;
            }
            
            // Last day
            if (!daySummary[step.aiEndDay]) daySummary[step.aiEndDay] = { dev: 0, ai: 0 };
            daySummary[step.aiEndDay].ai += Math.max(0, step.aiEndHour);
        }
    });
    
    const totalDays = Math.max(...Object.keys(daySummary).map(Number), 0) + 1;
    
    for (let d = 0; d < totalDays; d++) {
        const summary = daySummary[d] || { dev: 0, ai: 0 };
        const devHoursVal = Math.min(24, summary.dev);
        const aiHoursVal = Math.min(24 - devHoursVal, summary.ai);
        const idleHoursVal = Math.max(0, 24 - devHoursVal - aiHoursVal);
        
        const devPct = (devHoursVal / 24) * 100;
        const aiPct = (aiHoursVal / 24) * 100;
        const idlePct = (idleHoursVal / 24) * 100;
        
        const row = document.createElement('div');
        row.className = 'gantt-row';
        
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayName = dayNames[d % 7];
        
        row.innerHTML = `
            <div class="gantt-day-label">Day ${d + 1} (${dayName.substring(0, 3)})</div>
            <div class="gantt-bar-wrapper">
                ${devPct > 0 ? `<div class="gantt-segment gantt-segment-dev" style="width: ${devPct}%" title="Developer Review: ${devHoursVal.toFixed(1)} hrs">${devHoursVal >= 1.5 ? `${devHoursVal.toFixed(1)}h Dev` : ''}</div>` : ''}
                ${aiPct > 0 ? `<div class="gantt-segment gantt-segment-ai" style="width: ${aiPct}%" title="AI Generation: ${aiHoursVal.toFixed(1)} hrs">${aiHoursVal >= 1.5 ? `${aiHoursVal.toFixed(1)}h AI` : ''}</div>` : ''}
                ${idlePct > 0 ? `<div class="gantt-segment gantt-segment-idle" style="width: ${idlePct}%" title="Off-Hours: ${idleHoursVal.toFixed(1)} hrs">${idleHoursVal >= 4 ? 'Off-Hours' : ''}</div>` : ''}
            </div>
        `;
        container.appendChild(row);
    }
}

// Run app
window.addEventListener('DOMContentLoaded', init);
