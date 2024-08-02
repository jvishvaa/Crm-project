/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";

const Map = (props) => {
  const [address, setAddress] = useState(props.google);
  const [mapPosition, setMapPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  let mapDisplay = null;
  let markerDisplay = null;
  let infowindowDisplay = null;
  let autocompleteDisplay = null;

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
      draggable: true,
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
      inputRef.current.value = address;
    } else {
      infowindow.close();
    }

    // map listener
    map.addListener("click", (e) => {
      marker.setPosition(e.latLng);
      infowindow.close();
      inputRef.current.value = "";
      onMarkerDragEnd(e);
    });

    // marker listener
    marker.addListener("click", () => {
      if (infowindow.getMap()) {
        infowindow.close(); // Close the infowindow if it's open
      } else {
        infowindow.open(map, marker); // Open the infowindow if it's closed
      }
    });
    marker.addListener("dragend", (e) => {
      onMarkerDragEnd(e);
    });
    marker.addListener("drag", (e) => {
      infowindow.close();
      inputRef.current.value = "";
    });

    // render autocomplete
    const { Autocomplete } = await google.maps.importLibrary("places");

    const autocomplete = new Autocomplete(inputRef.current, {
      fields: [
        "place_id",
        "address_components",
        "geometry",
        "formatted_address",
      ],
      strictBounds: false,
    });

    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      onPlaceSelected();
    });

    mapDisplay = map;
    markerDisplay = marker;
    infowindowDisplay = infowindow;
    autocompleteDisplay = autocomplete;
  };

  useEffect(() => {
    initMap();
  }, []);

  const onMarkerDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    const { Geocoder } = await google.maps.importLibrary("geocoding");
    const geocoder = new Geocoder();
    const latLng = new google.maps.LatLng(newLat, newLng);
    const request = {
      location: latLng,
    };

    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const address = results[0].formatted_address;
        setAddress(address || "");
        setMapPosition({
          lat: newLat,
          lng: newLng,
        });
        props.setMapData({
          address: address || "",
          mapPosition: { lat: newLat, lng: newLng },
        });
        infowindowDisplay.setPosition({
          lat: newLat + 0.0015,
          lng: newLng,
        });
        infowindowDisplay.setContent(address);
        infowindowDisplay.open(mapDisplay, markerDisplay);
        inputRef.current.value = address;
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const onPlaceSelected = () => {
    const place = autocompleteDisplay.getPlace();
    if (place) {
      const address = place.formatted_address;
      const latValue =
        place &&
        place.geometry &&
        place.geometry.location &&
        place.geometry.location.lat();
      const lngValue =
        place &&
        place.geometry &&
        place.geometry.location &&
        place.geometry.location.lng();
      setAddress(address || "");
      setMapPosition({
        lat: latValue,
        lng: lngValue,
      });
      props.setMapData({
        address: address || "",
        mapPosition: { lat: latValue, lng: lngValue },
      });
      infowindowDisplay.setPosition({
        lat: latValue + 0.0015,
        lng: lngValue,
      });
      infowindowDisplay.setContent(address);
      infowindowDisplay.open(mapDisplay, markerDisplay);
      markerDisplay.setPosition({ lat: latValue, lng: lngValue });
    }
  };

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: props.height,
        }}
      ></div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a location"
        className="th-14"
        style={{
          boxSizing: `border-box`,
          border: `1px solid grey`,
          width: `100%`,
          height: `32px`,
          padding: `0 12px`,
          outline: "none",
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          textOverflow: `ellipses`,
        }}
      />
    </>
  );
};

export default Map;
