# in order to run the server
```sh
$git clone https://github.com/IslamHany/parking-task.git
$cd parking-task
$npm install
$npm start
```

# Api Routes: 
### the base url is http://localhost:5000 
## user routes:-
#### - add new user (employee): 
#### post request to  ( /user )
#### body should be:
```
{
    "name": "islam hany",
    "position": "developer",
    "age": 25
}
```

#### - get all users:
#### get request to (/user)

#### - get user by id:
#### get request to (/user/:id)

#### - update user by id:
#### put request to (/user/:id)
#### body should be:
```
{
    "name": "ISLAM HANY",
    "position": "DEVELOPER",
    "age": 25
}
```

#### - delete user by id:
#### delete request to (/user/:id)

## car routes:-

### - Add new car:
### post request to (/car)
#### body should be:
```
{
    "brand": "BMW",
    "model": "x6",
    "plateNumber": "abc123",
    "userId": "60cb198273eb751b10213546"
}
```

### - Get all cars:
### get request to (/car)


### - Get car by id :
### get request to (/car/:id)

### - Pass through route to deduct from the car balance: (simulate car exit highway gate)
### put request to (/car/:id/pass)

### - Delete car by id
### delete request to (/car/:id)
