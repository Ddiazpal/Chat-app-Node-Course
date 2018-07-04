[{
    id: '/kdmopj9w-',
    name: 'Daniela',
    room: 'Office 1'
}]

class Users {
    constructor(){
        this.users = [];      
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var user = this.getUser(id);    
        
        if (user) {
            this.users = this.users.filter((user) => user.id != id);
        }

        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map ((user) => user.name); 

        return namesArray;
    }
}

module.exports = {Users};

/*class Person {
    constructor (name,age) {
        this.name= name;
        this.age = age; //customize the individual instance    
    }
    getUsersDescription () {  //methods
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

var me = new Person('Daniela',20);
var description = me.getUsersDescription();
console.log(description);
*/
//addUser
//removeUser(id)
//getUser(id)
//getUserList(room)