var db = require('../models');

module.exports = function (app) {

	// Get all examples
	app.get('/api/examples', function (req, res) {
		db.Example.findAll({}).then(function (dbExamples) {
			res.json(dbExamples);

		});
	});

	// Verify sign-in and upsert user
	app.post('/api/signIn', function (req, res) {
		var token = req.body.token;
		verifyIDToken(token);
		res.json("OK");
	});

};

// Verifies the integrity of the ID token and then updates or inserts a new user.
function verifyIDToken(token) {

	const { OAuth2Client } = require('google-auth-library');
	const client = new OAuth2Client("1065744720974-rum7je588fcif793pqvn4b69uov84mid.apps.googleusercontent.com");
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: "1065744720974-rum7je588fcif793pqvn4b69uov84mid.apps.googleusercontent.com"  // Specify the CLIENT_ID of the app that accesses the backend		
		});

		const payload = ticket.getPayload();
		const userid = payload.sub;  // don't think this is needed
		
		// Now the user data has been returned to us, check our database
		upsertUser(payload);
	}
	verify().catch(console.error);
}

// This function checks if the logged-in user is a new or existing user
function upsertUser(payload) {

	var idEmail = payload.email;

	// Check if user already exists in our database
	db.Users.findOne({
		where: {
			email: idEmail
		}
	}).then(function (existingUser) {
		if (!existingUser) {
			createNewUser(payload);
		}
	});
}
	//	} else {
	//		updateUser(payload);
	//	}
	//});
//}

// This functions inserts a new user into the Users table 
function createNewUser(payload) {
	var now = new Date();
	db.Users.create({
		first_name: payload.given_name,
		last_name: payload.family_name,
		email: payload.email,
		last_login: now
	})
		.then(function (newUser) {
			console.log("New User");
		});
}

// This function updates the last_login field in the Users table with the UTC date and time
function updateUser(payload) {

	var now = new Date();
	var idEmail = payload.email;
	db.Users.update(
		{ last_login: now },
		{
			where:
				{ email: idEmail }
		}
	).then(function (updatedUser) {
		console.log("Last login updated: " + idEmail);
	});
}

