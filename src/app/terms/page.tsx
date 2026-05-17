import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Stashly",
  description: "The terms and conditions governing your use of Stashly.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 17, 2026";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-10">

              <Block title="1. Acceptance of Terms">
                By creating an account or using Stashly ("Service"), you agree to be bound by
                these Terms of Service ("Terms"). If you do not agree, do not use the Service.
                These Terms apply to all users, including visitors, free-plan users, and
                paid-plan users.
              </Block>

              <Block title="2. The Service">
                Stashly is a personal link-saving and organisation tool. We provide features
                to save, tag, search, and optionally share links. We reserve the right to
                modify, suspend, or discontinue any part of the Service at any time with
                reasonable notice.
              </Block>

              <Block title="3. Accounts">
                <ul className="ml-5 mt-2 list-disc space-y-2" style={{ color: "#4B5563" }}>
                  <li>You must be at least 13 years old to use Stashly.</li>
                  <li>
                    You are responsible for maintaining the security of your account and for
                    all activity that occurs under it.
                  </li>
                  <li>
                    You must provide a valid email address and keep your account information
                    accurate.
                  </li>
                  <li>One person may not maintain more than one free account.</li>
                </ul>
              </Block>

              <Block title="4. Acceptable Use">
                You agree not to use Stashly to:
                <ul className="ml-5 mt-2 list-disc space-y-2" style={{ color: "#4B5563" }}>
                  <li>Save or share content that is illegal, harmful, or violates others' rights</li>
                  <li>Distribute spam, malware, or phishing links</li>
                  <li>Attempt to gain unauthorised access to the Service or other users' data</li>
                  <li>Scrape, crawl, or use automated tools against the Service without permission</li>
                  <li>Impersonate any person or entity</li>
                  <li>
                    Use the Service in any way that could damage, overload, or impair its
                    infrastructure
                  </li>
                </ul>
                We reserve the right to suspend or terminate accounts that violate these rules.
              </Block>

              <Block title="5. Your Content">
                You retain ownership of all content you save in Stashly. By using the Service
                you grant us a limited, non-exclusive, royalty-free licence to store, display,
                and process your content solely to provide the Service to you.

                <p className="mt-3">
                  You are solely responsible for the content you save and share. We do not
                  proactively monitor user content but may remove content that violates these
                  Terms.
                </p>
              </Block>

              <Block title="6. Public Collections">
                When you make a collection public you acknowledge that anyone with the link can
                view it. You are responsible for ensuring any publicly shared content complies
                with applicable law and these Terms. You can make a collection private again
                at any time.
              </Block>

              <Block title="7. Plans and Payments">
                Stashly offers a free plan and may offer paid plans in the future. Paid plan
                pricing, features, and billing terms will be clearly communicated before
                purchase. All payments are non-refundable except where required by law or
                explicitly stated otherwise.
              </Block>

              <Block title="8. Intellectual Property">
                The Stashly name, logo, and all software comprising the Service are owned by
                Stashly and protected by intellectual property law. You may not copy,
                reproduce, or create derivative works from our intellectual property without
                written permission.
              </Block>

              <Block title="9. Disclaimer of Warranties">
                The Service is provided "as is" and "as available" without warranties of any
                kind, express or implied. We do not warrant that the Service will be
                uninterrupted, error-free, or free of harmful components. Use of the Service
                is at your own risk.
              </Block>

              <Block title="10. Limitation of Liability">
                To the fullest extent permitted by law, Stashly shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from
                your use of or inability to use the Service, even if advised of the possibility
                of such damages. Our total liability for any claim shall not exceed the amount
                you paid us in the 12 months preceding the claim.
              </Block>

              <Block title="11. Termination">
                You may delete your account at any time from the app settings. We may
                terminate or suspend your account immediately if you breach these Terms. Upon
                termination, your right to use the Service ceases and we will delete your data
                in accordance with our Privacy Policy.
              </Block>

              <Block title="12. Changes to These Terms">
                We may update these Terms from time to time. We will notify you of material
                changes by email or in-app notice at least 14 days before they take effect.
                Continued use of the Service after changes take effect constitutes acceptance.
              </Block>

              <Block title="13. Governing Law">
                These Terms are governed by and construed in accordance with applicable law.
                Any disputes arising from these Terms or your use of the Service shall be
                subject to the exclusive jurisdiction of the relevant courts.
              </Block>

              <Block title="14. Contact">
                Questions about these Terms? Contact us at{" "}
                <a href="mailto:legal@stashly.pro" style={{ color: "#6C47FF" }}>
                  legal@stashly.pro
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

// ─── Local helper ─────────────────────────────────────────────────────────────

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
