const getGeolocation = (
  options?: PositionOptions
): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      options ?? {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  );
};

export default getGeolocation;
