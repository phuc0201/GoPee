import { Coupon } from "@/models/promotion.model";

const Coupons: Coupon[] = [
  {
    id: 1,
    title: "Giảm giá 10%",
    description: "Giảm giá 10% cho đơn hàng đầu tiên",
    image: require("../assets/images/coupon/gift.png"),
  },
  {
    id: 2,
    title: "Mua 1 tặng 1",
    description: "Mua 1 sản phẩm tặng 1 sản phẩm cùng loại",
    image: require("../assets/images/coupon/gift.png"),
  },
  {
    id: 3,
    title: "Giảm giá 20%",
    description: "Giảm giá 20% cho đơn hàng từ 500.000đ",
    image: require("../assets/images/coupon/gift.png"),
  },
];
export default Coupons;
