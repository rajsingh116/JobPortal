import mongoose from "mongoose"; 
// mongoose import kiya – MongoDB ke saath schema & model banane ke liye

// User schema define kar rahe hain
const userSchema = new mongoose.Schema({

    // ================= BASIC USER INFO =================

    fullname: {
        type: String,        // fullname string type ka hoga
        required: true       // mandatory field (empty nahi ho sakta)
    },

    email: {
        type: String,        // email string
        required: true,      // email compulsory
        unique: true         // same email dobara allow nahi hogi
    },

    phoneNumber: {
        type: Number,        // phone number numeric
        required: true
    },

    password: {
        type: String,        // hashed password store hoga
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'recruiter'],  
        // sirf in 2 values me se ek allowed
        required: true
    },

    // ================= PROFILE OBJECT =================

    profile: {
        bio: {
            type: String     // user ka short bio
        },

        skills: [{           
            type: String     // skills array (Java, C++, React, etc.)
        }],

        resume: {
            type: String     // resume ka file path / URL
        },

        resumeOriginalName: {
            type: String     // user ne jo original naam se resume upload kiya
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'   
            // Company collection se reference (foreign key jaisa)
        },

        profilePhoto: {
            type: String,
            default: ""      // agar photo nahi hai to empty string
        }
    },

}, {
    timestamps: true 
    // automatically createdAt & updatedAt add karega
});

// ================= MODEL EXPORT =================

export const User = mongoose.model('User', userSchema);
// User naam ka model create ho gaya jo "users" collection se map hoga
