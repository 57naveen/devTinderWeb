# DevTinder

- create a vite + react application
- install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Install react router dom and setup the routing the app file   
- Create BrowserRouter > Routes > Route/ Body > RouteChildren
- Create an outlet in your Body component
- Create a footer
- Create a login page
- install axios
- cors - install cors in backend => add middleware to with configurations: orgin, credentials: true
- whenever you're making API call so pass axios => {withCredentials:true}
- install react-redux +  @reduxjs/toolkit 
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in 
- you should not be access other routes without login 
- if token is not present, redirect user to login page 
- logout



# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-51-20-72-222.eu-north-1.compute.amazonaws.com
- install node 
- git clone
- frontend
    - npm install -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - sudo scp -r dist/* /var/www/html/ 
    - copy code from dist(build files) to /var/www/html
    - Enable port :80 on your instance 
- backend
    - updated DB password
    - allowed ec2 instance public IP on mongoose server
    - npm install pm2 -g
    - pm2 start npm -- start
    - pm2 logs (check the logs)    
    - pm2 list
    - pm2 flush <name>
    - pm2 stop <name>
    - pm2 delete <name>