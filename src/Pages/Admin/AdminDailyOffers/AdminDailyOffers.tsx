import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchDailyOffersData } from "../../../Redux/DailyOffers/DailyOffersAction";
import { Link } from "react-router-dom";

type DailyOfferItem = {
  id: any;
  src: string;
  alt: string;
  Des: string;
  PurePrice: string;
  Off: string;
  Price: string;
};

type DailyOffersData = {
  DailyOffersBig: DailyOfferItem[];
  DailyOfferSmall: DailyOfferItem[];
};

const AdminDailyOffers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOffer, setEditOffer] = useState<DailyOfferItem | null>(null);
  const [editType, setEditType] = useState<"big" | "small" | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState<DailyOfferItem>({
    id: "",
    src: "",
    alt: "",
    Des: "",
    PurePrice: "", 
    Off: "",
    Price: "",
  });
  const [newOfferType, setNewOfferType] = useState<"big" | "small">("big");

  const handleNewOfferChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const { dailyOffers, loading, error } = useSelector(
    (state: any) =>
      state.dailyOffers as {
        dailyOffers: DailyOffersData;
        loading: boolean;
        error: string;
      }
  );

  useEffect(() => {
    dispatch(fetchDailyOffersData());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const handleEdit = (offer: DailyOfferItem, type: "big" | "small") => {
    setEditOffer({ ...offer });
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editOffer) return;
    setEditOffer({ ...editOffer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editOffer || !editType) return;

    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "تغییرات ثبت شوند؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، ذخیره کن",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get("http://localhost:3001/DailyOffers");
          let updatedOffers = response.data;

          if (editType === "big") {
            updatedOffers.DailyOffersBig = updatedOffers.DailyOffersBig.map(
              (item: DailyOfferItem) =>
                item.id === editOffer.id ? editOffer : item
            );
          } else {
            updatedOffers.DailyOfferSmall = updatedOffers.DailyOfferSmall.map(
              (item: DailyOfferItem) =>
                item.id === editOffer.id ? editOffer : item
            );
          }

          await axios.put("http://localhost:3001/DailyOffers", updatedOffers);
          Swal.fire("ویرایش شد!", "آیتم با موفقیت به‌روزرسانی شد.", "success");
          setIsModalOpen(false);
          dispatch(fetchDailyOffersData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ویرایش آیتم پیش آمد.", "error");
        }
      }
    });
  };

  const handleDelete = async (id: number, type: "big" | "small") => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این آیتم برای همیشه حذف خواهد شد!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get("http://localhost:3001/DailyOffers");
          let updatedOffers = response.data;

          if (type === "big") {
            updatedOffers.DailyOffersBig = updatedOffers.DailyOffersBig.filter(
              (item: DailyOfferItem) => item.id !== id
            );
          } else {
            updatedOffers.DailyOfferSmall =
              updatedOffers.DailyOfferSmall.filter(
                (item: DailyOfferItem) => item.id !== id
              );
          }

          await axios.put("http://localhost:3001/DailyOffers", updatedOffers);
          Swal.fire("حذف شد!", "آیتم با موفقیت حذف شد.", "success");
          dispatch(fetchDailyOffersData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف آیتم پیش آمد.", "error");
        }
      }
    });
  };

  const handleAddNewOffer = async () => {
    if (
      !newOffer.src ||
      !newOffer.alt ||
      !newOffer.Des ||
      !newOffer.Price ||
      !newOffer.PurePrice ||
      !newOffer.Off
    ) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: "لطفاً همه فیلدها را پر کنید.",
        confirmButtonText: "باشه",
      });
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/DailyOffers");
      let updatedOffers = response.data;

      const newOfferWithId = { ...newOffer, id: Date.now() };

      if (newOfferType === "big") {
        updatedOffers.DailyOffersBig.push(newOfferWithId);
      } else {
        updatedOffers.DailyOfferSmall.push(newOfferWithId);
      }

      await axios.put("http://localhost:3001/DailyOffers", updatedOffers);

      Swal.fire("افزوده شد!", "آیتم جدید با موفقیت اضافه شد.", "success");

      setIsAddModalOpen(false);
      setNewOffer({
        id: "",
        src: "",
        alt: "",
        Des: "",
        Price: "",
        PurePrice: "",
        Off: "",
      });
      setNewOfferType("big");
      dispatch(fetchDailyOffersData());
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن آیتم پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="text-red-500 text-2xl text-center">خطا: {error}</div>
      )}

      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Daily Offers
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {[
              ...dailyOffers.DailyOffersBig.map((item) => ({
                ...item,
                type: "big" as const,
              })),
              ...dailyOffers.DailyOfferSmall.map((item) => ({
                ...item,
                type: "small" as const,
              })),
            ].map((item) => (
              <div
                key={item.id}
                className="w-[70%] md:w-[44%] lg:w-[31%] bg-[#2A7FFF] p-3 rounded-md text-white"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="object-cover rounded-md"
                />
                <p className="text-center text-md mt-1">Alt: {item.alt}</p>
                <p className="text-center text-sm h-[75px] leading-[25px] flex items-center justify-center my-2">
                  {item.Des}
                </p>
                <p className="text-center text-sm mb-1">
                  قیمت اصلی: {item.PurePrice}
                </p>
                <p className="text-center text-sm mb-1">تخفیف: {item.Off}</p>
                <p className="text-center text-sm mb-1">
                  قیمت با تخفیف: {item.Price} تومان
                </p>
                <p className="text-center text-sm mb-1">
                  نوع آیتم: {item.type === "big" ? "اصلی" : "فرعی"}
                </p>
                <div className="flex items-center justify-center gap-2 p-3">
                  <button
                    className="AdminPageRedButton"
                    onClick={() => handleDelete(item.id, item.type)}
                  >
                    Delete
                  </button>
                  <button
                    className="AdminPageEditButton"
                    onClick={() => handleEdit(item, item.type)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="AdminPageAddButton"
          >
            Add
          </button>

          <Link to="/Admin" className="AdminPageBackButton">
            Back
          </Link>

          {isModalOpen && editOffer && (
            <div
              className="fixed inset-0 bg-black/50 flex justify-center items-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4">ویرایش</h2>
                <label htmlFor="src" className="block mt-1 text-sm">
                  آدرس تصویر
                </label>
                <input
                  type="text"
                  name="src"
                  value={editOffer.src}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mb-1"
                  placeholder="آدرس تصویر"
                />
                <label htmlFor="alt" className="block mt-1 text-sm">
                  Alt
                </label>
                <input
                  type="text"
                  name="alt"
                  value={editOffer.alt}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mb-1"
                  placeholder="Alt"
                />
                <label htmlFor="Des" className="block mt-1 text-sm">
                  توضیحات
                </label>
                <textarea
                  name="Des"
                  value={editOffer?.Des?.toString() || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="توضیحات"
                  rows={2}
                />
                <label htmlFor="PurePrice" className="block mt-1 text-sm">
                  قیمت اصلی
                </label>
                <input
                  type="text"
                  name="PurePrice"
                  value={editOffer.PurePrice}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mb-1"
                  placeholder="قیمت اصلی"
                />
                <label htmlFor="Off" className="block mt-1 text-sm">
                  تخفیف
                </label>
                <input
                  type="text"
                  name="Off"
                  value={editOffer.Off}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mb-1"
                  placeholder="تخفیف"
                />
                <label htmlFor="Price" className="block mt-1 text-sm">
                  قیمت با تخفیف
                </label>
                <input
                  type="text"
                  name="Price"
                  value={editOffer.Price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mb-1"
                  placeholder="قیمت پس از تخفیف"
                />
                <div className="flex justify-between mt-4">
                  <button
                    className="AdminPageRedButton"
                    onClick={() => setIsModalOpen(false)}
                  >
                    لغو
                  </button>
                  <button
                    className="AdminPageGreenButton"
                    onClick={handleUpdate}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </div>
          )}

          {isAddModalOpen && (
            <div
              className="fixed inset-0 bg-black/50 flex justify-center items-center"
              onClick={() => setIsAddModalOpen(false)}
            >
              <div
                className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4">
                  افزودن پیشنهاد روزانه
                </h2>
                <input
                  type="text"
                  name="src"
                  value={newOffer.src}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="آدرس تصویر"
                />
                <input
                  type="text"
                  name="alt"
                  value={newOffer.alt}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Alt"
                />
                <textarea
                  name="Des"
                  value={newOffer.Des}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="توضیحات"
                  rows={2}
                />
                <input
                  type="text"
                  name="PurePrice"
                  value={newOffer.PurePrice}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="قیمت"
                />
                <input
                  type="text"
                  name="Off"
                  value={newOffer.Off}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="تخفیف"
                />
                <input
                  type="text"
                  name="Price"
                  value={newOffer.Price}
                  onChange={handleNewOfferChange}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder=" قیمت پس از تخفیف"
                />
                <select
                  className="w-full p-2 border rounded-md mb-2"
                  value={newOfferType}
                  onChange={(e) =>
                    setNewOfferType(e.target.value as "big" | "small")
                  }
                >
                  <option value="big">پیشنهاد اصلی</option>
                  <option value="small">پشنهاد فرعی</option>
                </select>

                <div className="flex justify-between mt-4">
                  <button
                    className="AdminPageRedButton"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    لغو
                  </button>
                  <button
                    className="AdminPageGreenButton"
                    onClick={handleAddNewOffer}
                  >
                    افزودن
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminDailyOffers;
