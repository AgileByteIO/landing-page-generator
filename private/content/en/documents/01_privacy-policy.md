---
title: "Privacy Policy"
description: "Our privacy policy regarding data collection, usage, and protection"
pubDate: 2024-01-15
author: "AgileByte"
---

This Privacy Policy describes how we collect, use, and share your information when you use our services. We are committed to protecting your privacy and ensuring you have control over your personal data.

## Information We Collect

We collect information you provide directly to us, as well as automatically through your use of our services.

### Personal Information

When you create an account or interact with our services, we may collect:

- **Account data** - Name, email address, phone number
- **Profile information** - Profile picture, bio, preferences
- **Payment details** - Billing address, payment method (processed securely via Stripe)
- **Communication data** - Support tickets, feedback, surveys

```javascript
// Example: Data collection on account creation
const createAccount = async (userData) => {
  const { email, name } = userData;
  
  // Store only necessary fields
  await db.users.create({
    email: encrypt(email),
    name: hash(name), // pseudonymized
    createdAt: new Date(),
    consentFlags: userData.consents,
  });
};
```

### Automatically Collected Information

When you use our services, we automatically collect:

| Data Type | Purpose |
|-----------|---------|
| IP address | Security, geolocation |
| Browser type | Device compatibility |
| Pages visited | Analytics, improvements |
| Session duration | Usage patterns |
| Device ID | Account security |

> "We minimize data collection to only what's necessary for providing and improving our services."

## How We Use Your Information

We use the information we collect to provide, maintain, and improve our services, and to develop new ones.

### Primary Uses

1. **Service delivery** - Process transactions, provide customer support
2. **Personalization** - Tailor content and recommendations
3. **Communication** - Send updates, notifications, newsletters
4. **Analytics** - Understand usage patterns and optimize performance
5. **Security** - Detect fraud, prevent abuse, protect against attacks

### Legal Basis

Under GDPR and similar regulations, we process your data based on:

- **Consent** - You explicitly agree to processing
- **Contract** - Processing necessary to fulfill our service
- **Legitimate interest** - Business operations that don't override your rights
- **Legal obligation** - Compliance with applicable laws

## Data Sharing

We may share your information with third parties in the following circumstances:

### Service Providers

- **Cloud hosting** - AWS, Vercel (EU-based servers)
- **Payment processing** - Stripe (PCI DSS compliant)
- **Analytics** - Plausible (privacy-focused)
- **Email delivery** - Postmark (GDPR compliant)

### Legal Requirements

We may disclose information when:

```typescript
// Data disclosure decision tree
function shouldDiscloseData(request: LegalRequest): boolean {
  if (!request.valid) return false;
  if (request.emergency) return minimalRequired();
  if (request.subpoena) return challengeOrComply();
  return false;
}
```

- Required by law or regulation
- Necessary to enforce our terms
- Required to protect our rights or safety
- In connection with a merger or acquisition

## Your Rights

You have the following rights regarding your personal data:

### Access & Portability

Request a copy of your data in a portable format:
```bash
# Request your data export
POST /api/data-export
{
  "type": "full",
  "format": "json"
}
```

### Correction & Deletion

- **Rectify** - Correct inaccurate data
- **Erase** - Request deletion ("right to be forgotten")
- **Restrict** - Limit how we process your data
- **Object** - Opt out of certain processing

### Withdrawing Consent

You can withdraw consent at any time by:
- Visiting your [account settings](#)
- Using the unsubscribe link in emails
- Contacting [privacy@agilebyte.com](mailto:privacy@agilebyte.com)

## Security Measures

We implement robust security measures:

- **Encryption** - TLS 1.3 for data in transit
- **Hashing** - Argon2 for stored passwords
- **MFA** - Two-factor authentication available
- **Audits** - Regular security assessments
- **Backup** - Encrypted daily backups

> "We follow OWASP guidelines and conduct annual penetration testing."

## Data Retention

We retain personal data only as long as necessary:

| Data Category | Retention Period |
|---------------|------------------|
| Account data | Active + 2 years |
| Transaction history | 7 years (legal requirement) |
| Analytics data | 14 months (anonymized) |
| Marketing preferences | Until withdrawal |

## International Transfers

Your data may be processed outside your jurisdiction:

- **EU/EEA** - Subject to GDPR protections
- **US** - Under EU-US Data Privacy Framework
- **Other countries** - Standard contractual clauses

## Children's Privacy

Our services are not intended for children under 16. We do not knowingly collect data from children. If you believe we have, contact us immediately.

## Changes to This Policy

We may update this policy periodically. We will notify you of material changes via:

- Email notification
- Banner on our website
- In-app notification

**Last updated**: January 2024

## Contact Us

If you have any questions about this Privacy Policy, please contact us:

- **Email**: [privacy@agilebyte.com](mailto:privacy@agilebyte.com)
- **Address**: AgileByte OÜ, Tallinn, Estonia
- **DPO**: [dpo@agilebyte.com](mailto:dpo@agilebyte.com)