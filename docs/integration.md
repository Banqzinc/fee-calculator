# Quidkey Fee Calculator - Webflow Integration Guide

## 🚀 Quick Integration

### Basic iframe Embed
Add this iframe code to your Webflow page where you want the calculator to appear:

```html
<iframe
  src="https://calculator.quidkey.com"
  width="100%"
  height="700px"
  frameborder="0"
  title="Quidkey Fee Savings Calculator"
  style="border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);">
</iframe>
```

### Responsive Embed
For better responsive behavior, wrap the iframe in a container:

```html
<div class="calculator-embed">
  <iframe
    src="https://calculator.quidkey.com"
    width="100%"
    height="700px"
    frameborder="0"
    title="Quidkey Fee Savings Calculator">
  </iframe>
</div>

<style>
.calculator-embed {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.calculator-embed iframe {
  display: block;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .calculator-embed {
    margin: 0 16px;
  }
}
</style>
```

## 🛠 Advanced Integration

### Custom Styling Container
If you want to customize the appearance further:

```html
<div class="quidkey-calculator-container">
  <div class="calculator-header">
    <h2>Calculate Your Savings</h2>
    <p>See how much you could save by switching to quidkey</p>
  </div>

  <iframe
    src="https://calculator.quidkey.com"
    width="100%"
    height="700px"
    frameborder="0"
    title="Quidkey Fee Savings Calculator">
  </iframe>

  <div class="calculator-footer">
    <p><small>*Calculations based on UK market averages</small></p>
  </div>
</div>
```

### JavaScript Communication
The calculator can communicate with the parent window through postMessage API:

```javascript
// Listen for messages from the calculator
window.addEventListener('message', function(event) {
  if (event.data.type === 'quidkey_cta_clicked') {
    // User clicked "Get Started" - redirect to signup
    window.location.href = '/contact';
  }

  if (event.data.type === 'quidkey_analytics') {
    // Track calculator usage
    gtag('event', event.data.event, event.data.data);
  }
});

// Send messages to the calculator
function setCalculatorVolume(volume) {
  const calculatorFrame = document.querySelector('iframe[src*="calculator.quidkey.com"]');
  if (calculatorFrame) {
    calculatorFrame.contentWindow.postMessage({
      type: 'quidkey_set_volume',
      volume: volume
    }, '*');
  }
}
```

## 📊 Analytics Integration

### Google Analytics
The calculator will automatically send events to Google Analytics if gtag is available:

- `breakdown_expanded` - User expanded fee breakdown
- `breakdown_collapsed` - User collapsed fee breakdown
- `cta_clicked` - User clicked the CTA button

### Custom Analytics
You can capture calculator events and send them to your analytics platform:

```javascript
window.addEventListener('message', function(event) {
  if (event.data.type === 'quidkey_analytics') {
    // Send to your analytics service
    yourAnalytics.track(event.data.event, event.data.data);
  }
});
```

## 🎨 Styling Options

### Height Adjustments
Recommended heights for different use cases:

- **Compact**: 600px (input + results only)
- **Standard**: 700px (recommended - includes breakdown button)
- **Extended**: 800px (if breakdown is initially visible)

### Width Considerations
- **Minimum width**: 320px (mobile compatibility)
- **Optimal width**: 600px (desktop)
- **Maximum width**: 800px (large screens)

## 🔧 Webflow-Specific Instructions

### Method 1: Embed Element
1. Drag an **Embed** element to your page
2. Paste the iframe code
3. Set width to 100%
4. Adjust height as needed

### Method 2: HTML Embed Component
1. Add an **HTML Embed** component
2. Paste the complete integration code
3. Style the container as needed

### Method 3: Custom Code
1. Go to Page Settings > Custom Code
2. Add the iframe in the "Before `</body>` tag" section
3. Position using CSS

## 📱 Mobile Optimization

The calculator is fully responsive, but for optimal mobile experience:

```css
@media (max-width: 768px) {
  .calculator-embed {
    height: 650px; /* Slightly shorter on mobile */
    margin: 0 10px;
  }
}
```

## 🔒 Security Considerations

### CSP (Content Security Policy)
If you have CSP enabled, add:

```
frame-src https://calculator.quidkey.com;
```

### Trusted Origins
The calculator only accepts messages from trusted parent domains in production.

## 🧪 Testing

### Local Testing
Before going live, test the integration:

1. Preview your Webflow site
2. Check calculator loads correctly
3. Test on mobile devices
4. Verify CTA button behavior
5. Check analytics tracking

### Pre-launch Checklist
- [ ] Calculator loads in iframe
- [ ] Responsive design works
- [ ] CTA button redirects correctly
- [ ] Analytics events fire
- [ ] Mobile experience tested
- [ ] Page load speed acceptable

## 🎯 Conversion Optimization

### Placement Recommendations
- Above the fold on landing pages
- In pricing sections
- On dedicated "Calculator" pages
- Within blog posts about costs

### Context Integration
Provide context around the calculator:

```html
<div class="calculator-section">
  <h2>See Your Potential Savings</h2>
  <p>Enter your monthly payment volume to calculate how much you could save by switching from traditional payment processors to quidkey.</p>

  <!-- Calculator iframe here -->

  <div class="benefits-grid">
    <div class="benefit">
      <h3>Lower Fees</h3>
      <p>1% vs 1.6% average</p>
    </div>
    <div class="benefit">
      <h3>Reduced Fixed Costs</h3>
      <p>£0.20 vs £0.25 per transaction</p>
    </div>
  </div>
</div>
```

## 🔄 Updates & Maintenance

### Automatic Updates
The calculator updates automatically without requiring changes to your Webflow site.

### Version Pinning
If you need a specific version:

```html
<iframe src="https://calculator.quidkey.com/v1.0" ...>
```

### Fallback Content
Add fallback content for when the calculator fails to load:

```html
<iframe src="https://calculator.quidkey.com" ...>
  <div class="calculator-fallback">
    <h3>Fee Calculator</h3>
    <p>Calculate your savings by <a href="/contact">contacting us directly</a>.</p>
  </div>
</iframe>
```

## 📞 Support

### Common Issues
- **Calculator not loading**: Check iframe src URL
- **Height issues**: Adjust iframe height attribute
- **Mobile display**: Ensure responsive container
- **Analytics not tracking**: Verify gtag is loaded

### Contact
For integration support, contact: tech@quidkey.com

---

*Last updated: [Current Date]*
