/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";

const Map = (props) => {
  const [address, setAddress] = useState(props.google);
  const [mapPosition, setMapPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });
  const mapRef = useRef(null);
  let mapDisplay = null;
  let markerDisplay = null;
  let infowindowDisplay = null;

  const initMap = async () => {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { Marker } = await google.maps.importLibrary("marker");

    const mapPositionLatLng = new google.maps.LatLng(
      mapPosition.lat,
      mapPosition.lng
    );

    // render map
    const map = new Map(mapRef.current, {
      center: mapPositionLatLng,
      zoom: props.zoom,
      mapId: "1",
      gestureHandling: "auto",
      draggableCursor: "pointer",
      mapTypeControl: false,
      streetViewControl: false,
    });

    // render marker
    const marker = new Marker({
      map: map,
      position: mapPositionLatLng,
    });

    // render infowindow
    const infowindow = new InfoWindow({
      map: map,
      content: address,
      position: {
        lat: mapPosition.lat + 0.0015,
        lng: mapPosition.lng,
      },
    });
    if (address) {
      infowindow.open(map, marker);
    } else {
      infowindow.close();
    }

    // marker listener
    marker.addListener("click", () => {
      if (infowindow.getMap()) {
        infowindow.close(); // Close the infowindow if it's open
      } else {
        infowindow.open(map, marker); // Open the infowindow if it's closed
      }
    });

    mapDisplay = map;
    markerDisplay = marker;
    infowindowDisplay = infowindow;
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: props.height,
        }}
      ></div>
    </>
  );
};

export default Map;
