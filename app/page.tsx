'use client';

import React, { useMemo, useState } from 'react';
import Script from 'next/script';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  volume: string;
  message: string;
};

const DEFAULT_FORM: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  industry: 'Cosmetics',
  volume: '1K–10K labels/month',
  message: '',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Icon({ name, className }: { name: 'shield' | 'qr' | 'spark' | 'lock' | 'map' | 'cpu' | 'link' | 'check' | 'alert' | 'gauge'; className?: string }) {
  const common = 'h-5 w-5';
  const cls = cx(common, className);
  switch (name) {
    case 'shield':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    case 'qr':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h7v7H3z" />
          <path d="M14 3h7v7h-7z" />
          <path d="M3 14h7v7H3z" />
          <path d="M14 14h3v3h-3z" />
          <path d="M20 14v7" />
          <path d="M14 20h7" />
        </svg>
      );
    case 'spark':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z" />
          <path d="M19 15l.8 3 3.2.9-3.2.9L19 23l-.8-3-3.2-.9 3.2-.9.8-3z" />
        </svg>
      );
    case 'lock':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 11V8a5 5 0 0110 0v3" />
          <path d="M6 11h12v10H6z" />
          <path d="M12 15v3" />
        </svg>
      );
    case 'map':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
          <path d="M9 3v15" />
          <path d="M15 6v15" />
        </svg>
      );
    case 'cpu':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
      );
    case 'link':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 017-7l1 1" />
          <path d="M14 11a5 5 0 01-7 7l-1-1" />
          <path d="M8 12l8 0" />
        </svg>
      );
    case 'check':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case 'alert':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.3 3.2L1.9 18a2 2 0 001.7 3h16.8a2 2 0 001.7-3L13.7 3.2a2 2 0 00-3.4 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case 'gauge':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13a8 8 0 10-16 0" />
          <path d="M12 13l3-3" />
          <path d="M7 20h10" />
        </svg>
      );
    default:
      return null;
  }
}

function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {kicker ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
          {kicker}
        </div>
      ) : null}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-pretty text-slate-600">{desc}</p> : null}
    </div>
  );
}

function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function Anchor({ id }: { id: string }) {
  return <span id={id} className="relative -top-24 block" />;
}

