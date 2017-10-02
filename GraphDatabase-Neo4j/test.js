var r=require('request');
var username = 'neo4j'
var pw = 'password'
var txUrl = 'http://localhost:7474/db/data/transaction/commit';
function cypher(query,params,cb) {
	r.post({uri:txUrl,
		auth: {
			user: username,
			password: pw
		},
        json:{statements:[{statement:query,parameters:params}]}},
        function(err,res) { cb(err,res.body)})
}

function make_query(query) {
	var params={limit: 10}
	var cb=function(err,data) { console.log(JSON.stringify(data)) }
	cypher(query,params,cb)
}

// find Tom Hanks
make_query('MATCH (tom {name: "Tom Hanks"}) RETURN tom')
// find 10 people
make_query('MATCH (people:Person) RETURN people.name LIMIT 10')
// find movies that are released in the 1990s
make_query('MATCH (nineties:Movie) WHERE nineties.released >= 1990 AND nineties.released < 2000 RETURN nineties.title')
// list all the Kevin Bacon movies
make_query('MATCH (kev:Person {name: "Kevin Bacon"})-[:ACTED_IN]->(kevMovies) RETURN kev,kevMovies')