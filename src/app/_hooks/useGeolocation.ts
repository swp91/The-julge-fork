import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  const isMobile = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod|android|blackberry|opera mini|iemobile|mobile/.test(
      userAgent
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation을 지원하지 않는 브라우저",
      }));
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      let errorMessage = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "사용자가 위치 정보 요청을 거부했습니다.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "위치 정보를 사용할 수 없습니다.";
          break;
        case error.TIMEOUT:
          errorMessage = "위치 정보를 가져오는 데 시간이 초과되었습니다.";
          break;
        default:
          errorMessage = "알 수 없는 오류가 발생했습니다.";
          break;
      }
      setLocation((prev) => ({
        ...prev,
        error: errorMessage,
      }));
    };

    let watchId: number | null = null;

    if (isMobile()) {
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback
      );
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return location;
};

export default useGeolocation;
