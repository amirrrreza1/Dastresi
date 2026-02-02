export interface ColorType {
  name: string;
  hex: string;
}

export interface LookupItem {
  name: string;
}

export interface Product {
  id: string;
  created_at?: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  color: ColorType;
  features: string[];
  price: number;
  discount_price: number;
  image_url: string;
  is_new: boolean;
  is_special: boolean;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  categories: LookupItem[];
  brands: LookupItem[];
  onSave: (productData: Partial<Product>) => Promise<void>;
}

export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string, title: string) => void;
  onToggleFlag: (id: string, column: string, currentValue: boolean) => void;
  formatPrice: (price: number | string) => string;
}