import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../../../supabase";
import protectedAction from "../../../../../Utils/guestFunction";
import { ColorType, Product, ProductModalProps } from "../Type";
import { POPULAR_COLORS } from "../../../../../Utils/Colors";
import { toast } from "react-toastify";

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  categories,
  brands,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState<ColorType | null>(null);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(["", "", "", ""]);
  const [inventory, setInventory] = useState("");

  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setTitle(productToEdit.title);
        setDescription(productToEdit.description);
        setBrand(productToEdit.brand);
        setCategory(productToEdit.category);
        setColor(productToEdit.color);
        setPrice(productToEdit.price.toString());
        setInventory(productToEdit.inventory.toString());
        setDiscountPrice(productToEdit.discount_price.toString());
        setImageUrl(productToEdit.image_url);
        const feats = [...productToEdit.features];
        while (feats.length < 4) feats.push("");
        setFeatures(feats);
      } else {
        setTitle("");
        setDescription("");
        setBrand("");
        setCategory("");
        setCategory("");
        setColor(null);
        setPrice("");
        setDiscountPrice("");
        setImageUrl(null);
        setFeatures(["", "", "", ""]);
      }
    }
  }, [isOpen, productToEdit]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    const fileName = `products/${Date.now()}-${file.name}`;
    try {
      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
        setImageUrl(data.publicUrl);
      }
    } catch (error) {
      toast("خطا در بارگذاری تصویر محصول: " + (error as Error).message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeats = [...features];
    newFeats[index] = value;
    setFeatures(newFeats);
  };

  const cleanNumber = (val: string) => {
    return val.replace(/,/g, "");
  };

  const handleSubmit = async () => {
    const validFeatures = features.filter((f) => f.trim() !== "");

    if (
      !title ||
      !imageUrl ||
      !brand ||
      !category ||
      !price ||
      !discountPrice ||
      !color ||
      !inventory
    ) {
      Swal.fire("خطا", "لطفا تمام فیلدها از جمله رنگ را انتخاب کنید", "error");
      return;
    }

    if (validFeatures.length < 2) {
      Swal.fire("خطا", "لطفا حداقل ۲ ویژگی بنویسید", "error");
      return;
    }

    const cleanPrice = Number(cleanNumber(price));
    const cleanDiscountPrice = Number(cleanNumber(discountPrice));
    const cleanInventory = Number(cleanNumber(inventory));

    if (
      isNaN(cleanPrice) ||
      isNaN(cleanDiscountPrice) ||
      cleanPrice <= 0 ||
      cleanDiscountPrice <= 0 ||
      cleanInventory <= 0
    ) {
      Swal.fire("خطا", "لطفا قیمت‌ها را به درستی وارد کنید", "error");
      return;
    }

    setIsSubmitting(true);

    const payload: Partial<Product> = {
      title,
      description,
      brand,
      category,
      color: color,
      inventory: cleanInventory,
      features: validFeatures,
      price: cleanPrice,
      discount_price: cleanDiscountPrice,
      image_url: imageUrl,
    };

    await onSave(payload);
    setIsSubmitting(false);
  };

  const formatDisplay = (val: string | number) => {
    if (!val) return "";
    const num = val.toString().replace(/,/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
        <div className="p-3 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {productToEdit ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6! h-6! text-gray-500" />
          </button>
        </div>

        <div className="p-3 grid md:grid-cols-12 gap-6 overflow-y-auto">
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">
                تصویر محصول
              </label>
              <div className="relative h-64 w-full border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden hover:border-blue-500 transition-colors">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-full h-full object-contain p-2"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload className="w-10! h-10! mb-2" />
                    <span className="text-xs">کلیک برای آپلود</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {imageUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="w-8! h-8! border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">توضیحات</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-40 rounded-xl border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">عنوان</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-200 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">برند</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 bg-white outline-none"
                >
                  <option value="">انتخاب...</option>
                  {brands.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">دسته</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 bg-white outline-none"
                >
                  <option value="">انتخاب...</option>
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">رنگ</label>
                <select
                  value={color ? JSON.stringify(color) : ""}
                  onChange={(e) =>
                    setColor(e.target.value ? JSON.parse(e.target.value) : null)
                  }
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 bg-white outline-none"
                >
                  <option value="">انتخاب...</option>
                  {POPULAR_COLORS.map((c) => (
                    <option key={c.name} value={JSON.stringify(c)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">
                  موجودی
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formatDisplay(inventory)}
                  onChange={(e) => {
                    const rawValue = cleanNumber(e.target.value);
                    if (/^\d*$/.test(rawValue)) {
                      setInventory(rawValue);
                    }
                  }}
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 outline-none text-left font-sans"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">
                  قیمت اصلی (تومان)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formatDisplay(price)}
                  onChange={(e) => {
                    const rawValue = cleanNumber(e.target.value);
                    if (/^\d*$/.test(rawValue)) {
                      setPrice(rawValue);
                    }
                  }}
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 outline-none text-left font-sans"
                  placeholder="0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">
                  قیمت با تخفیف (تومان)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formatDisplay(discountPrice)}
                  onChange={(e) => {
                    const rawValue = cleanNumber(e.target.value);
                    if (/^\d*$/.test(rawValue)) {
                      setDiscountPrice(rawValue);
                    }
                  }}
                  className="w-full h-11 rounded-xl border border-green-200 bg-green-50 px-3 outline-none text-left font-sans"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
              <label className="text-xs font-bold text-gray-500 block mb-2">
                ویژگی‌ها (حداقل ۲ مورد)
              </label>
              {features.map((feat, index) => (
                <input
                  key={index}
                  type="text"
                  value={feat}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`ویژگی ${index + 1}`}
                  className="w-full h-9 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t bg-gray-50 flex gap-3 sticky bottom-0 z-10">
          <button
            onClick={() => protectedAction(handleSubmit)}
            disabled={isSubmitting || imageUploading}
            className="flex-1 h-12 bg-[var(--color-PrimeBlue)] text-white font-bold rounded-xl hover:bg-[var(--color-SecondaryBlue)] transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {isSubmitting ? "در حال پردازش..." : "ذخیره تغییرات"}
          </button>
          <button
            onClick={onClose}
            className="px-8 h-12 border border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
