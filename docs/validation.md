# Validation Rules for Tangible Savers App

## Input Validation Rules

### User Profile
- Username: 3-20 characters, alphanumeric and underscores only
- Email: Valid email format
- Phone: Valid phone number format (10-15 digits)

### Payment Validation
- Amount: Must be positive number, min 0.01 Pi
- Transaction ID: Required, non-empty string
- Payment status: Must be valid status (pending, approved, completed, failed)

### Authentication
- API Key: Required, min 32 characters
- Pi Username: Required, valid Pi Network username format

### General
- All required fields must not be empty
- Strings must be properly sanitized
- Numbers must be within acceptable ranges

