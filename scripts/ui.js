// Quidkey Fee Calculator - UI Interactions

class UIController {
    constructor() {
        this.ctaButton = document.querySelector('.cta-button');
        this.volumeInput = document.getElementById('monthly-volume');

        this.init();
    }

    init() {
        this.setupCTAButton();
        this.setupInputEnhancements();
        this.setupKeyboardNavigation();
    }

    setupCTAButton() {
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', this.handleCTAClick.bind(this));
        }
    }

    handleCTAClick() {
        // Get current calculation results
        const results = window.feeCalculator ? window.feeCalculator.getResults() : null;

        // Track the click with context
        this.trackEvent('cta_clicked', {
            monthly_volume: results ? results.monthlyVolume : 0,
            annual_savings: results ? results.annualSavings : 0
        });

        // Open quidkey contact/signup page
        // This would typically open in the parent window if embedded in iframe
        if (window.parent && window.parent !== window) {
            // We're in an iframe
            window.parent.postMessage({
                type: 'quidkey_cta_clicked',
                data: results
            }, '*');
        } else {
            // We're not in an iframe, open directly
            window.open('https://quidkey.com/', '_blank');
        }
    }

    setupInputEnhancements() {
        if (this.volumeInput) {
            // Add focus/blur effects
            this.volumeInput.addEventListener('focus', this.handleInputFocus.bind(this));
            this.volumeInput.addEventListener('blur', this.handleInputBlur.bind(this));

            // Add placeholder animation
            this.volumeInput.addEventListener('input', this.handleInputChange.bind(this));
        }
    }

    handleInputFocus() {
        this.volumeInput.parentElement.classList.add('focused');
    }

    handleInputBlur() {
        this.volumeInput.parentElement.classList.remove('focused');
    }

    handleInputChange() {
        const hasValue = this.volumeInput.value.length > 0;
        this.volumeInput.parentElement.classList.toggle('has-value', hasValue);
    }

    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    handleKeyboard(event) {
        // Focus input with 'I' key
        if (event.key.toLowerCase() === 'i' && !event.ctrlKey && !event.metaKey) {
            if (document.activeElement !== this.volumeInput) {
                event.preventDefault();
                this.volumeInput.focus();
                this.volumeInput.select();
            }
        }

        // Enter key on CTA button
        if (event.key === 'Enter' && document.activeElement === this.ctaButton) {
            this.handleCTAClick();
        }
    }

    // Simple analytics tracking function
    trackEvent(eventName, data = {}) {
        // This would integrate with your Analytics service
        // For now, we'll just log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Event:', eventName, data);
        }

        // Example integrations:
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }

        // Or any other analytics service
        if (typeof analytics !== 'undefined') {
            analytics.track(eventName, data);
        }

        // Send to parent window if in iframe
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'quidkey_analytics',
                event: eventName,
                data: data
            }, '*');
        }
    }

    // Public method to update CTA button text/state
    updateCTA(text, enabled = true) {
        if (this.ctaButton) {
            this.ctaButton.textContent = text;
            this.ctaButton.disabled = !enabled;
        }
    }

    // Public method to highlight savings (for promotional purposes)
    highlightSavings(duration = 2000) {
        const savingsAmount = document.getElementById('annual-savings');
        const savingsDisplay = document.querySelector('.savings-display');

        if (savingsAmount && savingsDisplay) {
            savingsDisplay.classList.add('highlighted');

            setTimeout(() => {
                savingsDisplay.classList.remove('highlighted');
            }, duration);
        }
    }
}

// Window control interactions (decorative)
class WindowControls {
    constructor() {
        this.setupWindowControls();
    }

    setupWindowControls() {
        const controls = document.querySelectorAll('.control');

        controls.forEach(control => {
            control.addEventListener('click', this.handleControlClick.bind(this));
        });
    }

    handleControlClick(event) {
        const control = event.target;
        const type = control.classList.contains('minimize') ? 'minimize' :
                    control.classList.contains('close') ? 'close' : 'maximize';

        // Add visual feedback
        control.style.transform = 'scale(0.9)';
        setTimeout(() => {
            control.style.transform = 'scale(1)';
        }, 100);

        // These are decorative, but could trigger actions
        switch(type) {
            case 'minimize':
                this.animateMinimize();
                break;
            case 'close':
                this.showCloseMessage();
                break;
            case 'maximize':
                this.animateMaximize();
                break;
        }
    }

    animateMinimize() {
        const calculator = document.querySelector('.calculator-card');
        calculator.style.transform = 'scale(0.95)';
        setTimeout(() => {
            calculator.style.transform = 'scale(1)';
        }, 200);
    }

    animateMaximize() {
        const calculator = document.querySelector('.calculator-card');
        calculator.style.transform = 'scale(1.02)';
        setTimeout(() => {
            calculator.style.transform = 'scale(1)';
        }, 200);
    }

    showCloseMessage() {
        // Could show a fun message or trigger parent window action
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'quidkey_close_requested'
            }, '*');
        }
    }
}

// Enhanced number formatting for better UX
class NumberFormatter {
    static addCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static formatAsYouType(input) {
        let value = input.value.replace(/[^\d.]/g, '');

        // Add commas for thousands
        const parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        input.value = parts.join('.');
    }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global UI controller instance
    window.uiController = new UIController();
    window.windowControls = new WindowControls();

    // Add some helper methods to window for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.showBreakdown = () => window.uiController.showBreakdown(true);
        window.hideBreakdown = () => window.uiController.showBreakdown(false);
        window.highlightSavings = () => window.uiController.highlightSavings();

        console.log('UI Controller loaded. Use showBreakdown(), hideBreakdown(), highlightSavings() for testing.');
    }
});

// Handle messages from parent window (useful for iframe communication)
window.addEventListener('message', function(event) {
    // Only handle messages from trusted origins in production
    if (event.data && event.data.type) {
        switch(event.data.type) {
            case 'quidkey_set_volume':
                if (window.feeCalculator && event.data.volume) {
                    window.feeCalculator.setVolume(event.data.volume);
                }
                break;
            case 'quidkey_show_breakdown':
                if (window.uiController) {
                    window.uiController.showBreakdown(event.data.show !== false);
                }
                break;
            case 'quidkey_highlight_savings':
                if (window.uiController) {
                    window.uiController.highlightSavings(event.data.duration);
                }
                break;
        }
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIController, WindowControls, NumberFormatter };
}
