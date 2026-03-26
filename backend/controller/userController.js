async function registerUser(req, res) {
    try{

    res.send('Register user');
    }

    catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }


}

module.exports = {
    registerUser
}