function TrustMeter() {
  // purely visual; matches the idea of GREEN/YELLOW/RED + %
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">Trust Score</div>
          <div className="mt-1 text-xs text-slate-600">Real-time authenticity status per scan</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-900">
          <Icon name="gauge" className="h-4 w-4" />
          92%
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <div className="font-semibold text-emerald-800">GREEN</div>
          <div className="mt-1 text-emerald-700">Authentic</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="font-semibold text-amber-800">YELLOW</div>
          <div className="mt-1 text-amber-700">Reused / Risky</div>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
          <div className="font-semibold text-rose-800">RED</div>
          <div className="mt-1 text-rose-700">Likely Fake</div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        <span className="font-semibold">Graceful degradation:</span> if a user can’t capture a photo, verification still works via scan signals (capped trust).
      </div>
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Secure QR Demo / Sample Request (ASAS × Basiq360)');
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `Email: ${form.email}`,
        `Phone/WhatsApp: ${form.phone}`,
        `Country: ${form.country}`,
        `Industry: ${form.industry}`,
        `Monthly Volume: ${form.volume}`,
        `Message: ${form.message}`,
      ].join('\n')
    );
    // You can change this to the email you want to receive the leads on.
    return `mailto:info@asasglobalfze.com?subject=${subject}&body=${body}`;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    // Option A (default): mailto fallback — always works without backend.
    // Option B: Wire to an API route / CRM and replace this block.
    try {
      window.location.href = mailto;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Top bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50">
              <Icon name="shield" className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">ASAS Global FZE × Basiq360</div>
              <div className="text-xs text-slate-600">Secure QR Authentication</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">
              Features
            </a>
            <a href="#how" className="text-sm text-slate-600 hover:text-slate-900">
              How it works
            </a>
            <a href="#usecases" className="text-sm text-slate-600 hover:text-slate-900">
              Use cases
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Request a demo
            </a>
          </div>

          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 md:hidden"
          >
            Get demo
          </a>
        </div>
      </div>

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>Copy-sensitive patterns</Badge>
              <Badge>Image fingerprinting</Badge>
              <Badge>Signed payloads</Badge>
              <Badge>Trust scoring</Badge>
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Basiq360 Secure QR: Next‑Gen Anti‑Counterfeit Protection
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-slate-600">
              Counterfeit products erode trust, damage reputation, and create real safety risks. Secure QR adds a visual
              fingerprint + cryptographic security so copied or cloned codes get flagged in real time.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Book a demo / sample
              </a>
              <a
                href="#proof"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                See why it works
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <Icon name="alert" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Stop QR cloning</div>
                    <div className="mt-1 text-sm text-slate-600">Detect photocopies, reprints, and forwarded scans.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <Icon name="spark" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Turn verification into engagement</div>
                    <div className="mt-1 text-sm text-slate-600">Rewards, feedback, loyalty—only for verified units.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-2"><Icon name="qr" className="h-4 w-4" /> Mobile-first scanning</span>
              <span className="inline-flex items-center gap-2"><Icon name="map" className="h-4 w-4" /> Geo + device intelligence</span>
              <span className="inline-flex items-center gap-2"><Icon name="cpu" className="h-4 w-4" /> ML-ready logging</span>
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
              <div className="relative p-6 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon name="lock" />
                      Signed & encrypted payloads
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Prevent URL tampering and format guessing with cryptographically signed tokens.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon name="link" />
                      Pattern versioning
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Track algorithm versions for backward compatibility across label batches.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <TrustMeter />
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">Industrial printer ready</div>
                      <div className="mt-1 text-sm text-slate-600">Designed for production printing workflows.</div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium">Anser</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium">KGK</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium">Rynan</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    Request sample labels
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    Contact ASAS Global
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            kicker="Why Secure QR Codes Matter"
            title="Most QR authentication is easy to copy. Counterfeiters know that."
            desc="Standard QR codes can be photocopied, forwarded, or reprinted. Secure QR adds a visible fingerprint + tamper-resistant logic so copies degrade and clones get flagged."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <Card
              icon={<Icon name="alert" />}
              title="Counterfeits hurt trust & safety"
              desc="Fake cosmetics, apparel and packaged food can cause reputational damage—and real consumer risk."
            />
            <Card
              icon={<Icon name="qr" />}
              title="Basic QR = basic fraud"
              desc="A screenshot or photocopy can look identical to the original unless you add copy-sensitive design + verification."
            />
            <Card
              icon={<Icon name="gauge" />}
              title="You need real-time visibility"
              desc="Get scan-level signals: reuse, frequency, location jumps, and device intelligence—so you can act instantly."
            />
          </div>
        </div>
      </section>

      {/* Proof / RTB */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Anchor id="proof" />
        <SectionHeading
          kicker="Reasons to believe"
          title="Security that shows up on the label—and in your data"
          desc="Secure QR combines physical copy-resistance with digital verification signals, so counterfeit attempts become detectable, measurable, and stoppable."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                <Icon name="shield" />
              </div>
              <div>
                <div className="text-sm font-semibold">Copy-sensitive micro-pattern overlay</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Each code includes a secure graphic fingerprint designed to visibly degrade when photocopied or
                  reprinted—making counterfeits easier to catch.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm">
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Visual degradation on copy</div>
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Image-based verification</div>
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Blocks counterfeit rewards/access</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                <Icon name="lock" />
              </div>
              <div>
                <div className="text-sm font-semibold">Cryptographic signing + anti-tamper rules</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Signed tokens prevent URL tampering and format guessing. Scan events also evaluate reuse patterns,
                  location anomalies, and device fingerprints.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm">
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Signed & encrypted payloads</div>
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Geo + frequency anomaly flags</div>
              <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Real-time trust score per scan</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Anchor id="how" />
          <SectionHeading
            kicker="How it works"
            title="Three steps to authenticate every unit"
            desc="Designed for manufacturers, exporters and distributors—mobile-first for consumers, enterprise-ready for brands."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            <Card
              icon={<Icon name="qr" />}
              title="1) Generate & print Secure QR"
              desc="Each unit gets a unique registered fingerprint (hash + pattern signature) and a signed payload, ready for industrial printing."
            />
            <Card
              icon={<Icon name="shield" />}
              title="2) Scan for verification"
              desc="Consumers or channel users scan the label. Optional photo capture improves confidence with image fingerprint matching."
            />
            <Card
              icon={<Icon name="gauge" />}
              title="3) Trust score + actions"
              desc="GREEN/YELLOW/RED with percentage confidence. Trigger alerts, block counterfeit rewards, or route to support workflows."
            />
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="cpu" />
                ML-ready logging
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Every scan can create a TrustScoreLog record (device, geo, reuse, image hash signals). Use it later to
                train anomaly detection and evolve the model.
              </p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
                Includes algorithm version tracking for backward compatibility across older label batches.
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="map" />
                Geo + device intelligence
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Detect clones when the same code is scanned too frequently or from far-apart locations in an unrealistic
                time window.
              </p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
                First-scan logic helps validate genuine usage patterns and flags suspicious behavior in real time.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Anchor id="features" />
        <SectionHeading
          kicker="Key features"
          title="Built for anti-counterfeit, not just “scan & redirect”"
          desc="Secure QR combines copy-resistant design, image fingerprinting, cryptography, and risk scoring to stop QR cloning at scale."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<Icon name="shield" />}
            title="Copy-sensitive patterns"
            desc="Overlay patterns engineered to degrade when photocopied or reprinted—making replicas easier to detect."
          />
          <Card
            icon={<Icon name="cpu" />}
            title="Image fingerprinting (pHash)"
            desc="Compare the scanned image against the registered original to verify authenticity and spot suspicious copies."
          />
          <Card
            icon={<Icon name="gauge" />}
            title="Trust scoring"
            desc="GREEN/YELLOW/RED plus a percentage score for transparency—usable by both consumers and brand teams."
          />
          <Card
            icon={<Icon name="spark" />}
            title="Graceful degradation"
            desc="Verification still works without photo capture (reduced trust cap) so scans don’t break in the real world."
          />
          <Card
            icon={<Icon name="lock" />}
            title="Signed & encrypted payloads"
            desc="Cryptographically signed tokens prevent URL tampering, guessing, and format cloning attempts."
          />
          <Card
            icon={<Icon name="map" />}
            title="Geo + device anomaly flags"
            desc="Spot clones using location jumps, scan frequency, and device signals—then alert, block, or route workflows."
          />
          <Card
            icon={<Icon name="link" />}
            title="Pattern versioning"
            desc="Track algorithm versions and maintain backward compatibility across older printed batches."
          />
          <Card
            icon={<Icon name="qr" />}
            title="Industrial printer integration"
            desc="Production-ready workflows that link physical labels to the cloud, compatible with industrial coding setups."
          />
          <Card
            icon={<Icon name="shield" />}
            title="Unit-level authentication"
            desc="Authenticate every unit shipped, scanned, and sold—supporting track & trace and grey-market detection."
          />
        </div>
      </section>

      {/* What it means */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            kicker="What it means for your brand"
            title="Trust at the point of scan—plus real-time intelligence"
            desc="Secure QR protects revenue and reputation while unlocking verified engagement (rewards, feedback, loyalty)."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Brand outcomes</div>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Authenticate every unit shipped, scanned, or sold</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Detect grey-market leakage and fake resellers in real time</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Reduce counterfeit incentives by blocking access to rewards/auth flows</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Visibility dashboards for compliance, audits, and investigations</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Consumer experience</div>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Instant authenticity status with a clear trust score</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Guided next steps: buy confidently, report issues, or reach support</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Optional engagement: rewards, loyalty, surveys—only for verified units</div>
                <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Works reliably even when perfect image capture isn’t possible</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card
              icon={<Icon name="link" />}
              title="Blockchain timestamping (optional)"
              desc="Create immutable scan records for high-trust markets and regulated supply chains."
            />
            <Card
              icon={<Icon name="cpu" />}
              title="Anomaly detection AI (optional)"
              desc="Detect emerging threats using ML-driven patterns across geo, device, and reuse signals."
            />
            <Card
              icon={<Icon name="shield" />}
              title="Digital product passports (optional)"
              desc="Add sustainability, compliance, and certification data per unit—ready for global regulations."
            />
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Anchor id="usecases" />
        <SectionHeading
          kicker="Where this fits best"
          title="High-risk categories that need strong anti-counterfeit"
          desc="Secure QR is especially effective where lookalikes are common and brand trust is critical."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <Card
            icon={<Icon name="shield" />}
            title="Cosmetics & personal care"
            desc="Protect consumers and brand reputation with visible copy resistance + instant verification."
          />
          <Card
            icon={<Icon name="qr" />}
            title="Apparel & accessories"
            desc="Stop QR cloning across resellers and marketplaces with geo/device intelligence and reuse signals."
          />
          <Card
            icon={<Icon name="alert" />}
            title="Packaged food"
            desc="Reduce risk from counterfeit or grey-market inventory with unit-level authentication and traceability."
          />
        </div>
      </section>

      {/* Demo form */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Anchor id="demo" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                kicker="CTA"
                title="Request a demo or sample labels"
                desc="Tell us your product category and label volume. We’ll share a recommended setup (printing + verification + dashboards)."
              />

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">You’ll get</div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Sample Secure QR label designs</div>
                  <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Recommended verification flow for your consumers/channel</div>
                  <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Dashboard view for trust scores, anomalies, and alerts</div>
                  <div className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4" /> Integration plan for industrial printers</div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold">Prefer WhatsApp / Call?</div>
                <div className="mt-2 text-sm text-slate-700">
                  ASAS Global FZE • Ajman Freezone (UAE) • <span className="font-semibold">+971 504507678</span>
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  Email: <span className="font-semibold">info@asasglobalfze.com</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://api.whatsapp.com/send?phone=+971504507678"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp us
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    View contact details
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Script src="https://js-na2.hsforms.net/forms/embed/244642337.js" defer></Script>
<div className="hs-form-frame" data-region="na2" data-form-id="ae5903b6-df7b-4c95-8782-60535cb9b568" data-portal-id="244642337"></div>
              {/* <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Full name</label>
                    <input
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      required
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Work email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp</label>
                    <input
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                      placeholder="+91 / +971 ..."
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Country</label>
                    <input
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                      placeholder="UAE / India / ..."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Industry</label>
                    <select
                      value={form.industry}
                      onChange={(e) => update('industry', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                    >
                      <option>Cosmetics</option>
                      <option>Apparel</option>
                      <option>Packaged Food</option>
                      <option>Pharma</option>
                      <option>Electronics</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Monthly label volume</label>
                  <select
                    value={form.volume}
                    onChange={(e) => update('volume', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                  >
                    <option>1K–10K labels/month</option>
                    <option>10K–100K labels/month</option>
                    <option>100K–1M labels/month</option>
                    <option>1M+ labels/month</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-200 focus:ring-2"
                    placeholder="Tell us your products, current label setup, and what you want to prevent (cloning, grey market, etc.)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Opening email…' : 'Request demo / sample'}
                </button>

                {status === 'error' ? (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                    Something went wrong. Please try WhatsApp or email.
                  </div>
                ) : null}

                <div className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by ASAS Global FZE / Basiq360 regarding Secure QR.
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Anchor id="contact" />
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white">
                <Icon name="shield" className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">ASAS Global FZE × Basiq360</div>
                <div className="text-xs text-slate-600">Secure QR Authentication</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Enterprise-ready, mobile-first QR authentication to protect your brand from counterfeits—one secure scan at a time.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">Quick links</div>
            <div className="mt-3 grid gap-2 text-sm">
              <a className="text-slate-600 hover:text-slate-900" href="#features">Features</a>
              <a className="text-slate-600 hover:text-slate-900" href="#how">How it works</a>
              <a className="text-slate-600 hover:text-slate-900" href="#usecases">Use cases</a>
              <a className="text-slate-600 hover:text-slate-900" href="#demo">Request demo</a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 text-sm text-slate-600">
              <div>ASAS GLOBAL FZE, A1-321 Ajman Freezone, Ajman (UAE)</div>
              <div className="mt-1">Phone: <span className="font-semibold text-slate-900">+971 504507678</span></div>
              <div className="mt-1">Email: <span className="font-semibold text-slate-900">info@asasglobalfze.com</span></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://asasglobalfze.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Visit ASAS website
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Get started
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} ASAS Global FZE × Basiq360. Brand names mentioned are for compatibility context.
        </div>
      </footer>

      {/* Sticky CTA (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="text-xs">
            <div className="font-semibold">Secure QR Demo</div>
            <div className="text-slate-600">Get sample labels + setup plan</div>
          </div>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Request
          </a>
        </div>
      </div>
    </div>
  );
}
