export type CustomEvents =
  | "add_payment_info"
  | "begin_checkout"
  | "complete_asset"
  | "complete_executor"
  | "complete_profile"
  | "complete_review"
  | "complete_role"
  | "complete_will"
  | "create_account"
  | "purchase"
  | "sign_in"
  | "storage_subscribe"
  | "storage_unsubscribe";

type TrackDataLayerProps = { event: CustomEvents; data?: Record<string, any> };

export const trackDataLayer = (data: TrackDataLayerProps) => {
  if ((window as any)?.dataLayer) {
    (window as any).dataLayer.push(data);
  }
};
