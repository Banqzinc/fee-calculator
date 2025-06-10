# Quidkey Fee Savings Calculator

A web-based calculator that helps UK merchants understand their potential savings by switching to quidkey for online payment processing.

## 🎯 Project Overview

This calculator will be embedded as an iframe on the quidkey.com website (built with Webflow) to demonstrate potential cost savings for merchants considering switching from competitors like Stripe to quidkey.

## 💰 Fee Structure & Calculation Logic

### Competitor Fees (Stripe & Others - UK Average)
- **Percentage Fee**: 1.6% per transaction
- **Fixed Fee**: £0.25 per transaction
- **Average Transaction**: £72 (UK average)

### Quidkey Fees
- **Percentage Fee**: 1.0% per transaction
- **Fixed Fee**: £0.20 per transaction

### Calculation Formula

**For Competitors:**
```
Monthly Volume = User Input
Percentage Fee = Monthly Volume × 1.6%
Number of Transactions = Monthly Volume ÷ £72
Fixed Fees = Number of Transactions × £0.25
Total Competitor Fees = Percentage Fee + Fixed Fees
```

**For Quidkey:**
```
Monthly Volume = User Input
Percentage Fee = Monthly Volume × 1.0%
Number of Transactions = Monthly Volume ÷ £72
Fixed Fees = Number of Transactions × £0.20
Total Quidkey Fees = Percentage Fee + Fixed Fees
```

**Savings:**
```
Monthly Savings = Total Competitor Fees - Total Quidkey Fees
Annual Savings = Monthly Savings × 12
```

## 🛠 Technical Approach

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with responsive design
- **Hosting**: Static hosting (Vercel/Netlify)
- **Integration**: iframe embed for Webflow

### Why This Stack?
- ✅ Fast development and deployment
- ✅ Lightweight and fast loading
- ✅ Easy maintenance
- ✅ Perfect for iframe embedding
- ✅ No backend complexity needed
- ✅ Mobile-responsive out of the box

## 🎨 Design Requirements

### User Experience
1. **Simple Input**: Single field for monthly volume input
2. **Instant Calculation**: Real-time updates as user types
3. **Visual Impact**: Clear before/after comparison
4. **Call-to-Action**: Prominent button to contact quidkey
5. **Mobile-First**: Responsive design for all devices

### Visual Elements
- Clean, professional design matching quidkey branding
- Progress indicators or visual savings representation
- Breakdown of fee components (percentage vs fixed fees)
- Emphasis on annual savings for maximum impact

## 📋 Implementation Plan

### Phase 1: Core Calculator
- [ ] Set up project structure
- [ ] Create HTML foundation
- [ ] Implement calculation logic in JavaScript
- [ ] Basic CSS styling
- [ ] Input validation and error handling

### Phase 2: Enhanced UX
- [ ] Responsive design implementation
- [ ] Visual improvements and branding
- [ ] Smooth animations and transitions
- [ ] Fee breakdown visualization
- [ ] Results summary section

### Phase 3: Integration Ready
- [ ] iframe-friendly optimization
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Final testing and deployment
- [ ] Integration documentation for Webflow

### Phase 4: Future Enhancements
- [ ] Multi-currency support (EUR, USD)
- [ ] Advanced fee structures
- [ ] Chart visualizations
- [ ] A/B testing capabilities
- [ ] Analytics integration

## 📁 Project Structure
```
calculator/
├── README.md
├── index.html          # Main calculator page
├── styles/
│   ├── main.css       # Core styles
│   └── responsive.css # Mobile/tablet styles
├── scripts/
│   ├── calculator.js  # Core calculation logic
│   └── ui.js         # UI interactions
├── assets/
│   └── images/       # Logo, icons, etc.
└── docs/
    └── integration.md # Webflow integration guide
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Text editor/IDE
- Basic understanding of HTML/CSS/JavaScript

### Development Setup
1. Clone/create the project directory
2. Open `index.html` in browser for testing
3. Use live server for development
4. Test iframe embedding locally

## 🎯 Success Metrics

### Primary Goals
- Clear demonstration of quidkey's cost advantage
- Seamless integration with quidkey.com
- High conversion from calculator usage to contact/signup

### Technical Goals
- Load time < 2 seconds
- Mobile-responsive design
- Cross-browser compatibility
- Clean, maintainable code

## 📞 Integration with Webflow

The calculator will be embedded using an iframe:
```html
<iframe
  src="https://calculator.quidkey.com"
  width="100%"
  height="600px"
  frameborder="0">
</iframe>
```

## 🔮 Future Considerations

### Multi-Currency Expansion
- EUR: Research European payment processor fees
- USD: Research US market rates (Stripe, PayPal, etc.)
- Dynamic currency selection

### Advanced Features
- Business size segmentation
- Industry-specific fee structures
- Integration with CRM for lead capture
- A/B testing different value propositions

---

**Project Start Date**: [Current Date]
**Target Launch**: [Target Date]
**Current Phase**: Planning & Architecture
