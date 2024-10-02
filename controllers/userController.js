
const User = require('../models/User');

// Login User
const jwt = require('jsonwebtoken'); // Ensure this is imported

exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // assuming you have email for login

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token with user id, role id, and name
        const token = jwt.sign(
            { id: user._id, roleId: user.roleId, name: user.name }, // Include name in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with token, roleId, and name
        res.status(200).json({ token, roleId: user.roleId, name: user.name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Create a new user
// exports.createUser = async (req, res) => {
//     const { departmentId, categoryId, name, age, rate, salary, password, email, roleId } = req.body;

//     try {
//         const newUser = new User({
//             departmentId,
//             categoryId,
//             name,
//             age,
//             rate,
//             salary,
//             password,
//             email,
//             roleId,
//         });

//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// Create a new user
exports.createUser = async (req, res) => {
    const { departmentId, categoryId, name, age, rate, salary, password, email, roleId, profilePicture } = req.body;

    try {
        const newUser = new User({
            departmentId,
            categoryId,
            name,
            age,
            rate,
            salary,
            password,
            email,
            roleId,
            profilePicture, // Include profilePicture here
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    const { departmentId, categoryId } = req.query; // Get departmentId and categoryId from query parameters

    try {
        // Construct the filter
        const filter = {};
        if (departmentId) {
            filter.departmentId = departmentId; // Filter by departmentId if provided
        }
        if (categoryId) {
            filter.categoryId = categoryId; // Filter by categoryId if provided
        }

        const users = await User.find(filter).populate('departmentId').populate('categoryId');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('departmentId')  // Populate department details
            .populate('categoryId')    // Populate category details
           

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update a user by ID
// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, age, rate, salary, email, departmentId, categoryId, roleId } = req.body;

//     try {
//         // Find user by ID and update
//         const user = await User.findByIdAndUpdate(
//             id,
//             {
//                 name,
//                 age,
//                 rate,
//                 salary,
//                 email,
//                 departmentId,
//                 categoryId,
//                 roleId,
//             },
//             { new: true, runValidators: true } // options: new returns the updated document, runValidators applies schema validation
//         );

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'User updated successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };
// Update a user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, rate, salary, email, departmentId, categoryId, roleId, profilePicture } = req.body; // Add profilePicture

    try {
        // Find user by ID and update
        const user = await User.findByIdAndUpdate(
            id,
            {
                name,
                age,
                rate,
                salary,
                email,
                departmentId,
                categoryId,
                roleId,
                profilePicture, // Include profilePicture in the update
            },
            { new: true, runValidators: true } // options: new returns the updated document, runValidators applies schema validation
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};