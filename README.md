# server-hoster-currency
a simple server hosting service with built-in cryptocurrency for minecraft!
<h2>How to use</h2>

1. Go to the code inside of the index.js file.
2. Replace where it says 'Insert rcon password here' with your server's rcon password.
3. Replace where it says 'Put your server admin minecraft username here' with the server admin's username.
4. Replace where it says 'Put your server ip address here' with your minecraft server's ip address.
5. Done! You can now start your server by running the command, 'node index.js' without the quotes!


<h3>Note:</h3>

You have to preconfigure your server with rcon enabled before you start your server in setp number five by adding the following lines at the end of your server.properties file:
  
  rcon.port=25575
  rcon.password=put your rcon password here from the index.js file
