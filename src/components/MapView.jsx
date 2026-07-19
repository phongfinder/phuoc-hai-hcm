// import { MapContainer, TileLayer, Marker, Popup, useMap , Tooltip} from "react-leaflet";
// import L from "leaflet";

// import { useEffect } from "react";




// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function FlyToStore({ selected }) {
//   const map = useMap();

//   useEffect(() => {
//     if (selected) {
//       map.flyTo([selected.lat, selected.lng], 18);
//     }
//   }, [selected]);

//   return null;
// }

// function StoreMarker({ store, selectedStore }) {
//   const markerRef = useRef();

//   useEffect(() => {
//     if (selectedStore?.id === store.id) {
//       markerRef.current?.openPopup();
//     }
//   }, [selectedStore]);

//   return (
//     <Marker position={[store.lat, store.lng]} ref={markerRef}>
//       <Popup>
//         <b>{store.name}</b>
//         <br />
//         {store.address}
//       </Popup>
//     </Marker>
//   );
// }


// export default function MapView({ stores, selectedStore }) {

  
//   return (
//     <MapContainer
//       center={[10.41777766582723, 107.2873191383831]}
//       zoom={17}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {stores.map((store) => (
//         <Marker key={store.id} position={[store.lat, store.lng]}>
//           {/* <Tooltip permanent direction="top" className="my-tooltip"> 
//               {store.name}<br />
//               {store.address}<br />
//             </Tooltip> */}
//             {/* <a href="www.google.com" >Mo GoogleMap</a> */}
//           <Popup>
//             <b>{store.name}</b>
//             <br />
//             {store.address}
//           </Popup>
//         </Marker>
//       ))}

//       <FlyToStore selected={selectedStore} />
//     </MapContainer>
//   );
// }







import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useRef } from "react";

/* fix icon leaflet */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* 🔥 Fly tới store khi click sidebar */
// function FlyToStore({ selectedStore }) {
//   const map = useMap();

//   useEffect(() => {
//     if (selectedStore) {
//       map.flyTo([selectedStore.lat, selectedStore.lng], 17, {
//         duration: 0.8,
//       });
//     }
//   }, [selectedStore, map]);

//   return null;
// }

function FlyToStore({ selectedStore }) {
  const map = useMap();

  useEffect(() => {
    if (selectedStore) {
      map.flyTo([selectedStore.lat, selectedStore.lng], 17);
    }
  }, [selectedStore, map]);

  return null;
}

/* 🔥 Marker riêng (có popup + auto open) */
function StoreMarker({ store, selectedStore }) {
  const markerRef = useRef();

  useEffect(() => {
    if (selectedStore?.id === store.id) {
      // delay nhẹ để đảm bảo flyTo xong
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 300);
    }
  }, [selectedStore, store.id]);

  return (
    <Marker position={[store.lat, store.lng]} ref={markerRef}>
      
      {/* 🔥 Tooltip dạng mini card */}
      {/* <Tooltip
        permanent
        direction="top"
        offset={[0, -10]}
        className="my-tooltip"
      >
        <div className="card">
          <div className="title">{store.name}</div>
          <div className="address">{store.address}</div>
        </div>
      </Tooltip> */}

      {/* 🔥 Popup chi tiết */}
      <Popup >
        <b>{store.name}</b>
        <br />
        {store.address}
      </Popup>

    </Marker>
  );
}

/* 🔥 Main MapView */
export default function MapView({ stores, selectedStore }) {
  return (
    <MapContainer
      center={[10.41777766582723, 107.2873191383831]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* render markers */}
      {stores.map((store) => (
        <StoreMarker
          key={store.id}
          store={store}
          selectedStore={selectedStore}
        />
      ))}

      {/* fly tới store */}
      <FlyToStore selectedStore={selectedStore} />
    </MapContainer>
  );
}