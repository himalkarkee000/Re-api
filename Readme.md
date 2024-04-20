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


storage units
SQL
    -query
        -mysql , postgres , oracal, msql

No SQl
    -functions
        -mangodb , couchdb

    document based db


 Mangodb Server(community)
 Mangodb Shell (server access via terminal)
 Mangodb Compass( GUI application to use mangodb)



 localize
 cloud service   512mb free 


 USer name :: himalkarkee
 password :: himalkarkee000



protocol   ==== > mongodb , mongodb+srv
host        ===> localhost, 127.0.0.1, <cluster hostaddress>
port        ===> 27017
user        ===> not required for localhost, himalkarkee
pwd         ===> not required for localhost, himalkarkee000
db          ===> your dbname




C   ->Create
    -----> db.<collectionName>.insertOne(<JSON Object>)
    -----> db.<collectionName>.insertMany([<JSON Object>])

    e.g
        db.users.insertOne({
            name : "himal karki",
            email :"himaljung@gmail.com",
            role :"admin",
            password :"",
            status :"inactive",
            activationToken :"",
            image :""
        });


R   -> Read
    --db.<collectionName>.find()
    --db.<collectionName>.findOne()

    Args
        (filter)
        ->filter is a json data type
        - where clas is value

U   ->Update
    --db.<collectionName>.updateOne();
    --db.<collectionName>.updateMany();
    Args
        filter ===> find filter as asme as that
        body ===>
            {
                $set:<updateBody>
            }
        options:
        =====> {upsert:<boolean>}

D   ->Delete
    --->db.<collectionName>.deleteOne();
    --->db.<collectionName>.deleteMany();




filter  
    $or, $and, $gt, $gte ,$lt, $lte, $eq, $ne , $like
    {
        $<or, and , in nin>: [{key}]
    }






[{"name": "John Doe","email": "johndoe@example.com","role": "admin","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "abc123","image": "https://dummyimage.com/300"},{"name": "Jane Smith","email": "janesmith@example.com","role": "seller","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "def456","image": "https://dummyimage.com/300"},{"name": "Mike Johnson","email": "mikejohnson@example.com","role": "buyer","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "ghi789","image": "https://dummyimage.com/300"},{"name": "Sarah Williams","email": "sarahwilliams@example.com","role": "admin","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "jkl012","image": "https://dummyimage.com/300"},{"name": "David Brown","email": "davidbrown@example.com","role": "seller","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "mno345","image": "https://dummyimage.com/300"},{"name": "Amy Davis","email": "amydavis@example.com","role": "buyer","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "pqr678","image": "https://dummyimage.com/300"},{"name": "Mark Wilson","email": "markwilson@example.com","role": "admin","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "stu901","image": "https://dummyimage.com/300"},{"name": "Emily Taylor","email": "emilytaylor@example.com","role": "seller","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "vwx234","image": "https://dummyimage.com/300"},{"name": "Chris Anderson","email": "chrisanderson@example.com","role": "buyer","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "yz0123","image": "https://dummyimage.com/300"},{"name": "Olivia Martinez","email": "oliviamartinez@example.com","role": "admin","password": "$2y$12$5XmzH0XGJxJxg6eHnJvQhO4Q3Kx9i9dFb0aG2e6Yj6X5yGv2aX8c2","status": "inactive","activationToken": "456def","image": "https://dummyimage.com/300"}]




[{"name": "product1","Price ": "100","discount": "10","Price after discount": "90"},{"name": "product2","Price ": "50","discount": "5","Price after discount": "47.5"},{"name": "product3","Price ": "200","discount": "15","Price after discount": "170"},{"name": "product4","Price ": "75","discount": "20","Price after discount": "60"},{"name": "product5","Price ": "120","discount": "0","Price after discount": "120"},{"name": "product6","Price ": "80","discount": "10","Price after discount": "72"},{"name": "product7","Price ": "150","discount": "25","Price after discount": "112.5"},{"name": "product8","Price ": "90","discount": "5","Price after discount": "85.5"},{"name": "product9","Price ": "60","discount": "10","Price after discount": "54"},{"name": "product10","Price ": "180","discount": "20","Price after discount": "144"}]



Core usages

ORM/ODM usages
        ---> Data Structyre provider
        ORM/ODM
            ====> Object Relational Mapping/Modeling
            ====> Object Document Mapping/Modeling

        DB tables ====> Project Model defination

        ORM/ODM
        ---> Table/Colllection names should be always plural form if your data/entity
        e.g
            users, products, histories
        ---> All the models/Repo in your project should be in singular case
        e.g
            Users, Product, History
        ----> All the columns/keys of the table/collection is the property of model class
        e.g
         users===> _id, name , email, password,...
         ---> UserModel ===> object ===> property

        ===> function


Mongodb

    ====>mongoose

SQL server
    ====>sequelize, typeorm, prism

### Identify the Entity

ER diagram

Ecommerce 

    -banners


    -users
            Table users{
            _id ObjectID
            name text
            email text [unique]
            password text
            role ROLE [default: 'customer']
            status STATUS [default: 'inactive']
            actuvationToken text
            image text
            phone text
            address json
            createdBy ObjectId [ref: -users._id, default: '']
            createdAt datetime
            updatedBy ObjectId [ref: - users._id, default:'null']
            updatedAt datetime
            }


    -product
        -category
        -brand
        -product
        -order
        
        -transactions
        -offers
        -coupons/vouchers
        -reviews


        -Inventory MS
            -Order
            -stock
            -payment/Cash flow
        -Logistic MS
            -tracking system
            -delivery Status


Application ER
    ---School Management System
    ---> student
        
    ---> classes
    ---> Class Routine
    ----> Section
    ----> Exam,
    ----> Attendence
    ----> Teachers
    ----> Subject
    ---->Result
    