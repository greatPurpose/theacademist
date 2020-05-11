const next = require("next");
const express = require("express");
const axios = require("axios");
const fetch = require('isomorphic-unfetch');
const cookieParser = require("cookie-parser");
const routes = require('./routes')

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;
const app = next({ dev });
const handle = app.getRequestHandler();
//const handler = routes.getRequestHandler(app)

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = "asldkfjals23ljk";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true
};


app.prepare().then(() => {
  const server = express();
  //

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  
  server.post("/api/facebook-register", async (req, res) => {
    //req.body.email
    //req.body.token
    const {email, token, userId, image, firstName, lastName} = req.body;
      fetch('https://www.theacademist.com/api/v1/user/facebook-register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({email, token, userId, image, firstName, lastName})
      })
          .then(response=>response.json())
          .then(json=>{
              //console.log(json)
              if (json.error){
                  let error = json.error
                  if (error.status == 401){
                    res.json('User not registered or email not verified');
                    
                  }
                  else if (error.status == 500){
                      res.json('An error occured please try again');
                  
                  }
              }
              else{
              res.redirect('/login-new')
          }
          })
      
          .catch(error=> console.log(error));
      
    });
  server.post("/api/facebook-login", async (req, res) => {
  //req.body.email
  //req.body.token
  const {email, token, userId, image} = req.body;
    fetch('https://www.theacademist.com/api/v1/user/facebook-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({email, token, userId})
    })
        .then(response=>response.json())
        .then(json=>{
            //console.log(json)
            if (json.error){
                let error = json.error
                if (error.status == 401){
                  res.json('User not registered or email not verified');
                  
                }
                else if (error.status == 500){
                    res.json('An error occured please try again');
                
                }
            }
            else{
              const userData = {
                token: json.token,
                user_id: json.user.id,
                firstName: json.user.firstName,
                lastName: json.user.lastName,
                coin: json.user.coin,
                image: image,
                email: json.user.email,
                type: AUTH_USER_TYPE
              };
              res.cookie("token", userData, COOKIE_OPTIONS);
              res.json(json);
              res.redirect('/profile')
        }
        })
    
        .catch(error=> console.log(error));
    
  });
  server.post("/api/google-register", async (req, res) => {
    let email = req.body.email;
    let image = req.body.image;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    fetch('https://www.theacademist.com/api/v1/user/google-register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({email, image, firstName, lastName})
      })
          .then(response=>response.json())
          .then(json=>{
            console.log(json)
              if (json.error){
                  let error = json.error
                  if (error.status == 401){
                      res.json('Error!', 'User not registered or email not verified')
                  }
                  else if (error.status == 500){
                      res.json('Error!', 'An error occured please try again')
                  }
              }
              else{
                res.json({"message": "Success"})
                res.redirect('/login-new')
          }
          })
          .catch(error=>console.log(error));
  
  });
  server.post("/api/google-login", async (req, res) => {
    let email = req.body.email;
    let image = req.body.image;
    //console.log(req.body)
    fetch('https://www.theacademist.com/api/v1/user/google-login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify({email})
      })
          .then(response=>response.json())
          .then(json=>{
              if (json.error){
                  let error = json.error
                  if (error.status == 401){
                      res.json({'error': 'User not registered or email not verified'})
                  }
                  else if (error.status == 500){
                    res.json({'error': 'An error occured please try again'})
                  }
              }
              else{
                const userData = {
                  token: json.token,
                  user_id: json.user.id,
                  firstName: json.user.firstName,
                  lastName: json.user.lastName,
                  coin: json.user.coin,
                  image: image,
                  email: json.user.email,
                  type: AUTH_USER_TYPE
                };
                res.cookie("token", userData, COOKIE_OPTIONS);
                res.json(json);
                res.redirect('/profile')
                //console.log(json)
          }
          })
          .catch(error=>console.log(error));
  
  });

  server.post("/api/login", async (req, res) => {
      const {email, password} = req.body;
      fetch('https://www.theacademist.com/api/v1/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({email, password})
    })
        .then(response=>response.json())
        .then(json=>{
            if (json.error){
                let error = json.error
                if (error.status == 401){
                    res.json({'Error!': 'User not registered or email not verified'})
                }
                else if (error.status == 500){
                    res.json({'Error!': 'An error occured please try again'})
                }
            }
            else{
              const userData = {
                token: json.token,
                user_id: json.user.id,
                firstName: json.user.firstName,
                lastName: json.user.lastName,
                coin: json.user.coin,
                image: json.user.image,
                email: json.user.email,
                type: AUTH_USER_TYPE
              };
              res.cookie("token", userData, COOKIE_OPTIONS);
              res.json(json);
              res.redirect('/profile')
              //console.log(json)
            }
          })
  });

  server.post("/api/logout", (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.sendStatus(204);
  });

  server.get("/api/profile/:id", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    //console.log(token)
    if (token && token.token && token.user_id) {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/user/${req.params.id}`, {
          headers: {
            Authorization: `${token.token}`
          }
        }
      );
      const userProfile = data
      return res.json({ user: userProfile });
    }
    res.sendStatus(404);
  
  });

  server.post("/api/scholarship", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    console.log(token)
    //if (token && token.token && token.user_id) {
      try{
        await fetch(`https://www.theacademist.com/api/v1/scholarship/search`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': token.token},
            mode: 'cors',
            body: JSON.stringify({
            "major": req.body.major,
            "level": req.body.level,
            "gpa": req.body.gpa,
            "criteria": req.body.criteria,
            "user_id": token.user_id,
            "country": req.body.country,
            "amount": req.body.amount,
            "applicantCountry": req.body.applicantCountry,
            "offset": req.query.offset
            })
          })
          .then(
            res => res.json()
          )
          .then(
            result => {
              if(result.message == "Not enough coins"){
                return res.json({"message": "Not enough coins"})
              }
              return res.json({ ...result });
            }
          )
        }catch(e){
          console.log(e)
        }
      
   // }
   // res.sendStatus(404);
  });

  server.post("/api/scholarship/no-coin", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    console.log(JSON.stringify({
      "major": req.body.major,
      "level": req.body.level,
      "gpa": req.body.gpa,
      "criteria": req.body.criteria,
      "user_id": token.user_id,
      "country": req.body.country,
      "amount": req.body.amount,
      "applicantCountry": req.body.applicantCountry,
      }))
    //if (token && token.token && token.user_id) {
      try{
        await fetch(`https://www.theacademist.com/api/v1/scholarship/no-coin`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': token.token},
            mode: 'cors',
            body: JSON.stringify({
            "major": req.body.major,
            "level": req.body.level,
            "gpa": req.body.gpa,
            "criteria": req.body.criteria,
            "user_id": token.user_id,
            "country": req.body.country,
            "amount": req.body.amount,
            "applicantCountry": req.body.applicantCountry,
            })
          })
          .then(
            res => res.json()
          )
          .then(
            result => {
              if(result.message == "Not enough coins"){
                return res.json({"message": "Not enough coins"})
              }
              return res.json(result);
            }
          )
        }catch(e){
          console.log(e)
        }
      
   // }
   // res.sendStatus(404);
  });

  server.get("/api/scholarship/:id", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    //console.log(token)
    if (token && token.token && token.user_id) {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/scholarship/${req.params.id}`, {
          headers: {
            Authorization: `${token.token}`
          }
        }
      );
      const scholarshipData = data
      return res.json({ scholarship: scholarshipData });
    }
    res.sendStatus(404);
  });

  server.post("/api/gpa", async (req, res) => {
      const { data } = await axios.post(
        `https://www.theacademist.com/api/v1/school/search-by-gpa`,
          {
            "level": req.body.level,
            "gpa": req.body.gpa,
            "state": req.body.state,
            "offset": req.body.offset
          }
      );
      const gpaData = data
      return res.json(gpaData);
    
  });

  server.get("/api/gpa/:id", async (req, res) => {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/school/${req.params.id}`,
      );
      const gpaData = data
      return res.json({ gpa: gpaData });
    
  });

  server.post("/api/major", async (req, res) => {
    console.log(req.body.major)
      const { data } = await axios.post(
        `https://www.theacademist.com/api/v1/school/search-by-major`,
          {
            "major": req.body.major,
            "level": req.body.level,
            "country": req.body.country,
            "state": req.body.state,
            "offset": req.body.offset
          }
      );
      const majorData = data
      return res.json(majorData);
    
  });

  server.get("/api/major/:id", async (req, res) => {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/school/search-by-major`,
      );
      const majorData = data
      return res.json({ major: majorData });
    
  });

  server.get("/api/blog", async (req, res) => {
    const { data } = await axios.get(
      `https://www.theacademist.com/api/v1/blog`
    );
    const blogList = data
    return res.json(blogList);
});

  server.get("/api/blog/:id", async (req, res) => {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/blog/${req.params.id}`
      );
      const singleBlog = data
      return res.json(singleBlog);
  });

  server.get("/api/forum", async (req, res) => {
    const { data } = await axios.get(
      `https://www.theacademist.com/api/v1/forum`
    );
    const forumList = data
    return res.json(forumList);
});

  server.get("/api/forum/:id", async (req, res) => {
      const { data } = await axios.get(
        `https://www.theacademist.com/api/v1/forum/${req.params.id}`
      );
      const singleForum = data
      return res.json(singleForum);
  });

  server.get('/blog/:id/:topic', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
})

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Listening on PORT ${port}`);
  });
});
