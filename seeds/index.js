const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '629e2b4c78954422bc3a9149',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel velit leo. Donec mi risus, dignissim quis tincidunt non, finibus at mauris. Suspendisse vel vehicula dolor, vitae imperdiet odio. Pellentesque ac tempus lacus. Phasellus quis fringilla ligula. Vivamus sodales, orci tristique luctus consectetur, tortor purus eleifend nisl, eget aliquam libero magna ut massa. Nam vitae magna vehicula, gravida elit eu, consequat massa.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyslkowkd/image/upload/v1654707677/YelpCamp/ecfoadgvztai2sool270.jpg',
                    filename: 'YelpCamp/ecfoadgvztai2sool270'
                },
                {
                    url: 'https://res.cloudinary.com/dyslkowkd/image/upload/v1654707680/YelpCamp/uf86ffxsrsarjsza0wqq.jpg',
                    filename: 'YelpCamp/uf86ffxsrsarjsza0wqq'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); 
})

