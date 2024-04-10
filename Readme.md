# API- 28, Ecommerece
    -Auth module
        -register
            -> /regiser post
                    (customer , seller)  

        -Activate
            -> /activate/token -> get

        -login
            -> /login =>post
        -profile
            -> after login /me =>get
        -change password
            -> after login /change-password -> post
        -logout
            -> after login /logout =>get
        -forget password
            ->request for password => post /forget-password
        -Reset password
            ->post/reset-password

        \-Banner Module
        -Create 
            => /banner post                 protected

        -Read
            =>/banner get list all          protected
            =>/banner/:id get details       protected
            =>/banner/home get list          public

        -Update
            =>/banner/:id put update        protected
        
        -Delete
            => /banner/:id delete           Protected

    
    -Band Module
        -Create 
            => /band post                 protected

        -Read
            =>/band get list all          protected
            =>/band/:id get details       protected
            =>/band/home get list          public
            =>/band/:slug/by-slug get list Detail of all band with product          public

        -Update
            =>/band/:id put update        protected
        
        -Delete
            => /band/:id delete           Protected

        

# Category Module
        -Create 
            => /category post                 protected

        -Read
            =>/category get list all          protected
            =>/category/:id get details       protected
            =>/category/home get list          public
            =>/category/:slug/by-slug get list Detail of all category with product          public

        -Update
            =>/category/:id put update        protected
        
        -Delete
            => /category/:id delete           Protected


    -User Module






    -Product Module
        -Create 
            => /product post                 protected(admin, seller)

        -Read
            =>/product get list all          protected
            =>/product/:id get details       protected
            =>/product/home get list          public
            =>/product/:slug/by-slug get list Detail of all product with product          public
            =>/product/list get listing by some filter public

        -Update
            =>/product/:id put update        protected
        
        -Delete
            => /product/:id delete           Protected

        
    -Cart/ Order
        -Create/ Update
            => /cart/create -> post(protected , admin , customer)
            =>/order/create ->post(protected , admin , customer)

        -Read
            => /cart/list -> post(protected , admin , customer)
            =>/order/list ->post(protected , admin , customer)

        -Delete
            => /cart/:id => delete (protected , admin , customer)


# Add on fetures

Payment modules
    -Live https
    -purchase
    -commission

Offers Promo
Blogs/ Review



Postman 
Insomia
Thunder client
postmanextension
Documenation
    -Swagger



# Middleware
-route ==> A ==> B ===>C ===> D ====> Response
-(req: Requet, res: Response , next: NextFunction)
    //req.params
    // req.value
    //next() 
    res.json
    
    (req, res, next)
        //req.manipulate
        next()

# CORS
    => Cross Origin Reference Site
        ---> FE (domain)
            --- abc.com
        ===> BE (domain)
            ---abc.com:portno
            


# validation Package
    -yup
    -joi
    -zod
    



Register Data
 ---> name, email, password, role , images
    -----> store this on db
        ----> User has to activate the account via email



SMTP server 
    ===>smtp , pop3, imap
    smtp ===> 25 block ISP,2525, 587, 465



            gmail, live , custom domain

sender 
Node app ===> SMTP server ====== Queue build ====> Receiver Mail

Test 
sending domain verify  ====> hosting live
    Node app ===> Smtp server ====> Queue build =====> Fake make receiver


Host        ==>gmail
user        ==> gmail address
Password    ==>
port        ==>

# npm  i nodemailer dotenv

# DATABASE 
 Mangodb Server(community)
 Mangodb Shell (server access via terminal)
 