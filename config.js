exports.DATABASE_URL =
  "mongodb+srv://admin:admin@cluster0-tlv5p.mongodb.net/gymzo?retryWrites=true&w=majority";
//process.env.DATABASE_URL || "mongodb://localhost/gymzo";
exports.JWTTOKEN = process.env.JWTTOKEN || "secret";
exports.PORT = process.env.PORT || 8080;
