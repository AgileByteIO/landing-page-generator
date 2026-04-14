---
title: "Terms of Service"
description: "Our terms and conditions for using our services"
pubDate: 2024-01-15
author: "AgileByte"
---

By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.

## Acceptance of Terms

By creating an account or accessing our services, you acknowledge that you:

1. Have read and understood these Terms
2. Agree to be bound by them
3. Are at least 18 years old or have parental consent
4. Have the legal capacity to enter into this agreement

If you do not agree to these Terms, do not use our services.

## Service Description

We provide a platform for building and managing web applications with the following components:

- **Core Platform** - Hosting, deployment, and infrastructure
- **Developer Tools** - CLI, APIs, and SDKs
- **Analytics** - Performance monitoring and insights
- **Support** - Technical assistance and documentation

```javascript
// Example: API rate limiting
const rateLimitConfig = {
  free: { requests: 100, window: '1h' },
  pro: { requests: 1000, window: '1h' },
  enterprise: { requests: 10000, window: '1h' },
};

function checkRateLimit(plan, requests) {
  const limits = rateLimitConfig[plan];
  return requests <= limits.requests;
}
```

## User Accounts

### Registration

To create an account, you must provide:
- Valid email address
- Strong password (minimum 12 characters)
- Acceptance of Terms and Privacy Policy

### Account Responsibilities

You are responsible for:
- Maintaining confidentiality of your credentials
- All activities under your account
- Ensuring accurate account information
- Notifying us of unauthorized access

> "Use unique passwords for each service. Enable two-factor authentication for added security."

### Account Termination

We may suspend or terminate accounts that:

| Violation | Consequence |
|-----------|--------------|
| Non-payment | Suspended after 30 days |
| Abuse | Immediate suspension |
| Illegal activity | Immediate termination |
| Inactivity | Deleted after 12 months |

## Use of Service

You agree to use our services only for lawful purposes and in accordance with these Terms.

### Permitted Use

You may:
- Deploy applications for yourself or clients
- Access and use our APIs as documented
- Modify your applications within our platform
- Create derivative works from your own code

### Prohibited Use

You may not:
- Attempt to gain unauthorized access
- Interfere with service functionality
- Use services for illegal activities
- Resell our services without permission
- Upload malicious code or content
- Perform security testing without authorization

```typescript
// Prohibited content detection
const prohibitedContent = [
  'malware',
  'phishing',
  'copyrighted material',
  'harmful content',
  'illegal activities',
];

function checkContent(content: string): boolean {
  return prohibitedContent.some(
    term => content.toLowerCase().includes(term)
  );
}
```

## Intellectual Property

### Our Rights

The service and its original content, features, and functionality are owned by AgileByte and are protected by international copyright, trademark, and other intellectual property laws.

### Your Rights

You retain ownership of:
- Your applications and code
- Content you upload
- Data you provide

You grant us a license to:
- Host your applications
- Use your data to provide services
- Analyze anonymized data for improvements

### Trademarks

"AgileByte" and our logo are trademarks. You may not use them without prior written permission.

## Payment Terms

### Pricing

Our pricing is available at [agilebyte.com/pricing](#). All prices exclude applicable taxes.

### Billing

- **Subscription** - Billed monthly or annually
- **Usage-based** - Charged monthly in arrears
- **Overages** - Billed at published rates

### Refunds

```javascript
// Refund policy
const refundPolicy = {
  '14d': 'Full refund',
  '30d': 'Pro-rata for annual plans',
  '30d+': 'No refund, credit only',
};
```

We offer a 14-day money-back guarantee for new customers. After 30 days, only annual plan credits apply.

## Limitation of Liability

### Disclaimer

Our services are provided "as is" without warranties of any kind, either express or implied.

### Liability Limits

To the maximum extent permitted by law:

| Scenario | Our Liability |
|----------|----------------|
| Service outage | Refund of affected service |
| Data loss | Restoration from backups |
| Third-party services | Limited to documented SLA |
| Indirect damages | Excluded |

> "Our total liability shall not exceed the amount you paid in the 12 months preceding the claim."

## Indemnification

You agree to indemnify and hold harmless AgileByte from any claims arising from:

- Your use of the services
- Your applications or content
- Violation of these Terms
- Infringement of third-party rights

## Modifications

### Service Changes

We may modify, suspend, or discontinue any part of our services at any time with reasonable notice.

### Terms Updates

We may update these Terms periodically. We will:

1. Post updated Terms on our website
2. Notify you via email for material changes
3. Provide 30 days notice before changes take effect

Your continued use after changes constitutes acceptance.

## Dispute Resolution

### Negotiation

First, attempt to resolve disputes through good-faith negotiation.

### Mediation

If negotiation fails, submit to binding mediation in Tallinn, Estonia.

### Arbitration

If mediation fails, submit to arbitration under ICC Rules.

### Governing Law

These Terms are governed by Estonian law, excluding conflict of law provisions.

## Miscellaneous

### Entire Agreement

These Terms constitute the entire agreement between you and AgileByte.

### Severability

If any provision is found invalid, the remainder continues in effect.

### Waivers

Our failure to enforce any provision does not constitute a waiver.

### Assignment

You may not assign these Terms without our written consent.

## Contact Us

If you have any questions about these Terms, please contact us:

- **Email**: [legal@agilebyte.com](mailto:legal@agilebyte.com)
- **Address**: AgileByte OÜ, Tallinn, Estonia
- **Support**: [support.agilebyte.com](#)