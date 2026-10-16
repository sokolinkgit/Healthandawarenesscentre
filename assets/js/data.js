/*
  HEALTH AND AWARENESS CENTRE — site content
  ------------------------------------------------------------
  Edit this file to change products, prices, reviews and testimonials.

  IMPORTANT before going live:
  - PRICES are placeholders (KES). Replace them with your real prices.
  - PRODUCT PHOTOS are AI-generated illustrative pack shots in a NeoLife
    style. Replace them with real photos of the products you sell.
  - REVIEWS are placeholders. Replace them with real reviews from your
    Google Business Profile (only publish reviews you can verify).
  - TRANSFORMATION photos are AI-generated illustrative before/after
    images. Replace them with real, consented customer photos, or keep
    the "Illustrative photos" label on the slideshow.
*/
window.HAC = {
  phone: "0768 897 642",
  phoneRaw: "0768897642",
  whatsappNumber: "254768897642", // international format, no "+"
  currency: "KES",

  // Products. `rx: true` marks items that need a consultation first.
  // `image` is the pack shot shown on the product card and in the cart.
  products: [
    {
      id: "pep-recovery",
      name: "Peptide Recovery Blend",
      category: "Peptides",
      price: 4500,
      image: "assets/img/products/pep-recovery.jpg",
      color: ["#0f766e", "#14b8a6"],
      short: "Peptide blend for recovery and general wellness support.",
      rx: false
    },
    {
      id: "pep-glow",
      name: "Peptide Skin Glow Complex",
      category: "Peptides",
      price: 3800,
      image: "assets/img/products/pep-glow.jpg",
      color: ["#7c3aed", "#c4b5fd"],
      short: "Peptide complex supporting a healthy, radiant complexion.",
      rx: false
    },
    {
      id: "wl-capsules",
      name: "Weight Management Capsules",
      category: "Weight Loss",
      price: 3500,
      image: "assets/img/products/wl-capsules.jpg",
      color: ["#be123c", "#fb7185"],
      short: "Supports healthy weight management alongside a balanced diet.",
      rx: true
    },
    {
      id: "wl-drops",
      name: "Appetite Balance Drops",
      category: "Weight Loss",
      price: 2900,
      image: "assets/img/products/wl-drops.jpg",
      color: ["#c2410c", "#fdba74"],
      short: "Helps you feel fuller between meals as part of a healthy plan.",
      rx: false
    },
    {
      id: "tummy-tea",
      name: "Tummy Flatten Herbal Tea",
      category: "Tummy Flattening",
      price: 1800,
      image: "assets/img/products/tummy-tea.jpg",
      color: ["#65a30d", "#bef264"],
      short: "Herbal blend that supports digestion and bloating relief.",
      rx: false
    },
    {
      id: "core-shake",
      name: "Core Slim Protein Shake",
      category: "Tummy Flattening",
      price: 3200,
      image: "assets/img/products/core-shake.jpg",
      color: ["#ca8a04", "#fde047"],
      short: "High-protein meal shake for a filling, balanced start to your day.",
      rx: false
    },
    {
      id: "prostate-formula",
      name: "Prostate Health Formula",
      category: "Prostate",
      price: 4200,
      image: "assets/img/products/prostate-formula.jpg",
      color: ["#1d4ed8", "#93c5fd"],
      short: "Supports healthy prostate function and everyday urinary comfort.",
      rx: false
    },
    {
      id: "prostate-complex",
      name: "Prostate Support Complex",
      category: "Prostate",
      price: 3000,
      image: "assets/img/products/prostate-complex.jpg",
      color: ["#0e7490", "#67e8f9"],
      short: "Plant-based complex with zinc and lycopene for men's wellness.",
      rx: false
    },
    {
      id: "neo-daily",
      name: "NeoLife Daily Nutrition Pack",
      category: "NeoLife",
      price: 5500,
      image: "assets/img/products/neo-daily.jpg",
      color: ["#047857", "#6ee7b7"],
      short: "Complete daily vitamins and minerals for the whole family.",
      rx: false
    },
    {
      id: "neo-immune",
      name: "NeoLife Immunity Booster",
      category: "NeoLife",
      price: 2800,
      image: "assets/img/products/neo-immune.jpg",
      color: ["#0369a1", "#7dd3fc"],
      short: "Vitamin C and zinc blend to support your natural defences.",
      rx: false
    },
    {
      id: "neo-energy",
      name: "NeoLife Energy Multivitamin",
      category: "NeoLife",
      price: 2400,
      image: "assets/img/products/neo-energy.jpg",
      color: ["#b45309", "#fcd34d"],
      short: "B-vitamin multivitamin for everyday energy and focus.",
      rx: false
    },
    {
      id: "neo-omega",
      name: "NeoLife Omega Heart Support",
      category: "NeoLife",
      price: 3400,
      image: "assets/img/products/neo-omega.jpg",
      color: ["#9f1239", "#fda4af"],
      short: "Omega-3 fish oil to support heart and joint health.",
      rx: false
    }
  ],

  // Filter chips shown above the product grid. Every product stays
  // visible under "All", including the Peptides and NeoLife ranges.
  categories: ["All", "Weight Loss", "Tummy Flattening", "Prostate"],

  // Customer weight-loss transformations shown in the hero slideshow as
  // before & after photos (illustrative — see note at the top of this file).
  transformations: [
    {
      name: "Wanjiru K.",
      city: "Nairobi",
      lost: "14 kg",
      period: "4 months",
      before: "assets/img/transform-1-before.jpg",
      after: "assets/img/transform-1-after.jpg",
      quote: "The appetite drops and the weekly coaching changed my habits. I feel lighter, sharper and full of energy."
    },
    {
      name: "Otieno O.",
      city: "Kisumu",
      lost: "12 kg",
      period: "5 months",
      before: "assets/img/transform-2-before.jpg",
      after: "assets/img/transform-2-after.jpg",
      quote: "My clothes fit again and my energy is back. The team checked on me every single week — that kept me going."
    },
    {
      name: "Chebet N.",
      city: "Nakuru",
      lost: "9 kg",
      period: "3 months",
      before: "assets/img/transform-3-before.jpg",
      after: "assets/img/transform-3-after.jpg",
      quote: "The tummy is finally going down. The herbal tea and the morning shake are part of my daily routine now."
    },
    {
      name: "Mutua M.",
      city: "Machakos",
      lost: "16 kg",
      period: "6 months",
      before: "assets/img/transform-4-before.jpg",
      after: "assets/img/transform-4-after.jpg",
      quote: "Six months of consistency with the weight-management programme. It worked when nothing else did."
    }
  ],

  // Customer reviews — PLACEHOLDERS. Replace with verified Google reviews.
  reviews: [
    { name: "Wanjiru Kamau", county: "Nyeri", rating: 5, text: "Delivery was fast and the team answered all my questions on WhatsApp." },
    { name: "Otieno Odhiambo", county: "Kisumu", rating: 5, text: "Very professional advice. The consultation gave me a clear plan I could follow." },
    { name: "Achieng Akinyi", county: "Kisumu", rating: 5, text: "The NeoLife pack has become part of my daily routine. Genuinely happy with it." },
    { name: "Mwangi Njoroge", county: "Nakuru", rating: 4, text: "Ordered on WhatsApp and the package reached Nakuru in two days. Smooth service." },
    { name: "Faith Chebet", county: "Uasin Gishu", rating: 5, text: "Friendly staff and genuine products. They explained how to use everything." },
    { name: "Brian Kiprop", county: "Eldoret", rating: 5, text: "I was skeptical at first, but the education sessions were honest and useful." },
    { name: "Grace Wambui", county: "Kiambu", rating: 5, text: "My mother takes the immunity booster now. She loves it and so do I." },
    { name: "Peter Mutua", county: "Machakos", rating: 4, text: "Quick response, clear pricing and reliable delivery to Machakos town." },
    { name: "Lydia Nyambura", county: "Nairobi", rating: 5, text: "The wellness consultation was thorough and not pushy at all. Highly recommend." },
    { name: "Kevin Omondi", county: "Siaya", rating: 5, text: "Got my order delivered to Siaya without any stress. Will order again." },
    { name: "Esther Wanjiru", county: "Murang'a", rating: 5, text: "The team took time to understand my health goals before recommending anything." },
    { name: "Samuel Kipchoge", county: "Elgeyo Marakwet", rating: 4, text: "Good products and great customer care. The delivery updates were very helpful." },
    { name: "Mercy Atieno", county: "Homa Bay", rating: 5, text: "I appreciate the health talks. I learned so much about preventive care." },
    { name: "David Kariuki", county: "Nyandarua", rating: 5, text: "Consistent quality. The energy multivitamin keeps me going through long workdays." },
    { name: "Joyce Muthoni", county: "Kirinyaga", rating: 5, text: "Ordering through WhatsApp is so convenient. Delivery to Kerugoya was on time." },
    { name: "Dennis Otieno", county: "Migori", rating: 4, text: "Helpful guidance on diet and lifestyle, not just products. Very balanced advice." },
    { name: "Caroline Chepkoech", county: "Bomet", rating: 5, text: "I bought the omega support for my father and he is very pleased with the results." },
    { name: "Eric Mwenda", county: "Meru", rating: 5, text: "Transparent team and simple process from order to delivery. Five stars." },
    { name: "Irene Adhiambo", county: "Kisumu", rating: 5, text: "The community awareness session at our church was informative and warm." },
    { name: "Collins Mutiso", county: "Machakos", rating: 4, text: "Good value for the quality. Packaging was neat and everything was intact." },
    { name: "Alice Wairimu", county: "Kiambu", rating: 5, text: "I used the tummy tea for a month alongside walking. Feeling lighter and more confident." },
    { name: "Victor Kiplagat", county: "Nandi", rating: 5, text: "Answered every question patiently. Trustworthy team and fast responses." },
    { name: "Ruth Nduta", county: "Kitui", rating: 5, text: "Delivered to Kitui town within three days. Products arrived well packed." },
    { name: "Felix Ochieng", county: "Kisumu", rating: 4, text: "The consultation helped me understand my blood pressure risks better. Thank you." },
    { name: "Sarah Jepkorir", county: "Baringo", rating: 5, text: "Great energy from the NeoLife range. My whole household now takes the daily pack." },
    { name: "Moses Kimani", county: "Nairobi", rating: 5, text: "Professional, respectful and knowledgeable. This is the health partner I trust." },
    { name: "Nancy Wangari", county: "Nyeri", rating: 5, text: "I love the awareness posts and the health tips they share. Very educational." },
    { name: "Patrick Ngugi", county: "Thika", rating: 5, text: "The shake is delicious and keeps me full until lunch. Easy to prepare too." },
    { name: "Beatrice Achieng", county: "Siaya", rating: 4, text: "Good communication throughout. My order was confirmed and delivered as promised." },
    { name: "Stephen Kibet", county: "Kericho", rating: 5, text: "The peptide blend helped with my recovery after training. Quality is evident." },
    { name: "Lucy Wanza", county: "Kitui", rating: 5, text: "They explained how to take each product and what to expect. Very caring team." },
    { name: "Dorcas Moraa", county: "Kisii", rating: 5, text: "I got my prostate formula delivered discreetly to Kisii. Excellent service." },
    { name: "Joseph Mwangi", county: "Nakuru", rating: 5, text: "I have recommended this centre to my workmates. Real results and honest advice." },
    { name: "Hellen Cherono", county: "Nandi", rating: 4, text: "Helpful team and clear instructions. The immunity booster has been a good addition." },
    { name: "Anthony Makau", county: "Makueni", rating: 5, text: "Their education sessions made preventive care make sense for my community." },
    { name: "Pauline Anyango", county: "Homa Bay", rating: 5, text: "Affordable products and quick delivery to Homa Bay. Thank you for serving us." },
    { name: "Geoffrey Kiptoo", county: "Uasin Gishu", rating: 5, text: "Consultation was done with respect and care. I felt heard from start to finish." },
    { name: "Rose Nafula", county: "Bungoma", rating: 5, text: "My husband and I both use the NeoLife range. We feel more balanced every day." },
    { name: "Calvin Otieno", county: "Kisumu", rating: 4, text: "The website ordering was simple and the WhatsApp follow-up was prompt." },
    { name: "Jane Waithera", county: "Nyandarua", rating: 5, text: "Quality products and a team that genuinely cares about your wellbeing." },
    { name: "Michael Kasyoka", county: "Kitui", rating: 5, text: "Delivery to the county was reliable and the support team was very responsive." },
    { name: "Sharon Atieno", county: "Migori", rating: 5, text: "The awareness content helped me understand my family's health history better." },
    { name: "Daniel Kiplangat", county: "Baringo", rating: 5, text: "Strong results from the appetite drops combined with better meal planning." },
    { name: "Monica Wangechi", county: "Kiambu", rating: 5, text: "Warm, knowledgeable staff. They made me feel comfortable asking any question." },
    { name: "Oscar Odongo", county: "Busia", rating: 4, text: "Good products and fast delivery to Busia. I will keep ordering from them." },
    { name: "Sylvia Chepkirui", county: "Kericho", rating: 5, text: "I finally found a health centre that educates first and sells second. Brilliant." },
    { name: "Benson Mureithi", county: "Kirinyaga", rating: 5, text: "The team followed up after my first order to check how I was doing. Impressive." },
    { name: "Mary Akoth", county: "Kisumu", rating: 5, text: "Lovely experience from start to finish. The products have helped my energy levels." },
    { name: "Kelvin Mbugua", county: "Nairobi", rating: 5, text: "Quick WhatsApp replies and a clean ordering process. Highly recommended." },
    { name: "Violet Nyokabi", county: "Nyeri", rating: 5, text: "I trust this centre because they explain the benefits and the limits of each product." }
  ],

  counties: [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa", "Wajir",
    "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka Nithi", "Embu", "Kitui", "Machakos",
    "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
    "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia",
    "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia",
    "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
  ]
};
