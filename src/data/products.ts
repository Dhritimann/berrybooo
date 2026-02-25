export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export const plantCategories: Category[] = [
  {
    id: "fruit",
    name: "Grafted Fruit Saplings",
    description: "Grow your own fresh, organic fruits with our premium grafted saplings that ensure faster growth and better yield.",
    products: [
      {
        id: "f1",
        name: "Thai Chikoo",
        subtitle: "High yielding, sweet variety",
        price: "₹450",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c7d8a769-1dc9-427f-a917-d82eb16d1100.jpg",
        category: "fruit"
      },
      {
        id: "f2",
        name: "Mango Grafted",
        subtitle: "Alphonso / Kesar varieties",
        price: "₹650",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_7464989f-88b4-4e21-bfab-c15a67f5fdf3.jpg",
        category: "fruit"
      },
      {
        id: "f3",
        name: "Guava",
        subtitle: "Lalit / Allahabad Safeda",
        price: "₹350",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_0da7b4f0-4d43-4a99-a350-dbf879f4b6f7.jpg",
        category: "fruit"
      },
      {
        id: "f4",
        name: "Lemon",
        subtitle: "Seedless, all-season variety",
        price: "₹290",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_2dabdf7e-f00f-4e45-9bc1-70ddbb16a97d.jpg",
        category: "fruit"
      },
      {
        id: "f5",
        name: "Exotic Dragon Fruit",
        subtitle: "Red flesh premium variety",
        price: "₹400",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d8ce656b-b189-41a5-8cd4-bdea8a1b98c6.jpg",
        category: "fruit"
      }
    ]
  },
  {
    id: "flower",
    name: "Flower Plants",
    description: "Add vibrant colors and delightful fragrances to your home with our beautiful collection of blooming flowers.",
    products: [
      {
        id: "fl1",
        name: "Rose",
        subtitle: "Hybrid tea rose in various colors",
        price: "₹180",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_e1277605-255b-4776-a778-16f0390ed8a4.jpg",
        category: "flower"
      },
      {
        id: "fl2",
        name: "Hibiscus",
        subtitle: "Multi-petal large blooms",
        price: "₹220",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_71380184-4d70-4f6b-89fc-19bad5e68921.jpg",
        category: "flower"
      },
      {
        id: "fl3",
        name: "Jasmine",
        subtitle: "Intensely fragrant night blooming",
        price: "₹150",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_3f2c5877-2adf-4524-ab7e-a4ca69dbdf7b.jpg",
        category: "flower"
      },
      {
        id: "fl4",
        name: "Seasonal Marigold",
        subtitle: "Perfect for balconies and gardens",
        price: "₹80",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4100f56e-bfce-4141-916b-c3411c1ff795.jpg",
        category: "flower"
      }
    ]
  },
  {
    id: "indoor",
    name: "Indoor Plants",
    description: "Purify your indoor air and bring nature inside with our low-maintenance, aesthetic indoor plants.",
    products: [
      {
        id: "i1",
        name: "Snake Plant",
        subtitle: "NASA recommended air purifier",
        price: "₹350",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4afcbe25-ea7f-451f-aabc-9745d96b1a5f.jpg",
        category: "indoor"
      },
      {
        id: "i2",
        name: "Areca Palm",
        subtitle: "Adds a tropical vibe to your room",
        price: "₹550",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_5357363a-f1a4-47ae-8b27-44e25799bd1d.jpg",
        category: "indoor"
      },
      {
        id: "i3",
        name: "Money Plant",
        subtitle: "Easy to grow in water or soil",
        price: "₹120",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_56154cbf-4e50-472a-91c6-80abb63af368.jpg",
        category: "indoor"
      },
      {
        id: "i4",
        name: "Zamioculcas (ZZ) Plant",
        subtitle: "Thrives in low light conditions",
        price: "₹450",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_8b598980-44ce-495e-b15e-96405360c644.jpg",
        category: "indoor"
      },
      {
        id: "i5",
        name: "Spider Plant",
        subtitle: "Beautiful hanging indoor plant",
        price: "₹250",
        image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_42eed786-36ff-4697-a80c-271ad4e60b44.jpg",
        category: "indoor"
      }
    ]
  }
];
