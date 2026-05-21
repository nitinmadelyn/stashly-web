import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Stashly",
  description: "How Stashly collects, uses, and protects your personal information.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 21, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section
          className="pt-32 pb-12"
          style={{ backgroundColor: "#F9F8FF", borderBottom: "1px solid #E8E5F5" }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-sm font-medium" style={{ color: "#6C47FF" }}>
              Legal
            </p>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight"
              style={{ color: "#0F0A1E" }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <div className="prose-stashly space-y-10">

              <Block title="1. Who We Are">
                Stashly ("we", "us", "our") is a link-saving and organisation service
                developed and operated by <strong style={{ color: "#0F0A1E" }}>CHECKKIN</strong>.
                Our website is located at{" "}
                <a href="https://stashly.pro" style={{ color: "#6C47FF" }}>stashly.pro</a>.
                This policy explains what personal data we collect, why we collect it, and
                your rights over it.
              </Block>

              <Block title="2. Information We Collect">
                <SubHeading>Account information</SubHeading>
                When you sign up we collect your email address. If you sign in with Google
                we also receive your name and profile picture from Google, which you can
                update or remove at any time.

                <SubHeading>Content you create</SubHeading>
                Links, titles, tags, descriptions, collections, and any other content you
                save inside Stashly are stored on our servers so we can show them back to
                you.

                <SubHeading>Subscription and payment information</SubHeading>
                If you subscribe to Stashly Pro, payments are processed entirely by Apple
                (App Store) or Google (Google Play). We do not receive, store, or process
                your credit card number or any raw payment details. We receive only a
                subscription status indicator (active / expired / trial) from the respective
                platform to unlock Pro features.

                <SubHeading>Usage data</SubHeading>
                We collect standard server logs (IP address, browser/device type, pages
                visited, timestamps) to operate and improve the service. We do not sell
                this data.

                <SubHeading>Cookies</SubHeading>
                We use a single session cookie to keep you logged in. We do not use
                advertising or tracking cookies.
              </Block>

              <Block title="3. How We Use Your Information">
                <ul className="ml-5 mt-2 list-disc space-y-2" style={{ color: "#4B5563" }}>
                  <li>To provide and operate the Stashly service</li>
                  <li>To authenticate your identity and protect your account</li>
                  <li>To verify your active subscription and unlock Pro features</li>
                  <li>To send transactional emails (magic links, account notices)</li>
                  <li>To diagnose bugs and improve performance</li>
                  <li>To comply with legal obligations</li>
                </ul>
                We will never sell your personal data or use it for advertising.
              </Block>

              <Block title="4. Data Storage and Security">
                Your data is stored on Supabase infrastructure. All data is encrypted in
                transit (TLS 1.2+) and at rest (AES-256). Access to production data is
                restricted to authorised personnel only. We follow industry-standard
                security practices and conduct regular security reviews.
              </Block>

              <Block title="5. Sharing Your Data">
                We do not sell or rent your personal data. We share data only with:
                <ul className="ml-5 mt-2 list-disc space-y-2" style={{ color: "#4B5563" }}>
                  <li>
                    <strong style={{ color: "#0F0A1E" }}>Supabase</strong> — our database
                    and authentication provider
                  </li>
                  <li>
                    <strong style={{ color: "#0F0A1E" }}>Google</strong> — if you use
                    Google Sign-In (governed by{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#6C47FF" }}
                    >
                      Google&apos;s privacy policy
                    </a>
                    )
                  </li>
                  <li>
                    <strong style={{ color: "#0F0A1E" }}>Apple / Google</strong> — solely
                    to verify your in-app subscription status; your payment details remain
                    with the respective platform and are never shared with us
                  </li>
                  <li>
                    Law enforcement or regulators where required by applicable law
                  </li>
                </ul>
              </Block>

              <Block title="6. Public Collections">
                If you mark a collection as public, anyone with the link can view it. Links
                inside a public collection are visible without signing in. You can make a
                collection private again at any time, which immediately removes public
                access.
              </Block>

              <Block title="7. Data Retention">
                We retain your data for as long as your account is active. If you delete
                your account, we permanently delete all associated data within 30 days,
                except where we are required to retain it by law.
              </Block>

              <Block title="8. Your Rights">
                Depending on your location you may have rights to:
                <ul className="ml-5 mt-2 list-disc space-y-2" style={{ color: "#4B5563" }}>
                  <li>Access the personal data we hold about you</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data in a machine-readable format</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                To exercise any of these rights, email us at{" "}
                <a href="mailto:contact@stashly.pro" style={{ color: "#6C47FF" }}>
                  contact@stashly.pro
                </a>
                . We will respond within 30 days.
              </Block>

              <Block title="9. Children&apos;s Privacy">
                Stashly is not directed at children under 13. We do not knowingly collect
                personal data from children. If you believe a child has provided us with
                their data, please contact us and we will delete it promptly.
              </Block>

              <Block title="10. Changes to This Policy">
                We may update this policy from time to time. We will notify you of material
                changes by email or by a notice in the app. Continued use of Stashly after
                changes take effect constitutes acceptance of the updated policy.
              </Block>

              <Block title="11. Contact">
                Questions about this policy? Reach us at{" "}
                <a href="mailto:contact@stashly.pro" style={{ color: "#6C47FF" }}>
                  contact@stashly.pro
                </a>
                .
              </Block>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Local helpers

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="mb-4 text-xl font-semibold"
        style={{ color: "#0F0A1E" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-base leading-relaxed" style={{ color: "#4B5563" }}>
        {children}
      </div>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 mb-1 font-medium" style={{ color: "#0F0A1E" }}>
      {children}
    </p>
  );
}
