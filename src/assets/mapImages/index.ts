import stop from "./stop.svg";
import stopSelected from "./stop-selected.svg";
import myLocationActive from "./my-location-active.svg";
import myLocationInactive from "./my-location-inactive.svg";

const raws = [
  { src: stop, name: "stop" },
  { src: stopSelected, name: "stop-selected" },
  { src: myLocationActive, name: "my-location-active" },
  { src: myLocationInactive, name: "my-location-inactive" },
];

export const mapImages = Object.fromEntries(
  raws.map((raw) => {
    const img = document.createElement("img");
    img.src = raw.src;
    return [raw.name, img];
  })
);
