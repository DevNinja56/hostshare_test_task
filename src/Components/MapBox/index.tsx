import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxMap: React.FC<{
  data: { title: string; coordinates: [number] }[];
  className?: string;
}> = ({ data: markers, className }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXJzbGFudGhhaGVlbSIsImEiOiJjbGliYXo4cmQwMDFqM2ZtcWoxbnNseG42In0.O5LoR0Tsx91brj_MbtMGtg";
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-105.1270503289042, 30.770110596186115], // Center of Lahore city
      zoom: 3,
    });

    // const markers = [
    //   {
    //     title: "Location 1",
    //     coordinates: [74.3686, 31.5497], // Custom coordinates for Location 1 in Lahore
    //   },
    //   {
    //     title: "Location 2",
    //     coordinates: [74.335, 31.5229], // Custom coordinates for Location 2 in Lahore
    //   },
    //   {
    //     title: "Location 3",
    //     coordinates: [74.3572, 31.5809], // Custom coordinates for Location 3 in Lahore
    //   },
    //   {
    //     title: "Location 4",
    //     coordinates: [74.3844, 31.5215], // Custom coordinates for Location 4 in Lahore
    //   },
    // ];

    markers.forEach((marker: any) => {
      const markerElement = document.createElement("div");
      markerElement.style.background = "#fff";
      markerElement.style.width = "max-content";
      markerElement.style.padding = "8px 12px";
      markerElement.style.borderRadius = "30px";
      markerElement.style.fontWeight = "700";

      markerElement.innerText = "$" + marker.title;

      new mapboxgl.Marker(markerElement)
        .setLngLat(marker.coordinates)
        .addTo(map);
    });
  }, []);

  return (
    <div
      id="map-container"
      className={className}
      style={{ minHeight: "300px", position: "sticky" }}
    />
  );
};

export default MapBoxMap;
