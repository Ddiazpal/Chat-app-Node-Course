const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var uu;

    beforeEach(() =>{ // It is called every single time to initialize some data
        uu = new Users();
        uu.users = [{
            id: '123',
            name: 'Vale',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'July',
            room: 'Node Course'
        }];
    });

    it ('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '/kdmopj9w-',
            name: 'Daniela',
            room: 'Office 1'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it ('Should return names for Node Course', () =>{
        var userlist = uu.getUserList('Node Course');

        expect(userlist).toEqual(['Vale', 'July']);
    });

    it ('Should return names for React Course', () =>{
        var userlist = uu.getUserList('React Course');

        expect(userlist).toEqual(['Jen']);
    });

    it ('Should return the name accroding to the id ', () =>{
        var userId = '2';
        var user = uu.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it ('Should not return the name accroding to the id ', () =>{
        var userId = '99';
        var user = uu.getUser(userId);

        expect(user).toNotExist();
    });

    it ('Should remove a user ', () =>{
        var userId = '123';
        var user = uu.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(uu.users.length).toBe(2);
        console.log(uu.users);
    });

    it ('Should not remove a user', () =>{
        var userId = '10';
        var user = uu.removeUser(userId);

        expect(user).toNotExist();
        expect(uu.users.length).toBe(3);
    });
});