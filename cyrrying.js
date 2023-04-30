// // Currying function
// const curry = (fn) => {
//   const arity = fn.length;
//   return function curried(...args) {
//     if (args.length >= arity) {
//       return fn(...args);
//     }
//     return (...moreArgs) => curried(...args, ...moreArgs);
//   };
// };

function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    } else {
      return (...moreArgs) => curried(...args, ...moreArgs);
    }
  };
}

// Base discount function
const applyDiscount = (discount, price) => price - price * (discount / 100);

// Curried discount function
const curriedApplyDiscount = curry(applyDiscount);

// Different discount types
const seasonalDiscount = curriedApplyDiscount(10); // 10% off
const userDiscount = curriedApplyDiscount(5); // 5% off
const couponDiscount = curriedApplyDiscount(20); // 20% off

// Product list
const products = [
  { name: "Product 1", price: 100 },
  { name: "Product 2", price: 150 },
  { name: "Product 3", price: 200 },
];

// Apply discounts to products
const discountedProducts = products.map((product) => ({
  ...product,
  price: seasonalDiscount(userDiscount(couponDiscount(product.price))),
}));

console.log(discountedProducts);
