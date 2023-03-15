// Express Varibales
const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');

// PosgreSQL
const db = require('./conn_db');
const TABLE_NAME = 'url_data';

// Parsering Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// CORS origin
app.use(
    cors({
        origin: '*',
    })
);

// Root page
app.get('/', 
    function(req, res){
        res.send("The miniurl server is running!<br/><br/>Visit www.miniurl.gq to minimize your URL's.");
    }
)

// Create record
app.post('/short', async (req, res) => {
    try{
        // Check to see if Long URL already exists
        let find = "SELECT short_url FROM " + TABLE_NAME + " WHERE long_url='" + req.body.url + "'";
        db.pool.query(find, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rowCount === 0){

                // get current ID and add one for new record
                let sql_id = "SELECT id FROM " + TABLE_NAME + " ORDER BY ID DESC LIMIT 1";
                db.pool.query(sql_id, (error, results) => {
                    if (error){
                        throw error;
                    }
                    const str = results.rows[0].id + 1;
                    let encode = Buffer.from(str.toString(), 'utf8').toString('base64');
                    let short_url = encode.replace(/=/g,'');

                    // Add new record
                    let sql_new = "INSERT INTO " + TABLE_NAME + " (long_url, short_url) VALUES ('" + req.body.url + "','" + short_url + "')";
                    db.pool.query(sql_new, (error, results) => {
                        if (error){
                            throw error;
                        }
                        res.status(200).json({'short_url': short_url});
                    });
                });
            }
            else{res.status(200).json(results.rows[0]);}
        });
    }
    catch(err){
        res.redirect('/');
    }
})

// Retreive long URL
app.get('/:shortUrl', async (req, res) => {
    try{
        // redirect to Long URL using the Shortened URL
        const sql = "SELECT long_Url FROM " + TABLE_NAME + " WHERE short_Url='" + req.params.shortUrl + "'";
        db.pool.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rowCount === 0){
                res.status(200).json({'long_url':'None'});
                return;
            }
            res.status(200).json(results.rows[0]);
        });
    }
    catch(err){
        res.redirect('/');
    }
});

// Run Server
app.listen(
    PORT,
    () => console.log(`Listening on: ${PORT}`)
);
