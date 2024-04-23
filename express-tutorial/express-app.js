const express = require('express');
const path = require('path');
const app = express();


//setup static and middleware
//so express automatically handles '.public' folder, actually its files. (css, js, images...) //may be can html pages.
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     console.log('user hit the resource');
//     res.sendFile(path.resolve('./index.html'));
//adding to static assets
//server-side0-rendering
// })
app.all('*', (req, res) => {
    res.status(404), send('Not Found');
})
app.listen(5000, () => {
    console.log('Server listening on port 5000...');
})

//*common convention is that you should throw your css, js, images files to public folder.
//*path. join() simply concatenates segments and its return may or may not result in an absolute path. 
//*path. resolve() always returns an absolute path, using the target operating system's root as 
//the root or first argument with a leading / as the new root.