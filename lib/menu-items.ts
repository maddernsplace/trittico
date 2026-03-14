export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  tags: string[];
}

export const orderableItems: MenuItem[] = [
  // Starters
  { id: "garlic-bread", name: "Garlic Bread", desc: "Garlic buttered ciabatta bread", price: 8, category: "Starters", tags: ["V"] },
  { id: "bruschetta", name: "Bruschetta al Pomodoro", desc: "Toasted sourdough, fresh Roma tomatoes, basil, olive oil", price: 14, category: "Starters", tags: ["V", "VG"] },
  { id: "arancini", name: "Arancini Trio", desc: "Three Italian rice balls — Bolognese, mushroom, or pumpkin", price: 22, category: "Starters", tags: [] },
  { id: "caprese", name: "Caprese Salad", desc: "Buffalo mozzarella, heirloom tomatoes, fresh basil, balsamic glaze", price: 18, category: "Starters", tags: ["V", "GF"] },
  { id: "calamari", name: "Calamari Fritti", desc: "Lightly crumbed calamari with aioli and lemon", price: 20, category: "Starters", tags: [] },
  // Pasta
  { id: "lasagna", name: "Lasagna Bolognese", desc: "Layers of pasta, homemade Bolognese, mozzarella & parmesan", price: 22, category: "Pasta", tags: [] },
  { id: "spaghetti-mare", name: "Spaghetti Mare", desc: "Mixed seafood, fresh tomatoes, white wine, hint of chilli", price: 35, category: "Pasta", tags: [] },
  { id: "penne-pollo", name: "Penne al Pollo", desc: "Chicken, mushroom, pancetta & parmesan in rosé sauce", price: 26, category: "Pasta", tags: [] },
  { id: "ravioli", name: "Ravioli Italiani", desc: "House-made spinach and ricotta ravioli, roasted pumpkin sauce", price: 28, category: "Pasta", tags: ["V"] },
  { id: "gnocchi", name: "Gnocchi della Casa", desc: "Potato gnocchi, fresh tomato sauce, parmesan & basil oil", price: 24, category: "Pasta", tags: ["V", "GF"] },
  { id: "carbonara", name: "Carbonara", desc: "Spaghetti, guanciale, egg yolk, pecorino romano, black pepper", price: 24, category: "Pasta", tags: [] },
  { id: "risotto", name: "Risotto ai Funghi", desc: "Wild mushroom risotto, truffle oil, parmesan & thyme", price: 26, category: "Pasta", tags: ["V", "GF"] },
  // Pizza
  { id: "margherita", name: "Margherita", desc: "San Marzano tomato, fior di latte mozzarella, fresh basil", price: 20, category: "Pizza", tags: ["V"] },
  { id: "prosciutto", name: "Prosciutto e Rucola", desc: "Prosciutto di Parma, rocket, parmesan, cherry tomatoes", price: 26, category: "Pizza", tags: [] },
  { id: "quattro-formaggi", name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, fontina, parmesan", price: 24, category: "Pizza", tags: ["V"] },
  { id: "diavola", name: "Diavola", desc: "Spicy Calabrese salami, mozzarella, chilli", price: 25, category: "Pizza", tags: [] },
  // Mains
  { id: "pollo-parm", name: "Pollo Parmigiana", desc: "Crumbed chicken breast, tomato sauce, mozzarella, ham", price: 30, category: "Mains", tags: [] },
  { id: "bistecca", name: "Bistecca alla Fiorentina", desc: "500g T-bone steak, truffle butter, rosemary potatoes", price: 52, category: "Mains", tags: ["GF"] },
  // Desserts
  { id: "tiramisu", name: "Tiramisu", desc: "Classic Italian tiramisu — espresso-soaked, mascarpone cream", price: 14, category: "Desserts", tags: ["V"] },
  { id: "panna-cotta", name: "Panna Cotta", desc: "Vanilla panna cotta with seasonal berry compote", price: 12, category: "Desserts", tags: ["V", "GF"] },
  { id: "cannoli", name: "Cannoli Siciliani", desc: "Crispy pastry, sweet ricotta, chocolate chips, orange zest", price: 13, category: "Desserts", tags: ["V"] },
  { id: "gelato", name: "Gelato del Giorno", desc: "Three scoops of chef's daily gelato selection", price: 11, category: "Desserts", tags: ["V", "GF"] },
  // Drinks
  { id: "sparkling", name: "San Pellegrino Sparkling", desc: "500ml sparkling mineral water", price: 5, category: "Drinks", tags: [] },
  { id: "soda", name: "Italian Soda", desc: "San Pellegrino Limonata, Aranciata, or Chinotto", price: 6, category: "Drinks", tags: [] },
  { id: "coffee", name: "Cappuccino / Latte / Flat White", desc: "Traditional Italian coffee", price: 5, category: "Drinks", tags: [] },
  { id: "aperol", name: "Aperol Spritz", desc: "Aperol, prosecco, soda, orange", price: 16, category: "Drinks", tags: [] },
];
