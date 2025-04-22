import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BillingTerms() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);
  return (
    <div className="prose mt-20 prose-slate lg:prose-lg mx-auto px-4 py-8">
      <h1>FlippBidd Billing Terms &amp; Conditions</h1>
      <p>
        <strong>Effective Date:</strong> Date of Customer Purchase and Sign Up
      </p>

      <p>
        By purchasing, registering for, or otherwise activating any FlippBidd
        License (including but not limited to the Pro-License, WebApp Package,
        or Pro-Plus+ License), the user (“Customer,” “You,” or “User”) hereby
        acknowledges, agrees to, and is legally bound by the following terms and
        conditions:
      </p>

      <h2>1. Billing &amp; Subscription Terms</h2>
      <p>
        <strong>1.1</strong> All FlippBidd Licenses are billed on a recurring
        basis according to the selected License type:
      </p>
      <ul>
        <li>
          <strong>Pro-License:</strong> Billed monthly at $129.00 or according
          to specific promotional pricing.
        </li>
        <li>
          <strong>WebApp Package:</strong> Billed monthly at $199.00 or
          according to specific promotional pricing.
        </li>
        <li>
          <strong>Pro-Plus+ License:</strong> Billed monthly at $299.00 or
          according to specific promotional pricing.
        </li>
      </ul>
      <p>
        <strong>1.2</strong> Promotional pricing, including but not limited to
        the $199.00/2-Month WebApp Package or Pro-Plus+ promotional offer, shall
        apply only to the initial 60-day billing cycle. Upon expiration of the
        60-day promotional period, your account will automatically renew and be
        billed at the full then-current standard price for the selected License
        unless canceled in accordance with Section 3.
      </p>

      <h2>2. No Refund Policy</h2>
      <p>
        <strong>2.1</strong> All payments made to FlippBidd are final and
        non-refundable, regardless of usage, access, or performance. FlippBidd
        does not provide credits, refunds, or prorated billing for any partial
        subscription periods, unused features, or periods of inactivity.
      </p>
      <p>
        <strong>2.2</strong> By agreeing to these terms, you expressly waive any
        and all rights to dispute charges through your credit card provider,
        financial institution, or third-party payment processor. All disputes
        must be addressed directly with FlippBidd at{" "}
        <a href="mailto:Support@flippbidd.com">Support@flippbidd.com</a>.
      </p>

      <h2>3. Cancellation Policy</h2>
      <p>
        <strong>3.1</strong> Customers may cancel their subscription at any time
        by submitting a written cancellation request to{" "}
        <a href="mailto:Support@flippbidd.com">Support@flippbidd.com</a>.
      </p>
      <p>
        <strong>3.2</strong> All cancellations must be submitted at least thirty
        (30) calendar days in advance of the next billing cycle. Failure to
        provide timely notice will result in the automatic renewal and billing
        of your subscription.
      </p>
      <p>
        <strong>3.3</strong> No partial refunds or credits will be issued for
        cancellations made mid-cycle. Access will continue through the end of
        the paid term.
      </p>
      <p>
        <strong>3.4</strong> You may also cancel your subscription at any time
        by logging into the FlippBidd WebApp using your account credentials.
        Navigate to{" "}
        <strong>Profile &gt; Settings &gt; Cancel Membership</strong>. Upon
        cancellation, your account will remain active until your next
        subscription anniversary date.
      </p>
      <p>
        <strong>3.5</strong> If your License was purchased through the Apple App
        Store or Google Play Store, cancellation must be completed directly
        through your respective store account. FlippBidd cannot manage, cancel,
        or refund subscriptions made via third-party platforms.
      </p>

      <h2>4. Acceptance of Terms</h2>
      <p>
        <strong>4.1</strong> By purchasing, registering for, or using a
        FlippBidd License, you hereby affirm and acknowledge that you have read,
        understood, and agreed to be legally bound by this Billing Agreement.
      </p>
      <p>
        <strong>4.2</strong> You further agree that this Agreement constitutes a
        legally binding contract and forfeit your rights to dispute any billing
        or payment once a License has been purchased and/or automatically
        renewed.
      </p>
      <p>
        <strong>4.3</strong> These terms may be updated periodically. Continued
        use of the services constitutes acceptance of any revised terms.
      </p>

      <p>
        For questions or cancellation requests, please contact{" "}
        <a href="mailto:Support@flippbidd.com">Support@flippbidd.com</a>.
      </p>

      <p>
        <strong>Thank you for being a part of the FlippBidd Community.</strong>
      </p>
    </div>
  );
}
