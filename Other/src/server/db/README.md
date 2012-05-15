created iCY development and test dbs.
Ran the following commands:
createuser iCY
createdb -OiCY -Eutf8 iCY_development
createdb -0iCY -Eutf8 iCY_test
rake db:migrate
