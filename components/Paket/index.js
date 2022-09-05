// import result from "../../service/dummy/result";
import { useState, useEffect } from "react";
import axios from "axios";
import { addToLocalStorage } from "../../helpers/addToLocalStorage";

export default function Paket() {
  const [kurir, setKurir] = useState("");
  const [resi, setResi] = useState("");
  const [daftarKurir, setDaftarKurir] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/track?api_key=${process.env.NEXT_PUBLIC_API_KEY}&courier=${kurir}&awb=${resi}`
    );
    setLoading(false);
    setResult(data);

    addToLocalStorage("resi", resi, true);
    console.log("Result", data);
  };

  // console.log(loading);

  const getDaftarKurir = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/list_courier?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    setDaftarKurir(data);
    // console.log(data);
  };
  useEffect(() => {
    getDaftarKurir();
  }, [kurir, resi]);

  // console.log(kurir);
  return (
    <div className="container mx-auto mt-5 p-5 md:mt-12  md:p-3">
      <div className=" flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
        <form className="w-full rounded-md md:w-1/3 md:border md:border-gray-700/20 md:p-3">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Kurir</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(e) => setKurir(e.target.value)}
            >
              <option disabled selected>
                Pilih Ekspedisi
              </option>
              {daftarKurir.map((courier, index) => (
                <option key={index} value={courier.code}>
                  {courier.description}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Resi</span>
            </label>
            <input
              type="text"
              placeholder="Nomor resi"
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <button className="btn btn-primary mt-3 w-full" onClick={getResult}>
              Cari
            </button>
          </div>
        </form>
        {result === null ? (
          ""
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="grid grid-cols-2 gap-3 gap-x-8">
              <div className="col-span-2">
                <span className="text-sm">Nomor Resi</span>

                <p className="font-bold">{result?.data?.summary.awb}</p>
              </div>
              <div>
                <span className="text-sm">Kurir</span>
                <p className="font-bold">{result?.data?.summary.courier}</p>
              </div>
              <div>
                <span className="text-sm">Kode Servis</span>
                <p className="font-bold">{result?.data?.summary.service}</p>
              </div>
              <div>
                <span className="text-sm">Penjual</span>
                <p className="font-bold">{result?.data?.detail.shipper}</p>
              </div>
              <div>
                <span className="text-sm">Pembeli</span>
                <p className="font-bold">{result?.data?.detail.receiver}</p>
              </div>
              <div className="col-span-2">
                <span className="text-sm">Status</span>
                <p className="font-bold">
                  {result?.data?.summary.status === "DELIVERED"
                    ? "Diterima"
                    : "Dikirim"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {result?.data?.history?.map((his, index) => (
            <li className="mb-10 ml-4" key={index}>
              <div
                className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white ${
                  his === result?.data?.history[0]
                    ? "bg-violet-500"
                    : "bg-gray-200  dark:border-gray-900"
                } dark:bg-gray-700`}
              />
              <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                {his.date}
              </time>
              <p
                className={`mb-4 text-sm ${
                  his === result?.data?.history[0]
                    ? "font-semibold text-violet-500"
                    : " text-gray-500 dark:text-gray-400"
                }`}
              >
                {his.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
