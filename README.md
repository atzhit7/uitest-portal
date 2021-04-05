# How to use (standalone)

1. clone this repository
1.      npm i
1.      node .\portal\sample\dev-portal1.js

# Update at 3/31

Addtional properties to select browsers what you do Test.

Run the code with cli paramters sample:

    node .\portal\sample\dev-portal1.js url=https://fqdn/portal user=portaluser password=portaluserpassword browsers=chromium,firefox --head --notification

other option:
if you want to use the config file. Try the following code:

    node .\portal\sample\dev-portal1.js inputjson=.\input.json --head --notification


# Update at 3/15

Update the scripts and remove some files to modify to use the cli parameters with Process lib.
And add another new files to run multibrowsers check using one code.

Run the code with cli paramters sample:

    node .\portal\sample\dev-portal1.js url=https://fqdn/portal user=portaluser password=portaluserpassword --head --notification

other option:
if you want to use the config file. Try the following code:

    node .\portal\sample\dev-portal1.js inputjson=.\input.json --head --notification
