// JSON QUERT STRING, ROUTE PARAMS
const express = require("express");
const { tours } = require("./data");
const app = express();

app.get("/", (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/tours">API Tours</a>');
});
app.get("/api/tours", (req, res) => {
    //so i just want to access 3 properties of tour object
    const newTours = tours.map((tour) => {
        const { id, name, image } = tour;
        return { id, name, image };
    });
    res.json(newTours); //sends a JSON response that is the parameter converted to JSON(using JSON.stringify)
});
app.get("/api/tours/:tourID", (req, res) => {
    //route parameters

    const singleTour = tours.find((tour) => tour.id == req.params.tourID);
    if (!singleTour) {
        return res.status(404).json({ msg: "Tour not found" });
    }
    res.json(singleTour);
});

//more complex route params
app.get("/api/tours/:tourID/reviews/:reviewID", (req, res) => {
    console.log(req.params);
    res.send('hello')

    // const singleTour = tours.find((tour) => tour.id == req.params.tourID);
    // if (!singleTour) {
    //     return res.status(404).json({ msg: "Tour not found" });
    // }
    // res.json(singleTour);
});
//query string are url parameters and that is a way for us to send small amounts of information to the server using the uri
app.get('/api/v1/query', (req, res) => {
    console.log(req.query); //if url ...query?name=john&id=4 then query will be //* { name: 'john', id: '4' }
    const { search, limit } = req.query;
    let sortedTours = [...tours];

    if (search) {
        sortedTours = sortedTours.filter((tour) => {
            return tour.name.toLowerCase().startsWith(search.toLowerCase());
        });
    }
    if (limit) {
        sortedTours = sortedTours.slice(0, +limit);
    }
    if (sortedTours.length < 1) {
        return res.status(200).send('<h1>No Anything</h1>'); //you shouldn't send status code 404 because it just filter
        //! additional params and query strings info
        //if you don't write there return then express will confuse why you return 2 response??
    }
    res.status(200).json(sortedTours);
})

app.listen(5000, () => {
    console.log(`Server is listening on port 5000...`);
});
