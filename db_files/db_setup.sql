create table if not exists users( id serial, username varchar(50) not null, email varchar(50) not null, primary_key(id));
create table if not exists recipes( id serial, owner_id integer not null, name varchar(50) not null, category integer not null, public boolean not null, primary_key(id));
create table if not exists steps( id serial, recipe_id integer not null, order integer not null, content text not null, primary_key(id));
create table if not exists ingredients( id serial, recipe_id integer not null, name varchar(50) not null, amount varchar(50) not null, primary_key(id));