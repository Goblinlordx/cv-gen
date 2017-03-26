# CV Generator

 - [Introduction](#intro)
 - [Architectural Overview](#architecture)
 - [Authentication System](#authen)
 - [Authorization System](#authorize)
 - [Additional Commentary](#additional)


## <a name="intro"></a>Introduction

This project was born out of my frustration with alignment, formatting, and other tedious tasks required when formatting a document. As most people, every now and then, I am required to update my CV.  My thought was simply, why not automate the process and make it better.  

This was literally thrown together over the course of a day or so.  I actually think it is working quite nice. I implemented a variety of features beyond simply formatting:

* Free to host, operate, and maintain
* Entirely client-side rendered using [React][2]
* Formatted to print properly
* Data-driven format that adjusts to the data provided
* Secured using [Firebase][5] and a custom token based [authorization system](#authorize) without requiring logins
* Data provided can be different based on grouped authentication tokens.
* Analytical data collection


## <a name="architecture"></a>Architectural overview
<div align=center>
<img src="https://raw.githubusercontent.com/Goblinlordx/cv-gen/master/assets/Architecture.png"/>
</div>

Github provides free hosting of static assets.  Clients request static assets when navigating to the proper [URL][1].  Upon receiving the assets [React][2] and [Google Analytics][3] are initialized.

Once initialized [React][2] does not actually render anything.  It will begin an authentication flow.  It will authenticate using [anonymous Firebase Authentication][4].  After authentication the client will go through a validation to ensure either it's account has a valid token or it is providing a new token which is valid.  While the client does the tests the actual validation is done using [Firebase Database authorization rules][6].

After the client has validated it's token it retrieves the data using [Firebase Database][8].  The data is retrieved in as 2 sets of data.  One is a base set of data and the second is a token specific set of data.  The client then merges these together and provides them to [React][2]

[React][2] begins rendering immediately after receiving the data.  This will build the the html and css as necessary to render the desired output.

## <a name="authen"></a>Authentication System

Authentication of each client accessing the data is handled by using [Firebase's][5] [anonymous authentication][4].  This will connect a single client with a new user ID in [Firebase][5].  One of the huge advantages of this is that [Firebase Authentication][7] is provided for [free][9].  This significantly reduces overhead for maintaining an authentication system.  The session will persist indefinetly or until the user clears the browser cache.

Once we have authenticated a user we attempt to check if either a token is provided or the client's account already exists.  If the client has a new token, it will attempt to validate the new token.  If the new token is invalid it falls back to checking if the account already has an existing token.  If it does, it will validate the existing token.  When the client has a valid token it will then simply retrieve the data.

## <a name="authorize"></a>Authorization System

Authorization starts out-of-band with a user being sent a link containing a query string with a token.  The token isn't necessarily meant for a single user but a group of user's that might have access. Each token can have an expiration time, a set of overlay data, and any other required metadata. With admin privileges this information can be altered at any time. It is important to note that the token is only required once.  After clicking a proper access link, the account on the client is bound to that token.

The tokens can be removed or invalidated at any time to blacklist a group from database access.  There is also the option of invalidation via expiration.  Tokens can also contain an overlay which the client will merge with a base set of data as an overlay.  This can provide a unique view of the CV based on the token group they gained access through.

## <a name="additional"></a>Additional Commentary

While this project is mainly for myself, I do hope other's can gain some insight from it.  The token authorization system in particular I think I might abstract into a library of it's own.  I think it is relatively simple and could be leveraged to great benefit.  The fact that it is pretty much free to operate is extremely nice. That is, unless the quota for the db is somehow exceeded, which I don't seeing occuring anytime in the foreseeable future.



[1]: https://goblinlordx.github.io/cv-gen
[2]: https://facebook.github.io/react/
[3]: https://www.google.com/analytics/
[4]: https://firebase.google.com/docs/auth/web/anonymous-auth
[5]: https://firebase.google.com/
[6]: https://firebase.google.com/docs/database/security/
[7]: https://firebase.google.com/docs/auth/
[8]: https://firebase.google.com/docs/database/
[9]: https://firebase.google.com/pricing/