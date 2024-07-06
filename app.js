const db = require('./db');
const User = require('./models/user');

// Function to create a new user
async function createUser(name, email, age) {
    try {
        const newUser = new User({ name, email, age });
        const savedUser = await newUser.save();
        console.log('User created successfully:', savedUser);
    } catch (err) {
        console.error('Error creating user:', err.message);
    }
}

// Function to read all users
async function getAllUsers() {
    try {
        const users = await User.find({});
        console.log('All users:', users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
    }
}

// Function to update a user by email
async function updateUser(email, updates) {
    try {
        const updatedUser = await User.findOneAndUpdate({ email }, updates, { new: true });
        console.log('User updated successfully:', updatedUser);
    } catch (err) {
        console.error('Error updating user:', err.message);
    }
}

// Function to delete a user by email
async function deleteUser(email) {
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        console.log('User deleted successfully:', deletedUser);
    } catch (err) {
        console.error('Error deleting user:', err.message);
    }
}

// Usage examples
db.once('open', async () => {
    // Create a new user
    await createUser('John Doe', 'john.doe@example.com', 30);

    // Read all users
    await getAllUsers();

    // Update a user
    await updateUser('john.doe@example.com', { age: 31 });

    // Delete a user
    await deleteUser('john.doe@example.com');

    // Read all users after deletion
    await getAllUsers();

    // Close MongoDB connection
    db.close();
});
