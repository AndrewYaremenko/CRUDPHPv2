# CRUDPHPv2
###### Laravel v8.83.27 (PHP v7.3.0)
##### Improved CRUD application compared to the [previous version](https://github.com/Haru-ri/CRUDPHP), for working with MySQL database.
##### The application is built on Laravel, using Bootstrap 5, Ajax and pagination implementation.

###### The project was created to consolidate knowledge in PHP, Laravel (Controllers, migrations, sessions), jQuery, Ajax, Bootstrap 5
###### ----------------------
###### While working on the project, I worked on creating Laravel modules such as Controllers and performing Migrate(rollback) using the php artisan command. I familiarized myself with sessions in Laravel, pagination methods, working with the Blade templating engine and its directives.

###### I installed additional libraries ([Toastr](https://github.com/CodeSeven/toastr), jQuery) via npm, connected them to resources/js/app.js and resources/sass/app.scss files, configured webpack.mix.js, compiled resources using npm run dev, and dealt with other intricacies involved in Laravel project development.

###### When writing code, I adhered to the principles of clean code, followed the "Actions Handled By Resource Controller" conventions for Controllers, utilized dependency injection (DI) in routes and controller methods, and other modern development approaches.

## Used Libraries

- [Toastr](https://github.com/CodeSeven/toastr)

## Install

- Clone repository ```https://github.com/Haru-ri/CRUDPHPv2.git```
- Navigate to the project directory
- Copy and rename **.env.example** to **.env** and changes 
<pre>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
</pre>
- Migrate tables to the database: **php artisan migrate**

## Usage

- Using the built-in development server: **php artisan serve**
- Open a web browser at the URL given after launch
- DB data will be displayed in the table
- Above the table there is a button for adding data
- The table has update button to change the product
- The table has delete button to delete products
- Under the table there will be page buttons (pagination) if there are more than 5 records
- Above the table there is a search bar where you can search for records by title or price

### Video presentation 
[Link to Youtube](https://youtu.be/VUiHBwC03UE)
