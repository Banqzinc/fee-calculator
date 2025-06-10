// Quidkey Fee Savings Calculator - Core Logic

class FeeCalculator {
    constructor() {
        // Fee structures
        this.COMPETITOR_FEES = {
            percentageRate: 0.016, // 1.6%
            fixedFee: 0.25         // £0.25 per transaction
        };

        this.QUIDKEY_FEES = {
            percentageRate: 0.01,  // 1.0%
            fixedFee: 0.20         // £0.20 per transaction
        };

        this.AVERAGE_TRANSACTION = 72; // £72 average transaction in UK

        // DOM elements
        this.monthlyVolumeInput = document.getElementById('monthly-volume');
        this.annualSavingsElement = document.getElementById('annual-savings');
        this.monthlyVolumeDisplay = document.getElementById('monthly-volume-display');
        this.transactionsCountElement = document.getElementById('transactions-count');
        this.competitorFeesElement = document.getElementById('competitor-fees');
        this.quidkeyFeesElement = document.getElementById('quidkey-fees');
        this.monthlySavingsElement = document.getElementById('monthly-savings');

        this.init();
    }

    init() {
        // Add event listeners
        this.monthlyVolumeInput.addEventListener('input', this.handleVolumeChange.bind(this));
        this.monthlyVolumeInput.addEventListener('keyup', this.handleVolumeChange.bind(this));

        // Format initial value
        this.formatInput();

        // Calculate initial values
        this.calculateAndDisplay();
    }

    handleVolumeChange() {
        this.formatInput();
        this.calculateAndDisplay();
    }

    formatInput() {
        const input = this.monthlyVolumeInput;
        let value = input.value.replace(/[^\d.]/g, '');

        // Prevent multiple decimal points
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limit decimal places to 2
        if (parts[1] && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }

        input.value = value;
    }

    calculateFees(monthlyVolume) {
        // Calculate number of transactions
        const numberOfTransactions = monthlyVolume / this.AVERAGE_TRANSACTION;

        // Calculate competitor fees
        const competitorPercentageFee = monthlyVolume * this.COMPETITOR_FEES.percentageRate;
        const competitorFixedFees = numberOfTransactions * this.COMPETITOR_FEES.fixedFee;
        const totalCompetitorFees = competitorPercentageFee + competitorFixedFees;

        // Calculate quidkey fees
        const quidkeyPercentageFee = monthlyVolume * this.QUIDKEY_FEES.percentageRate;
        const quidkeyFixedFees = numberOfTransactions * this.QUIDKEY_FEES.fixedFee;
        const totalQuidkeyFees = quidkeyPercentageFee + quidkeyFixedFees;

        // Calculate savings
        const monthlySavings = totalCompetitorFees - totalQuidkeyFees;
        const annualSavings = monthlySavings * 12;

        return {
            monthlyVolume,
            numberOfTransactions: Math.round(numberOfTransactions),
            competitor: {
                percentageFee: competitorPercentageFee,
                fixedFees: competitorFixedFees,
                total: totalCompetitorFees
            },
            quidkey: {
                percentageFee: quidkeyPercentageFee,
                fixedFees: quidkeyFixedFees,
                total: totalQuidkeyFees
            },
            monthlySavings,
            annualSavings
        };
    }

    calculateAndDisplay() {
        const monthlyVolume = parseFloat(this.monthlyVolumeInput.value) || 0;

        if (monthlyVolume <= 0) {
            this.displayResults({
                monthlyVolume: 0,
                numberOfTransactions: 0,
                competitor: { total: 0 },
                quidkey: { total: 0 },
                monthlySavings: 0,
                annualSavings: 0
            });
            return;
        }

        const results = this.calculateFees(monthlyVolume);
        this.displayResults(results);
    }

    displayResults(results) {
        // Add updating animation
        this.annualSavingsElement.classList.add('updating');

        setTimeout(() => {
            // Update main savings display
            this.annualSavingsElement.textContent = this.formatCurrency(results.annualSavings);

            // Update breakdown details
            this.monthlyVolumeDisplay.textContent = this.formatCurrency(results.monthlyVolume);
            this.transactionsCountElement.textContent = this.formatNumber(results.numberOfTransactions);
            this.competitorFeesElement.textContent = this.formatCurrency(results.competitor.total);
            this.quidkeyFeesElement.textContent = this.formatCurrency(results.quidkey.total);
            this.monthlySavingsElement.textContent = this.formatCurrency(results.monthlySavings);

            // Remove updating animation
            this.annualSavingsElement.classList.remove('updating');
        }, 150);
    }

    formatCurrency(amount) {
        if (amount === 0) return '0.00';

        return new Intl.NumberFormat('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Math.abs(amount));
    }

    formatNumber(number) {
        return new Intl.NumberFormat('en-GB').format(number);
    }

    // Public method to get calculation results (useful for testing or external access)
    getResults() {
        const monthlyVolume = parseFloat(this.monthlyVolumeInput.value) || 0;
        return this.calculateFees(monthlyVolume);
    }

    // Public method to set volume (useful for programmatic control)
    setVolume(volume) {
        this.monthlyVolumeInput.value = volume;
        this.calculateAndDisplay();
    }
}

// Utility functions
const utils = {
    // Debounce function to limit calculation frequency
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Validate input
    isValidVolume(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= 999999999;
    },

    // Format large numbers with appropriate suffixes
    formatLargeNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
};

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global calculator instance
    window.feeCalculator = new FeeCalculator();

    // Add some helpful methods to window for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.testCalculator = function(volume) {
            window.feeCalculator.setVolume(volume);
            console.log('Results:', window.feeCalculator.getResults());
        };

        console.log('Quidkey Fee Calculator loaded. Use testCalculator(volume) to test.');
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FeeCalculator, utils };
}
