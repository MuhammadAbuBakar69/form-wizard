import React, { useState } from 'react';
import './form-wizard_App.css';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Name is required.';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
    }

    if (step === 2) {
      if (!formData.street.trim()) {
        newErrors.street = 'Street address is required.';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required.';
      }
      if (!formData.state.trim()) {
        newErrors.state = 'State / Province is required.';
      }
      if (!formData.zip.trim()) {
        newErrors.zip = 'ZIP / Postal code is required.';
      } else if (!/^[a-zA-Z0-9\s\-]{3,10}$/.test(formData.zip)) {
        newErrors.zip = 'Invalid postal code format.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2)) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      notes: '',
    });
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="fw-container">
      <div className="fw-card">
        <header className="fw-header">
          <h1>Registration Wizard</h1>
          <p>Complete the steps below to finish your profile.</p>
        </header>

        {!isSubmitted ? (
          <>
            <div className="fw-progress">
              <div className={`fw-step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="fw-step-circle">{currentStep > 1 ? '✓' : '1'}</div>
                <span className="fw-step-label">Personal Info</span>
              </div>
              <div className="fw-line"></div>
              <div className={`fw-step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <div className="fw-step-circle">{currentStep > 2 ? '✓' : '2'}</div>
                <span className="fw-step-label">Address</span>
              </div>
              <div className="fw-line"></div>
              <div className={`fw-step-item ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="fw-step-circle">3</div>
                <span className="fw-step-label">Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="fw-form">
              {currentStep === 1 && (
                <div className="fw-step-content">
                  <h2>Step 1: Personal Details</h2>

                  <div className="fw-field">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'error-input' : ''}
                    />
                    {errors.fullName && <span className="fw-error">{errors.fullName}</span>}
                  </div>

                  <div className="fw-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <span className="fw-error">{errors.email}</span>}
                  </div>

                  <div className="fw-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error-input' : ''}
                    />
                    {errors.phone && <span className="fw-error">{errors.phone}</span>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="fw-step-content">
                  <h2>Step 2: Address Information</h2>

                  <div className="fw-field">
                    <label htmlFor="street">Street Address *</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="123 Main Street, Apt 4B"
                      value={formData.street}
                      onChange={handleChange}
                      className={errors.street ? 'error-input' : ''}
                    />
                    {errors.street && <span className="fw-error">{errors.street}</span>}
                  </div>

                  <div className="fw-row">
                    <div className="fw-field">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="San Francisco"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error-input' : ''}
                      />
                      {errors.city && <span className="fw-error">{errors.city}</span>}
                    </div>

                    <div className="fw-field">
                      <label htmlFor="state">State / Province *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="CA"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? 'error-input' : ''}
                      />
                      {errors.state && <span className="fw-error">{errors.state}</span>}
                    </div>
                  </div>

                  <div className="fw-field">
                    <label htmlFor="zip">ZIP / Postal Code *</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="94105"
                      value={formData.zip}
                      onChange={handleChange}
                      className={errors.zip ? 'error-input' : ''}
                    />
                    {errors.zip && <span className="fw-error">{errors.zip}</span>}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="fw-step-content">
                  <h2>Step 3: Review Your Information</h2>
                  <p className="fw-subtitle">Please verify your details before submitting.</p>

                  <div className="fw-review-section">
                    <div className="fw-review-group">
                      <h3>Personal Info</h3>
                      <div className="fw-review-item"><strong>Name:</strong> {formData.fullName}</div>
                      <div className="fw-review-item"><strong>Email:</strong> {formData.email}</div>
                      <div className="fw-review-item"><strong>Phone:</strong> {formData.phone}</div>
                    </div>

                    <div className="fw-review-group">
                      <h3>Address</h3>
                      <div className="fw-review-item"><strong>Street:</strong> {formData.street}</div>
                      <div className="fw-review-item"><strong>City/State:</strong> {formData.city}, {formData.state}</div>
                      <div className="fw-review-item"><strong>Postal Code:</strong> {formData.zip}</div>
                    </div>
                  </div>

                  <div className="fw-field">
                    <label htmlFor="notes">Additional Comments (Optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      placeholder="Any extra instructions or notes..."
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="fw-actions">
                {currentStep > 1 && (
                  <button type="button" onClick={handleBack} className="btn-secondary">
                    Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" onClick={handleNext} className="btn-primary">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn-submit">
                    Submit Order
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="fw-success">
            <div className="success-icon">🎉</div>
            <h2>Submission Successful!</h2>
            <p>Thank you, <strong>{formData.fullName}</strong>. Your details have been received.</p>
            <div className="fw-summary-box">
              <p><strong>Confirmation sent to:</strong> {formData.email}</p>
              <p><strong>Shipping to:</strong> {formData.street}, {formData.city}, {formData.state} {formData.zip}</p>
            </div>
            <button onClick={handleReset} className="btn-primary">
              Start New Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
