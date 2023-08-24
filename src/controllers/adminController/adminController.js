const conn =require('../../config/connection');
let jwt = require('jsonwebtoken');
// const express = require('express');
// const app = express();
// app.use(express.json());

const bcrypt = require('bcrypt');

//----------------------------------------------Login Admin By email and password---------------------------------------------//

exports.adminLogin = function (req, res) {
          const { email, password } = req.body;
          
          // Check if the user exists
          conn.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
        
            if (results.length === 0) {
              res.status(404).json({ error: 'Admin not found' });
              return;
            }
        
            const user = results[0];
        
            // Compare the password with the hashed password
            bcrypt.compare(password, user.password, (err, passwordMatch) => {
              if (err) {
                console.error('Error comparing passwords:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
        
              if (!passwordMatch) {
                res.status(401).json({ error: 'Invalid password' });
                return;
              }
        
              // Generate a JWT token
              const token = jwt.sign({ email, password }, 'ADMIN');
              
              res.status(200).json({ message: 'Login successful', token });
            });
          });
        };

//----------------------------------------------Create Admin-----------------------------------------------------//

exports.createAdmin = function (req, res) {
          const { userName, email, password, mobileNumber } = req.body;
        
          // Check if the user already exists
          conn.query('SELECT * FROM admin WHERE email = ? OR mobileNumber = ?', [email, mobileNumber], (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
        
            if (results.length > 0) {
              const existingUser = results.find(user => user.email === email);
              if (existingUser) {
                return res.status(409).json({ error: 'Email already exists' });
              } else {
                return res.status(409).json({ error: 'Mobile number already exists' });
              }
            }
        
            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
              if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal server error' });
              }
        
              // Create a new user in the database
              const newUser = {
                userName,
                email,
                password: hashedPassword,
                mobileNumber
              };
        
              conn.query('INSERT INTO admin SET ?', newUser, (err) => {
                if (err) {
                  console.error('Error creating user:', err);
                  return res.status(500).json({ error: 'Internal server error' });
                }
        
                console.log('Admin created successfully');
        
                // Generate token
                const token = jwt.sign({ email }, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        
                return res.status(200).json({ token }); // Send the token in the response
              });
            });
          });
        };

//............................................. ADD ARTIST ..........................................//

exports.addArtistImage = (req,res)=>{
  const profile_pic= req.file.path;
  return res.status(200).json({profile_pic})
}

exports.addArtist = (req,res)=>{
  const {artist_name, email, password, profile_pic, instagram_id, spotify_id, contact_no}= req.body;
  const addArtistQuery = "insert into artist (artist_name, email, password,profile_pic, instagram_id, spotify_id, contact_no) values (?,?,?,?,?,?,?)";
  
  console.log(profile_pic)
  conn.query(addArtistQuery,[artist_name, email, password, profile_pic, instagram_id, spotify_id, contact_no],(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).json({error:"failed to get artist"})
    }
    if(result[0].email){
      return res.status(400).json({error:"user already exist"})
    }
    const addArtistQuery = "insert into artist (artist_name, email, password,profile_pic, instagram_id, spotify_id, contact_no) values (?,?,?,?,?,?,?)";
    conn.query(addArtistQuery,[artist_name, email, password, profile_pic, instagram_id, spotify_id, contact_no],(error,result)=>{
      if(error){
        console.error(error);
        return res.status(500).json({ error: 'Failed to Add Artist' });
      }
      return res.status(200).json({ status:"success" });
    })
  })
}

//............................................. SHOW ARTIST by ID ..........................................//

exports.getArtist = (req,res)=>{
  const { id } = req.params;
  const getArtistQuery = "select * from artist where id = ?";
  conn.query(getArtistQuery,[id],(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: 'Failed to get Artist' });
    }
    return res.status(200).json({ result });
  })
}

//............................................. SHOW ALL ARTIST .............................................//

exports.getAllArtist = (req,res)=>{
  const getAllArtistQuery = "select * from artist";
  conn.query(getAllArtistQuery,(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: 'failed to get list of artist' });
    }
    return res.status(200).json({ result });
  })
}

//............................................. CHANGE ARTIST STATUS .........................................//

exports.changeArtistStatus = (req,res)=>{
  const {id, status} = req.body;
  const changeStatusQuery = "update artist set status = ? where id = ?";
  conn.query(changeStatusQuery,[status,id],(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: 'Failed to update status' });
    }
    return res.status(200).json({ status:"success" });
  })
}

//............................................. DELETE ARTIST  ..............................................//
     
exports.deleteArtist = (req,res)=>{
  const {id} = req.params;
  console.log(id)
  const deleteArtistQuery = "delete from artist where id = ?";
  conn.query(deleteArtistQuery,[id],(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: 'Failed To Delete Artist' });
    }
    return res.status(200).json({ status:"success" });
  })
}