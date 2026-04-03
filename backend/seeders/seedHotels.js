const sequelize = require("../config/db");
const { Hotel } = require("../models");

const hotelData = [
  // Rajasthan Hotels
  { name: "The Leela Palace", location: "Udaipur, Rajasthan", description: "Experience luxury and elegance at The Leela Palace, overlooking the magnificent Lake Pichola. Perfect for romantic getaways and special occasions.", price: 12500, type: "Resort", rating: 4.9, reviews: 2430, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80", amenities: JSON.stringify(["Pool", "Spa", "WiFi", "Restaurant", "Heritage Tour"]), totalRooms: 50 },
  { name: "Heritage Haveli", location: "Jaipur, Rajasthan", description: "Stay in a centuries-old heritage property that preserves the elegance of Rajasthani architecture with modern amenities.", price: 7900, type: "Hotel", rating: 4.8, reviews: 980, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80", amenities: JSON.stringify(["Heritage Tour", "Pool", "WiFi", "Ayurveda", "Restaurant"]), totalRooms: 35 },
  { name: "Gold Palace Resort", location: "Jaipur, Rajasthan", description: "Luxurious resort in the Pink City with traditional Rajasthani architecture and modern amenities.", price: 6200, type: "Resort", rating: 4.6, reviews: 1520, img: "https://th.bing.com/th/id/OIP.kusZ499qNOkiJ6CXx_VNiwHaD4?w=328&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", amenities: JSON.stringify(["Pool", "Spa", "WiFi", "Restaurant", "Heritage Tour"]), totalRooms: 45 },
  { name: "Jaisalmer Palace Hotel", location: "Jaisalmer, Rajasthan", description: "Golden fortress-like hotel in the desert city offering authentic Rajasthani hospitality.", price: 5100, type: "Hotel", rating: 4.5, reviews: 890, img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Desert Safari", "Bar"]), totalRooms: 40 },

  // Goa Hotels
  { name: "Sunset Beachside Inn", location: "Goa", description: "Relax on pristine beaches with our beachfront property offering stunning sunset views and water sports activities.", price: 4200, type: "Hotel", rating: 4.5, reviews: 3120, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80", amenities: JSON.stringify(["Beach Access", "Pool", "WiFi", "Dining", "Water Sports"]), totalRooms: 60 },
  { name: "Coral Reef Resort", location: "Goa", description: "Beachfront luxury resort with vibrant nightlife and water sports facilities.", price: 6800, type: "Resort", rating: 4.7, reviews: 2100, img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80", amenities: JSON.stringify(["Beach Access", "Pool", "WiFi", "Restaurant", "Bar"]), totalRooms: 55 },
  { name: "Tropical Paradise Inn", location: "Goa", description: "Cozy beachside hotel with tropical gardens and authentic Goan cuisine.", price: 3800, type: "Hotel", rating: 4.3, reviews: 1650, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80", amenities: JSON.stringify(["Beach Access", "Pool", "WiFi", "Dining"]), totalRooms: 35 },

  // Himachal Pradesh Hotels
  { name: "Snow Peak Resort", location: "Manali, Himachal Pradesh", description: "A pristine mountain resort nestled in the Swiss-like valleys of Manali. Perfect for adventure seekers and nature lovers.", price: 5800, type: "Resort", rating: 4.7, reviews: 1860, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80", amenities: JSON.stringify(["Fireplace", "Trekking", "WiFi", "Bar", "Mountain View"]), totalRooms: 40 },
  { name: "Alpine Adventure Lodge", location: "Manali, Himachal Pradesh", description: "Cozy mountain lodge perfect for trekking enthusiasts and adventure seekers.", price: 4500, type: "Hotel", rating: 4.4, reviews: 1200, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80", amenities: JSON.stringify(["Fireplace", "WiFi", "Restaurant", "Trekking Guide"]), totalRooms: 30 },
  { name: "Himalayan Heights", location: "Shimla, Himachal Pradesh", description: "Charming colonial-era hotel offering panoramic mountain views and cozy fireplaces for cold mountain evenings.", price: 4800, type: "Hotel", rating: 4.4, reviews: 1320, img: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=500&q=80", amenities: JSON.stringify(["Fireplace", "WiFi", "Restaurant", "Mountain View"]), totalRooms: 28 },
  { name: "Cedar Grove Resort", location: "Shimla, Himachal Pradesh", description: "Peaceful resort surrounded by cedar forests with breathtaking views.", price: 5200, type: "Resort", rating: 4.6, reviews: 1450, img: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=500&q=80", amenities: JSON.stringify(["Fireplace", "WiFi", "Restaurant", "Spa"]), totalRooms: 35 },

  // Uttar Pradesh Hotels
  { name: "Grand Taj View", location: "Agra, Uttar Pradesh", description: "Experience the grandeur near the world's most iconic monument. Wake up to the sight of the Taj Mahal.", price: 6500, type: "Hotel", rating: 4.6, reviews: 2150, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80", amenities: JSON.stringify(["Pool", "WiFi", "Restaurant", "Rooftop View"]), totalRooms: 45 },
  { name: "Mughal Gardens Inn", location: "Agra, Uttar Pradesh", description: "Heritage hotel inspired by Mughal architecture overlooking the Taj Mahal.", price: 5900, type: "Hotel", rating: 4.5, reviews: 1800, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Rooftop View", "Heritage Tour"]), totalRooms: 38 },
  { name: "Varanasi Spiritual Retreat", location: "Varanasi, Uttar Pradesh", description: "Peaceful retreat on the banks of the Ganges with spiritual experiences and yoga classes.", price: 4100, type: "Hotel", rating: 4.3, reviews: 950, img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Yoga", "Ganges View"]), totalRooms: 32 },
  { name: "Rishikesh Yoga Ashram Hotel", location: "Rishikesh, Uttar Pradesh", description: "Holistic retreat offering yoga, meditation, and ayurvedic wellness programs.", price: 3600, type: "Hotel", rating: 4.4, reviews: 1100, img: "https://images.unsplash.com/photo-1712510817140-917938f92e5b?w=500&q=80", amenities: JSON.stringify(["Yoga", "Ayurveda", "WiFi", "Restaurant"]), totalRooms: 28 },

  // Kerala Hotels
  { name: "Kerala Backwaters Resort", location: "Kochi, Kerala", description: "Drift lazily through serene backwaters in traditional houseboats and experience the tropical paradise of Kerala.", price: 5400, type: "Resort", rating: 4.7, reviews: 1640, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80", amenities: JSON.stringify(["Houseboat", "Ayurveda", "Backwaters", "Spa"]), totalRooms: 30 },
  { name: "Munnar Tea Estate Resort", location: "Munnar, Kerala", description: "Luxurious resort amidst lush tea plantations with panoramic mountain views.", price: 6100, type: "Resort", rating: 4.6, reviews: 1350, img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80", amenities: JSON.stringify(["Tea Tour", "WiFi", "Restaurant", "Spa"]), totalRooms: 35 },
  { name: "Lagoon Houseboat", location: "Alleppey, Kerala", description: "Traditional houseboat experience with authentic Kerala cuisine and backwater views.", price: 4800, type: "Resort", rating: 4.5, reviews: 1200, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80", amenities: JSON.stringify(["Houseboat", "WiFi", "Restaurant", "Backwaters"]), totalRooms: 20 },

  // Maharashtra Hotels
  { name: "Mumbai Metropolitan", location: "Mumbai, Maharashtra", description: "Ultra-modern luxury hotel in the heart of India's financial capital. Perfect for business and leisure travelers.", price: 8900, type: "Hotel", rating: 4.8, reviews: 3450, img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=80", amenities: JSON.stringify(["Pool", "Gym", "Business Center", "Fine Dining", "WiFi"]), totalRooms: 120 },
  { name: "Marine Drive Boutique", location: "Mumbai, Maharashtra", description: "Stylish boutique hotel on the iconic Marine Drive with sea-facing views.", price: 7500, type: "Hotel", rating: 4.7, reviews: 2300, img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Gym", "Sea View"]), totalRooms: 60 },

  // Karnataka Hotels
  { name: "Mysore Palace Heritage", location: "Mysore, Karnataka", description: "Grand hotel near the magnificent Mysore Palace with traditional decor.", price: 5300, type: "Hotel", rating: 4.5, reviews: 1100, img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Heritage Tour", "Spa"]), totalRooms: 40 },
  { name: "Hampi Heritage Ruins Resort", location: "Hampi, Karnataka", description: "Unique resort overlooking ancient ruins with UNESCO World Heritage views.", price: 4300, type: "Resort", rating: 4.4, reviews: 890, img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Heritage Tour", "Spa"]), totalRooms: 30 },
  { name: "Coorg Plantation Haven", location: "Coorg, Karnataka", description: "Serene plantation resort surrounded by coffee gardens and waterfalls.", price: 4900, type: "Resort", rating: 4.6, reviews: 1450, img: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=500&q=80", amenities: JSON.stringify(["Plantation Tour", "WiFi", "Restaurant", "Spa"]), totalRooms: 35 },

  // Ladakh Hotels
  { name: "Leh Mountain Lodge", location: "Leh, Ladakh", description: "High-altitude lodge with stunning Himalayan views and adventure activities.", price: 3200, type: "Hotel", rating: 4.3, reviews: 750, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Mountain Tour", "Altitude Support"]), totalRooms: 25 },
  { name: "Pangong Lake View", location: "Leh, Ladakh", description: "Remote luxury resort near the famous Pangong Lake with breathtaking views.", price: 5600, type: "Resort", rating: 4.7, reviews: 1800, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", amenities: JSON.stringify(["Lake View", "WiFi", "Restaurant", "Adventure Tours"]), totalRooms: 20 },

  // Additional Popular Destinations
  { name: "Delhi Grand Palace", location: "Delhi, Delhi", description: "Opulent 5-star hotel in the capital city with world-class amenities.", price: 9200, type: "Hotel", rating: 4.9, reviews: 4100, img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80", amenities: JSON.stringify(["Pool", "Spa", "Restaurant", "Business Center", "WiFi"]), totalRooms: 150 },
  { name: "Kolkata Heritage Hotel", location: "Kolkata, West Bengal", description: "Historic hotel preserving the colonial charm of Kolkata with modern comfort.", price: 5500, type: "Hotel", rating: 4.4, reviews: 1200, img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Heritage Tour", "Library"]), totalRooms: 45 },
  { name: "Ooty Mountain Queen Resort", location: "Ooty, Tamil Nadu", description: "Charming hill station resort with tea gardens and botanical gardens nearby.", price: 4600, type: "Resort", rating: 4.4, reviews: 980, img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Tea Tour", "Mountain View"]), totalRooms: 32 },
  { name: "Srinagar Lake Palace", location: "Srinagar, Jammu & Kashmir", description: "Floating palace hotel on Dal Lake with romantic Kashmiri hospitality.", price: 7800, type: "Resort", rating: 4.8, reviews: 2050, img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=500&q=80", amenities: JSON.stringify(["Houseboat", "WiFi", "Restaurant", "Lake View", "Garden"]), totalRooms: 40 },
  { name: "Darjeeling Tea House", location: "Darjeeling, West Bengal", description: "Cozy inn in the Queen of Hills with views of Kanchenjunga and tea estates.", price: 3900, type: "Hotel", rating: 4.5, reviews: 1100, img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Tea Tour", "Mountain View"]), totalRooms: 28 },
  { name: "Andaman Beach Resort", location: "Andaman, Andaman & Nicobar", description: "Tropical paradise resort on pristine white sand beaches with water sports.", price: 6300, type: "Resort", rating: 4.6, reviews: 1700, img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80", amenities: JSON.stringify(["Beach Access", "Water Sports", "WiFi", "Restaurant", "Spa"]), totalRooms: 50 },
  { name: "Mount Abu Retreat", location: "Mount Abu, Rajasthan", description: "Hill station retreat with cool climate, scenic views and adventure activities.", price: 4200, type: "Hotel", rating: 4.3, reviews: 890, img: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1224/Majestic%20Kanchenjunga.jpg", amenities: JSON.stringify(["WiFi", "Restaurant", "Mountain View", "Adventure"]), totalRooms: 35 },
  { name: "Amritsar Golden Temple Inn", location: "Amritsar, Punjab", description: "Pilgrimage hotel near the Golden Temple offering spiritual experiences and Punjabi cuisine.", price: 3400, type: "Hotel", rating: 4.4, reviews: 1050, img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&q=80", amenities: JSON.stringify(["WiFi", "Restaurant", "Temple View", "Spiritual Tour"]), totalRooms: 40 },
];

async function seedHotels() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    // Delete existing hotels if any
    const existingHotels = await Hotel.count();
    if (existingHotels > 0) {
      await Hotel.destroy({ where: {} });
      console.log(`🗑️  Cleared ${existingHotels} existing hotels`);
    }

    // Insert hotel data
    await Hotel.bulkCreate(hotelData);
    console.log("✅ Hotels seeded successfully!");
    console.log(`📊 Total hotels added: ${hotelData.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding hotels:", error.message);
    process.exit(1);
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedHotels();
}

module.exports = seedHotels;
