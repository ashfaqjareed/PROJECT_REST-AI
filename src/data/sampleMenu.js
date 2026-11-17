// Sample menu for interactive simulator demonstrations
// Labelled as sample data. Realistic Sri Lankan items and plausible Rs. prices.
// Never uses any real restaurant name.

export const sampleVenue = {
  name: "Sample Cafe",
  badge: "Sample Cafe, demo data",
  disclaimer: "Sample data for demonstration purposes only"
};

export const sampleMenuCategories = [
  {
    id: "morning-breakfast",
    name: "Morning Breakfast",
    description: "Traditional Sri Lankan morning staples freshly prepared",
    items: [
      {
        id: "egg-hoppers",
        name: "Egg Hoppers (Set of 2)",
        price: 450,
        priceDisplay: "Rs. 450",
        description: "Crispy rimmed bowl hoppers with soft steamed egg centre",
        available: true,
        icon: "hopper"
      },
      {
        id: "string-hoppers",
        name: "String Hopper Platter",
        price: 550,
        priceDisplay: "Rs. 550",
        description: "10 steamed string hoppers served with coconut milk kiri hodi and sambol",
        available: true,
        icon: "hopper"
      },
      {
        id: "pol-rotti",
        name: "Pol Rotti with Lunu Miris",
        price: 320,
        priceDisplay: "Rs. 320",
        description: "Two freshly griddled coconut rottis with spicy crushed chili relish",
        available: true,
        icon: "rotti"
      }
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Cold and hot drinks served fresh from the beverage station",
    items: [
      {
        id: "iced-milo",
        name: "Iced Milo Dinosaur",
        price: 350,
        priceDisplay: "Rs. 350",
        description: "Chilled chocolate malt beverage topped with thick malt powder",
        available: true,
        icon: "drink"
      },
      {
        id: "ginger-tea",
        name: "Spiced Ceylon Plain Tea",
        price: 120,
        priceDisplay: "Rs. 120",
        description: "Hot black tea infused with fresh ginger root and crushed cardamom",
        available: true,
        icon: "drink"
      },
      {
        id: "rose-faluda",
        name: "Royal Rose Faluda",
        price: 480,
        priceDisplay: "Rs. 480",
        description: "Sweet rose syrup, basil seeds, vermicelli, and vanilla ice cream scoop",
        available: false, // Marked unavailable to demonstrate out-of-stock guard
        icon: "drink"
      }
    ]
  },
  {
    id: "side-dishes",
    name: "Side Dishes",
    description: "Quick short eats and counter pastry treats",
    items: [
      {
        id: "fish-cutlets",
        name: "Crispy Fish Cutlets (Pair)",
        price: 260,
        priceDisplay: "Rs. 260",
        description: "Seasoned mackerel fish and spiced potato croquettes in crumb coat",
        available: true,
        icon: "snack"
      },
      {
        id: "vegetable-rotti",
        name: "Triangular Vegetable Rotti",
        price: 90,
        priceDisplay: "Rs. 90",
        description: "Flaky griddled pocket stuffed with spicy potato and leek filling",
        available: true,
        icon: "rotti"
      }
    ]
  },
  {
    id: "main-course",
    name: "Main Course",
    description: "Hearty cooked-to-order specialties and wok items",
    items: [
      {
        id: "chicken-kottu",
        name: "Classic Chicken Kottu",
        price: 950,
        priceDisplay: "Rs. 950",
        description: "Chopped godamba rotti chopped with tender chicken, vegetables, and curry",
        available: true,
        icon: "kottu"
      },
      {
        id: "seafood-fried-rice",
        name: "Seafood Fried Rice",
        price: 1350,
        priceDisplay: "Rs. 1,350",
        description: "Fragrant basmati rice tossed with calamari, prawns, and chili paste",
        available: true,
        icon: "rice"
      }
    ]
  },
  {
    id: "lunch-rice-and-curry",
    name: "Lunch Rice And Curry",
    description: "Traditional midday clay pot selections with 3 vegetable accompaniments",
    items: [
      {
        id: "chicken-rice-curry",
        name: "Spicy Chicken Rice and Curry",
        price: 650,
        priceDisplay: "Rs. 650",
        description: "Steamed village rice with slow-simmered chicken curry and dhal",
        available: true,
        icon: "rice"
      },
      {
        id: "vegetarian-rice-curry",
        name: "Country Vegetable Rice Packet",
        price: 450,
        priceDisplay: "Rs. 450",
        description: "White or red rice with tempered dhal, pol sambol, and gotu kola mallum",
        available: true,
        icon: "rice"
      }
    ]
  }
];
