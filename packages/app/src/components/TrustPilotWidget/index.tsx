"use client";

import { useEffect, useRef } from "react";

type Props = {
  email: string;
  name: string;
  willId: string;
};

export default function TrustPilotWidget({}: Props) {
  const ref = useRef(null);

  useEffect(() => {
    if ((window as any)?.Trustpilot) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  /**
   * This Trustpilot widget is able to send emails inviting the customer to leave a review (the code below triggers this)
   * But we a bcc_address on in the sendWillCreatedWillOwnerEmail function to do this instead, so this code below is not needed
   */

  // const invitationParams = useMemo(
  //   () => ({
  //     recipientEmail: email,
  //     recipientName: name,
  //     referenceId: willId,
  //     source: "InvitationScript",
  //   }),
  //   [email, name, willId]
  // );

  // useEffect(() => {
  //   if (invitationEmailSent) return;
  //   if ((window as any)?.tp) {
  //     (window as any).tp?.("createInvitation", invitationParams);
  //     setInvitationEmailSent(true);
  //   } else {
  //     document?.addEventListener("DOMContentLoaded", () => {
  //       (window as any)?.tp?.("createInvitation", invitationParams);
  //       setInvitationEmailSent(true);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div
      id="trustbox"
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-AU"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="649e6c60d8dcf9c6bb7d415b"
      data-style-height="70px"
      data-style-width="100%"
      data-style-alignment="left"
    >
      <a
        href="https://au.trustpilot.com/review/surewill.com.au"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}
