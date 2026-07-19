import { useState } from "react";

export default function Sidebar({ stores, onSelect }) {
// 	function removeVietnameseTones(str) {
//   return str

//     .normalize("NFD") // tách ký tự + dấu
//     .replace(/[\u0300-\u036f]/g, "") // xóa dấu
//     .replace(/đ/g, "d")
//     .replace(/Đ/g, "D")
//     .toLowerCase();
// }

  const normalize = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();


  const [search, setSearch] = useState("");

  // const filtered = stores.filter((s) =>
  //   removeVietnameseTones(s.name.toLowerCase()).includes(search.toLowerCase())
  // );

  const filtered = stores.filter((store) => {
  if (!search) return true;

  return normalize(store.name).includes(normalize(search));
  });

  return (
    <div className="sidebar">
      {/* <a href="/"><h2>&#127968; Phuoc Hai Room </h2>
      </a> */}
      
      <input
        placeholder="Tìm Resort, Hotel, Homestay"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="list">
        {filtered.map((store) => (
          <div
            key={store.id}
            className="item"
            onClick={() => onSelect(store)}
          >
            <b>&#x2713; &nbsp; {store.name}</b>
            <p>&#128663; {store.address}</p>
            <a href={store.linkGoogle} target="_blank" >&#8594; Gooogle Maps</a>
            <p>☎ &nbsp; {store.phone}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
}
