type TrackDataLayerProps = { [key: string]: any };

export const trackDataLayer = (data: TrackDataLayerProps) => {
  if ((window as any)?.dataLayer) {
    (window as any).dataLayer.push(data);
  }
};
