// Confundus Estimator Presets Configuration
// Anyone can add or edit default models, projects, or resource rates here.
window.ConfundusPresets = {
    // Model Presets: pricing (per 1M tokens), speed (TPS), and active context sizes
    models: {
        opus: {
            name: 'Claude 3 Opus (Premium/Reasoning)',
            tps: 50,
            inputPrice: 15.00,
            outputPrice: 75.00,
            contextSize: 10000
        },
        sonnet35: {
            name: 'Claude 3.5 Sonnet (Balanced/Fast)',
            tps: 85,
            inputPrice: 3.00,
            outputPrice: 15.00,
            contextSize: 15000
        },
        gpt4o: {
            name: 'GPT-4o (Omni/Balanced)',
            tps: 90,
            inputPrice: 5.00,
            outputPrice: 15.00,
            contextSize: 12000
        },
        o1: {
            name: 'OpenAI o1 (Deep Reasoning)',
            tps: 30,
            inputPrice: 15.00,
            outputPrice: 60.00,
            contextSize: 25000
        },
        'o3-mini': {
            name: 'OpenAI o3-mini (Fast Reasoning)',
            tps: 80,
            inputPrice: 1.10,
            outputPrice: 4.40,
            contextSize: 20000
        },
        'deepseek-r1': {
            name: 'DeepSeek-R1 (Budget Reasoning)',
            tps: 55,
            inputPrice: 0.55,
            outputPrice: 2.19,
            contextSize: 30000
        },
        'deepseek-v3': {
            name: 'DeepSeek-V3 (Budget Balanced)',
            tps: 60,
            inputPrice: 0.14,
            outputPrice: 0.28,
            contextSize: 20000
        },
        'gemini-pro': {
            name: 'Gemini 1.5 Pro (Large Context)',
            tps: 60,
            inputPrice: 1.25,
            outputPrice: 5.00,
            contextSize: 20000
        },
        'gemini-flash': {
            name: 'Gemini 1.5 Flash (Ultra Fast/Cheap)',
            tps: 160,
            inputPrice: 0.075,
            outputPrice: 0.30,
            contextSize: 15000
        }
    },

    // Project Scope Profiles: scale (LOC), complexity (revisions), and velocities
    projects: {
        script: {
            name: 'Small Script / Utility (~1k LOC)',
            loc: 1000,
            revisions: 2,
            reviewTime: 10,
            qaTime: 5,
            traditionalSpeed: 35
        },
        feature: {
            name: 'New Web App Feature / Module (~5k LOC)',
            loc: 5000,
            revisions: 5,
            reviewTime: 15,
            qaTime: 10,
            traditionalSpeed: 25
        },
        service: {
            name: 'Microservice / Backend API (~15k LOC)',
            loc: 15000,
            revisions: 8,
            reviewTime: 20,
            qaTime: 15,
            traditionalSpeed: 18
        },
        dashboard: {
            name: 'Full Web Dashboard / Portal (~30k LOC)',
            loc: 30000,
            revisions: 12,
            reviewTime: 25,
            qaTime: 20,
            traditionalSpeed: 12
        },
        monolith: {
            name: 'Monolith Refactoring (~80k LOC)',
            loc: 80000,
            revisions: 18,
            reviewTime: 30,
            qaTime: 25,
            traditionalSpeed: 6
        }
    },

    // Resource & PM Profiles: rates, workday configurations, and contingency buffers
    resources: {
        solo: {
            name: 'Solo Senior Developer (Dedicated)',
            devRate: 65,
            devHours: 6,
            devAllocation: 100,
            workDays: 5,
            traditionalSpeed: 20,
            bufferPercent: 20,
            reviewTime: 15,
            qaTime: 10,
            asyncAi: true
        },
        team: {
            name: 'Standard Dev Team (50% Allocation)',
            devRate: 90,
            devHours: 8,
            devAllocation: 50,
            workDays: 5,
            traditionalSpeed: 25,
            bufferPercent: 15,
            reviewTime: 20,
            qaTime: 15,
            asyncAi: true
        },
        agency: {
            name: 'Enterprise Agency (25% Allocation)',
            devRate: 125,
            devHours: 8,
            devAllocation: 25,
            workDays: 5,
            traditionalSpeed: 15,
            bufferPercent: 25,
            reviewTime: 30,
            qaTime: 20,
            asyncAi: true
        }
    }
};
