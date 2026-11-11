// models/Hotel.js
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define("Hotel", {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT, defaultValue: "" },
    price: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, defaultValue: "Hotel" }, // Hotel, Resort, Villa, etc.
    rating: { type: DataTypes.FLOAT, defaultValue: 4.5 },
    reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, defaultValue: "" },
    amenities: { type: DataTypes.JSON, defaultValue: [] }, // ["Pool", "WiFi", "Spa"]
    totalRooms: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
  });
  return Hotel;
};