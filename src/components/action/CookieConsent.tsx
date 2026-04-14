'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import type { CollectionEntry } from 'astro:content';

interface CookieConsent {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
}

interface Props {
  cookies: CollectionEntry<'landingpage'>[];
}

interface CookieConsentRef {
  openModal: () => void;
}

const COOKIE_NAME = 'cookie-consents';

const CookieConsent = forwardRef<CookieConsentRef, Props>(function CookieConsent({ cookies }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true)
  }));

  useEffect(() => {
    const savedConsents = localStorage.getItem(COOKIE_NAME);
    if (savedConsents) {
      try {
        const parsed = JSON.parse(atob(savedConsents));
        setConsents(parsed);
      } catch {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleOpenCookieModal = () => setIsOpen(true);
    window.addEventListener('open-cookie-modal', handleOpenCookieModal);
    return () => window.removeEventListener('open-cookie-modal', handleOpenCookieModal);
  }, []);

  const cookieItems: CookieConsent[] = cookies
    .filter((c) => c.id.includes('/cookie-consents/'))
    .map((c) => ({
      id: c.id,
      title: c.data.title,
      description: c.data.description,
      mandatory: c.data.mandatory || false,
    }));

  useEffect(() => {
    if (!isLoaded) return;

    if (Object.keys(consents).length === 0) {
      const initial: Record<string, boolean> = {};
      cookieItems.forEach((item) => {
        initial[item.id] = item.mandatory;
      });
      setConsents(initial);
    }
  }, [isLoaded, cookieItems]);

  const handleToggle = (id: string) => {
    if (cookieItems.find((c) => c.id === id)?.mandatory) return;
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const encoded = btoa(JSON.stringify(consents));
    localStorage.setItem(COOKIE_NAME, encoded);
    setIsOpen(false);
  };

  if (!isLoaded) return null;

  return (
    <>
      {isOpen && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <div className="cookie-header">
              <h2>Cookie Preferences</h2>
              <p>Manage your cookie settings. Essential cookies cannot be disabled.</p>
            </div>

            <div className="cookie-content">
              <div className="cookie-list">
                {cookieItems.map((item) => (
                  <div key={item.id} className="cookie-item">
                    <div className="cookie-info">
                      <span className="cookie-title">
                        {item.title}
                        {item.mandatory && <span className="cookie-badge">Required</span>}
                      </span>
                      <span className="cookie-description">{item.description}</span>
                    </div>
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={consents[item.id] || false}
                        onChange={() => handleToggle(item.id)}
                        disabled={item.mandatory}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="cookie-footer">
              <button onClick={handleSave} className="cookie-save-btn">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cookie-modal-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .cookie-modal {
          background: var(--background, #fff);
          border-radius: 1rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .cookie-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          flex-shrink: 0;
        }

        .cookie-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: var(--secondary, #1e293b);
        }

        .cookie-header p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-muted, #64748b);
        }

        .cookie-content {
          overflow-y: auto;
          flex: 1;
        }

        .cookie-list {
          padding: 1rem 1.5rem;
        }

        .cookie-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .cookie-item:last-child {
          border-bottom: none;
        }

        .cookie-info {
          flex: 1;
          margin-right: 1rem;
        }

        .cookie-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--secondary, #1e293b);
          margin-bottom: 0.25rem;
        }

        .cookie-badge {
          font-size: 0.625rem;
          padding: 0.125rem 0.375rem;
          background: var(--primary, #2563eb);
          color: white;
          border-radius: 9999px;
          font-weight: 500;
        }

        .cookie-description {
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
          line-height: 1.4;
        }

        .cookie-toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }

        .cookie-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: var(--border-color, #cbd5e1);
          border-radius: 26px;
          transition: 0.3s;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .cookie-toggle input:checked + .toggle-slider {
          background-color: var(--primary, #2563eb);
        }

        .cookie-toggle input:checked + .toggle-slider:before {
          transform: translateX(22px);
        }

        .cookie-toggle input:disabled + .toggle-slider {
          background-color: var(--primary, #2563eb);
          cursor: not-allowed;
        }

        .cookie-toggle input:disabled + .toggle-slider:before {
          transform: translateX(22px);
        }

        .cookie-footer {
          padding: 1rem 1.5rem 1.5rem;
          flex-shrink: 0;
        }

        .cookie-save-btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: var(--primary, #2563eb);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cookie-save-btn:hover {
          background: var(--primary-dark, #1d4ed8);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .cookie-modal {
            max-height: 85vh;
          }

          .cookie-header h2 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </>
  );
});

export default CookieConsent;