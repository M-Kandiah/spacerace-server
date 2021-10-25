const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');
const Usermon = require("mongoose")

class User {
    // can change, not too sure about password
    constructor(data) {
        this.userId = data.userId;
        this.username = data.username;
        this.password = data.passwordHash;
        this.points = data.points;
        this.wins = data.wins;
    }

    //get all static function for getting data - might have to change since i'm copy pasting lmao
    static get all() {
        return new Promise( async (resolve, reject) => {
            try {
                const db = await init();
                const data = await db.collection('users').find().toArray();
                const users = data.map(d => new User({...d, id: d._id}))
                resolve(users);
            } catch (err) {
                console.warn(err);
                reject("error retrieving users")
            }
        });
    }

    //find by id function just in case idk
    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let data = await db.collection('users').find({_id: ObjectId(id)}).toArray();
                let user = new User({...data[0], id: data[0]._id});
                resolve(user);
            } catch (err) {
                console.warn(err);
                reject('can\'t find user');
            }
        });
    }

    //creating user, prob won't work since idr how it works

    // static create(username, password) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const db = await init();
    //             await db.collection('users').insertOne({username: username, passwordHash: password, points: 0, wins: 0});
    //             let data = await db.collection('users').find({username})
    //             let newUser = new User(data);
    //             resolve(newUser);
    //         } catch (err) {
    //             console.warn(err);
    //             reject('error creating user');
    //         }
    //     });
    // }



    static findByUserName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').find({username: { $eq: name }}).toArray();
                let user = userData[0]
                resolve(user);           
            } catch (err) {
                reject("User not found");
            }
        })
    };

    //update points, will have to change again
    updatePoints(points) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let updatedData = await db.collection('users').findOneAndUpdate({_id: ObjectId(this.id)}, {$set: {"points": points}}, {returnDocument: "after"}, {returnOriginal: false})
                let updatedCeleb = new User(updatedData.value);
                resolve(updatedCeleb);
            } catch (err) {
                console.warn(err);
                reject('error updating user points');
            }
        })
    }

    //update wins
    updateWins(wins) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let updatedData = await db.collection('users').findOneAndUpdate({_id: ObjectId(this.id)}, {$set: {"wins": wins}}, {returnDocument: "after"}, {returnOriginal: false})
                let updatedUser = new User(updatedData.value);
                resolve(updatedUser);
            } catch (err) {
                console.warn(err);
                reject('error updating user wins');
            }
        })
    }

    //don't think we need destroy function but can include ig
}

module.exports = User;